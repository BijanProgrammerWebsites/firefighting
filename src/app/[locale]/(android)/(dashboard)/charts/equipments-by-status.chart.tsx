"use client";

import { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { useMantineTheme } from "@mantine/core";

import { EChartsOption } from "echarts";

import { equipmentsByStatusDto } from "@/api/dashboard/equipments-by-status.api";

import ChartComponent from "@/components/chart.component";

type Props = {
  data: equipmentsByStatusDto;
};

export default function EquipmentsByStatusChart({ data }: Props): ReactNode {
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
        tCommon("inService"),
        tCommon("needsRepair"),
        tCommon("outOfService"),
      ],
    },
    series: [
      {
        type: "bar",
        data: [
          {
            value: data.inService,
            itemStyle: { color: theme.colors.green[colorIndex] },
          },
          {
            value: data.needsRepair,
            itemStyle: { color: theme.colors.yellow[colorIndex] },
          },
          {
            value: data.outOfService,
            itemStyle: { color: theme.colors.red[colorIndex] },
          },
        ],
      },
    ],
  };

  return <ChartComponent option={options} />;
}
