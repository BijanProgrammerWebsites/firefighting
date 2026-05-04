import { RoleEnum } from "@/enums/role.enum";

export type User = {
  id: string;
  username: string;
  password: string;
  role: RoleEnum;
};

export type SafeUser = Omit<User, "password">;
