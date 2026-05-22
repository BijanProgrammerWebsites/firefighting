import { ReactNode, use } from "react";

import { useTranslations } from "next-intl";

import { Box } from "@mantine/core";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { findOneSiteApi } from "@/api/sites/find-one-site.api";
// دریافت سایت با زون‌هایش
import { createZoneApi } from "@/api/zones/create-zone.api";
import { editZoneApi } from "@/api/zones/edit-zone.api";
import { removeZoneApi } from "@/api/zones/remove-zone.api";

import { siteKeys, zoneKeys } from "@/queries/keys";

// siteKeys.one تعریف شده است
import { ListBoxComponent } from "@/admin/(general)/components/list-box.component";
import { RefineryGeneralFormContext } from "@/admin/(general)/contexts/refinery-general-form-context";
import { ListItemType } from "@/admin/(general)/types/list-item.type";

export default function ZoneListBoxComponent(): ReactNode {
  const t = useTranslations("AdminGeneralPage");
  const { selectedSiteId, selectedZoneId, setSelectedZoneId } = use(
    RefineryGeneralFormContext,
  );
  const queryClient = useQueryClient();

  const { isLoading, data: site } = useQuery({
    queryKey: siteKeys.one(selectedSiteId!),
    queryFn: () => findOneSiteApi(selectedSiteId!),
    enabled: !!selectedSiteId,
  });

  const zones = site?.zones ?? [];

  const { mutateAsync: createZone } = useMutation({
    mutationKey: zoneKeys.create,
    mutationFn: createZoneApi,
    onSuccess: async (data): Promise<void> => {
      toast.success(data.message);
      if (selectedSiteId) {
        await queryClient.invalidateQueries({
          queryKey: siteKeys.one(selectedSiteId),
        });
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutateAsync: editZone } = useMutation({
    mutationKey: zoneKeys.edit,
    mutationFn: editZoneApi,
    onSuccess: async (data): Promise<void> => {
      toast.success(data.message);
      if (selectedSiteId) {
        await queryClient.invalidateQueries({
          queryKey: siteKeys.one(selectedSiteId),
        });
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutateAsync: deleteZone } = useMutation({
    mutationKey: zoneKeys.remove,
    mutationFn: removeZoneApi,
    onSuccess: async (data): Promise<void> => {
      toast.success(data.message);
      if (selectedSiteId) {
        await queryClient.invalidateQueries({
          queryKey: siteKeys.one(selectedSiteId),
        });
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleAdd = async (name: string): Promise<void> => {
    if (!selectedSiteId) return;
    await createZone({ siteId: selectedSiteId, title: name });
  };

  const handleRemove = async (item: ListItemType): Promise<void> => {
    await deleteZone(item.id);
    if (selectedZoneId === item.id) {
      setSelectedZoneId("");
    }
  };

  const zoneItems: ListItemType[] = zones.map((zone) => ({
    id: zone.id,
    name: zone.title,
  }));

  const zoneMessage = !selectedSiteId
    ? t("selectSite")
    : zones.length === 0 && !isLoading
      ? t("noZones")
      : undefined;

  return (
    <Box>
      <ListBoxComponent
        items={zoneItems}
        isLoading={isLoading}
        messages={zoneMessage}
        addIconDisable={!selectedSiteId}
        title={t("zones")}
        onAdd={handleAdd}
        onRemove={handleRemove}
        onEdit={async (item) =>
          await editZone({ id: item.id, title: item.name })
        }
        onSelect={(id) => setSelectedZoneId(id)}
        selectedItemId={selectedZoneId}
      />
    </Box>
  );
}
