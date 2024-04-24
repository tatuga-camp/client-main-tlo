import axios from "axios";
import { parseCookies } from "nookies";
import { FilePublicResearchOnDesignPatent } from "../../../models";

type RequestCreateFileWorkDesignPatentService = {
  type: string;
  url: string;
  size: number;
  workInfoOnDesignPatentId: string;
  designPatentId: string;
};
type ResponseCreateFileWorkDesignPatentService =
  FilePublicResearchOnDesignPatent;

export async function CreateFileWorkDesignPatentervice(
  input: RequestCreateFileWorkDesignPatentService,
): Promise<ResponseCreateFileWorkDesignPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const fileWork = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/file-research-designs`,
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

type RequestDeleteWorkDesignPatentService = {
  fileResearchOnDesignPatentId: string;
};
type ResponseDeleteWorkDesignPatentService = { message: string };

export async function DeleteWorkDesignPatentervice(
  input: RequestDeleteWorkDesignPatentService,
): Promise<ResponseDeleteWorkDesignPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const fileWork = await axios({
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/file-research-designs/${input.fileResearchOnDesignPatentId}`,
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
