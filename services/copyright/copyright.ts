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

type ResponseGetCopyrightsService = Pagination<Copyright & { user: User }>;
export async function GetCopyrightsService(
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

type ResponseGetCopyrightsByUserIdService = Pagination<
  Copyright & { workOnCopyright: WorkInfoOnCopyright }
>;
export async function GetCopyrightsByUserIdService(
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

type RequestGetCountCopyrightService = {
  requestYear: string;
};

type ResponseGetCountCopyrightService = number;
export async function GetCountCopyrightService(
  input: RequestGetCountCopyrightService,
): Promise<ResponseGetCountCopyrightService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const copyright = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/copyrights/count`,
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

export type ResponseGetCopyrightService = Copyright & {
  partnerInfoOnCopyrights: PartnerInfoOnCopyright[];
  workInfoOnCopyright: WorkInfoOnCopyright & {
    fileWorkInfoOnCopyrights: FileWorkInfoOnCopyright[];
  };
  supportingDataOnCopyright: SupportingDataOnCopyright & {
    companyInterestedOnSupportingDataCopyrights: CompanyInterestedOnSupportCopyright[];
  };
  fileOnCopyrights: FileOnCopyright[];
};

export async function GetCopyrightService(
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

export async function CreateCopyrightService(): Promise<ResponseCreateCopyrightService> {
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
    fullName?: string;
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
    phone?: string;
    email?: string;
    isComplete?: boolean;
    requestDate?: string;
    numberRequest?: string;
  };
};

type ResponseUpdateCopyrightService = Copyright;

export async function UpdateCopyrightService(
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

type RequestMigrantCopyrightService = {
  copyrightId: string;
  targetUserId: string;
};

type ResponseMigrantCopyrightService = Copyright;

export async function MigrantCopyrightService(
  input: RequestMigrantCopyrightService,
): Promise<ResponseMigrantCopyrightService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const copyright = await axios({
      method: "PATCH",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/copyrights/migrant`,
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

export async function DeleteCopyrightService(
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
