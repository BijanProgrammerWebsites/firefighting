import { type ReactNode } from "react";

import { useTranslations } from "next-intl";

import IconComponent from "@/components/icon/icon.component";

import NavLinkComponent from "@/admin/components/nav-link/nav-link.component";

import styles from "./navbar.module.css";

type Item = {
  href: string;
  title: string;
  description?: string;
  icon: ReactNode;
  disabled?: boolean;
};

export default function NavbarComponent(): ReactNode {
  const t = useTranslations("Shell");

  const items: Item[] = [
    {
      href: "/admin",
      title: t("adminGeneral"),
      icon: <IconComponent collection="tabler" name="building-factory" />,
    },
    {
      href: "/admin/users",
      title: t("adminUsers"),
      icon: <IconComponent name="users-group-rounded-linear" />,
    },
    {
      href: "/admin/standards",
      title: t("adminStandards"),
      icon: <IconComponent collection="tabler" name="template" />,
    },
    {
      href: "/admin/templates",
      title: t("adminTemplates"),
      icon: <IconComponent collection="tabler" name="layers-intersect" />,
    },
    {
      href: "/admin/assets",
      title: t("adminAssets"),
      icon: <IconComponent name="box-minimalistic-linear" />,
    },
    {
      href: "/admin/logs",
      title: t("adminLogs"),
      icon: <IconComponent collection="tabler" name="notes" />,
    },
  ];

  return (
    <div className={styles.navbar}>
      {items
        .filter((item) => !item.disabled)
        .map((item) => (
          <li key={item.title}>
            <NavLinkComponent
              href={item.href}
              label={item.title}
              description={item.description}
              leftSection={item.icon}
            />
          </li>
        ))}
    </div>
  );
}
