"use client";

import { ReactNode } from "react";

import ReactECharts from "echarts-for-react";

export default function Chart6(): ReactNode {
  let option;

  option = {
    series: [
      {
        type: "treemap",
        data: [
          {
            name: "nodeA",
            value: 10,
            children: [
              {
                name: "nodeAa",
                value: 4,
              },
              {
                name: "nodeAb",
                value: 6,
              },
            ],
          },
          {
            name: "nodeB",
            value: 20,
            children: [
              {
                name: "nodeBa",
                value: 20,
                children: [
                  {
                    name: "nodeBa1",
                    value: 20,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  return <ReactECharts option={option} />;
}
