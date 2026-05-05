"use client";

import { ReactNode } from "react";

import ReactECharts from "echarts-for-react";

export default function Chart10(): ReactNode {
  let option;

  const data = [
    {
      name: "Grandpa",
      children: [
        {
          name: "Uncle Leo",
          value: 15,
          children: [
            {
              name: "Cousin Jack",
              value: 2,
            },
            {
              name: "Cousin Mary",
              value: 5,
              children: [
                {
                  name: "Jackson",
                  value: 2,
                },
              ],
            },
            {
              name: "Cousin Ben",
              value: 4,
            },
          ],
        },
        {
          name: "Father",
          value: 10,
          children: [
            {
              name: "Me",
              value: 5,
            },
            {
              name: "Brother Peter",
              value: 1,
            },
          ],
        },
      ],
    },
    {
      name: "Nancy",
      children: [
        {
          name: "Uncle Nike",
          children: [
            {
              name: "Cousin Betty",
              value: 1,
            },
            {
              name: "Cousin Jenny",
              value: 2,
            },
          ],
        },
      ],
    },
  ];
  option = {
    series: {
      type: "sunburst",
      data: data,
      radius: [60, "90%"],
      itemStyle: {
        borderRadius: 7,
        borderWidth: 2,
      },
      label: {
        show: false,
      },
    },
  };

  return <ReactECharts option={option} />;
}
