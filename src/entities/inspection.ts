import { Answer } from "@/entities/answer";
import { Equipment } from "@/entities/equipment";

import { EquipmentStatusEnum } from "@/enums/equipment-status.enum";

export type Inspection = {
  id: string;
  status: EquipmentStatusEnum;
  createdDate: string;
  equipment: Equipment;
  answers: Answer[];
};
