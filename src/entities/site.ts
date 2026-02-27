import { Refinery } from "@/entities/refinery";
import { Zone } from "@/entities/zone";

export type Site = {
  id: string;
  position: number;
  title: string;
  refinery: Refinery;
  zones: Zone[];
};
