import { Equipment } from "@/entities/equipment";
import { Standard } from "@/entities/standard";

export type Template = {
  id: string;
  title: string;
  description: string;
  inspectionPeriod: number;
  standard: Standard;
  equipments: Equipment[];
};
