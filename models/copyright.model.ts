import {
  IsMarketingLists,
  SignedDocumentDetailLists,
  TranferPermissionDurationOptions,
  TranferPermissionOptions,
  TranferPermissionQualityOptions,
  WorkQualityOptions,
} from "../data/copyright";
import { ResearchOwnershipSubmission } from "../data/invention";
import {
  DocumentType,
  FileWorkType,
  StatusLists,
  UserType,
} from "./type.model";

export type Copyright = {
  id: string;
  createAt: string;
  updateAt: string;
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
  isComplete: boolean;
  userType: UserType;
  requestDate?: string;
  numberRequest?: string;
  userId: string;
  order: number;
};

export type StatusCopyright = {
  id: string;
  createAt: string;
  updateAt: string;
  title: string;
  status: StatusLists;
  note: string;
  order: number;
  userId: string;
  copyrightId: string;
};

export type PartnerInfoOnCopyright = {
  id: string;
  createAt: string;
  updateAt: string;
  email: string;
  title: string;
  firstName: string;
  lastName: string;
  idCard: string;
  addressNumber: string;
  moo: string;
  road: string;
  tambon: string;
  amphure: string;
  province: string;
  postalCode: string;
  phone: string;
  faculty: string;
  participationRate: number;
  copyrightId: string;
  userId: string;
};

export type WorkInfoOnCopyright = {
  id: string;
  createAt: string;
  updateAt: string;
  name: string;
  workType: string;
  finishWorkAt?: string;
  workQuality?: WorkQualityOptions;
  workQualityPartDetail?: string;
  hireWork?: string;
  otherWorkQuality?: string;
  benefit?: string[];
  otherBenefit?: string;
  funding?: string;
  sourceFunding?: string;
  yearFunding?: string;
  researchOwnershipSubmission?: ResearchOwnershipSubmission;
  typeAccessibleMedia?: string;
  signedDocument?: SignedDocumentDetailLists;
  signedDocumentDetail?: string;
  isMarketing?: IsMarketingLists;
  marketingDate?: string;
  marketingCountry?: string;
  tranferPermission?: TranferPermissionOptions;
  tranferPermissionDetail?: string;
  tranferPermissionDate?: string;
  tranferPermissionQuality?: TranferPermissionQualityOptions;
  tranferPermissionQualityDetail?: string;
  tranferPermissionDuration?: TranferPermissionDurationOptions;
  tranferPermissionDurationDetail?: string;
  workDescription?: string;
  isComplete: boolean;
  copyrightId: string;
  userId: string;
};

export type FileWorkInfoOnCopyright = {
  id: string;
  createAt: string;
  updateAt: string;
  type: string;
  url: string;
  size: number;
  name: FileWorkType;

  copyrightId: string;
  workInfoOnCopyrightId: string;
  userId: string;
};

export type SupportingDataOnCopyright = {
  id: string;
  createAt: string;
  updateAt: string;
  durationYear: string;
  durationMonth: string;
  cost: number;
  benefit: string[];
  otherBenefit: string;
  allowPublic: string;
  reasonPublic: string;
  isComplete: boolean;
  copyrightId: string;
  userId: string;
};

export type CompanyInterestedOnSupportCopyright = {
  id: string;
  createAt: string;
  updateAt: string;
  name: string;
  coordinator: string;
  phone: string;
  copyrightId: string;
  supportingDataOnCopyrightId: string;
  userId: string;
};

export type FileOnCopyright = {
  id: string;
  createAt: Date;
  updateAt: Date;
  documentType: DocumentType;
  type: string;
  url: string;
  size: number;
  copyrightId: string;
  userId: string;
};
