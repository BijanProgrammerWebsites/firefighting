import { Answer } from "@/entities/answer";
import { Equipment } from "@/entities/equipment";

import { DefectSeverityEnum } from "@/enums/defect-severity.enum";
import { DefectStatusEnum } from "@/enums/defect-status.enum";
import { MaintenanceStatusEnum } from "@/enums/maintenance-status.enum";

export type Defect = {
  id: string;
  title: string | null;
  description: string | null;
  severity: DefectSeverityEnum;
  status: DefectStatusEnum;
  maintenanceStatus: MaintenanceStatusEnum;
  equipment: Equipment;
  answer: Answer;
  createdDate: string;
  updatedDate: string;
};
