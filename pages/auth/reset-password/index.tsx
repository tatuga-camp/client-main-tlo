import HomepageSidebar from "@/components/HomepageSidebar";
import LogoFile from "@/components/LogoFile";
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
import HomeLayout from "../../../layouts/homepageLayout";
import Navbar from "../../../components/Navbar";
import Swal from "sweetalert2";
import {
  ForgetPasswordService,
  ResetPasswordService,
} from "../../../services/auth";
import { ErrorMessages } from "../../../models";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Index = () => {
  const router = useRouter();
  const [isHidden, setIsHidden] = useState(false);
  const handleTriggerVisibility = () => {
    setIsHidden((prev) => !prev);
  };
  const [resetPassword, setResetPassword] = useState<{
    password?: string;
    confirmPassword?: string;
  }>();

  const handleChangeResetPassword = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setResetPassword({
      ...resetPassword,
      [e.target.name]: e.target.value,
    });
  };

  const handleSummitForgetPassword = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      Swal.fire({
        title: "กำลังดำเนินการ",
        text: "กรุณารอสักครู่",
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });

      if (!resetPassword?.password || !resetPassword?.confirmPassword) {
        throw new Error("โปรดกรอกข้อมูลให้ครบ");
      }

      if (resetPassword.confirmPassword !== resetPassword.password) {
        throw new Error("รหัสผ่านไม่ตรงกัน");
      }
      const forget = await ResetPasswordService({
        passwordResetToken: router.query.passwordResetToken as string,
        newPassword: resetPassword?.password,
      });

      Swal.fire({
        title: "สำเร็จ",
        text: "เปลี่ยนรหัสสำเร็จ",
        footer: "โปรดเข้าสู่ระบบอีกครั้ง",
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

  return (
    <HomeLayout>
      <div className=" flex min-h-screen bg-[#F4F8FF] font-Anuphan">
        <Head>
          <title>เปลี่ยนรหัสผ่านใหม่</title>
        </Head>

        {/* Left */}
        <HomepageSidebar />

        {/* Right */}
        <div className="  flex h-full w-full flex-col items-center   md:justify-center ">
          <div className="my-0 flex w-full flex-col items-center justify-center">
            <div className="flex w-full flex-col  items-center gap-3 pt-10">
              <h2 className="text-3xl font-bold text-[var(--primary-blue)]">
                เปลี่ยนรหัสผ่านใหม่
              </h2>

              <Form
                onSubmit={handleSummitForgetPassword}
                className="mt-8 w-[70%] max-w-[30rem] bg-white p-8 drop-shadow-md"
              >
                <TextField
                  type={isHidden ? "text" : "password"}
                  isRequired
                  className="relative mt-3 flex flex-col gap-3"
                >
                  <Label className="font-semibold text-[var(--primary-blue)]">
                    รหัสผ่านใหม่
                  </Label>

                  <Input
                    onChange={handleChangeResetPassword}
                    name="password"
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
                <TextField
                  type={isHidden ? "text" : "password"}
                  isRequired
                  className="relative mt-3 flex flex-col gap-3"
                >
                  <Label className="font-semibold text-[var(--primary-blue)]">
                    รหัสผ่าน
                  </Label>

                  <Input
                    onChange={handleChangeResetPassword}
                    name="confirmPassword"
                    className="w-full rounded-md bg-slate-300 p-2 pl-4"
                    placeholder="Confirm Password"
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
                    รีเซ็ตรหัสผ่าน
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Index;
