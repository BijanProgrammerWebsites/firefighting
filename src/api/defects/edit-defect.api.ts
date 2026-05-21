import { ResponseDto } from "@/dto/response.dto";

import { DefectSeverityEnum } from "@/enums/defect-severity.enum";
import { DefectStatusEnum } from "@/enums/defect-status.enum";
import { MaintenanceStatusEnum } from "@/enums/maintenance-status.enum";

import { z } from "@/lib/zod";

import { richFetch } from "@/utils/fetch.utils";

export const CreateDefectSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  severity: z.enum(DefectSeverityEnum),
  status: z.enum(DefectStatusEnum),
  maintenanceStatus: z.enum(MaintenanceStatusEnum),
});

export type CreateDefectRequestDto = z.infer<typeof CreateDefectSchema>;

export type EditDefectRequestDto = CreateDefectRequestDto & {
  id: string;
};

export async function editDefectApi({
  id,
  ...dto
}: EditDefectRequestDto): Promise<ResponseDto> {
  return richFetch(`/defects/${id}`, {
    method: "PATCH",
    body: JSON.stringify(dto),
  });
}
