import { Answer } from "@/entities/answer";
import { Equipment } from "@/entities/equipment";

export type Inspection = {
  id: string;
  createdDate: Date;
  updatedDate: Date;
  equipment: Equipment;
  answers: Answer[];
};
