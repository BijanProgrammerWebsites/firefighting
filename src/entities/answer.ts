import { Inspection } from "@/entities/inspection";
import { Question } from "@/entities/question";

import { Status } from "@/types/status.type";

export type Answer = {
  id: string;
  status: Status;
  text: string;
  picture: string | null;
  inspection: Inspection;
  question: Question;
};
