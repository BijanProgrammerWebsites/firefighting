import { PropsWithChildren, ReactNode } from "react";

import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";

import { NextIntlClientProvider } from "next-intl";

import {
  ColorSchemeScript,
  DirectionProvider,
  MantineProvider,
  createTheme,
  mantineHtmlProps,
} from "@mantine/core";

import "./globals.css";
import "@mantine/charts/styles.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
});

export const metadata: Metadata = {
  title: "Firefighting",
  description: "Firefighting",
};

type Props = PropsWithChildren<{
  params: Promise<{ locale: string }>;
}>;

export default async function RootLayout({
  children,
  params,
}: Props): Promise<ReactNode> {
  const { locale } = await params;

  const theme = createTheme({
    fontFamily: vazirmatn.style.fontFamily,
  });

  return (
    <html
      lang={locale}
      dir={locale === "fa" ? "rtl" : "ltr"}
      {...mantineHtmlProps}
      className={vazirmatn.variable}
    >
      <head>
        <title>Firefighting</title>
        <ColorSchemeScript />
      </head>
      <body>
        <NextIntlClientProvider>
          <DirectionProvider>
            <MantineProvider theme={theme}>{children}</MantineProvider>
          </DirectionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
