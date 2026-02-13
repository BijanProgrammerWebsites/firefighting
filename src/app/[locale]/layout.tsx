import { PropsWithChildren, ReactNode } from "react";

import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";

import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";

import {
  ColorSchemeScript,
  DirectionProvider,
  MantineProvider,
  createTheme,
  mantineHtmlProps,
} from "@mantine/core";

import ShellComponent from "@/components/shell/shell.component";

import "./globals.css";
import "@mantine/charts/styles.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
});

const metadata: Metadata = {};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "App" });

  return {
    ...metadata,
    title: t("name"),
    description: t("name"),
  };
}

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
            <MantineProvider theme={theme}>
              <ShellComponent>{children}</ShellComponent>
            </MantineProvider>
          </DirectionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
