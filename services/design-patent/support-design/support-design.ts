import axios from "axios";
import { parseCookies } from "nookies";
import { SupportingDataOnDesignPatent } from "../../../models";

type RequestCreateSupportDesignPatentService = {
  durationYear: string;
  durationMonth: string;
  cost: number;
  benefit: string[];
  allowPublic: boolean;
  reasonPublic: string;
  designPatentId: string;
};
type ResponseCreateSupportDesignPatentService = SupportingDataOnDesignPatent;

export async function CreateSupportDesignPatentService(
  input: RequestCreateSupportDesignPatentService,
): Promise<ResponseCreateSupportDesignPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const support = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/support-designs`,
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

type RequestUpdateSupportDesignPatentService = {
  query: {
    supportDesignId: string;
  };
  body: {
    durationYear?: string;
    durationMonth?: string;
    cost?: number;
    benefit?: string[];
    otherBenefit?: string;
    allowPublic?: string;
    isComplete?: boolean;
    reasonPublic?: string;
  };
};
type ResponseUpdateSupportDesignPatentService = SupportingDataOnDesignPatent;

export async function UpdateSupportDesignPatentService(
  input: RequestUpdateSupportDesignPatentService,
): Promise<ResponseUpdateSupportDesignPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const support = await axios({
      method: "PATCH",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/support-designs`,
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

type RequestDeleteSupportDesignPatentService = {
  supportDesignId: string;
};
type ResponseDeleteSupportDesignPatentService = { message: string };

export async function DeleteSupportDesignPatentService(
  input: RequestDeleteSupportDesignPatentService,
): Promise<ResponseDeleteSupportDesignPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const support = await axios({
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/support-designs/${input.supportDesignId}`,
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
