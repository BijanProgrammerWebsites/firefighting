import { Site } from "@/entities/site";

export type Refinery = {
  id: string;
  title: string;
  picture: string | null;
  sites: Site[];
};
