import axios from "axios";
import { parseCookies } from "nookies";
import {
  DocumentType,
  PartnerInfoOnDesignPatent,
  StatusPartner,
} from "../../models";

type RequestCreateFileDesignPatentService = {
  documentType: DocumentType;
  type: string;
  url: string;
  size: number;
  designPatentId: string;
};
type ResponseCreateFileDesignPatentService = PartnerInfoOnDesignPatent;

export async function CreateFileDesignPatentervice(
  input: RequestCreateFileDesignPatentService,
): Promise<ResponseCreateFileDesignPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const file = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/file-designs`,
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

type RequestDeleteFileDesignPatentService = {
  fileDesignPatentId: string;
};
type ResponseDeleteFileDesignPatentService = { message: string };

export async function DeleteFileDesignPatentervice(
  input: RequestDeleteFileDesignPatentService,
): Promise<ResponseDeleteFileDesignPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const file = await axios({
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/file-designs/${input.fileDesignPatentId}`,
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
