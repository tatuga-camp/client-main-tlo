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
import { ForgetPasswordService } from "../../../services/auth";
import { ErrorMessages } from "../../../models";

const Index = () => {
  const [isHidden, setIsHidden] = useState(false);
  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };
  const [forgetPasswordForm, setForgetPasswordForm] = useState<{
    email?: string;
    phone?: string;
  }>();
  const [wait, setWait] = useState(false);
  const [secound, setSecound] = useState(0);

  const handleChangeForgetPasswordForm = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setForgetPasswordForm({
      ...forgetPasswordForm,
      [e.target.name]: e.target.value,
    });
  };

  const hanldeTimmingWait = () => {
    setSecound(60); // Set the initial value of the countdown timer
    setWait(() => true);
    const timer = setInterval(() => {
      setSecound((prevCount) => prevCount - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      if (secound === 0) {
        setWait(() => false);
      }
      setWait(false);
      // Perform your action here after the wait duration
      // For example, you can set the `wait` state to false to indicate that the wait is over
    }, 60000); // Wait for 10 seconds (1000 milliseconds * 10)

    // Cleanup function
    return () => {
      clearInterval(timer);
    };
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

      if (!forgetPasswordForm?.email || !forgetPasswordForm?.phone) {
        throw new Error("โปรดกรอกข้อมูลให้ครบ");
      }
      const forget = await ForgetPasswordService({
        email: forgetPasswordForm?.email,
        phone: forgetPasswordForm?.phone.replace(/-/g, ""),
      });
      setWait(() => true);
      hanldeTimmingWait();
      Swal.fire({
        title: "สำเร็จ",
        text: "โปรดเปิดอีเมลของท่านเพื่อดำเนินการต่อ",
        footer: "ระบบได้ส่งอีเมลให้ท่านเรียบร้อยแล้ว",
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
          <title>ลืมรหัสผ่าน</title>
        </Head>

        {/* Left */}
        <HomepageSidebar />

        {/* Right */}
        <div className=" flex h-full w-full flex-col items-center   md:justify-center ">
          <div className="my-0 flex w-full flex-col items-center justify-center">
            <div className="flex w-full flex-col  items-center gap-3 pt-10">
              <h2 className="text-3xl font-bold text-[var(--primary-blue)]">
                ลืมรหัสผ่าน
              </h2>

              <Form
                onSubmit={handleSummitForgetPassword}
                className="mt-8 w-[70%] max-w-[30rem] bg-white p-8 drop-shadow-md"
              >
                <TextField isRequired className="flex flex-col gap-3">
                  <Label className="font-semibold text-[var(--primary-blue)]">
                    E-mail
                  </Label>
                  <Input
                    type="email"
                    name="email"
                    onChange={handleChangeForgetPasswordForm}
                    className="w-full rounded-md bg-slate-300 p-2 pl-4"
                    placeholder="กรอก E-mail ของท่าน"
                  />
                  <FieldError className="text-xs text-red-600" />
                </TextField>
                <TextField
                  type="tel"
                  isRequired
                  className="mt-3 flex flex-col gap-3"
                >
                  <Label className="font-semibold text-[var(--primary-blue)]">
                    หมายเลขโทรศัพท์
                  </Label>
                  <Input
                    onChange={handleChangeForgetPasswordForm}
                    name="phone"
                    type="tel"
                    className="w-full rounded-md bg-slate-300 p-2 pl-4"
                    placeholder="กรอกหมายเลขโทรศัพท์"
                  />
                  <FieldError className="text-xs text-red-600" />
                </TextField>

                <div className="mt-5 flex justify-center">
                  {wait ? (
                    <div className="rounded-md bg-[var(--primary-blue)] px-3 py-2 text-white">
                      โปรดตรวจสอบอีเมลของคุณ {secound}
                    </div>
                  ) : (
                    <Button
                      type="submit"
                      className="rounded-md bg-[var(--primary-blue)] px-3 py-2 text-white"
                    >
                      รีเซ็ตรหัสผ่าน
                    </Button>
                  )}
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
