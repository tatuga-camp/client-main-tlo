import axios from "axios";
import { parseCookies } from "nookies";
import { FileOnWorkDesignPatent, FileWorkType } from "../../../models";

type RequestCreateFileWorkDesignPatentService = {
  type: string;
  url: string;
  size: number;
  name: FileWorkType;
  workInfoOnDesignPatentId: string;
  designPatentId: string;
};
type ResponseCreateFileWorkDesignPatentService = FileOnWorkDesignPatent;

export async function CreateFileWorkDesignPatentService(
  input: RequestCreateFileWorkDesignPatentService,
): Promise<ResponseCreateFileWorkDesignPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const fileWork = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/file-work-designs`,
      data: {
        ...input,
      },
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
    });
    return fileWork.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

type RequestDeleteFileWorkDesignPatentService = {
  fileWorkDesignId: string;
};
type ResponseDeleteFileWorkDesignPatentService = { message: string };

export async function DeleteFileWorkDesignPatentService(
  input: RequestDeleteFileWorkDesignPatentService,
): Promise<ResponseDeleteFileWorkDesignPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const fileWork = await axios({
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/file-work-designs/${input.fileWorkDesignId}`,
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
    });
    return fileWork.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}
