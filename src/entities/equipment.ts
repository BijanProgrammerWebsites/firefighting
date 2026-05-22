import { Defect } from "@/entities/defect";
import { Inspection } from "@/entities/inspection";
import { Template } from "@/entities/template";
import { Unit } from "@/entities/unit";

import { EquipmentStatusEnum } from "@/enums/equipment-status.enum";

export type Equipment = {
  id: string;
  position: number;
  title: string;
  status: EquipmentStatusEnum;
  template: Template;
  inspections: Inspection[];
  defects: Defect[];
  unit: Unit;
};
