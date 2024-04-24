import axios from "axios";
import { parseCookies } from "nookies";
import {
  PatentRelateToSearchResultOnInventionPatent,
  WorkInfoOnInventionPatent,
  WorkType,
} from "../../../models";

type RequestCreateSearchInventionPatentService = {
  type: string;
  nameInovation: string;
  number: string;
  nameJournal: string;
  country: string;
  releaseDate: string;
  workInfoOnInventionPatentId: string;
  inventionPatentId: string;
};
type ResponseCreateSearchInventionPatentService =
  PatentRelateToSearchResultOnInventionPatent;

export async function CreateSearchInventionPatentervice(
  input: RequestCreateSearchInventionPatentService,
): Promise<ResponseCreateSearchInventionPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const search = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/search-inventions`,
      data: {
        ...input,
      },
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
    });
    return search.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

type RequestUpdateSearchInventionPatentService = {
  query: {
    searchInventionId: string;
  };
  body: {
    type?: string;
    nameInovation?: string;
    number?: string;
    nameJournal?: string;
    country?: string;
    releaseDate?: string;
  };
};
type ResponseUpdateSearchInventionPatentService =
  PatentRelateToSearchResultOnInventionPatent;

export async function UpdateSearchInventionPatentervice(
  input: RequestUpdateSearchInventionPatentService,
): Promise<ResponseUpdateSearchInventionPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const search = await axios({
      method: "PATCH",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/search-inventions`,
      data: {
        ...input,
      },
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
    });
    return search.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

type RequestDeleteSearchInventionPatentService = {
  searchInventionId: string;
};
type ResponseDeleteSearchInventionPatentService = { message: string };

export async function DeleteSearchInventionPatentervice(
  input: RequestDeleteSearchInventionPatentService,
): Promise<ResponseDeleteSearchInventionPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const search = await axios({
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/search-inventions/${input.searchInventionId}`,
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
    });
    return search.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}
