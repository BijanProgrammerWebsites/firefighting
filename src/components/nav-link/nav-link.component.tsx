"use client";

import { ComponentProps, ReactNode } from "react";

import { useSelectedLayoutSegment } from "next/navigation";

import clsx from "clsx";

import { Link } from "@/i18n/navigation";

type Props = ComponentProps<typeof Link> & {
  activeClassName?: string | ((isActive: boolean) => string);
};

export default function NavLinkComponent({
  className,
  activeClassName,
  href,
  ...otherProps
}: Props): ReactNode {
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : "/";
  const isActive = pathname === href;

  return (
    <Link
      className={clsx(className, isActive && activeClassName)}
      href={href}
      aria-current={isActive ? "page" : undefined}
      {...otherProps}
    />
  );
}
