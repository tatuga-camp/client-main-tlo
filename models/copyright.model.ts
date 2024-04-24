export type Copyright = {
  id: string;
  createAt: string;
  updateAt: string;
  personStatus?: string;
  title?: string;
  firstName?: string;
  lastName?: string;
  idCard?: string;
  adressNumber?: string;
  moo?: string;
  road?: string;
  tambon?: string;
  amphure?: string;
  provice?: string;
  postcode?: string;
  nationality?: string;
  email?: string;
  isComplete: boolean;
  numberRequest?: string;
  userId: string;
};

export type StatusCopyright = {
  id: string;
  createAt: string;
  updateAt: string;
  status: string;
  note?: string | null;
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
  major: string;
  faculty: string;
  department: string;
  university: string;
  participationRate: number;
  copyrightId: string;
  userId: string;
};

export type WorkInfoOnCopyright = {
  id: string;
  createAt: string;
  updateAt: string;
  name: string;
  workType: string[];
  finishWorkAt: string;
  workQuality: string[];
  benefit: string[];
  funding: string;
  yearFunding: string;
  researchOwnershipSubmission: string;
  isAccessibleMedia: boolean;
  typeAccessibleMedia: string[];
  signedDocument: string;
  isMarketing: boolean;
  marketingDate: string;
  marketingCountry: string;
  isTranferPermission: boolean;
  tranferPermissionDetail: string;
  tranferPermissionDate: string;
  tranferPermissionQuality: string;
  tranferPermissionDuration: string;
  workDescription: string;
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
  allowPublic: boolean;
  reasonPublic: string;
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
