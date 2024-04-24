import axios from "axios";
import { parseCookies } from "nookies";
import { StatusCopyright } from "../../models";

type RequestGetStatusCopyrightsService = {
  copyrightId: string;
};
type ResponseGetStatusCopyrightsService = StatusCopyright[];

export async function GetStatusCopyrightsService(
  input: RequestGetStatusCopyrightsService,
): Promise<ResponseGetStatusCopyrightsService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const status = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/status-copyrights`,
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

type RequestCreateStatusCopyrightService = {
  userId: string;
  copyrightId: string;
  status: string;
  note?: string;
};
type ResponseCreateStatusCopyrightService = StatusCopyright;

export async function CreateStatusCopyrightervice(
  input: RequestCreateStatusCopyrightService,
): Promise<ResponseCreateStatusCopyrightService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const status = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/status-copyrights`,
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

type RequestUpdateStatusCopyrightService = {
  query: {
    statusCopyrightId: string;
  };
  body: {
    status?: string;
    note?: string;
  };
};
type ResponseUpdateStatusCopyrightService = StatusCopyright;

export async function UpdateStatusCopyrightervice(
  input: RequestUpdateStatusCopyrightService,
): Promise<ResponseUpdateStatusCopyrightService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const status = await axios({
      method: "PATCH",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/status-copyrights`,
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

type RequestDeleteStatusCopyrightService = {
  statusCopyrightId: string;
};
type ResponseDeleteStatusCopyrightService = { message: string };

export async function DeleteStatusCopyrightervice(
  input: RequestDeleteStatusCopyrightService,
): Promise<ResponseDeleteStatusCopyrightService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const status = await axios({
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/status-copyrights/${input.statusCopyrightId}`,
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
