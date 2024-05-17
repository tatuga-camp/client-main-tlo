import axios from "axios";
import { parseCookies } from "nookies";
import { FileWorkInfoOnCopyright, FileWorkType } from "../../../models";

type RequestCreateFileWorkCopyrightService = {
  type: string;
  url: string;
  size: number;
  name: FileWorkType;
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

type RequestDeleteFileWorkCopyrightService = {
  fileWorkCopyrightId: string;
};
type ResponseDeleteFileWorkCopyrightService = { message: string };

export async function DeleteFileWorkCopyrightService(
  input: RequestDeleteFileWorkCopyrightService,
): Promise<ResponseDeleteFileWorkCopyrightService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const work = await axios({
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/file-work-copyrights/${input.fileWorkCopyrightId}`,
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
