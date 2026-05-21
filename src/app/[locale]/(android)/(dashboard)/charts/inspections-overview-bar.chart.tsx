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

export default function InspectionsOverviewBarChart({
  data,
}: Props): ReactNode {
  const t = useTranslations("DashboardPage");

  const theme = useMantineTheme();

  const colorIndex = 5;

  const options: EChartsOption = {
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      show: true,
    },
    xAxis: {
      type: "value",
      interval: 1,
    },
    yAxis: {
      type: "category",
      inverse: true,
      data: [t("overdue"), t("today"), t("next7Days"), t("next30Days")],
    },
    series: [
      {
        type: "bar",
        data: [
          {
            value: data.overdue.length,
            itemStyle: { color: theme.colors.red[colorIndex] },
          },
          {
            value: data.today.length,
            itemStyle: { color: theme.colors.orange[colorIndex] },
          },
          {
            value: data.next7Days.length,
            itemStyle: { color: theme.colors.yellow[colorIndex] },
          },
          {
            value: data.next30Days.length,
            itemStyle: { color: theme.colors.lime[colorIndex] },
          },
        ],
      },
    ],
  };

  return <ChartComponent option={options} />;
}
