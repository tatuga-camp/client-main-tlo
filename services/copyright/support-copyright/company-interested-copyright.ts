import axios from "axios";
import { parseCookies } from "nookies";
import { CompanyInterestedOnSupportCopyright } from "../../../models";

type RequestCreateCompanyCopyrightService = {
  name: string;
  coordinator: string;
  phone: string;
  copyrightId: string;
  supportingDataOnCopyrightId: string;
};
type ResponseCreateCompanyCopyrightService =
  CompanyInterestedOnSupportCopyright;

export async function CreateCompanyCopyrightService(
  input: RequestCreateCompanyCopyrightService,
): Promise<ResponseCreateCompanyCopyrightService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const company = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/company-copyrights`,
      data: {
        ...input,
      },
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
    });
    return company.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

type RequestUpdateCompanyCopyrightService = {
  query: {
    companyInterestedId: string;
  };
  body: {
    name?: string;
    coordinator?: string;
    phone?: string;
  };
};
type ResponseUpdateCompanyCopyrightService =
  CompanyInterestedOnSupportCopyright;

export async function UpdateCompanyCopyrightService(
  input: RequestUpdateCompanyCopyrightService,
): Promise<ResponseUpdateCompanyCopyrightService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const company = await axios({
      method: "PATCH",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/company-copyrights`,
      data: {
        ...input,
      },
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
    });
    return company.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

type RequestDeleteCompanyCopyrightService = {
  companyInterestedId: string;
};
type ResponseDeleteCompanyCopyrightService = { message: string };

export async function DeleteCompanyCopyrightService(
  input: RequestDeleteCompanyCopyrightService,
): Promise<ResponseDeleteCompanyCopyrightService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const company = await axios({
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/company-copyrights/${input.companyInterestedId}`,
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
    });
    return company.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}
