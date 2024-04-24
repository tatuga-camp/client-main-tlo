import axios from "axios";
import { parseCookies } from "nookies";
import {
  DocumentType,
  PartnerInfoOnTrademark,
  StatusPartner,
} from "../../models";

type RequestCreateFileTrademarkService = {
  documentType: DocumentType;
  type: string;
  url: string;
  size: number;
  trademarkId: string;
};
type ResponseCreateFileTrademarkService = PartnerInfoOnTrademark;

export async function CreateFileTrademarkervice(
  input: RequestCreateFileTrademarkService,
): Promise<ResponseCreateFileTrademarkService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const file = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/file-trademarks`,
      data: {
        ...input,
      },
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
    });
    return file.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

type RequestDeleteFileTrademarkService = {
  fileTrademarkId: string;
};
type ResponseDeleteFileTrademarkService = { message: string };

export async function DeleteFileTrademarkervice(
  input: RequestDeleteFileTrademarkService,
): Promise<ResponseDeleteFileTrademarkService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const file = await axios({
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/file-trademarks/${input.fileTrademarkId}`,
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
    });
    return file.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}
