import { AccessLevelType } from "@/admin/users/types/access-level.type";

export type UserType = {
  id: number;
  username: string;
  password: string;
  role: AccessLevelType;
};
