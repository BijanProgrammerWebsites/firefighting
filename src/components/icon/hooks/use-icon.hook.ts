import { ExtendedIconifyIcon } from "@iconify/types";
import { getIconData } from "@iconify/utils";

import { icons as solarIcons } from "@iconify-json/solar";
import { icons as tablerIcons } from "@iconify-json/tabler";

import { IconCollection } from "@/components/icon/types/icon-collection.type";

export function useIconHook(
  collection: IconCollection,
  name: string,
): ExtendedIconifyIcon | null {
  switch (collection) {
    case "solar":
      return getIconData(solarIcons, name);
    case "tabler":
      return getIconData(tablerIcons, name);
    default:
      return null;
  }
}
