import { StatusPartner } from "./type.model";

export type DesignPatent = {
  id: string;
  createAt: string;
  updateAt: string;
  personStatus?: string | null;
  title?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  idCard?: string | null;
  adressNumber?: string | null;
  moo?: string | null;
  road?: string | null;
  tambon?: string | null;
  amphure?: string | null;
  province?: string | null;
  postcode?: string | null;
  nationality?: string | null;
  email?: string | null;
  numberRequest?: string | null;
  isComplete: boolean;
  userId: string;
};

export type StatusDesignPatent = {
  id: string;
  createAt: string;
  updateAt: string;
  status: string;
  note?: string | null;
  userId: string;
  designPatentId: string;
};

export type PartnerInfoOnDesignPatent = {
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
  status: StatusPartner;
  major: string;
  faculty: string;
  department: string;
  university: string;
  participationRate: number;
  designPatentId: string;
  userId: string;
};

export type WorkInfoOnDesignPatent = {
  id: string;
  createAt: string;
  updateAt: string;
  thaiName: string;
  englishName: string;
  beginWorkAt: string;
  finishWorkAt: string;
  benefit: string[];
  funding: string;
  yearFunding: string;
  researchOwnershipSubmission: string;
  signedDocument: string;
  keywords: string;
  website: string;
  searchResult: string;
  requestNumber: string;
  requestDate: string;
  requestCountry: string;
  publicType: string;
  publicDetail: string;
  outstandingDetail: string[];
  descriptionDetail: string;
  marketDetail: string;
  futureDetail: string;
  designPatentId: string;
  userId: string;
};

export type PatentRelateToSearchResultOnDesignPatent = {
  id: string;
  createAt: string;
  updateAt: string;
  type: string;
  nameInovation: string;
  number: string;
  nameJournal: string;
  country: string;
  releaseDate: string;
  designPatentId: string;
  workInfoOnDesignPatentId: string;
  userId: string;
};

export type FilePublicResearchOnDesignPatent = {
  id: string;
  createAt: string;
  updateAt: string;
  type: string;
  url: string;
  size: number;
  designPatentId: string;
  designPatent: DesignPatent;
  workInfoOnDesignPatentId: string;
  userId: string;
};

export type SupportingDataOnDesignPatent = {
  id: string;
  createAt: string;
  updateAt: string;
  durationYear: string;
  durationMonth: string;
  cost: number;
  benefit: string[];
  allowPublic: boolean;
  reasonPublic: string;
  designPatentId: string;
  userId: string;
};

export type CompanyInterestedOnSupportingDataDesignPatent = {
  id: string;
  createAt: string;
  updateAt: string;
  name: string;
  coordinator: string;
  phone: string;
  designPatentId: string;
  supportingDataOnDesignPatentId: string;
  userId: string;
};

export type FileOnDesignPatent = {
  id: string;
  createAt: string;
  updateAt: string;
  documentType: DocumentType;
  type: string;
  url: string;
  size: number;
  designPatentId: string;
  userId: string;
};