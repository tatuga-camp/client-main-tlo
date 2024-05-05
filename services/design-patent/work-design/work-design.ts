import axios from "axios";
import { parseCookies } from "nookies";
import { WorkInfoOnDesignPatent, WorkType } from "../../../models";

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
    funding?: string;
    yearFunding?: string;
    researchOwnershipSubmission?: string;
    signedDocument?: string;
    keywords?: string;
    website?: string;
    searchResult?: string;
    requestNumber?: string;
    requestDate?: string;
    requestCountry?: string;
    publicType?: string;
    publicDetail?: string;
    outstandingDetail?: string[];
    descriptionDetail?: string;
    marketDetail?: string;
    futureDetail?: string;
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
