import axios from "axios";
import { parseCookies } from "nookies";
import { SupportingDataOnCopyright } from "../../../models";

type RequestCreateSupportCopyrightService = {
  durationYear: string;
  durationMonth: string;
  cost: number;
  benefit: string[];
  allowPublic: boolean;
  reasonPublic: string;
  copyrightId: string;
};
type ResponseCreateSupportCopyrightService = SupportingDataOnCopyright;

export async function CreateSupportCopyrightervice(
  input: RequestCreateSupportCopyrightService,
): Promise<ResponseCreateSupportCopyrightService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const support = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/support-copyrights`,
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

type RequestUpdateSupportCopyrightService = {
  query: {
    supportCopyrightId: string;
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
type ResponseUpdateSupportCopyrightService = SupportingDataOnCopyright;

export async function UpdateSupportCopyrightervice(
  input: RequestUpdateSupportCopyrightService,
): Promise<ResponseUpdateSupportCopyrightService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const support = await axios({
      method: "PATCH",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/support-copyrights`,
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

type RequestDeleteSupportCopyrightService = {
  supportCopyrightId: string;
};
type ResponseDeleteSupportCopyrightService = { message: string };

export async function DeleteSupportCopyrightervice(
  input: RequestDeleteSupportCopyrightService,
): Promise<ResponseDeleteSupportCopyrightService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const support = await axios({
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/support-copyrights/${input.supportCopyrightId}`,
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
