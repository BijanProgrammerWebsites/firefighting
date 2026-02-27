import { Answer } from "@/entities/answer";
import { Equipment } from "@/entities/equipment";

import { Status } from "@/types/status.type";

export type Inspection = {
  id: string;
  status: Status;
  score: number;
  createdDate: string;
  updatedDate: string;
  equipment: Equipment;
  answers: Answer[];
};
