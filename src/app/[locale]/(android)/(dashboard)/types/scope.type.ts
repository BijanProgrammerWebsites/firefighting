import { Site } from "@/entities/site";
import { Unit } from "@/entities/unit";
import { Zone } from "@/entities/zone";

export type ScopeType = {
  site?: Site;
  zone?: Zone;
  unit?: Unit;
};
