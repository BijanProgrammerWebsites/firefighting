import { Equipment } from "@/entities/equipment";
import { Zone } from "@/entities/zone";

export type Unit = {
  id: string;
  position: number;
  title: string;
  zone: Zone;
  equipments: Equipment[];
};
