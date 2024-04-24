import axios from "axios";
import { parseCookies } from "nookies";
import { CompanyInterestedOnSupportingDataInventionPatent } from "../../../models";

type RequestCreateCompanyInventionPatentService = {
  name: string;
  coordinator: string;
  phone: string;
  inventionPatentId: string;
  supportingDataOnInventionPatentId: string;
};
type ResponseCreateCompanyInventionPatentService =
  CompanyInterestedOnSupportingDataInventionPatent;

export async function CreateCompanyInventionPatentervice(
  input: RequestCreateCompanyInventionPatentService,
): Promise<ResponseCreateCompanyInventionPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const company = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/company-inventions`,
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

type RequestUpdateCompanyInventionPatentService = {
  query: {
    companyInterestedId: string;
  };
  body: {
    name?: string;
    coordinator?: string;
    phone?: string;
  };
};
type ResponseUpdateCompanyInventionPatentService =
  CompanyInterestedOnSupportingDataInventionPatent;

export async function UpdateCompanyInventionPatentervice(
  input: RequestUpdateCompanyInventionPatentService,
): Promise<ResponseUpdateCompanyInventionPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const company = await axios({
      method: "PATCH",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/company-inventions`,
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

type RequestDeleteCompanyInventionPatentService = {
  companyInterestedId: string;
};
type ResponseDeleteCompanyInventionPatentService = { message: string };

export async function DeleteCompanyInventionPatentervice(
  input: RequestDeleteCompanyInventionPatentService,
): Promise<ResponseDeleteCompanyInventionPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const company = await axios({
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/company-inventions/${input.companyInterestedId}`,
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
