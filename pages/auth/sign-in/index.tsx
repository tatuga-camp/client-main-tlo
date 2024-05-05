import HomepageSidebar from "@/components/HomepageSidebar";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { useState } from "react";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "react-aria-components";
import Navbar from "../../../components/Navbars/MainNavbar";
import { SignInService } from "../../../services/auth";
import Swal from "sweetalert2";
import { ErrorMessages } from "../../../models";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { setCookie } from "nookies";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next-nprogress-bar";
import HomeLayout from "../../../layouts/homepageLayout";

const Index = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [signInForm, setSignInForm] = useState<{
    email?: string;
    password?: string;
  }>();
  const handleTriggerVisibility = () => {
    setIsHidden((prev) => !prev);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      Swal.fire({
        title: "กำลังเข้าสู่ระบบ",
        text: "กรุณารอสักครู่",
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });
      if (!signInForm?.email || !signInForm?.password) {
        throw new Error("โปรดกรอกข้อมูลให้ครบ");
      }
      const signIn = await SignInService({
        email: signInForm.email,
        password: signInForm.password,
      });

      queryClient.setQueryData(["user"], signIn.user);
      setCookie(null, "access_token", signIn.access_token, {
        maxAge: 1 * 24 * 60 * 60, // Cookie expiration time in seconds (e.g., 1 days)
        path: "/", // Cookie path (can be adjusted based on your needs)
      });
      router.push("/");

      Swal.fire({
        title: "เข้าสู่ระบบสำเร็จ",
        text: "ยินดีต้อนรับ",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
      let result = error as ErrorMessages;
      Swal.fire({
        title: "เกิดข้อผิดพลาด",
        text: result.message.toString(),
        footer: "รหัสข้อผิดพลาด: " + result.statusCode?.toString(),
        icon: "error",
      });
    }
  };

  const handleChangeSignInForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignInForm({
      ...signInForm,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <HomeLayout>
      <div className="flex min-h-screen bg-[#F4F8FF] font-Anuphan">
        <Head>
          <title>เข้าสู่ระบบ</title>
        </Head>
        {/* Left */}
        <HomepageSidebar />

        {/* Right */}
        <div className="flex w-full flex-col items-center  md:justify-center ">
          <div className="my-0 flex w-full flex-col items-center justify-center">
            {/* Sign-in*/}
            <div className="flex w-full flex-col items-center  gap-3 pt-10 md:pt-0">
              <h2 className="text-3xl font-bold text-[var(--primary-blue)]">
                เข้าสู่ระบบ
              </h2>

              <Form
                onSubmit={handleSignIn}
                className="mt-8 w-[70%] max-w-[30rem] bg-white p-8 drop-shadow-md"
              >
                <TextField
                  type="text"
                  isRequired
                  className="flex flex-col gap-3"
                >
                  <Label className="font-semibold text-[var(--primary-blue)]">
                    อีเมลล์
                  </Label>
                  <Input
                    name="email"
                    type="email"
                    onChange={handleChangeSignInForm}
                    className="w-full rounded-md bg-slate-300 p-2 pl-4"
                    placeholder="email"
                  />
                  <FieldError className="text-xs text-red-600" />
                </TextField>
                <TextField
                  type={isHidden ? "text" : "password"}
                  isRequired
                  className="relative mt-3 flex flex-col gap-3"
                >
                  <Label className="font-semibold text-[var(--primary-blue)]">
                    รหัสผ่าน
                  </Label>

                  <Input
                    name="password"
                    onChange={handleChangeSignInForm}
                    className="w-full rounded-md bg-slate-300 p-2 pl-4"
                    placeholder="Password"
                  />
                  <Button
                    onPress={handleTriggerVisibility}
                    className="absolute bottom-3 right-2 text-lg "
                  >
                    {isHidden ? <FaRegEye /> : <FaRegEyeSlash />}
                  </Button>

                  <FieldError className="text-xs text-red-600" />
                </TextField>

                <div className="mt-5 flex justify-center">
                  <Button
                    type="submit"
                    className="rounded-md bg-[var(--primary-blue)] px-3 py-2 text-white"
                  >
                    เข้าสู่ระบบ
                  </Button>
                </div>
              </Form>

              <div className="mt-3 flex w-[70%] max-w-[30rem] justify-between text-[var(--primary-blue)]">
                <button className="rounded-md border-2 border-solid border-[var(--primary-blue)] px-2 py-1 duration-300 hover:border-blue-600 hover:text-blue-600 ">
                  <Link href={"/auth/sign-up"}>ลงทะเบียน</Link>
                </button>
                <button className="underline duration-300 hover:text-blue-600">
                  <Link href={"/auth/forget-password"}>ลืมรหัสผ่าน</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Index;
