import axios from "axios";
import { parseCookies } from "nookies";
import { FileOnNews, News, NewsType, Pagination, User } from "../../models";

type RequestGetNewsByPageService = {
  page: number;
  limit: number;
  searchField: string;
  type: NewsType;
  isPublic?: boolean;
};

export type ResponseGetNewsByPageService = Pagination<
  News & { files: FileOnNews[] }
>;
export async function GetNewsByPageService(
  input: RequestGetNewsByPageService,
): Promise<ResponseGetNewsByPageService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const news = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/news`,
      params: {
        ...input,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return news.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

type RequestGetNewsByIdService = {
  newsId: string;
};

export type ResponseGetNewsByIdService = News & {
  files: FileOnNews[];
  user: User;
};
export async function GetNewsByIdService(
  input: RequestGetNewsByIdService,
): Promise<ResponseGetNewsByIdService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const news = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/news/${input.newsId}`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return news.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

type RequestCreateNewsService = {
  title: string;
  content?: string;
  isPublic: boolean;
  releaseAt: string;
  type: NewsType;
};

type ResponseCreateNewsService = News;
export async function CreateNewsService(
  input: RequestCreateNewsService,
): Promise<ResponseCreateNewsService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const news = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/news`,
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

type RequestUpdateNewsService = {
  query: {
    newsId: string;
  };
  body: {
    title?: string;
    content?: string;
    isPublic?: boolean;
    releaseAt?: string;
  };
};

type ResponseUpdateNewsService = News;
export async function UpdateNewsService(
  input: RequestUpdateNewsService,
): Promise<ResponseUpdateNewsService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const news = await axios({
      method: "PATCH",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/news`,
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

type RequestDeleteNewsService = {
  newsId: string;
};

type ResponseDeleteNewsService = { message: string };
export async function DeleteNewsService(
  input: RequestDeleteNewsService,
): Promise<ResponseDeleteNewsService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const news = await axios({
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/news/${input.newsId}`,
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
