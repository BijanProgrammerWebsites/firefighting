"use client";
import { PropsWithChildren, ReactNode, useState } from "react";

import { RefineryGeneralFormContext } from "@/admin/(general)/contexts/refinery-general-form-context";

type Props = PropsWithChildren;

const RefineryGeneralFormProvider = ({ children }: Props): ReactNode => {
  const [selectedSiteId, setSelectedSiteIdState] = useState("");
  const [selectedZoneId, setSelectedZoneIdState] = useState("");
  const [selectedUnitId, setSelectedUnitIdState] = useState("");

  const setSelectedSiteId = (newSiteId: string): void => {
    if (newSiteId !== selectedSiteId) {
      setSelectedZoneIdState("");
      setSelectedUnitIdState("");
    }
    setSelectedSiteIdState(newSiteId);
  };

  const setSelectedZoneId = (newZoneId: string): void => {
    if (newZoneId !== selectedZoneId) {
      setSelectedUnitIdState(""); // پاک کردن یونیت
    }
    setSelectedZoneIdState(newZoneId);
  };

  const setSelectedUnitId = setSelectedUnitIdState;

  return (
    <RefineryGeneralFormContext
      value={{
        selectedSiteId,
        setSelectedSiteId,
        selectedZoneId,
        setSelectedZoneId,
        selectedUnitId,
        setSelectedUnitId,
      }}
    >
      {children}
    </RefineryGeneralFormContext>
  );
};

export default RefineryGeneralFormProvider;
