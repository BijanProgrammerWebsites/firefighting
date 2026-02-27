"use client";
import { ReactNode } from "react";

import SiteListBoxComponent from "@/admin/(general)/components/refinery-form/components/site-management/components/site-list-box/site-list-box.component";
import UnitListBoxComponent from "@/admin/(general)/components/refinery-form/components/site-management/components/unit-list-box/unit-list-box.component";
import ZoneListBoxComponent from "@/admin/(general)/components/refinery-form/components/site-management/components/zone-list-box/zone-list-box.component";

import styles from "./site-management.module.css";

export default function SiteManagementComponent(): ReactNode {
  return (
    <div className={styles["site-management"]}>
      <SiteListBoxComponent />
      <ZoneListBoxComponent />
      <UnitListBoxComponent />
    </div>
  );
}
