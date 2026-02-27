import { ReactNode, use } from "react";

import { useTranslations } from "next-intl";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { createUnitApi } from "@/api/units/create-unit.api";
import { editUnitApi } from "@/api/units/edit-unit.api";
import { removeUnitApi } from "@/api/units/remove-unit.api";
import { findOneZoneApi } from "@/api/zones/find-one-zone.api";

import { unitKeys, zoneKeys } from "@/queries/keys";

import { ListBoxComponent } from "@/admin/(general)/components/refinery-form/components/site-management/components/list-box/list-box.component";
import { RefineryGeneralFormContext } from "@/admin/(general)/contexts/refinery-general-form-context";
import { ListItemType } from "@/admin/(general)/types/list-item.type";

import styles from "./unit-list-box.module.css";

export default function UnitListBoxComponent(): ReactNode {
  const t = useTranslations("AdminGeneralPage");
  const { selectedZoneId, selectedUnitId, setSelectedUnitId } = use(
    RefineryGeneralFormContext,
  );
  const queryClient = useQueryClient();

  // دریافت zone به همراه units آن (فقط زمانی که zone انتخاب شده باشد)
  const { isLoading, data: zone } = useQuery({
    queryKey: zoneKeys.one(selectedZoneId!),
    queryFn: () => findOneZoneApi(selectedZoneId!),
    enabled: !!selectedZoneId,
  });

  const units = zone?.units ?? [];

  const { mutateAsync: createUnit } = useMutation({
    mutationKey: unitKeys.create,
    mutationFn: createUnitApi,
    onSuccess: (data) => {
      toast.success(data.message);
      if (selectedZoneId) {
        queryClient.invalidateQueries({
          queryKey: zoneKeys.one(selectedZoneId),
        });
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutateAsync: editUnit } = useMutation({
    mutationKey: unitKeys.edit,
    mutationFn: editUnitApi,
    onSuccess: (data) => {
      toast.success(data.message);
      if (selectedZoneId) {
        queryClient.invalidateQueries({
          queryKey: zoneKeys.one(selectedZoneId),
        });
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutateAsync: deleteUnit } = useMutation({
    mutationKey: unitKeys.remove,
    mutationFn: removeUnitApi,
    onSuccess: (data) => {
      toast.success(data.message);
      if (selectedZoneId) {
        queryClient.invalidateQueries({
          queryKey: zoneKeys.one(selectedZoneId),
        });
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleAdd = async (name: string): Promise<void> => {
    if (!selectedZoneId) return;
    await createUnit({ zoneId: selectedZoneId, title: name });
  };

  const handleRemove = async (item: ListItemType): Promise<void> => {
    await deleteUnit(item.id);
    if (selectedUnitId === item.id) {
      setSelectedUnitId("");
    }
  };

  const unitItems: ListItemType[] = units.map((unit) => ({
    id: unit.id,
    name: unit.title,
  }));

  const unitMessage = !selectedZoneId
    ? t("selectZone")
    : units.length === 0 && !isLoading
      ? t("noUnits")
      : undefined;

  return (
    <div className={styles["unit-list-box"]}>
      <ListBoxComponent
        items={unitItems}
        isLoading={isLoading}
        messages={unitMessage}
        addIconDisable={!selectedZoneId}
        title={t("units")}
        onAdd={handleAdd}
        onRemove={handleRemove}
        onEdit={async (item) =>
          await editUnit({ id: item.id, title: item.name })
        }
        onSelect={(id) => setSelectedUnitId(id)}
        selectedItemId={selectedUnitId}
      />
    </div>
  );
}
