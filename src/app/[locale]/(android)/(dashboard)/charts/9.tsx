"use client";

import { ReactNode } from "react";

import ReactECharts from "echarts-for-react";

import data from "../data/echarts-package-size.json";

export default function Chart9(): ReactNode {
  let option;

  const treemapOption = {
    series: [
      {
        type: "treemap",
        id: "echarts-package-size",
        animationDurationUpdate: 1000,
        roam: false,
        nodeClick: undefined,
        data: data.children,
        universalTransition: true,
        label: {
          show: true,
        },
        breadcrumb: {
          show: false,
        },
      },
    ],
  };
  const sunburstOption = {
    series: [
      {
        type: "sunburst",
        id: "echarts-package-size",
        radius: ["20%", "90%"],
        animationDurationUpdate: 1000,
        nodeClick: undefined,
        data: data.children,
        universalTransition: true,
        itemStyle: {
          borderWidth: 1,
          borderColor: "rgba(255,255,255,.5)",
        },
        label: {
          show: false,
        },
      },
    ],
  };
  // let currentOption = treemapOption;
  // myChart.setOption(currentOption);
  // setInterval(function () {
  //   currentOption =
  //     currentOption === treemapOption ? sunburstOption : treemapOption;
  //   myChart.setOption(currentOption);
  // }, 3000);

  option = treemapOption;

  return <ReactECharts option={option} />;
}
