import { StatusEnum } from "@/enums/status.enum";

import { Inspection } from "@/entities/inspection";
import { Question } from "@/entities/question";

export type Answer = {
  id: string;
  status: StatusEnum;
  text: string;
  picture: string | null;
  inspection: Inspection;
  question: Question;
};
