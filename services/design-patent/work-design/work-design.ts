import axios from "axios";
import { parseCookies } from "nookies";
import { WorkInfoOnDesignPatent, WorkType } from "../../../models";
import {
  FundingLists,
  PublicType,
  ResearchOwnershipSubmission,
  ResearchType,
  Websites,
} from "../../../data/invention";

type RequestCreateWorkDesignPatentService = {
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
};
type ResponseCreateWorkDesignPatentService = WorkInfoOnDesignPatent;

export async function CreateWorkDesignPatentService(
  input: RequestCreateWorkDesignPatentService,
): Promise<ResponseCreateWorkDesignPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const work = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/work-designs`,
      data: {
        ...input,
      },
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
    });
    return work.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

type RequestUpdateWorkDesignPatentService = {
  query: {
    workOnDesignPatentId: string;
  };
  body: {
    thaiName?: string;
    englishName?: string;
    beginWorkAt?: string;
    finishWorkAt?: string;
    benefit?: string[];
    otherBenefit?: string;
    funding?: FundingLists;
    sourceFunding?: string;
    yearFunding?: string;
    researchOwnershipSubmission?: ResearchOwnershipSubmission;
    agreementTitle?: string;
    agreementInstitution?: string;
    agreementYear?: string;
    otherAgreement?: string;
    researchResult?: ResearchType;
    keywords?: string;
    website?: Websites;
    searchResult?: string;
    isRequest?: string;
    requestNumber?: string;
    requestDate?: string;
    requestCountry?: string;
    publicType?: PublicType;
    otherPublicType?: string;
    publicDetail?: string;
    outstandingDetail?: string;
    descriptionDetail?: string;
    futureDetail?: string;
    isComplete?: boolean;
  };
};
type ResponseUpdateWorkDesignPatentService = WorkInfoOnDesignPatent;

export async function UpdateWorkDesignPatentService(
  input: RequestUpdateWorkDesignPatentService,
): Promise<ResponseUpdateWorkDesignPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const work = await axios({
      method: "PATCH",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/work-designs`,
      data: {
        ...input,
      },
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
    });
    return work.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

type RequestDeleteWorkDesignPatentService = {
  workOnDesignPatentId: string;
};
type ResponseDeleteWorkDesignPatentService = { message: string };

export async function DeleteWorkDesignPatentService(
  input: RequestDeleteWorkDesignPatentService,
): Promise<ResponseDeleteWorkDesignPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const work = await axios({
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/work-designs/${input.workOnDesignPatentId}`,
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
    });
    return work.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}
