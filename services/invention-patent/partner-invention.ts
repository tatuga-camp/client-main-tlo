import axios from "axios";
import { parseCookies } from "nookies";
import { PartnerInfoOnInventionPatent, StatusPartner } from "../../models";

type RequestCreatePartnerInventionPatentService = {
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
  inventionPatentId: string;
};
type ResponseCreatePartnerInventionPatentService = PartnerInfoOnInventionPatent;

export async function CreatePartnerInventionPatentervice(
  input: RequestCreatePartnerInventionPatentService,
): Promise<ResponseCreatePartnerInventionPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const partner = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/partner-inventions`,
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

type RequestUpdatePartnerInventionPatentService = {
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
type ResponseUpdatePartnerInventionPatentService = PartnerInfoOnInventionPatent;

export async function UpdatePartnerInventionPatentervice(
  input: RequestUpdatePartnerInventionPatentService,
): Promise<ResponseUpdatePartnerInventionPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const partner = await axios({
      method: "PATCH",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/partner-inventions`,
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

type RequestDeletePartnerInventionPatentService = {
  partnerId: string;
};
type ResponseDeletePartnerInventionPatentService = { message: string };

export async function DeletePartnerInventionPatentervice(
  input: RequestDeletePartnerInventionPatentService,
): Promise<ResponseDeletePartnerInventionPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const partner = await axios({
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/partner-inventions/${input.partnerId}`,
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
