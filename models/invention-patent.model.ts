import {
  FundingLists,
  PublicType,
  ResearchOwnershipSubmission,
  ResearchType,
  Websites,
} from "../data/invention";
import {
  DocumentType,
  FileWorkType,
  MenuSearchWorks,
  StatusLists,
  StatusPartner,
  UserType,
  WorkType,
} from "./type.model";

export type InventionPatent = {
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
  numberRequest?: string | null;
  requestDate?: string;
  userType: UserType;
  isComplete: boolean;
  userId: string;
};

export type StatusInventionPatent = {
  id: string;
  createAt: string;
  updateAt: string;
  title: string;
  status: StatusLists;
  note: string;
  order: number;
  userId: string;
  inventionPatentId: string;
};

export type PartnerInfoOnInventionPatent = {
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
  faculty: string;
  participationRate: number;
  inventionPatentId: string;
  userId: string;
};

export type WorkInfoOnInventionPatent = {
  id: string;
  createAt: string;
  updateAt: string;
  thaiName: string;
  englishName: string;
  type: WorkType;
  beginWorkAt: string;
  finishWorkAt: string;
  benefit: string[];
  otherBenefit: string;
  funding: FundingLists;
  sourceFunding: string;
  yearFunding: string;
  researchOwnershipSubmission: ResearchOwnershipSubmission;
  agreementTitle: string;
  agreementInstitution: string;
  agreementYear: string;
  otherAgreement: string;
  researchResult: ResearchType;
  keywords: string;
  website: Websites;
  otherWebsite: string;
  searchResult: string;
  requestNumber: string;
  requestDate: string;
  requestCountry: string;
  publicType: PublicType;
  otherPublicType: string;
  publicDetail: string;
  outstandingDetail: string;
  limitationDetail: string;
  marketDetail: string;
  futureDetail: string;
  isComplete: boolean;
  inventionPatentId: string;
  inventionPatent: InventionPatent;
  userId: string;
};

export type PatentRelateToSearchResultOnInventionPatent = {
  id: string;
  createAt: string;
  updateAt: string;
  type: MenuSearchWorks;
  nameInovation: string;
  numberRequest: string;
  nameJournal: string;
  country: string;
  source: string;
  releaseDate: string;
  workInfoOnInventionPatentId: string;
  inventionPatentId: string;
  userId: string;
};

export type FileOnWorkInventionPatent = {
  id: string;
  createAt: string;
  updateAt: string;
  type: string;
  name: FileWorkType;
  url: string;
  size: number;
  workInfoOnInventionPatentId: string;
  inventionPatentId: string;
  userId: string;
};

export type SupportingDataOnInventionPatent = {
  id: string;
  createAt: string;
  updateAt: string;
  durationYear: string;
  durationMonth: string;
  cost: number;
  benefit: string[];
  otherBenefit: string;
  allowPublic: string;
  isComplete: boolean;
  reasonPublic: string;
  inventionPatentId: string;
  userId: string;
};

export type CompanyInterestedOnSupportingDataInventionPatent = {
  id: string;
  createAt: string;
  updateAt: string;
  name: string;
  coordinator: string;
  phone: string;
  inventionPatentId: string;
  supportingDataOnInventionPatentId: string;
  userId: string;
};

export type FileOnInventionPatent = {
  id: string;
  createAt: string;
  updateAt: string;
  documentType: DocumentType;
  type: string;
  url: string;
  size: number;
  inventionPatentId: string;
  userId: string;
};
