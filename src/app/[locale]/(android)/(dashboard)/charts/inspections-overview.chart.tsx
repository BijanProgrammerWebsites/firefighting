"use client";

import { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { useMantineTheme } from "@mantine/core";

import { EChartsOption } from "echarts";

import { FindAllBucketsDto } from "@/api/equipments/find-all-buckets.api";

import ChartComponent from "@/components/chart/chart.component";

type Props = {
  data: FindAllBucketsDto;
};

export default function InspectionsOverviewChart({ data }: Props): ReactNode {
  const t = useTranslations("DashboardPage");

  const theme = useMantineTheme();

  const options: EChartsOption = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      show: true,
    },
    series: [
      {
        type: "pie",
        stillShowZeroSum: false,
        radius: ["80%", "100%"],
        top: 5,
        bottom: 60,
        padAngle: 5,
        itemStyle: {
          borderRadius: 10,
        },
        label: {
          show: false,
        },
        data: [
          {
            name: t("withoutHistory"),
            value: data.withoutHistory.length,
            itemStyle: { color: theme.colors.gray[5] },
          },
          {
            name: t("overdue"),
            value: data.overdue.length,
            itemStyle: { color: theme.colors.red[5] },
          },
          {
            name: t("today"),
            value: data.today.length,
            itemStyle: { color: theme.colors.orange[5] },
          },
          {
            name: t("next7Days"),
            value: data.next7Days.length,
            itemStyle: { color: theme.colors.yellow[5] },
          },
          {
            name: t("next30Days"),
            value: data.next30Days.length,
            itemStyle: { color: theme.colors.lime[5] },
          },
        ].filter((x) => x.value !== 0),
      },
    ],
  };

  return <ChartComponent option={options} />;
}
