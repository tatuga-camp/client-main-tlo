import axios from "axios";
import { parseCookies } from "nookies";
import { Amphure, Province, Tambon } from "../models";

export type ResponseGetAllProvinceService = Province[];

export async function GetAllProvinceService(): Promise<ResponseGetAllProvinceService> {
  try {
    const provinces = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_SERVER_THAI_DATA_URL}/province/get-all`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return provinces.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

export type ResponseGetAllAmphuresByProvinceService = Amphure[];
export type RequestGetAllAmphuresByProvinceService = {
  provinceId: number;
};
export async function GetAllAmphuresByProvinceService(
  input: RequestGetAllAmphuresByProvinceService,
): Promise<ResponseGetAllAmphuresByProvinceService> {
  try {
    if (!input.provinceId) throw new Error("provinceId is required");
    const amphures = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_SERVER_THAI_DATA_URL}/amphure/get-all-by-province-id`,
      params: {
        ...input,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return amphures.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

export type ResponseGetAllTambonByAmphureService = Tambon[];
export type RequestGetAllTambonByAmphureService = {
  amphureId: number;
};
export async function GetAllTambonByAmphureService(
  input: RequestGetAllTambonByAmphureService,
): Promise<ResponseGetAllTambonByAmphureService> {
  try {
    if (!input.amphureId) throw new Error("amphureId is required");
    const tambons = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_SERVER_THAI_DATA_URL}/tambon/get-all-by-amphure-id`,
      params: {
        ...input,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return tambons.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}
