"use client";
import { Dispatch, SetStateAction, createContext } from "react";

import { RefineryActionType } from "@/admin/(general)/reducers/refinery.reducer";
import RefineryType from "@/admin/(general)/types/refinery.type";

export type SelectedRefineryItemType = {
  selectedSiteId: string;
  selectedZoneId: string;
  selectedUnitId: string;
};

type ContextType = {
  state: RefineryType;
  dispatch: Dispatch<RefineryActionType>;
  selectedRefineryItemId: SelectedRefineryItemType;
  setSelectedRefineryItemId: Dispatch<SetStateAction<SelectedRefineryItemType>>;
};
export const RefineryContext = createContext<ContextType>({
  state: { name: "", logo: "", sites: [] },
  dispatch: () => {},
  selectedRefineryItemId: {
    selectedSiteId: "",
    selectedUnitId: "",
    selectedZoneId: "",
  },
  setSelectedRefineryItemId: () => {},
});
