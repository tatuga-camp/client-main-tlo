import axios from "axios";
import { parseCookies } from "nookies";
import { SupportingDataOnInventionPatent } from "../../../models";

type RequestCreateSupportInventionPatentService = {
  durationYear: string;
  durationMonth: string;
  cost: number;
  benefit: string[];
  allowPublic: boolean;
  reasonPublic: string;
  inventionPatentId: string;
};
type ResponseCreateSupportInventionPatentService =
  SupportingDataOnInventionPatent;

export async function CreateSupportInventionPatentervice(
  input: RequestCreateSupportInventionPatentService,
): Promise<ResponseCreateSupportInventionPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const support = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/support-inventions`,
      data: {
        ...input,
      },
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
    });
    return support.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

type RequestUpdateSupportInventionPatentService = {
  query: {
    supportInventionId: string;
  };
  body: {
    durationYear?: string;
    durationMonth?: string;
    cost?: number;
    benefit?: string[];
    allowPublic?: boolean;
    reasonPublic?: string;
  };
};
type ResponseUpdateSupportInventionPatentService =
  SupportingDataOnInventionPatent;

export async function UpdateSupportInventionPatentervice(
  input: RequestUpdateSupportInventionPatentService,
): Promise<ResponseUpdateSupportInventionPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const support = await axios({
      method: "PATCH",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/support-inventions`,
      data: {
        ...input,
      },
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
    });
    return support.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

type RequestDeleteSupportInventionPatentService = {
  supportInventionId: string;
};
type ResponseDeleteSupportInventionPatentService = { message: string };

export async function DeleteSupportInventionPatentervice(
  input: RequestDeleteSupportInventionPatentService,
): Promise<ResponseDeleteSupportInventionPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const support = await axios({
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/support-inventions/${input.supportInventionId}`,
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
    });
    return support.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}
