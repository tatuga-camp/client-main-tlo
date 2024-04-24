import axios from "axios";
import { parseCookies } from "nookies";
import { WorkInfoOnInventionPatent, WorkType } from "../../../models";

type RequestCreateWorkInventionPatentService = {
  thaiName: string;
  englishName: string;
  type: WorkType;
  beginWorkAt: string;
  finishWorkAt: string;
  benefit: string[];
  funding: string;
  yearFunding: string;
  researchOwnershipSubmission: string;
  signedDocument: string;
  researchResult: string;
  keywords: string;
  website: string;
  searchResult: string;
  requestNumber: string;
  requestDate: string;
  requestCountry: string;
  publicType: string;
  publicDetail: string;
  outstandingDetail: string;
  limitaionDetail: string;
  marketDetail: string;
  futureDetail: string;
  inventionPatentId: string;
};
type ResponseCreateWorkInventionPatentService = WorkInfoOnInventionPatent;

export async function CreateWorkInventionPatentervice(
  input: RequestCreateWorkInventionPatentService,
): Promise<ResponseCreateWorkInventionPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const work = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/work-inventions`,
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

type RequestUpdateWorkInventionPatentService = {
  query: {
    workOnInventionId: string;
  };
  body: {
    thaiName?: string;
    englishName?: string;
    type?: WorkType;
    beginWorkAt?: string;
    finishWorkAt?: string;
    benefit?: string[];
    funding?: string;
    yearFunding?: string;
    researchOwnershipSubmission?: string;
    signedDocument?: string;
    researchResult?: string;
    keywords?: string;
    website?: string;
    searchResult?: string;
    requestNumber?: string;
    requestDate?: string;
    requestCountry?: string;
    publicType?: string;
    publicDetail?: string;
    outstandingDetail?: string;
    limitaionDetail?: string;
    marketDetail?: string;
    futureDetail?: string;
  };
};
type ResponseUpdateWorkInventionPatentService = WorkInfoOnInventionPatent;

export async function UpdateWorkInventionPatentervice(
  input: RequestUpdateWorkInventionPatentService,
): Promise<ResponseUpdateWorkInventionPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const work = await axios({
      method: "PATCH",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/work-inventions`,
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

type RequestDeleteWorkInventionPatentService = {
  workOnInventionId: string;
};
type ResponseDeleteWorkInventionPatentService = { message: string };

export async function DeleteWorkInventionPatentervice(
  input: RequestDeleteWorkInventionPatentService,
): Promise<ResponseDeleteWorkInventionPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const work = await axios({
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/work-inventions/${input.workOnInventionId}`,
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
