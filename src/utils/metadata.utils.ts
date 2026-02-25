import type { Metadata } from "next";

import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateDynamicMetadata(namespace: string) {
  return async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace });

    return { title: t("title") };
  };
}
