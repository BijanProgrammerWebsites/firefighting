import type { ReactNode } from "react";

import { Avatar, Box, Group } from "@mantine/core";

import { useQuery } from "@tanstack/react-query";

import { findRefineryApi } from "@/api/refinery/find-refinery.api";

import { Link } from "@/i18n/navigation";

import { refineryKeys } from "@/queries/keys";

import { picturePath } from "@/utils/path.utils";

import styles from "@/admin/components/shell/components/header/header.module.css";

type Props = {
  href: string;
};

export default function LogoTypeComponent({ href }: Props): ReactNode {
  const { data } = useQuery({
    queryKey: refineryKeys.find,
    queryFn: findRefineryApi,
  });

  return (
    <Box
      component={Link}
      href={href}
      style={{ color: "inherit", textDecoration: "none" }}
    >
      <Group gap="sm">
        <Avatar
          className={styles.avatar}
          variant="light"
          radius="md"
          size="1lh"
          src={picturePath(data?.picture)}
          alt=""
        />
        {data?.title}
      </Group>
    </Box>
  );
}
