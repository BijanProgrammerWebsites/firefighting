"use client";
import { ReactNode, use } from "react";

import { useTranslations } from "next-intl";

import { ListBoxComponent } from "@/admin/(general)/components/refinery-form/components/site-management/components/list-box/list-box.component";
import { RefineryGeneralFormContext } from "@/admin/(general)/contexts/refinery-general-form-context";

import styles from "./site-management.module.css";

export default function SiteManagementComponent(): ReactNode {
  const t = useTranslations("AdminGeneralPage");
  const { state, dispatch, selectedRefineryItemId, setSelectedRefineryItemId } =
    use(RefineryGeneralFormContext);

  const { selectedSiteId, selectedZoneId, selectedUnitId } =
    selectedRefineryItemId;

  const sites = state.sites;

  const selectedSite = sites.find((site) => site.id === selectedSiteId);
  const zones = selectedSite?.zones ?? [];

  const selectedZone = zones.find((zone) => zone.id === selectedZoneId);
  const units = selectedZone?.units ?? [];

  const zoneMessage = !selectedSiteId
    ? t("selectSite")
    : zones.length === 0
      ? t("noZones")
      : undefined;

  const unitMessage = !selectedZoneId
    ? t("selectZone")
    : units.length === 0
      ? t("noUnits")
      : undefined;

  return (
    <div className={styles["site-management"]}>
      <ListBoxComponent
        items={sites}
        title={t("sites")}
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
        title={t("zones")}
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
        title={t("units")}
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
