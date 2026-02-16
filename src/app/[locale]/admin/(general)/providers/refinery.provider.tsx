"use client";
import { PropsWithChildren, ReactNode, useReducer, useState } from "react";

import {
  RefineryContext,
  SelectedRefineryItemType,
} from "@/admin/(general)/contexts/refinery.context";
import { INITIAL_STATE } from "@/admin/(general)/mock/refinery-mock-data";
import RefineryReducer from "@/admin/(general)/reducers/refinery.reducer";

type Props = PropsWithChildren;

const RefineryProvider = ({ children }: Props): ReactNode => {
  const [state, dispatch] = useReducer(RefineryReducer, INITIAL_STATE);
  const [selectedRefineryItemId, setSelectedRefineryItemId] =
    useState<SelectedRefineryItemType>({
      selectedSiteId: "",
      selectedZoneId: "",
      selectedUnitId: "",
    });

  return (
    <RefineryContext
      value={{
        state,
        dispatch,
        selectedRefineryItemId,
        setSelectedRefineryItemId,
      }}
    >
      {children}
    </RefineryContext>
  );
};
export default RefineryProvider;
