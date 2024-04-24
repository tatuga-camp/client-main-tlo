import axios from "axios";
import { parseCookies } from "nookies";
import { PartnerInfoOnDesignPatent, StatusPartner } from "../../models";

type RequestCreatePartnerDesignPatentService = {
  email: string;
  title: string;
  firstName: string;
  lastName: string;
  idCard: string;
  addressNumber: string;
  moo: string;
  road: string;
  tambon: string;
  amphure: string;
  province: string;
  postalCode: string;
  phone: string;
  status: StatusPartner;
  major: string;
  faculty: string;
  department: string;
  university: string;
  participationRate: number;
  designPatentId: string;
};
type ResponseCreatePartnerDesignPatentService = PartnerInfoOnDesignPatent;

export async function CreatePartnerDesignPatentervice(
  input: RequestCreatePartnerDesignPatentService,
): Promise<ResponseCreatePartnerDesignPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const partner = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/partner-designs`,
      data: {
        ...input,
      },
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
    });
    return partner.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

type RequestUpdatePartnerDesignPatentService = {
  query: {
    partnerId: string;
  };
  body: {
    email?: string;
    title?: string;
    firstName?: string;
    lastName?: string;
    idCard?: string;
    addressNumber?: string;
    moo?: string;
    road?: string;
    tambon?: string;
    amphure?: string;
    province?: string;
    postalCode?: string;
    phone?: string;
    status?: StatusPartner;
    major?: string;
    faculty?: string;
    department?: string;
    university?: string;
    participationRate?: number;
  };
};
type ResponseUpdatePartnerDesignPatentService = PartnerInfoOnDesignPatent;

export async function UpdatePartnerDesignPatentervice(
  input: RequestUpdatePartnerDesignPatentService,
): Promise<ResponseUpdatePartnerDesignPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const partner = await axios({
      method: "PATCH",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/partner-designs`,
      data: {
        ...input,
      },
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
    });
    return partner.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

type RequestDeletePartnerDesignPatentService = {
  partnerId: string;
};
type ResponseDeletePartnerDesignPatentService = { message: string };

export async function DeletePartnerDesignPatentervice(
  input: RequestDeletePartnerDesignPatentService,
): Promise<ResponseDeletePartnerDesignPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const partner = await axios({
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/partner-designs/${input.partnerId}`,
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
    });
    return partner.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}
