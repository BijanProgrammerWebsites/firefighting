"use client";
import { Dispatch, SetStateAction, createContext } from "react";

type ContextType = {
  selectedSiteId: string;
  setSelectedSiteId: (selectedSiteId: string) => void;
  selectedZoneId: string;
  setSelectedZoneId: (selectedZoneId: string) => void;
  selectedUnitId: string;
  setSelectedUnitId: Dispatch<SetStateAction<string>>;
};

export const RefineryGeneralFormContext = createContext<ContextType>({
  selectedSiteId: "",
  setSelectedSiteId: () => {},
  selectedZoneId: "",
  setSelectedZoneId: () => {},
  selectedUnitId: "",
  setSelectedUnitId: () => {},
});
