import { ReactNode, use } from "react";

import { useTranslations } from "next-intl";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { createSiteApi } from "@/api/sites/create-site.api";
import { editSiteApi } from "@/api/sites/edit-site.api";
import { findAllSitesApi } from "@/api/sites/find-all-sites.api";
import { removeSiteApi } from "@/api/sites/remove-site.api";

import { siteKeys } from "@/queries/keys";

import { ListBoxComponent } from "@/admin/(general)/components/refinery-form/components/site-management/components/list-box/list-box.component";
import { RefineryGeneralFormContext } from "@/admin/(general)/contexts/refinery-general-form-context";
import { ListItemType } from "@/admin/(general)/types/list-item.type";

import styles from "./site-list-box.module.css";

export default function SiteListBoxComponent(): ReactNode {
  const t = useTranslations("AdminGeneralPage");
  const { selectedSiteId, setSelectedSiteId } = use(RefineryGeneralFormContext);
  const queryClient = useQueryClient();

  const { isPending, data } = useQuery({
    queryKey: siteKeys.all,
    queryFn: findAllSitesApi,
  });

  const { mutateAsync: createSite } = useMutation({
    mutationKey: siteKeys.create,
    mutationFn: createSiteApi,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: siteKeys.all });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const { mutateAsync: editSite } = useMutation({
    mutationKey: siteKeys.edit,
    mutationFn: editSiteApi,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: siteKeys.all });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const { mutateAsync: deleteSite } = useMutation({
    mutationKey: siteKeys.remove,
    mutationFn: removeSiteApi,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: siteKeys.all });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleRemove = async (item: ListItemType): Promise<void> => {
    await deleteSite(item.id);
    if (selectedSiteId === item.id) {
      setSelectedSiteId("");
    }
  };

  const sites: ListItemType[] =
    data?.map((item) => ({ id: item.id, name: item.title })) ?? [];

  return (
    <div className={styles["site-list-box"]}>
      <ListBoxComponent
        items={sites}
        isLoading={isPending}
        title={t("sites")}
        onAdd={async (name) => await createSite({ title: name })}
        onRemove={handleRemove}
        onEdit={async (item) =>
          await editSite({ id: item.id, title: item.name })
        }
        onSelect={(id) => setSelectedSiteId(id)}
        selectedItemId={selectedSiteId}
      />
    </div>
  );
}
