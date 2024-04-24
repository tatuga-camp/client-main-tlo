import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";
import { User, UserType } from "../models";

type RequestSignInService = {
  email: string;
  password: string;
};

type ResponseSignInService = { access_token: string; user: User };
export async function SignInService(
  input: RequestSignInService,
): Promise<ResponseSignInService> {
  try {
    const user = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/auth/sign-in`,
      data: {
        ...input,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return user.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

type RequestSingUpService = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  title: string;
  phone: string;
  type: UserType;
  idCard: string;
  addressNumber: string;
  moo: string;
  road: string;
  tambon: string;
  amphure: string;
  province: string;
  nationality: string;
  postalCode: string;
};

type ResponseSingUpService = { access_token: string; user: User };
export async function SingUpService(
  input: RequestSingUpService,
): Promise<ResponseSingUpService> {
  try {
    const user = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/auth/sign-up`,
      data: {
        ...input,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return user.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

type RequestSignInAsAnotherUserService = {
  email: string;
};

type ResponseSignInAsAnotherUserService = { access_token: string; user: User };
export async function SignInAsAnotherUserService(
  input: RequestSignInAsAnotherUserService,
): Promise<ResponseSignInAsAnotherUserService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const user = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/auth/sign-in-as-another-user`,
      data: {
        ...input,
      },
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
    });
    return user.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

type RequestForgetPasswordService = {
  email: string;
};

type ResponseForgetPasswordService = {
  message: string;
};
export async function ForgetPasswordService(
  input: RequestForgetPasswordService,
): Promise<ResponseForgetPasswordService> {
  try {
    const user = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/auth/forget-password`,
      data: {
        ...input,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return user.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

type RequestResetPasswordService = {
  passwordResetToken: string;
  newPassword: string;
};

type ResponseResetPasswordService = User;
export async function ResetPasswordService(
  input: RequestResetPasswordService,
): Promise<ResponseResetPasswordService> {
  try {
    const user = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/auth/reset-password`,
      data: {
        ...input,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return user.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}
