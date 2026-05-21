"use client";

import { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { useMantineTheme } from "@mantine/core";

import { EChartsOption } from "echarts";

import { defectsBySeverityDto } from "@/api/dashboard/defects-by-severity.api";

import ChartComponent from "@/components/chart/chart.component";

type Props = {
  data: defectsBySeverityDto;
};

export default function DefectsBySeverityChart({ data }: Props): ReactNode {
  const tCommon = useTranslations("Common");

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
      data: [
        tCommon("low"),
        tCommon("medium"),
        tCommon("high"),
        tCommon("critical"),
      ],
    },
    series: [
      {
        type: "bar",
        data: [
          {
            value: data.low,
            itemStyle: { color: theme.colors.lime[colorIndex] },
          },
          {
            value: data.medium,
            itemStyle: { color: theme.colors.yellow[colorIndex] },
          },
          {
            value: data.high,
            itemStyle: { color: theme.colors.orange[colorIndex] },
          },
          {
            value: data.critical,
            itemStyle: { color: theme.colors.red[colorIndex] },
          },
        ],
      },
    ],
  };

  return <ChartComponent option={options} />;
}
