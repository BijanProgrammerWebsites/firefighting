import { Equipment } from "@/entities/equipment";
import { Inspection } from "@/entities/inspection";

import { richFetch } from "@/utils/fetch.utils";

export type BucketItem = {
  equipment: Equipment;
  lastInspection: Inspection | null;
  nextInspectionAt: string | null;
};

export type FindAllBucketsDto = {
  withoutHistory: BucketItem[];
  overdue: BucketItem[];
  today: BucketItem[];
  next7Days: BucketItem[];
  next30Days: BucketItem[];
};

export async function findAllBucketsApi(): Promise<FindAllBucketsDto> {
  const data = await richFetch<FindAllBucketsDto>("/equipments/buckets");

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
