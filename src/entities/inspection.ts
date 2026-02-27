import { StatusEnum } from "@/enums/status.enum";

import { Answer } from "@/entities/answer";
import { Equipment } from "@/entities/equipment";

export type Inspection = {
  id: string;
  status: StatusEnum;
  score: number;
  createdDate: string;
  updatedDate: string;
  equipment: Equipment;
  answers: Answer[];
};
