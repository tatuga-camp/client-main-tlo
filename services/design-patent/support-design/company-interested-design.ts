import axios from "axios";
import { parseCookies } from "nookies";
import { CompanyInterestedOnSupportingDataDesignPatent } from "../../../models";

type RequestCreateCompanyDesignPatentService = {
  name: string;
  coordinator: string;
  phone: string;
  designPatentId: string;
  supportingDataOnDesignPatentId: string;
};
type ResponseCreateCompanyDesignPatentService =
  CompanyInterestedOnSupportingDataDesignPatent;

export async function CreateCompanyDesignPatentService(
  input: RequestCreateCompanyDesignPatentService,
): Promise<ResponseCreateCompanyDesignPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const company = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/company-designs`,
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

type RequestUpdateCompanyDesignPatentService = {
  query: {
    companyInterestedId: string;
  };
  body: {
    name?: string;
    coordinator?: string;
    phone?: string;
  };
};
type ResponseUpdateCompanyDesignPatentService =
  CompanyInterestedOnSupportingDataDesignPatent;

export async function UpdateCompanyDesignPatentService(
  input: RequestUpdateCompanyDesignPatentService,
): Promise<ResponseUpdateCompanyDesignPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const company = await axios({
      method: "PATCH",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/company-designs`,
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

type RequestDeleteCompanyDesignPatentService = {
  companyInterestedId: string;
};
type ResponseDeleteCompanyDesignPatentService = { message: string };

export async function DeleteCompanyDesignPatentService(
  input: RequestDeleteCompanyDesignPatentService,
): Promise<ResponseDeleteCompanyDesignPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const company = await axios({
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/company-designs/${input.companyInterestedId}`,
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
