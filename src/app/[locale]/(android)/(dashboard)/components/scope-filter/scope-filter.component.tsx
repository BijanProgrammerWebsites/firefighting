"use client";

import { ReactNode, use } from "react";

import { useTranslations } from "next-intl";

import { Button, Group, Menu, Text } from "@mantine/core";

import { useQuery } from "@tanstack/react-query";

import { findDetailedApi } from "@/api/refinery/find-detailed.api";

import IconComponent from "@/components/icon/icon.component";
import LoadingComponent from "@/components/loading/loading.component";

import { Site } from "@/entities/site";
import { Unit } from "@/entities/unit";
import { Zone } from "@/entities/zone";

import { refineryKeys } from "@/queries/keys";

import { DashboardContext } from "@/android/(dashboard)/context/dashboard.context";
import { generateScopeTitle } from "@/android/(dashboard)/utils/scope.utils";

export default function ScopeFilterComponent(): ReactNode {
  const t = useTranslations("DashboardPage");

  const { scope, changeScope } = use(DashboardContext);

  const { isPending, isError, error, data } = useQuery({
    queryKey: refineryKeys.detailed,
    queryFn: findDetailedApi,
  });

  const handleItemClick = (site?: Site, zone?: Zone, unit?: Unit): void => {
    changeScope({ site, zone, unit });
  };

  if (isPending) {
    return <LoadingComponent />;
  }

  if (isError) {
    return <Text c="red">{error.message}</Text>;
  }

  return (
    <Group justify="space-between" my={8}>
      <Menu width={200} position="bottom-start">
        <Menu.Target>
          <Text>
            اطلاعات زیر مربوط به
            <Button
              variant="subtle"
              color="blue"
              size="sm"
              px="0.5ch"
              mx="0.5ch"
            >
              <Group gap="0.5ch">
                <IconComponent name="filter-linear" />
                {generateScopeTitle(scope, data.title)}
              </Group>
            </Button>
            است.
          </Text>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item onClick={() => handleItemClick()}>
            {t("allSites")}
          </Menu.Item>
          {data.sites.map((site) => (
            <Menu.Sub key={site.id}>
              <Menu.Sub.Target>
                <Menu.Sub.Item>{site.title}</Menu.Sub.Item>
              </Menu.Sub.Target>
              <Menu.Sub.Dropdown>
                <Menu.Item onClick={() => handleItemClick(site)}>
                  {t("allZones")}
                </Menu.Item>
                {site.zones.map((zone) => (
                  <Menu.Sub key={zone.id}>
                    <Menu.Sub.Target>
                      <Menu.Sub.Item>{zone.title}</Menu.Sub.Item>
                    </Menu.Sub.Target>
                    <Menu.Sub.Dropdown>
                      <Menu.Item onClick={() => handleItemClick(site, zone)}>
                        {t("allUnits")}
                      </Menu.Item>
                      {zone.units.map((unit) => (
                        <Menu.Item
                          key={unit.id}
                          onClick={() => handleItemClick(site, zone, unit)}
                        >
                          {unit.title}
                        </Menu.Item>
                      ))}
                    </Menu.Sub.Dropdown>
                  </Menu.Sub>
                ))}
              </Menu.Sub.Dropdown>
            </Menu.Sub>
          ))}
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
