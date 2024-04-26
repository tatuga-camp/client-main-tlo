import HomepageSidebar from "@/components/HomepageSidebar";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "react-aria-components";
import {
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from "react-aria-components";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";

const Index = () => {
  const [isHidden, setIsHidden] = useState<boolean>(false);

  const handleTriggerVisibility = () => {
    setIsHidden((prev) => !prev);
  };

  const [signUpCommonForm, setsignUpCommonForm] = useState<{
    firstName?: string;
    lastName?: string;
    phone?: string;
    houseNumber?: string;
    villageNumber?: string;
    subDistrict?: string;
    district?: string;
    province?: string;
    zipCode?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>();

  const handleSignUpCommon = async (e: React.FormEvent) => {
    try {
    } catch (err) {}
  };

  const handleChangeSignUpCommonForm = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setsignUpCommonForm({
      ...signUpCommonForm,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div className=" flex min-h-screen bg-[#F4F8FF] font-Anuphan">
        <Head>
          <title>ลงทะเบียน บุคคลภายนอก</title>
        </Head>
        <Navbar />
        {/* Left */}
        <HomepageSidebar />

        {/* Right */}
        <div className="mt-20 flex w-full flex-col items-center md:mt-5  md:justify-center ">
          <div className="my-0 flex w-full flex-col items-center justify-center">
            {/* Sign-up*/}
            <div className="flex w-full flex-col  items-center gap-3 pt-10">
              <h2 className="mt-10 text-3xl font-bold text-[var(--primary-blue)]">
                ลงทะเบียน
              </h2>
              <h1 className="font-semibold text-[#2166DD99]">บุคคลภายนอก</h1>

              <Form
                onSubmit={handleSignUpCommon}
                className="mt-8 w-[70%] max-w-[30rem] bg-white p-8 drop-shadow-md"
              >
                <Select
                  className="mb-6 flex w-full items-center gap-3"
                  placeholder="กรุณาเลือก"
                >
                  <Label className="font-semibold text-[var(--primary-blue)]">
                    คำนำหน้า
                  </Label>
                  <Button className="relative flex w-32 gap-3 rounded-md bg-slate-300 p-2 pl-4">
                    <SelectValue />
                    <span
                      aria-hidden="true"
                      className="absolute right-3 text-xl"
                    >
                      <MdKeyboardArrowDown />
                    </span>
                  </Button>
                  <Popover className="w-32  rounded-md bg-white p-2 font-Anuphan drop-shadow-md">
                    <ListBox className={"flex w-full flex-col gap-3"}>
                      <ListBoxItem>นาย</ListBoxItem>
                      <ListBoxItem>นาง</ListBoxItem>
                      <ListBoxItem>นางสาว</ListBoxItem>
                    </ListBox>
                  </Popover>
                </Select>
                <TextField
                  type="text"
                  isRequired
                  className="flex flex-col gap-3"
                >
                  <Label className="font-semibold text-[var(--primary-blue)]">
                    ชื่อจริง
                  </Label>
                  <Input
                    onChange={handleChangeSignUpCommonForm}
                    name="firstName"
                    type="text"
                    className="w-full rounded-md bg-slate-300 p-2 pl-4"
                    placeholder="ชื่อจริง"
                  />
                  <FieldError className="text-xs text-red-600" />
                </TextField>

                <TextField
                  type="text"
                  isRequired
                  className="mt-3 flex flex-col gap-3"
                >
                  <Label className="font-semibold text-[var(--primary-blue)]">
                    นามสกุล
                  </Label>
                  <Input
                    onChange={handleChangeSignUpCommonForm}
                    name="lastName"
                    type="text"
                    className="w-full rounded-md bg-slate-300 p-2 pl-4"
                    placeholder="ชื่อจริง"
                  />
                  <FieldError className="text-xs text-red-600" />
                </TextField>

                <TextField
                  type="telephone"
                  isRequired
                  className="mt-3 flex flex-col gap-3"
                >
                  <Label className="font-semibold text-[var(--primary-blue)]">
                    หมายเลขโทรศัพท์
                  </Label>
                  <Input
                    onChange={handleChangeSignUpCommonForm}
                    name="phone"
                    type="tel"
                    className="w-full rounded-md bg-slate-300 p-2 pl-4"
                    placeholder="กรอกหมายเลขโทรศัพท์"
                  />
                  <FieldError className="text-xs text-red-600" />
                </TextField>

                <p className="mt-14 font-bold text-[var(--primary-blue)]">
                  ที่อยู่
                </p>

                <div className="flex gap-3">
                  <TextField
                    type="text"
                    isRequired
                    className="mt-3 flex flex-col  gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <Label className="font-semibold text-[var(--primary-blue)]">
                        บ้านเลขที่
                      </Label>
                      <Input
                        onChange={handleChangeSignUpCommonForm}
                        name="houseNumber"
                        type="text"
                        className="w-24 rounded-md bg-slate-300 p-2 pl-4"
                        placeholder="บ้านเลขที่"
                      />
                    </div>

                    <FieldError className="text-xs text-red-600" />
                  </TextField>
                  <TextField
                    type="text"
                    isRequired
                    className="mt-3 flex flex-col gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <Label className="font-semibold text-[var(--primary-blue)]">
                        หมู่ที่
                      </Label>
                      <Input
                        onChange={handleChangeSignUpCommonForm}
                        name="villageNumber"
                        type="text"
                        className="w-24 rounded-md bg-slate-300 p-2 pl-4"
                        placeholder="หมู่ที่"
                      />
                    </div>

                    <FieldError className="text-xs text-red-600" />
                  </TextField>
                </div>

                <TextField
                  type="text"
                  isRequired
                  className="mt-3 flex flex-col gap-3"
                >
                  <div className="flex items-center gap-3">
                    <Label className="font-semibold text-[var(--primary-blue)]">
                      ตำบล
                    </Label>
                    <Input
                      onChange={handleChangeSignUpCommonForm}
                      name="subDistrict"
                      type="text"
                      className="w-full rounded-md bg-slate-300 p-2 pl-4"
                      placeholder="ตำบล"
                    />
                  </div>

                  <FieldError className="text-xs text-red-600" />
                </TextField>
                <TextField
                  type="text"
                  isRequired
                  className="mt-3 flex flex-col gap-3"
                >
                  <div className="flex items-center gap-3">
                    <Label className="font-semibold text-[var(--primary-blue)]">
                      อำเภอ
                    </Label>
                    <Input
                      onChange={handleChangeSignUpCommonForm}
                      name="district"
                      type="text"
                      className="w-full rounded-md bg-slate-300 p-2 pl-4"
                      placeholder="อำเภอ"
                    />
                  </div>

                  <FieldError className="text-xs text-red-600" />
                </TextField>
                <TextField
                  type="text"
                  isRequired
                  className="mt-3 flex flex-col gap-3"
                >
                  <div className="flex items-center gap-3">
                    <Label className="font-semibold text-[var(--primary-blue)]">
                      จังหวัด
                    </Label>
                    <Input
                      onChange={handleChangeSignUpCommonForm}
                      name="province"
                      type="text"
                      className="w-full rounded-md bg-slate-300 p-2 pl-4"
                      placeholder="จังหวัด"
                    />
                  </div>

                  <FieldError className="text-xs text-red-600" />
                </TextField>
                <TextField
                  type="text"
                  isRequired
                  className="mt-3 flex flex-col gap-3"
                >
                  <Label className="font-semibold text-[var(--primary-blue)]">
                    รหัสไปรษณีย์
                  </Label>
                  <Input
                    onChange={handleChangeSignUpCommonForm}
                    name="zipCode"
                    type="text"
                    className="w-full rounded-md bg-slate-300 p-2 pl-4"
                    placeholder="รหัสไปรษณีย์"
                  />
                  <FieldError className="text-xs text-red-600" />
                </TextField>

                <TextField
                  type="text"
                  isRequired
                  className="mt-14 flex flex-col gap-3"
                >
                  <Label className="font-semibold text-[var(--primary-blue)]">
                    E-mail
                  </Label>
                  <Input
                    onChange={handleChangeSignUpCommonForm}
                    name="email"
                    type="email"
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
                    onChange={handleChangeSignUpCommonForm}
                    name="password"
                    className="w-full rounded-md bg-slate-300 p-2 pl-4"
                    placeholder="รหัสผ่าน"
                  />
                  <Button
                    onPress={handleTriggerVisibility}
                    className="absolute right-2 top-12 text-lg "
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
                    ยืนยันรหัสผ่าน
                  </Label>

                  <Input
                    onChange={handleChangeSignUpCommonForm}
                    name="confirmPassword"
                    className="w-full rounded-md bg-slate-300 p-2 pl-4"
                    placeholder="ยืนยันรหัสผ่าน"
                  />
                  <Button
                    onPress={handleTriggerVisibility}
                    className="absolute right-2 top-12 text-lg "
                  >
                    {isHidden ? <FaRegEye /> : <FaRegEyeSlash />}
                  </Button>

                  <FieldError className="text-xs text-red-600" />
                </TextField>

                <div className="mt-5 flex justify-center gap-6">
                  <Link
                    href={"/auth/sign-up"}
                    className="rounded-md border-2 border-solid border-[var(--primary-blue)] bg-white px-3 py-2 font-semibold text-[var(--primary-blue)] duration-300 hover:border-blue-500 hover:text-blue-500"
                  >
                    ย้อนกลับ
                  </Link>
                  <Button
                    type="submit"
                    className="rounded-md border-2 border-solid border-[var(--primary-blue)] bg-white px-3 py-2 font-semibold text-[var(--primary-blue)] duration-300 hover:border-blue-500 hover:text-blue-500"
                  >
                    ลงทะเบียน
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
