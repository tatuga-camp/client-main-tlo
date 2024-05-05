import axios from "axios";
import { parseCookies } from "nookies";
import { FileWorkInfoOnCopyright } from "../../../models";

type RequestCreateFileWorkCopyrightService = {
  type: string;
  url: string;
  size: number;
  workInfoOnCopyrightId: string;
  copyrightId: string;
};
type ResponseCreateFileWorkCopyrightService = FileWorkInfoOnCopyright;

export async function CreateFileWorkCopyrightService(
  input: RequestCreateFileWorkCopyrightService,
): Promise<ResponseCreateFileWorkCopyrightService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const fileWork = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/file-work-copyrights`,
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

type RequestDeleteWorkCopyrightService = {
  fileResearchDesignId: string;
};
type ResponseDeleteWorkCopyrightService = { message: string };

export async function DeleteWorkCopyrightService(
  input: RequestDeleteWorkCopyrightService,
): Promise<ResponseDeleteWorkCopyrightService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const work = await axios({
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/file-work-copyrights/${input.fileResearchDesignId}`,
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
    });
    return work.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}
