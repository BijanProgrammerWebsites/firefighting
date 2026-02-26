import { Role } from "@/types/role.type";

export type User = {
  id: number;
  username: string;
  password: string;
  role: Role;
};

export type PasswordlessUser = Omit<User, "password">;
