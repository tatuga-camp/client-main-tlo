import axios from "axios";
import { parseCookies } from "nookies";
import { WorkInfoOnCopyright } from "../../../models";

type RequestCreateWorkCopyrightService = {
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
    workType?: string[];
    finishWorkAt?: string;
    workQuality?: string[];
    benefit?: string[];
    funding?: string;
    yearFunding?: string;
    researchOwnershipSubmission?: string;
    isAccessibleMedia?: boolean;
    typeAccessibleMedia?: string[];
    signedDocument?: string;
    isMarketing?: boolean;
    marketingDate?: string;
    marketingCountry?: string;
    isTranferPermission?: boolean;
    tranferPermissionDetail?: string;
    tranferPermissionDate?: string;
    tranferPermissionQuality?: string;
    tranferPermissionDuration?: string;
    workDescription?: string;
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
