import axios from "axios";
import { parseCookies } from "nookies";
import {
  Trademark,
  FileOnTrademark,
  Pagination,
  PartnerInfoOnTrademark,
  User,
} from "../../models";

type RequestGetTrademarksService = {
  limit: number;
  page: number;
  searchField?: string;
};

type ResponseGetTrademarksService = Pagination<Trademark & { user: User }>;
export async function GetTrademarksService(
  input: RequestGetTrademarksService,
): Promise<ResponseGetTrademarksService> {
  try {
    const Trademark = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/trademarks/all`,
      params: {
        ...input,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return Trademark.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

type RequestGetTrademarksByUserIdService = {
  limit: number;
  page: number;
  searchField?: string;
};

type ResponseGetTrademarksByUserIdService = Pagination<Trademark>;
export async function GetTrademarksByUserIdService(
  input: RequestGetTrademarksByUserIdService,
): Promise<ResponseGetTrademarksByUserIdService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const Trademark = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/trademarks`,
      params: {
        ...input,
      },
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
    });
    return Trademark.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

type RequestGetTrademarkService = {
  trademarkId: string;
};

export type ResponseGetTrademarkService = Trademark & {
  partnerOnTrademarks: PartnerInfoOnTrademark[];
  fileOnTrademarks: FileOnTrademark[];
};

export async function GetTrademarkervice(
  input: RequestGetTrademarkService,
): Promise<ResponseGetTrademarkService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const Trademark = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/trademarks/${input.trademarkId}`,
      params: {
        ...input,
      },
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
    });
    return Trademark.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

type ResponseCreateTrademarkService = Trademark;

export async function CreateTrademarkervice(): Promise<ResponseCreateTrademarkService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const trademark = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/trademarks`,

      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
    });
    return trademark.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

type RequestUpdateTrademarkService = {
  query: {
    trademarkId: string;
  };
  body: {
    personStatus?: string;
    titleName?: string;
    firstName?: string;
    lastName?: string;
    idCard?: string;
    adressNumber?: string;
    moo?: string;
    road?: string;
    tambon?: string;
    amphure?: string;
    provice?: string;
    postcode?: string;
    nationality?: string;
    email?: string;

    titleTrademark?: string;
    trademarkType?: string;
    trademarkPicture?: string;
    pronunciation?: string;
    meaning?: string;
    productDetail?: string;
    otopType?: string;
    otopNumber?: string;
    isAllowColorProtection?: boolean;
    colorProtectionDetail?: string;
    isAllowShapeProtection?: boolean;
    isAllowMarketing?: boolean;
    numberRequest?: string;
    requestDate?: string;
    allowOtherProtection?: string;
    isComplete?: boolean;
  };
};

type ResponseUpdateTrademarkService = Trademark;

export async function UpdateTrademarkervice(
  input: RequestUpdateTrademarkService,
): Promise<ResponseUpdateTrademarkService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const trademark = await axios({
      method: "PATCH",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/trademarks`,
      data: {
        ...input,
      },
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
    });
    return trademark.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

type RequestDeleteTrademarkService = {
  trademarkId: string;
};

type ResponseDeleteTrademarkService = { message: string };

export async function DeleteTrademarkervice(
  input: RequestDeleteTrademarkService,
): Promise<ResponseDeleteTrademarkService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const trademark = await axios({
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/trademarks/${input.trademarkId}`,
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
    });
    return trademark.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}
