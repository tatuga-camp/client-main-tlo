import axios from "axios";
import { parseCookies } from "nookies";
import {
  CompanyInterestedOnSupportingDataDesignPatent,
  FileOnDesignPatent,
  DesignPatent,
  Pagination,
  PartnerInfoOnDesignPatent,
  SupportingDataOnDesignPatent,
  WorkInfoOnDesignPatent,
  PatentRelateToSearchResultOnDesignPatent,
  User,
  FileOnWorkDesignPatent,
} from "../../models";

type RequestGetDesignPatentsService = {
  limit: number;
  page: number;
  searchField?: string;
};

type ResponseGetDesignPatentsService = Pagination<
  DesignPatent & {
    user: User;
    work: WorkInfoOnDesignPatent;
    owners: PartnerInfoOnDesignPatent[];
  }
>;
export async function GetDesignPatentsService(
  input: RequestGetDesignPatentsService,
): Promise<ResponseGetDesignPatentsService> {
  try {
    const designPatent = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/design-patents/all`,
      params: {
        ...input,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return designPatent.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

type RequestGetCountDesignService = {
  requestYear: string;
};

type ResponseGetCountDesignService = number;
export async function GetCountDesignService(
  input: RequestGetCountDesignService,
): Promise<ResponseGetCountDesignService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const design = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/design-patents/count`,
      params: {
        ...input,
      },
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
    });
    return design.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

type RequestGetDesignPatentsByUserIdService = {
  limit: number;
  page: number;
  searchField?: string;
};

type ResponseGetDesignPatentsByUserIdService = Pagination<
  DesignPatent & {
    work: WorkInfoOnDesignPatent;
    owners: PartnerInfoOnDesignPatent[];
  }
>;
export async function GetDesignPatentsByUserIdService(
  input: RequestGetDesignPatentsByUserIdService,
): Promise<ResponseGetDesignPatentsByUserIdService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const design = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/design-patents`,
      params: {
        ...input,
      },
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
    });
    return design.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

type RequestGetDesignPatentService = {
  designPatentId: string;
};

export type ResponseGetDesignPatentService = DesignPatent & {
  partnerInfoOnDesignPatents: PartnerInfoOnDesignPatent[];
  workInfoOnDesignPatent: WorkInfoOnDesignPatent & {
    fileWorkDesigns: FileOnWorkDesignPatent[];
    patentRelateToSearchResultOnDesignPatents: PatentRelateToSearchResultOnDesignPatent[];
  };
  supportingDataOnDesignPatent: SupportingDataOnDesignPatent & {
    companyInterestedOnSupportingDataDesignPatents: CompanyInterestedOnSupportingDataDesignPatent[];
  };
  fileOnDesignPatents: FileOnDesignPatent[];
};

export async function GetDesignPatentService(
  input: RequestGetDesignPatentService,
): Promise<ResponseGetDesignPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const Design = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/design-patents/${input.designPatentId}`,
      params: {
        ...input,
      },
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
    });
    return Design.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

type RequestCreateDesignPatenetService = {
  personStatus?: string;
  title?: string;
  firstName?: string;
  lastName?: string;
  idCard?: string;
  adressNumber?: string;
  moo?: string;
  road?: string;
  tambon?: string;
  amphure?: string;
  provice?: string;
  postcode?: string;
  nationality?: string;
  email?: string;
};
type ResponseCreateDesignPatentService = DesignPatent;

export async function CreateDesignPatentService(
  input: RequestCreateDesignPatenetService,
): Promise<ResponseCreateDesignPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const design = await axios({
      method: "POST",
      data: {
        ...input,
      },
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/design-patents`,
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
    });
    return design.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

type RequestUpdateDesignPatentService = {
  query: {
    designPatentId: string;
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
    isComplete?: boolean;
    requestDate?: string;
    numberRequest?: string;
  };
};

type ResponseUpdateDesignPatentService = DesignPatent;

export async function UpdateDesignPatentService(
  input: RequestUpdateDesignPatentService,
): Promise<ResponseUpdateDesignPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const Design = await axios({
      method: "PATCH",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/design-patents`,
      data: {
        ...input,
      },
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
    });
    return Design.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

type RequestMigrantDesignPatentService = {
  designPatentId: string;
  targetUserId: string;
};

type ResponseMigrantDesignPatentService = DesignPatent;

export async function MigrantDesignPatentService(
  input: RequestMigrantDesignPatentService,
): Promise<ResponseMigrantDesignPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const Design = await axios({
      method: "PATCH",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/design-patents/migrant`,
      data: {
        ...input,
      },
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
    });
    return Design.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

type RequestDeleteDesignPatentService = {
  designPatentId: string;
};

type ResponseDeleteDesignPatentService = { message: string };

export async function DeleteDesignPatentService(
  input: RequestDeleteDesignPatentService,
): Promise<ResponseDeleteDesignPatentService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const copyright = await axios({
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/design-patents/${input.designPatentId}`,
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
    });
    return copyright.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}
