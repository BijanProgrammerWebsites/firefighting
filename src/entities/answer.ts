import { Defect } from "@/entities/defect";
import { Inspection } from "@/entities/inspection";
import { Question } from "@/entities/question";

export type Answer = {
  id: string;
  text: string;
  picture: string | null;
  inspection: Inspection;
  question: Question;
  defect: Defect | null;
};
