import { UserRole, UserType } from "./type.model";

export type User = {
  id: string;
  createAt: Date;
  updateAt: Date;
  email: string;
  password: string;
  title: string;
  firstName: string;
  lastName: string;
  phone: string;
  picture: string;
  idCard: string;
  addressNumber: string;
  moo: string;
  road: string;
  tambon: string;
  amphure: string;
  province: string;
  postalCode: string;
  nationality: string;
  role: UserRole;
  type: UserType;
  faculty?: string;
  passwordResetToken: string;
  passwordResetTokenExpiresAt: Date;
  isDeleted: boolean;
};
