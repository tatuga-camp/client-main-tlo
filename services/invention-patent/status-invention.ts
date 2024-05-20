import axios from "axios";
import { parseCookies } from "nookies";
import {
  InventionPatent,
  PartnerInfoOnInventionPatent,
  StatusInventionPatent,
  WorkInfoOnInventionPatent,
} from "../../models";

type RequestGetStatusInventionPatentsService = {
  inventionPatentId: string;
};
export type ResponseGetStatusInventionPatentsService = {
  status: StatusInventionPatent[];
  invention: InventionPatent & {
    workInfoOnInventionPatent: WorkInfoOnInventionPatent;
    partnerInfoOnInventionPatents: PartnerInfoOnInventionPatent[];
  };
};

export async function GetStatusInventionPatentsService(
  input: RequestGetStatusInventionPatentsService,
): Promise<ResponseGetStatusInventionPatentsService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const status = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/status-inventions`,
      params: {
        ...input,
      },
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
    });
    return status.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

type RequestCreateStatusInventionPatentService = {
  userId: string;
  inventionPatentId: string;
  status: string;
  note?: string;
};
type ResponseCreateStatusInventionPatentService = StatusInventionPatent;

export async function CreateStatusInventionPatentService(
  input: RequestCreateStatusInventionPatentService,
): Promise<ResponseCreateStatusInventionPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const status = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/status-inventions`,
      data: {
        ...input,
      },
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
    });
    return status.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

type RequestUpdateStatusInventionPatentService = {
  query: {
    statusInventionId: string;
  };
  body: {
    status?: string;
    note?: string;
  };
};
type ResponseUpdateStatusInventionPatentService = StatusInventionPatent;

export async function UpdateStatusInventionPatentService(
  input: RequestUpdateStatusInventionPatentService,
): Promise<ResponseUpdateStatusInventionPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const status = await axios({
      method: "PATCH",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/status-inventions`,
      data: {
        ...input,
      },
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
    });
    return status.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

type RequestDeleteStatusInventionPatentService = {
  statusInventionId: string;
};
type ResponseDeleteStatusInventionPatentService = { message: string };

export async function DeleteStatusInventionPatentService(
  input: RequestDeleteStatusInventionPatentService,
): Promise<ResponseDeleteStatusInventionPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const status = await axios({
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/status-inventions/${input.statusInventionId}`,
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
    });
    return status.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}
