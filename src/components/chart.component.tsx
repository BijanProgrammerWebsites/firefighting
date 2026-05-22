import type { ReactNode } from "react";

import { Vazirmatn } from "next/font/google";

import { EChartsOption } from "echarts";
import EChartsReact, { EChartsReactProps } from "echarts-for-react";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
});

type Props = EChartsReactProps;

export default function ChartComponent({
  option,
  ...otherProps
}: Props): ReactNode {
  const options: EChartsOption = {
    textStyle: {
      fontFamily: vazirmatn.style.fontFamily,
    },
    ...option,
  };

  return <EChartsReact option={options} {...otherProps} />;
}
