import { ResponseDto } from "@/dto/response.dto";

import { DefectSeverityEnum } from "@/enums/defect-severity.enum";
import { EquipmentStatusEnum } from "@/enums/equipment-status.enum";

import { richFetch } from "@/utils/fetch.utils";

export type CreateInspectionRequestDto = {
  equipmentId: string;
  status: EquipmentStatusEnum;
  answers: {
    questionId: string;
    severity: DefectSeverityEnum | null;
    text: string | null;
    picture: string | null;
  }[];
};

export async function createInspectionApi(
  dto: CreateInspectionRequestDto,
): Promise<ResponseDto> {
  return richFetch("/inspections", {
    method: "POST",
    body: JSON.stringify(dto),
  });
}
