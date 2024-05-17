import axios from "axios";
import { parseCookies } from "nookies";
import { WorkInfoOnCopyright } from "../../../models";
import {
  IsMarketingLists,
  SignedDocumentDetailLists,
  TranferPermissionDurationOptions,
  TranferPermissionOptions,
  TranferPermissionQualityOptions,
  WorkQualityOptions,
} from "../../../data/copyright";
import { ResearchOwnershipSubmission } from "../../../data/invention";

type RequestCreateWorkCopyrightService = {
  copyrightId: string;
};
type ResponseCreateWorkCopyrightService = WorkInfoOnCopyright;

export async function CreateWorkCopyrightService(
  input: RequestCreateWorkCopyrightService,
): Promise<ResponseCreateWorkCopyrightService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const work = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/work-copyrights`,
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

type RequestUpdateWorkCopyrightService = {
  query: {
    workOnCopyrightId: string;
  };
  body: {
    name?: string;
    workType?: string;
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
    isComplete?: boolean;
  };
};
type ResponseUpdateWorkCopyrightService = WorkInfoOnCopyright;

export async function UpdateWorkCopyrightService(
  input: RequestUpdateWorkCopyrightService,
): Promise<ResponseUpdateWorkCopyrightService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const work = await axios({
      method: "PATCH",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/work-copyrights`,
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

type RequestDeleteWorkCopyrightService = {
  workOnCopyrightId: string;
};
type ResponseDeleteWorkCopyrightService = { message: string };

export async function DeleteWorkCopyrightService(
  input: RequestDeleteWorkCopyrightService,
): Promise<ResponseDeleteWorkCopyrightService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const work = await axios({
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/work-copyrights/${input.workOnCopyrightId}`,
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
