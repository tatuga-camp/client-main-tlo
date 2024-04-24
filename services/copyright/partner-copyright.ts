import axios from "axios";
import { parseCookies } from "nookies";
import { PartnerInfoOnCopyright, StatusPartner } from "../../models";

type RequestCreatePartnerCopyrightService = {
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
  copyrightId: string;
};
type ResponseCreatePartnerCopyrightService = PartnerInfoOnCopyright;

export async function CreatePartnerCopyrightervice(
  input: RequestCreatePartnerCopyrightService,
): Promise<ResponseCreatePartnerCopyrightService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const partner = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/partner-copyrights`,
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

type RequestUpdatePartnerCopyrightService = {
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
type ResponseUpdatePartnerCopyrightService = PartnerInfoOnCopyright;

export async function UpdatePartnerCopyrightervice(
  input: RequestUpdatePartnerCopyrightService,
): Promise<ResponseUpdatePartnerCopyrightService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const partner = await axios({
      method: "PATCH",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/partner-copyrights`,
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

type RequestDeletePartnerCopyrightService = {
  partnerId: string;
};
type ResponseDeletePartnerCopyrightService = { message: string };

export async function DeletePartnerCopyrightervice(
  input: RequestDeletePartnerCopyrightService,
): Promise<ResponseDeletePartnerCopyrightService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const partner = await axios({
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/partner-copyrights/${input.partnerId}`,
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
