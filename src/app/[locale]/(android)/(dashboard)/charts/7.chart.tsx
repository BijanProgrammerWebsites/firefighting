"use client";

import { ReactNode } from "react";

import * as echarts from "echarts";
import ReactECharts from "echarts-for-react";

import data from "../data/disk.tree.json";

export default function Chart7(): ReactNode {
  let option;

  function getLevelOption() {
    return [
      {
        itemStyle: {
          borderColor: "#777",
          borderWidth: 0,
          gapWidth: 1,
        },
        upperLabel: {
          show: false,
        },
      },
      {
        itemStyle: {
          borderColor: "#555",
          borderWidth: 5,
          gapWidth: 1,
        },
        emphasis: {
          itemStyle: {
            borderColor: "#ddd",
          },
        },
      },
      {
        colorSaturation: [0.35, 0.5],
        itemStyle: {
          borderWidth: 5,
          gapWidth: 1,
          borderColorSaturation: 0.6,
        },
      },
    ];
  }

  option = {
    title: {
      text: "Disk Usage",
      left: "center",
    },
    tooltip: {
      formatter: function (info) {
        const value = info.value;
        const treePathInfo = info.treePathInfo;
        const treePath = [];
        for (let i = 1; i < treePathInfo.length; i++) {
          treePath.push(treePathInfo[i].name);
        }
        return [
          '<div class="tooltip-title">' +
            echarts.format.encodeHTML(treePath.join("/")) +
            "</div>",
          "Disk Usage: " + echarts.format.addCommas(value) + " KB",
        ].join("");
      },
    },
    series: [
      {
        name: "Disk Usage",
        type: "treemap",
        visibleMin: 300,
        label: {
          show: true,
          formatter: "{b}",
        },
        upperLabel: {
          show: true,
          height: 30,
        },
        itemStyle: {
          borderColor: "#fff",
        },
        levels: getLevelOption(),
        data: data,
      },
    ],
  };

  return <ReactECharts option={option} />;
}
