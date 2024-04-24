import axios from "axios";
import { parseCookies } from "nookies";
import {
  DocumentType,
  PartnerInfoOnCopyright,
  StatusPartner,
} from "../../models";

type RequestCreateFileCopyrightService = {
  documentType: DocumentType;
  type: string;
  url: string;
  size: number;
  copyrightId: string;
};
type ResponseCreateFileCopyrightService = PartnerInfoOnCopyright;

export async function CreateFileCopyrightervice(
  input: RequestCreateFileCopyrightService,
): Promise<ResponseCreateFileCopyrightService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const file = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/file-copyrights`,
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

type RequestDeleteFileCopyrightService = {
  fileCopyrightId: string;
};
type ResponseDeleteFileCopyrightService = { message: string };

export async function DeleteFileCopyrightervice(
  input: RequestDeleteFileCopyrightService,
): Promise<ResponseDeleteFileCopyrightService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const file = await axios({
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/file-copyrights/${input.fileCopyrightId}`,
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
