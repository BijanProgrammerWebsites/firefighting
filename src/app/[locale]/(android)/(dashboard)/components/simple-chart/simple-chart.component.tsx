"use client";

import { ReactNode } from "react";

import ReactECharts from "echarts-for-react";

export default function SimpleChartComponent(): ReactNode {
  const option = {
    title: {
      text: "Title",
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    series: [
      {
        name: "Series 1",
        type: "pie",
        data: [120, 80, 160],
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 400 }} />;
}
