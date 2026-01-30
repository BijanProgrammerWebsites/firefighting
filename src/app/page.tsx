import { ReactNode } from "react";

import { Text } from "@mantine/core";

import styles from "./page.module.css";

export default function Home(): ReactNode {
  return (
    <div className={styles.home}>
      <Text>سلام رفیق!</Text>
    </div>
  );
}
