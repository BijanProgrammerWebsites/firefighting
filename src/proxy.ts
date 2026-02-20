import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

export default async function proxy(
  request: NextRequest,
): Promise<NextResponse> {
  const handleI18nRouting = createMiddleware(routing);
  let response = handleI18nRouting(request);

  if (!response.ok) {
    return response;
  }

  const url = response.headers.get("x-middleware-rewrite") || request.url;
  const [, locale, ...rest] = new URL(url).pathname.split("/");

  const pathname = "/" + rest.join("/");
  const isInSignInPage = pathname.startsWith("/sign-in");

  const accessToken = (await cookies()).get("accessToken")?.value;

  if (!accessToken && !isInSignInPage) {
    response = NextResponse.redirect(
      new URL(`/${locale}/sign-in`, request.url),
      { headers: response.headers },
    );
  }

  return response;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
