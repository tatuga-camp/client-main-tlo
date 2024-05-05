import axios from "axios";
import { parseCookies } from "nookies";
import { PatentRelateToSearchResultOnDesignPatent } from "../../../models";

type RequestCreateSearchDesignPatentService = {
  type: string;
  nameInovation: string;
  number: string;
  nameJournal: string;
  country: string;
  releaseDate: string;
  workInfoOnDesignPatentId: string;
  designPatentId: string;
};
type ResponseCreateSearchDesignPatentService =
  PatentRelateToSearchResultOnDesignPatent;

export async function CreateSearchDesignPatentService(
  input: RequestCreateSearchDesignPatentService,
): Promise<ResponseCreateSearchDesignPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const search = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/search-designs`,
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

type RequestUpdateSearchDesignPatentService = {
  query: {
    searchDesignId: string;
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
type ResponseUpdateSearchDesignPatentService =
  PatentRelateToSearchResultOnDesignPatent;

export async function UpdateSearchDesignPatentService(
  input: RequestUpdateSearchDesignPatentService,
): Promise<ResponseUpdateSearchDesignPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const search = await axios({
      method: "PATCH",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/search-designs`,
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

type RequestDeleteSearchDesignPatentService = {
  searchDesignId: string;
};
type ResponseDeleteSearchDesignPatentService = { message: string };

export async function DeleteSearchDesignPatentService(
  input: RequestDeleteSearchDesignPatentService,
): Promise<ResponseDeleteSearchDesignPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const search = await axios({
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/search-designs/${input.searchDesignId}`,
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
