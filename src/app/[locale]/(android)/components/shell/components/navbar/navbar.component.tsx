import {
  type ComponentProps,
  type HTMLElementType,
  type ReactNode,
} from "react";

import { getTranslations } from "next-intl/server";

import clsx from "clsx";

import IconComponent from "@/components/icon/icon.component";

import NavLinkComponent from "@/android/components/nav-link/nav-link.component";

import styles from "./navbar.module.css";

type Item = {
  href: string;
  title: string;
  icon: ReactNode;
  disabled?: boolean;
};

type Props = ComponentProps<HTMLElementType>;

export default async function NavbarComponent({
  className,
}: Props): Promise<ReactNode> {
  const t = await getTranslations("Shell");

  const items: Item[] = [
    {
      href: "/",
      title: t("dashboard"),
      icon: <IconComponent name="home-angle-2-linear" />,
    },
    {
      href: "/defects",
      title: t("defects"),
      icon: <IconComponent name="shield-warning-linear" />,
    },
    {
      href: "/inspections",
      title: t("inspections"),
      icon: <IconComponent name="magnifer-bug-linear" />,
    },
    {
      href: "/report",
      title: t("report"),
      icon: <IconComponent name="diagram-up-linear" />,
    },
    {
      href: "/settings",
      title: t("settings"),
      icon: <IconComponent name="settings-linear" />,
    },
  ];

  return (
    <nav className={clsx(styles.navbar, className)}>
      <ul>
        {items
          .filter((item) => !item.disabled)
          .map((item, index) => (
            <li key={item.title}>
              <NavLinkComponent
                activeClassName={styles.active}
                href={item.href}
              >
                {index === 2 ? (
                  <span className={styles.circle}>{item.icon}</span>
                ) : (
                  item.icon
                )}
                {item.title}
              </NavLinkComponent>
            </li>
          ))}
      </ul>
    </nav>
  );
}
