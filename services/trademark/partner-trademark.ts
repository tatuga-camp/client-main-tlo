import axios from "axios";
import { parseCookies } from "nookies";
import { PartnerInfoOnTrademark, StatusPartner } from "../../models";

type RequestCreatePartnerTrademarkService = {
  personStatus?: string;
  title?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  idCard?: string;
  addressNumber?: string;
  moo?: string;
  road?: string;
  tambon?: string;
  amphure?: string;
  province?: string;
  phone?: string;
  postalCode?: string;
  nationality?: string;
  email?: string;
  career?: string;
  authorizedPerson?: string;
  country?: string;
  passPort?: string;
  trademarkId: string;
};
type ResponseCreatePartnerTrademarkService = PartnerInfoOnTrademark;

export async function CreatePartnerTrademarkervice(
  input: RequestCreatePartnerTrademarkService,
): Promise<ResponseCreatePartnerTrademarkService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const partner = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/partner-trademarks`,
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

type RequestUpdatePartnerTrademarkService = {
  query: {
    partnerId: string;
  };
  body: {
    personStatus?: string;
    title?: string;
    fullName?: string;
    firstName?: string;
    lastName?: string;
    idCard?: string;
    addressNumber?: string;
    moo?: string;
    road?: string;
    tambon?: string;
    amphure?: string;
    province?: string;
    phone?: string;
    postalCode?: string;
    nationality?: string;
    email?: string;
    career?: string;
    authorizedPerson?: string;
    country?: string;
    passPort?: string;
  };
};
type ResponseUpdatePartnerTrademarkService = PartnerInfoOnTrademark;

export async function UpdatePartnerTrademarkervice(
  input: RequestUpdatePartnerTrademarkService,
): Promise<ResponseUpdatePartnerTrademarkService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const partner = await axios({
      method: "PATCH",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/partner-trademarks`,
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

type RequestDeletePartnerTrademarkService = {
  partnerId: string;
};
type ResponseDeletePartnerTrademarkService = { message: string };

export async function DeletePartnerTrademarkervice(
  input: RequestDeletePartnerTrademarkService,
): Promise<ResponseDeletePartnerTrademarkService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const partner = await axios({
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/partner-trademarks/${input.partnerId}`,
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
