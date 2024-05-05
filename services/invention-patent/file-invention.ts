import axios from "axios";
import { parseCookies } from "nookies";
import {
  DocumentType,
  PartnerInfoOnInventionPatent,
  StatusPartner,
} from "../../models";

type RequestCreateFileInventionPatentService = {
  documentType: DocumentType;
  type: string;
  url: string;
  size: number;
  inventionPatentId: string;
};
type ResponseCreateFileInventionPatentService = PartnerInfoOnInventionPatent;

export async function CreateFileInventionPatentService(
  input: RequestCreateFileInventionPatentService,
): Promise<ResponseCreateFileInventionPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const file = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/file-inventions`,
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

type RequestDeleteFileInventionPatentService = {
  fileInventionPatentId: string;
};
type ResponseDeleteFileInventionPatentService = { message: string };

export async function DeleteFileInventionPatentService(
  input: RequestDeleteFileInventionPatentService,
): Promise<ResponseDeleteFileInventionPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const file = await axios({
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/file-inventions/${input.fileInventionPatentId}`,
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
