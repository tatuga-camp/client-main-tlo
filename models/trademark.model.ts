import { PersonStatusOptions } from "../data/trademark";
import {
  DocumentType,
  StatusLists,
  StatusPartner,
  UserType,
} from "./type.model";

export type Trademark = {
  id: string;
  createAt: Date;
  updateAt: Date;
  personStatus: PersonStatusOptions | null;
  title: string | null;
  fullName: string | null;
  firstName: string | null;
  lastName: string | null;
  idCard: string | null;
  addressNumber: string | null;
  moo: string | null;
  road: string | null;
  tambon: string | null;
  amphure: string | null;
  province: string | null;
  phone: string | null;
  postalCode: string | null;
  nationality: string | null;
  email: string | null;
  career: string | null;
  authorizedPerson?: string | null;
  passPort?: string | null;
  numberRequest?: string | null;
  titleTrademark: string;
  trademarkType: string;
  country?: string;
  pronunciation: string;
  meaning: string;
  productDetail: string;
  otopType: string;
  otopNumber: string;
  allowColorProtection: string;
  colorProtectionDetail: string;
  allowShapeProtection: string;
  allowMarketing: string;
  allowPublic: string;
  userType: UserType;
  requestDate?: string;
  isComplete: boolean;
  userId: string;
  order: number;
};

export type StatusTrademark = {
  id: string;
  createAt: string;
  updateAt: string;
  title: string;
  status: StatusLists;
  note: string;
  order: number;
  userId: string;
  trademarkId: string;
};

export type PartnerInfoOnTrademark = {
  id: string;
  createAt: Date;
  updateAt: Date;
  personStatus?: string;
  title?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  idCard?: string;
  addressNumber?: string;
  moo?: string;
  road?: string;
  tambon?: string;
  amphure?: string;
  province?: string;
  phone?: string;
  postalCode?: string;
  nationality?: string;
  email?: string;
  career?: string;
  authorizedPerson?: string;
  country?: string;
  passPort?: string;
  trademarkId: string;
  userId: string;
};

export type FileOnTrademark = {
  id: string;
  createAt: Date;
  updateAt: Date;
  documentType: DocumentType;
  type: string;
  url: string;
  size: number;
  trademarkId: string;
  userId: string;
};
