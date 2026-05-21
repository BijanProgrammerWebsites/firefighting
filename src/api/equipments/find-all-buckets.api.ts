import { Inspection } from "@/entities/inspection";

import { richFetch } from "@/utils/fetch.utils";

import { ScopeType } from "@/android/(dashboard)/types/scope.type";
import { generateScopeParams } from "@/android/(dashboard)/utils/scope.utils";

export type BucketItem = {
  inspection: Inspection;
  nextInspectionAt: string;
};

export type FindAllBucketsDto = {
  overdue: BucketItem[];
  today: BucketItem[];
  next7Days: BucketItem[];
  next30Days: BucketItem[];
};

export async function findAllBucketsApi(
  scope: ScopeType,
): Promise<FindAllBucketsDto> {
  const data = await richFetch<FindAllBucketsDto>(
    `/equipments/buckets?${generateScopeParams(scope)}`,
  );

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
