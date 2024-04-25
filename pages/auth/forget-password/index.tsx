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

const Index = () => {
  const [isHidden, setIsHidden] = useState(false);
  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };
  return (
    <div className=" flex min-h-screen bg-[#F4F8FF] font-Anuphan">
      <Head>
        <title>ลืมรหัสผ่าน</title>
      </Head>
      <Navbar />
      {/* Left */}
      <HomepageSidebar />

      {/* Right */}
      <div className=" mt-20 flex h-full w-full flex-col items-center  md:mt-20 md:justify-center ">
        <div className="my-0 flex w-full flex-col items-center justify-center">
          <div className="flex w-full flex-col  items-center gap-3 pt-10">
            <h2 className="text-3xl font-bold text-[var(--primary-blue)]">
              ลืมรหัสผ่าน
            </h2>

            <Form
              // onSubmit={handleSubmitSignIn}
              className="mt-8 w-[70%] max-w-[30rem] bg-white p-8 drop-shadow-md"
            >
              <TextField
                name="email"
                type="email"
                isRequired
                className="flex flex-col gap-3"
              >
                <Label className="font-semibold text-[var(--primary-blue)]">
                  E-mail
                </Label>
                <Input
                  // onChange={handleChangeSignInForm}
                  className="w-full rounded-md bg-slate-300 p-2 pl-4"
                  placeholder="กรอก E-mail ของท่าน"
                />
              </TextField>
              <TextField
                name="phone"
                type="telephone"
                isRequired
                className="mt-3 flex flex-col gap-3"
              >
                <Label className="font-semibold text-[var(--primary-blue)]">
                  หมายเลขโทรศัพท์
                </Label>
                <Input
                  // onChange={handleChangeSignInForm}
                  className="w-full rounded-md bg-slate-300 p-2 pl-4"
                  placeholder="กรอกหมายเลขโทรศัพท์"
                />
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
  );
};

export default Index;
