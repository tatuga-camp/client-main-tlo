import axios from "axios";
import { parseCookies } from "nookies";
import { FilePublicResearchOnInventionPatent } from "../../../models";

type RequestCreateFileWorkInventionPatentService = {
  type: string;
  url: string;
  size: number;
  workInfoOnInventionPatentId: string;
  inventionPatentId: string;
};
type ResponseCreateFileWorkInventionPatentService =
  FilePublicResearchOnInventionPatent;

export async function CreateFileWorkInventionPatentService(
  input: RequestCreateFileWorkInventionPatentService,
): Promise<ResponseCreateFileWorkInventionPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const fileWork = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/file-research-inventions`,
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

type RequestDeleteWorkInventionPatentService = {
  fileResearchOnInventionPatentId: string;
};
type ResponseDeleteWorkInventionPatentService = { message: string };

export async function DeleteWorkInventionPatentService(
  input: RequestDeleteWorkInventionPatentService,
): Promise<ResponseDeleteWorkInventionPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const fileWork = await axios({
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/file-research-inventions/${input.fileResearchOnInventionPatentId}`,
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
