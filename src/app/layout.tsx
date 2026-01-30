import { PropsWithChildren, ReactNode } from "react";

import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";

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

type Props = PropsWithChildren;

export default function RootLayout({ children }: Props): ReactNode {
  const theme = createTheme({
    fontFamily: vazirmatn.style.fontFamily,
  });
  return (
    <html
      lang="en"
      dir="rtl"
      {...mantineHtmlProps}
      className={vazirmatn.variable}
    >
      <head>
        <title>Firefighting</title>
        <ColorSchemeScript />
      </head>
      <body>
        <DirectionProvider>
          <MantineProvider theme={theme}>{children}</MantineProvider>
        </DirectionProvider>
      </body>
    </html>
  );
}
