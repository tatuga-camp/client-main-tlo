import { parseCookies } from "nookies";
import { User } from "../models";
import axios from "axios";

type RequestGetUserService = {
  access_token?: string;
};
type ResponseGetUserService = User;
export async function GetUserService(
  input: RequestGetUserService,
): Promise<ResponseGetUserService> {
  try {
    let access_token = input.access_token;
    if (!access_token) {
      const cookies = parseCookies();
      access_token = cookies.access_token;
    }
    const user = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/users`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    return user.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

type RequestUpdateUserService = {
  query: {
    userId: string;
  };
  body: {
    email?: string;
    firstName?: string;
    lastName?: string;
    title?: string;
    phone?: string;
    picture?: string;
  };
};
type ResponseUpdateUserService = User;
export async function UpdateUserService(
  input: RequestUpdateUserService,
): Promise<ResponseUpdateUserService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const user = await axios({
      method: "PATCH",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/users`,
      data: {
        ...input,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    return user.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}

type RequestDeleteUserService = {
  userDeleteId: string;
};
type ResponseDeleteUserService = User;
export async function DeleteUserService(
  input: RequestDeleteUserService,
): Promise<ResponseDeleteUserService> {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const user = await axios({
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/users/${input.userDeleteId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    return user.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error?.response?.data;
  }
}
