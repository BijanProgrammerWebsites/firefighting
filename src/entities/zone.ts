import { Site } from "@/entities/site";
import { Unit } from "@/entities/unit";

export type Zone = {
  id: string;
  position: number;
  title: string;
  site: Site;
  units: Unit[];
};
