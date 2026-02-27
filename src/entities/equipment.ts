import { Inspection } from "@/entities/inspection";
import { Template } from "@/entities/template";
import { Unit } from "@/entities/unit";

export type Equipment = {
  id: string;
  position: number;
  title: string;
  template: Template;
  inspections: Inspection[];
  unit: Unit;
};
