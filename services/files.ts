import axios from "axios";
import { parseCookies } from "nookies";
import { FileType } from "../models";
import { File } from "../models/files";

type RequestGetFileService = {
  fileType: FileType;
};

export type ResponseGetFileService = File[];
export async function GetFileService(
  input: RequestGetFileService,
): Promise<ResponseGetFileService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const file = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/files`,
      params: {
        ...input,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    return file.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

type RequestCreateFileService = {
  type: string;
  url: string;
  size: number;
  fileType: FileType;
  title?: string;
  description?: string;
};

type ResponseCreateFileService = File;
export async function CreateFileService(
  input: RequestCreateFileService,
): Promise<ResponseCreateFileService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const file = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/files`,
      data: {
        ...input,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    return file.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

type RequestDeleteFileService = {
  fileId: string;
};

type ResponseDeleteFileService = { message: string };
export async function DeleteFileService(
  input: RequestDeleteFileService,
): Promise<ResponseDeleteFileService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const file = await axios({
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/files/${input.fileId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    return file.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}
