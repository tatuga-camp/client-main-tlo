import axios from "axios";
import { parseCookies } from "nookies";
import {
  CompanyInterestedOnSupportCopyright,
  Copyright,
  FileOnCopyright,
  FileWorkInfoOnCopyright,
  Pagination,
  PartnerInfoOnCopyright,
  SupportingDataOnCopyright,
  User,
  WorkInfoOnCopyright,
} from "../../models";

type RequestGetCopyrightsService = {
  limit: number;
  page: number;
  searchField?: string;
};

type ResponseGetCopyrightsService = Pagination<Copyright>;
export async function GetCopyrightService(
  input: RequestGetCopyrightsService,
): Promise<ResponseGetCopyrightsService> {
  try {
    const copyright = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/copyrights/all`,
      params: {
        ...input,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return copyright.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

type RequestGetCopyrightsByUserIdService = {
  limit: number;
  page: number;
  searchField?: string;
};

type ResponseGetCopyrightsByUserIdService = Pagination<Copyright>;
export async function GetCopyrightsByUserIdervice(
  input: RequestGetCopyrightsByUserIdService,
): Promise<ResponseGetCopyrightsByUserIdService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const copyright = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/copyrights`,
      params: {
        ...input,
      },
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
    });
    return copyright.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

type RequestGetCopyrightService = {
  copyrightId: string;
};

type ResponseGetCopyrightService = Copyright & {
  partnerInfoOnCopyrights: PartnerInfoOnCopyright[];
  workInfoOnCopyright: WorkInfoOnCopyright & {
    fileWorkInfoOnCopyrights: FileWorkInfoOnCopyright[];
  };
  supportingDataOnCopyright: SupportingDataOnCopyright & {
    companyInterestedOnSupportingDataCopyrights: CompanyInterestedOnSupportCopyright[];
  };
  fileOnCopyrights: FileOnCopyright[];
};

export async function GetCopyrightervice(
  input: RequestGetCopyrightService,
): Promise<ResponseGetCopyrightService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const copyright = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/copyrights/${input.copyrightId}`,
      params: {
        ...input,
      },
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
    });
    return copyright.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

type ResponseCreateCopyrightService = Copyright;

export async function CreateCopyrightervice(): Promise<ResponseCreateCopyrightService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const copyright = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/copyrights`,
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
    });
    return copyright.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

type RequestUpdateCopyrightService = {
  query: {
    copyrightId: string;
  };
  body: {
    personStatus?: string;
    title?: string;
    firstName?: string;
    lastName?: string;
    idCard?: string;
    addressNumber?: string;
    moo?: string;
    road?: string;
    tambon?: string;
    amphure?: string;
    province?: string;
    postalCode?: string;
    nationality?: string;
    email?: string;
    isComplete?: boolean;
  };
};

type ResponseUpdateCopyrightService = Copyright;

export async function UpdateCopyrightervice(
  input: RequestUpdateCopyrightService,
): Promise<ResponseUpdateCopyrightService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const copyright = await axios({
      method: "PATCH",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/copyrights`,
      data: {
        ...input,
      },
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
    });
    return copyright.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

type RequestDeleteCopyrightService = {
  copyrightId: string;
};

type ResponseDeleteCopyrightService = { message: string };

export async function DeleteCopyrightervice(
  input: RequestDeleteCopyrightService,
): Promise<ResponseDeleteCopyrightService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const copyright = await axios({
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/copyrights/${input.copyrightId}`,
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
    });
    return copyright.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}
