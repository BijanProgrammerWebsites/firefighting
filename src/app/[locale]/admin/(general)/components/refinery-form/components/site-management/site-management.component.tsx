"use client";
import { ReactNode, use } from "react";

import { ListBoxComponent } from "@/admin/(general)/components/refinery-form/components/site-management/components/list-box/list-box.component";
import { RefineryContext } from "@/admin/(general)/contexts/refinery.context";

import styles from "./site-management.module.css";

export default function SiteManagementComponent(): ReactNode {
  const { state, dispatch, selectedRefineryItemId, setSelectedRefineryItemId } =
    use(RefineryContext);

  const { selectedSiteId, selectedZoneId, selectedUnitId } =
    selectedRefineryItemId;

  const sites = state.sites;

  const selectedSite = sites.find((site) => site.id === selectedSiteId);
  const zones = selectedSite?.zones ?? [];

  const selectedZone = zones.find((zone) => zone.id === selectedZoneId);
  const units = selectedZone?.units ?? [];

  const zoneMessage = !selectedSiteId
    ? "لطفا یک سایت انتخاب کنید"
    : zones.length === 0
      ? "هیچ زونی وجود ندارد"
      : undefined;

  const unitMessage = !selectedZoneId
    ? "لطفا یک زون انتخاب کنید"
    : units.length === 0
      ? "هیچ واحدی وجود ندارد"
      : undefined;

  return (
    <div className={styles["site-management"]}>
      <ListBoxComponent
        items={sites}
        title="سایت‌ها"
        onAdd={(name) => {
          dispatch({ type: "added_site", payload: name });
        }}
        onRemove={(item) => {
          dispatch({ type: "deleted_site", payload: item.id });
        }}
        onEdit={(item) => {
          dispatch({ type: "updated_site", payload: item });
        }}
        onSelect={(id) => {
          setSelectedRefineryItemId({
            selectedSiteId: id,
            selectedZoneId: "",
            selectedUnitId: "",
          });
        }}
        selectedItemId={selectedSiteId}
      />

      <ListBoxComponent
        items={zones}
        messages={zoneMessage}
        addIconDisable={!selectedSiteId}
        title="زون‌ها"
        onAdd={(name) => {
          dispatch({
            type: "added_zone",
            payload: { siteId: selectedSiteId, name },
          });
        }}
        onRemove={(item) => {
          dispatch({ type: "deleted_zone", payload: item.id });
        }}
        onEdit={(item) => {
          dispatch({ type: "updated_zone", payload: item });
        }}
        onSelect={(id) => {
          setSelectedRefineryItemId({
            ...selectedRefineryItemId,
            selectedZoneId: id,
            selectedUnitId: "",
          });
        }}
        selectedItemId={selectedZoneId}
      />

      <ListBoxComponent
        items={units}
        messages={unitMessage}
        addIconDisable={!selectedZoneId}
        title="واحدها"
        onAdd={(name) => {
          dispatch({
            type: "added_unit",
            payload: { zoneId: selectedZoneId, name },
          });
        }}
        onRemove={(item) => {
          dispatch({ type: "deleted_unit", payload: item.id });
        }}
        onEdit={(item) => {
          dispatch({ type: "updated_unit", payload: item });
        }}
        onSelect={(id) => {
          setSelectedRefineryItemId({
            ...selectedRefineryItemId,
            selectedUnitId: id,
          });
        }}
        selectedItemId={selectedUnitId}
      />
    </div>
  );
}
