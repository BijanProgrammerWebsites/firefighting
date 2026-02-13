import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import clsx from "clsx";

import IconComponent from "@/components/icon/icon.component";

import { Link } from "@/i18n/navigation";

import styles from "./header.module.css";

type Props = {
  className?: string;
};

export default async function HeaderComponent({
  className,
}: Props): Promise<ReactNode> {
  const t = await getTranslations("App");

  return (
    <header className={clsx(styles.header, className)}>
      <Link href="/">
        <IconComponent collection="tabler" name="building-factory" />
        {t("companyName")}
      </Link>
    </header>
  );
}
