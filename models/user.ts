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
  passwordResetToken: string;
  passwordResetTokenExpiresAt: Date;
  isDeleted: boolean;
};

export type UserRole = "ADMIN" | "USER";
export type UserType = "EXTERNAL" | "INTERNAL";
