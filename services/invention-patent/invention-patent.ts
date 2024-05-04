import axios from "axios";
import { parseCookies } from "nookies";
import {
  CompanyInterestedOnSupportingDataInventionPatent,
  FileOnInventionPatent,
  InventionPatent,
  Pagination,
  PartnerInfoOnInventionPatent,
  SupportingDataOnInventionPatent,
  User,
  WorkInfoOnInventionPatent,
} from "../../models";

type RequestGetInventionPatentsService = {
  limit: number;
  page: number;
  searchField?: string;
};

type ResponseGetInventionPatentsService = Pagination<
  InventionPatent & { user: User }
>;
export async function GetInventionPatentsService(
  input: RequestGetInventionPatentsService,
): Promise<ResponseGetInventionPatentsService> {
  try {
    const inventionPatent = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/invention-patents/all`,
      params: {
        ...input,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return inventionPatent.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

type RequestGetInventionPatentsByUserIdService = {
  limit: number;
  page: number;
};

type ResponseGetInventionPatentsByUserIdService = Pagination<InventionPatent>;
export async function GetInventionPatentsByUserIdService(
  input: RequestGetInventionPatentsByUserIdService,
): Promise<ResponseGetInventionPatentsByUserIdService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const invention = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/invention-patents`,
      params: {
        ...input,
      },
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
    });
    return invention.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

type RequestGetInventionPatentService = {
  InventionPatentId: string;
};

type ResponseGetInventionPatentService = InventionPatent & {
  partnerInfoOnInventionPatents: PartnerInfoOnInventionPatent[];
  workInfoOnInventionPatent: WorkInfoOnInventionPatent & {
    fileWorkInfoOnInventionPatents: WorkInfoOnInventionPatent[];
  };
  supportingDataOnInventionPatent: SupportingDataOnInventionPatent & {
    companyInterestedOnSupportingDataInventionPatents: CompanyInterestedOnSupportingDataInventionPatent[];
  };
  fileOnInventionPatents: FileOnInventionPatent[];
};

export async function GetInventionPatentervice(
  input: RequestGetInventionPatentService,
): Promise<ResponseGetInventionPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const invention = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/invention-patents/${input.InventionPatentId}`,
      params: {
        ...input,
      },
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
    });
    return invention.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

type ResponseCreateInventionPatentService = InventionPatent;

export async function CreateInventionPatentervice(): Promise<ResponseCreateInventionPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const invention = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/invention-patents`,
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
    });
    return invention.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

type RequestUpdateInventionPatentService = {
  query: {
    inventionPatentId: string;
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

type ResponseUpdateInventionPatentService = InventionPatent;

export async function UpdateInventionPatentervice(
  input: RequestUpdateInventionPatentService,
): Promise<ResponseUpdateInventionPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const invention = await axios({
      method: "PATCH",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/invention-patents`,
      data: {
        ...input,
      },
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
    });
    return invention.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

type RequestDeleteInventionPatentService = {
  inventionPatentId: string;
};

type ResponseDeleteInventionPatentService = { message: string };

export async function DeleteInventionPatentervice(
  input: RequestDeleteInventionPatentService,
): Promise<ResponseDeleteInventionPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const copyright = await axios({
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/invention-patents/${input.inventionPatentId}`,
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
