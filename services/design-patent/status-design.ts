import axios from "axios";
import { parseCookies } from "nookies";
import { StatusDesignPatent } from "../../models";

type RequestGetStatusDesignPatentsService = {
  designPatentId: string;
};
type ResponseGetStatusDesignPatentsService = StatusDesignPatent[];

export async function GetStatusDesignPatentsService(
  input: RequestGetStatusDesignPatentsService,
): Promise<ResponseGetStatusDesignPatentsService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const status = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/status-designs`,
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

type RequestCreateStatusDesignPatentService = {
  userId: string;
  designPatentId: string;
  status: string;
  note?: string;
};
type ResponseCreateStatusDesignPatentService = StatusDesignPatent;

export async function CreateStatusDesignPatentervice(
  input: RequestCreateStatusDesignPatentService,
): Promise<ResponseCreateStatusDesignPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const status = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/status-designs`,
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

type RequestUpdateStatusDesignPatentService = {
  query: {
    statusDesignId: string;
  };
  body: {
    status?: string;
    note?: string;
  };
};
type ResponseUpdateStatusDesignPatentService = StatusDesignPatent;

export async function UpdateStatusDesignPatentervice(
  input: RequestUpdateStatusDesignPatentService,
): Promise<ResponseUpdateStatusDesignPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const status = await axios({
      method: "PATCH",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/status-designs`,
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

type RequestDeleteStatusDesignPatentService = {
  statusDesignId: string;
};
type ResponseDeleteStatusDesignPatentService = { message: string };

export async function DeleteStatusDesignPatentervice(
  input: RequestDeleteStatusDesignPatentService,
): Promise<ResponseDeleteStatusDesignPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const status = await axios({
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/status-designs/${input.statusDesignId}`,
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
