import { Role } from "@/types/role.type";

export class User {
  public id!: number;
  public username!: string;
  public password!: string;
  public role!: Role;
}

export type PasswordlessUser = Omit<User, "password">;
