"use client";
import { PropsWithChildren, ReactNode, useReducer, useState } from "react";

import {
  RefineryGeneralFormContext,
  SelectedRefineryItemType,
} from "@/admin/(general)/contexts/refinery-general-form-context";
import { INITIAL_STATE } from "@/admin/(general)/mock/refinery-mock-data";
import RefineryReducer from "@/admin/(general)/reducers/refinery.reducer";

type Props = PropsWithChildren;

const RefineryGeneralFormProvider = ({ children }: Props): ReactNode => {
  const [state, dispatch] = useReducer(RefineryReducer, INITIAL_STATE);
  const [selectedRefineryItemId, setSelectedRefineryItemId] =
    useState<SelectedRefineryItemType>({
      selectedSiteId: "",
      selectedZoneId: "",
      selectedUnitId: "",
    });

  return (
    <RefineryGeneralFormContext
      value={{
        state,
        dispatch,
        selectedRefineryItemId,
        setSelectedRefineryItemId,
      }}
    >
      {children}
    </RefineryGeneralFormContext>
  );
};
export default RefineryGeneralFormProvider;
