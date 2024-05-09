import axios from "axios";
import { parseCookies } from "nookies";
import { FileOnWorkInventionPatent, FileWorkType } from "../../../models";

type RequestCreateFileWorkInventionPatentService = {
  type: string;
  url: string;
  name: FileWorkType;
  size: number;
  workInfoOnInventionPatentId: string;
  inventionPatentId: string;
};
type ResponseCreateFileWorkInventionPatentService = FileOnWorkInventionPatent;

export async function CreateFileWorkInventionPatentService(
  input: RequestCreateFileWorkInventionPatentService,
): Promise<ResponseCreateFileWorkInventionPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const fileWork = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/file-work-inventions`,
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

type RequestDeleteFileWorkInventionPatentService = {
  fileWorkInventionId: string;
};
type ResponseDeleteFileWorkInventionPatentService = { message: string };

export async function DeleteFileWorkInventionPatentService(
  input: RequestDeleteFileWorkInventionPatentService,
): Promise<ResponseDeleteFileWorkInventionPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const fileWork = await axios({
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/file-work-inventions/${input.fileWorkInventionId}`,
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
