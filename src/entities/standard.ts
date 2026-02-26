import { Question } from "@/entities/question";

export type Standard = {
  id: string;
  title: string;
  questions: Question[];
};
