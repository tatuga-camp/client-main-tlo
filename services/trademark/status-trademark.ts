import axios from "axios";
import { parseCookies } from "nookies";
import {
  PartnerInfoOnTrademark,
  StatusTrademark,
  Trademark,
} from "../../models";

type RequestGetStatusTrademarksService = {
  trademarkId: string;
};
type ResponseGetStatusTrademarksService = {
  status: StatusTrademark[];
  trademark: Trademark & { partnerInfoOnTrademarks: PartnerInfoOnTrademark[] };
};

export async function GetStatusTrademarksService(
  input: RequestGetStatusTrademarksService,
): Promise<ResponseGetStatusTrademarksService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const status = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/status-trademarks`,
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

type RequestCreateStatusTrademarkService = {
  userId: string;
  trademarkId: string;
  status: string;
  note?: string;
};
type ResponseCreateStatusTrademarkService = StatusTrademark;

export async function CreateStatusTrademarkervice(
  input: RequestCreateStatusTrademarkService,
): Promise<ResponseCreateStatusTrademarkService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const status = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/status-trademarks`,
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

type RequestUpdateStatusTrademarkService = {
  query: {
    statusTrademarkId: string;
  };
  body: {
    status?: string;
    note?: string;
  };
};
type ResponseUpdateStatusTrademarkService = StatusTrademark;

export async function UpdateStatusTrademarkervice(
  input: RequestUpdateStatusTrademarkService,
): Promise<ResponseUpdateStatusTrademarkService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const status = await axios({
      method: "PATCH",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/status-trademarks`,
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

type RequestDeleteStatusTrademarkService = {
  statusTrademarkId: string;
};
type ResponseDeleteStatusTrademarkService = { message: string };

export async function DeleteStatusTrademarkervice(
  input: RequestDeleteStatusTrademarkService,
): Promise<ResponseDeleteStatusTrademarkService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const status = await axios({
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/status-trademarks/${input.statusTrademarkId}`,
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
