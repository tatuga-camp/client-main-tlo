import axios from "axios";
import { parseCookies } from "nookies";
import { WorkInfoOnInventionPatent, WorkType } from "../../../models";

type RequestCreateWorkInventionPatentService = {
  inventionPatentId: string;
};
type ResponseCreateWorkInventionPatentService = WorkInfoOnInventionPatent;

export async function CreateWorkInventionPatentService(
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
    workOnInventionPatentId: string;
  };
  body: {
    thaiName?: string;
    englishName?: string;
    type?: WorkType;
    beginWorkAt?: string | null;
    finishWorkAt?: string | null;
    benefit?: string[];
    otherBenefit?: string;
    funding?: string;
    sourceFunding?: string;
    yearFunding?: string | null;
    researchOwnershipSubmission?: string;
    agreementTitle?: string;
    agreementInstitution?: string;
    agreementYear?: string | null;
    otherAgreement?: string;
    researchResult?: string;
    keywords?: string;
    website?: string[];
    otherWebsite?: string;
    searchResult?: string;
    requestNumber?: string;
    requestDate?: string | null;
    requestCountry?: string;
    publicType?: string[];
    otherPublicType?: string;
    publicDetail?: string;
    outstandingDetail?: string;
    limitationDetail?: string;
    marketDetail?: string;
    futureDetail?: string;
    isComplete?: boolean;
  };
};
type ResponseUpdateWorkInventionPatentService = WorkInfoOnInventionPatent;

export async function UpdateWorkInventionPatentService(
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

export async function DeleteWorkInventionPatentService(
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
