"use client";

import { ComponentProps, ReactNode } from "react";

import { useSelectedLayoutSegment } from "next/navigation";

import { NavLink, NavLinkProps } from "@mantine/core";

import { Link } from "@/i18n/navigation";

type Props = Omit<ComponentProps<typeof Link>, "onChange"> &
  Pick<NavLinkProps, "label" | "description" | "leftSection">;

export default function NavLinkComponent({
  href,
  ...otherProps
}: Props): ReactNode {
  const segment = useSelectedLayoutSegment();
  const pathname =
    segment && segment !== "(general)" ? `/admin/${segment}` : "/admin";
  const isActive = pathname === href;

  return (
    <NavLink
      component={Link}
      href={href}
      active={isActive}
      variant="subtle"
      aria-current={isActive ? "page" : undefined}
      {...otherProps}
    />
  );
}
