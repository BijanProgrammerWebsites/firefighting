import { Answer } from "@/entities/answer";
import { Equipment } from "@/entities/equipment";

import { StatusEnum } from "@/enums/status.enum";

export type Inspection = {
  id: string;
  status: StatusEnum;
  score: number;
  createdDate: string;
  updatedDate: string;
  equipment: Equipment;
  answers: Answer[];
};
