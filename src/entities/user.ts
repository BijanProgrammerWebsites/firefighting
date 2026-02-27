import { RoleEnum } from "@/enums/role.enum";

export type User = {
  id: number;
  username: string;
  password: string;
  role: RoleEnum;
};

export type PasswordlessUser = Omit<User, "password">;
