import axios from "axios";
import { parseCookies } from "nookies";
import { FileOnNews } from "../../models";

type RequestCreateFileNewsService = {
  type: string;
  url: string;
  size: number;
  newsId: string;
};

type ResponseCreateFileNewsService = FileOnNews;
export async function CreateFileNewsService(
  input: RequestCreateFileNewsService,
): Promise<ResponseCreateFileNewsService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const news = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/file-news`,
      data: {
        ...input,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    return news.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

type RequestDeleteFileNewsService = {
  fileId: string;
};

type ResponseDeleteFileNewsService = { message: string };
export async function DeleteFileNewsService(
  input: RequestDeleteFileNewsService,
): Promise<ResponseDeleteFileNewsService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const news = await axios({
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/file-news/${input.fileId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    return news.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}
