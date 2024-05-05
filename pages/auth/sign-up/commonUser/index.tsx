import HomepageSidebar from "@/components/HomepageSidebar";
import Navbar from "@/components/Navbars/MainNavbar";
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
import { Amphure, ErrorMessages, Province, Tambon } from "../../../../models";
import { InputMask, InputMaskChangeEvent } from "primereact/inputmask";
import ProviceCombobox from "../../../../components/Combobox/proviceCombobox";
import AmphureCombobox from "../../../../components/Combobox/amphureCombobox";
import TambonCombobox from "../../../../components/Combobox/tambonCombobox";
import Swal from "sweetalert2";
import { SingUpService } from "../../../../services/auth";
import { useRouter } from "next-nprogress-bar";
import HomeLayout from "../../../../layouts/homepageLayout";

const Index = () => {
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const router = useRouter();

  const handleTriggerVisibility = () => {
    setIsHidden((prev) => !prev);
  };

  const [signUpCommonForm, setsignUpCommonForm] = useState<{
    firstName?: string;
    lastName?: string;
    phone?: string;
    idCard?: string;
    houseNumber?: string;
    villageNumber?: string;
    road?: string;
    subDistrict?: Tambon;
    district?: Amphure;
    province?: Province;
    zipCode?: string;
    email?: string;
    password?: string;
    title?: string;
    confirmPassword?: string;
  }>();

  const handleSignUpCommon = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      Swal.fire({
        title: "กำลังสมัครสมาชิก",
        text: "กรุณารอสักครู่",
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });
      if (signUpCommonForm?.password !== signUpCommonForm?.confirmPassword) {
        throw new Error("รหัสผ่านไม่ตรงกัน");
      }
      if (
        !signUpCommonForm?.email ||
        !signUpCommonForm?.password ||
        !signUpCommonForm?.confirmPassword ||
        !signUpCommonForm?.firstName ||
        !signUpCommonForm?.lastName ||
        !signUpCommonForm?.title ||
        !signUpCommonForm?.phone ||
        !signUpCommonForm?.idCard ||
        !signUpCommonForm?.houseNumber ||
        !signUpCommonForm?.villageNumber ||
        !signUpCommonForm?.subDistrict ||
        !signUpCommonForm?.district ||
        !signUpCommonForm?.province ||
        !signUpCommonForm?.zipCode ||
        !signUpCommonForm?.road ||
        !signUpCommonForm?.subDistrict ||
        !signUpCommonForm?.district ||
        !signUpCommonForm?.province
      ) {
        throw new Error("กรุณากรอกข้อมูลให้ครบถ้วน");
      }
      const signUp = await SingUpService({
        email: signUpCommonForm?.email,
        firstName: signUpCommonForm?.firstName,
        lastName: signUpCommonForm?.lastName,
        password: signUpCommonForm?.password,
        title: signUpCommonForm?.title,
        phone: signUpCommonForm?.phone.replace(/-/g, ""),
        type: "EXTERNAL",
        idCard: signUpCommonForm?.idCard.replace(/-/g, ""),
        addressNumber: signUpCommonForm?.houseNumber,
        moo: signUpCommonForm?.villageNumber,
        road: signUpCommonForm?.road,
        tambon: signUpCommonForm?.subDistrict.name_th,
        amphure: signUpCommonForm?.district.name_th,
        province: signUpCommonForm?.province.name_th,
        nationality: "Thai",
        postalCode: signUpCommonForm?.zipCode,
      });
      router.push("/auth/sign-in");
      Swal.fire({
        title: "สมัครสมาชิกสำเร็จ",
        text: "ยินดีต้อนรับ",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
      let result = error as ErrorMessages;
      Swal.fire({
        title: result.error ? result.error : "เกิดข้อผิดพลาด",
        text: result.message.toString(),
        footer: result.statusCode
          ? "รหัสข้อผิดพลาด: " + result.statusCode?.toString()
          : "",
        icon: "error",
      });
    }
  };

  const handleDataFromCombobox = ({
    value,
    type,
  }: {
    value: Province | Amphure | Tambon;
    type: "provice" | "amphure" | "tambon";
  }) => {
    if (type === "provice") {
      setsignUpCommonForm((prev) => {
        return {
          ...prev,
          province: value as Province,
        };
      });
    } else if (type === "amphure") {
      setsignUpCommonForm((prev) => {
        return {
          ...prev,
          district: value as Amphure,
        };
      });
    } else if (type === "tambon") {
      setsignUpCommonForm((prev) => {
        return {
          ...prev,
          subDistrict: value as Tambon,
        };
      });
    }
  };

  const handleChangeSignUpCommonForm = (
    e: React.ChangeEvent<HTMLInputElement> | InputMaskChangeEvent,
  ) => {
    setsignUpCommonForm({
      ...signUpCommonForm,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <HomeLayout>
      <div>
        <div className=" flex min-h-screen bg-[#F4F8FF] font-Anuphan">
          <Head>
            <title>ลงทะเบียน บุคคลภายนอก</title>
          </Head>

          {/* Left */}
          <HomepageSidebar />

          {/* Right */}
          <div className=" flex w-full flex-col items-center  md:justify-center ">
            <div className="my-0 flex w-full flex-col items-center justify-center">
              {/* Sign-up*/}
              <div className="flex w-full flex-col  items-center gap-3 pt-10">
                <h2 className="mt-10 text-3xl font-bold text-[var(--primary-blue)]">
                  ลงทะเบียน
                </h2>
                <h1 className="font-semibold text-[#2166DD99]">บุคคลภายนอก</h1>

                <Form
                  onSubmit={handleSignUpCommon}
                  className="mt-8 flex w-11/12 flex-col gap-3 bg-white p-8 md:w-[70%] md:max-w-[30rem]"
                >
                  <TextField type="text" className="flex flex-col gap-1">
                    <Label className="font-semibold text-[var(--primary-blue)]">
                      คำนำหน้า
                    </Label>
                    <Input
                      onChange={handleChangeSignUpCommonForm}
                      name="title"
                      type="text"
                      className="h-10 w-full rounded-md bg-slate-300 p-2 pl-4"
                      placeholder="คำนำหน้า"
                    />
                  </TextField>
                  <TextField
                    type="text"
                    isRequired
                    className="flex flex-col gap-1"
                  >
                    <Label className="font-semibold text-[var(--primary-blue)]">
                      ชื่อจริง
                    </Label>
                    <Input
                      onChange={handleChangeSignUpCommonForm}
                      name="firstName"
                      type="text"
                      className="h-10 w-full rounded-md bg-slate-300 p-2 pl-4"
                      placeholder="ชื่อจริง"
                    />
                    <FieldError className="text-xs text-red-600" />
                  </TextField>

                  <TextField
                    type="text"
                    isRequired
                    className=" flex flex-col gap-1"
                  >
                    <Label className="font-semibold text-[var(--primary-blue)]">
                      นามสกุล
                    </Label>
                    <Input
                      onChange={handleChangeSignUpCommonForm}
                      name="lastName"
                      type="text"
                      className="h-10 w-full rounded-md bg-slate-300 p-2 pl-4"
                      placeholder="นามสกุล"
                    />
                    <FieldError className="text-xs text-red-600" />
                  </TextField>

                  <TextField
                    type="telephone"
                    isRequired
                    className=" flex flex-col gap-1"
                  >
                    <Label className="font-semibold text-[var(--primary-blue)]">
                      หมายเลขโทรศัพท์
                    </Label>
                    <InputMask
                      name="phone"
                      onChange={handleChangeSignUpCommonForm}
                      className="h-10 w-full rounded-md bg-slate-300 p-2 pl-4"
                      placeholder="กรอกหมายเลขโทรศัพท์"
                      maxLength={10}
                      inputMode="numeric"
                      type="text"
                      mask="999-999-9999"
                    />
                    <FieldError className="text-xs text-red-600" />
                  </TextField>
                  <TextField
                    type="text"
                    isRequired
                    className=" flex flex-col gap-1"
                  >
                    <Label className="font-semibold text-[var(--primary-blue)]">
                      หมายเลขบัตรประชาชน
                    </Label>
                    <InputMask
                      name="idCard"
                      onChange={handleChangeSignUpCommonForm}
                      className="h-10 w-full rounded-md bg-slate-300 p-2 pl-4"
                      placeholder="กรอกหมายเลขบัตรประชาชน"
                      maxLength={13}
                      inputMode="numeric"
                      type="text"
                      mask="9-9999-99999-99-9"
                    />

                    <FieldError className="text-xs text-red-600" />
                  </TextField>

                  <p className="mt-14 font-bold text-[var(--primary-blue)]">
                    ที่อยู่
                  </p>

                  <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
                    <TextField
                      type="text"
                      isRequired
                      className=" flex flex-col  gap-1"
                    >
                      <div className="flex items-center gap-1">
                        <Label className="w-20 font-semibold text-[var(--primary-blue)]">
                          บ้านเลขที่
                        </Label>
                        <Input
                          onChange={handleChangeSignUpCommonForm}
                          name="houseNumber"
                          type="text"
                          className="h-10 w-full rounded-md bg-slate-300 p-2 pl-4 md:w-24"
                          placeholder="บ้านเลขที่"
                        />
                      </div>

                      <FieldError className="text-xs text-red-600" />
                    </TextField>
                    <TextField
                      type="text"
                      isRequired
                      className=" flex flex-col gap-1"
                    >
                      <div className="flex items-center gap-1">
                        <Label className="w-20 font-semibold text-[var(--primary-blue)]">
                          หมู่ที่
                        </Label>
                        <Input
                          onChange={handleChangeSignUpCommonForm}
                          name="villageNumber"
                          type="text"
                          className="h-10 w-full rounded-md bg-slate-300 p-2 pl-4 md:w-24"
                          placeholder="หมู่ที่"
                        />
                      </div>

                      <FieldError className="text-xs text-red-600" />
                    </TextField>
                    <TextField
                      type="text"
                      isRequired
                      className=" flex flex-col gap-1"
                    >
                      <div className="flex items-center gap-1">
                        <Label className="w-20 font-semibold text-[var(--primary-blue)]">
                          ถนน
                        </Label>
                        <Input
                          onChange={handleChangeSignUpCommonForm}
                          name="road"
                          type="text"
                          className="h-10 w-full rounded-md bg-slate-300 p-2 pl-4 md:w-24"
                          placeholder="ถนน"
                        />
                      </div>

                      <FieldError className="text-xs text-red-600" />
                    </TextField>
                  </div>

                  <TextField
                    type="text"
                    isRequired
                    className=" flex flex-col gap-1"
                  >
                    <div className="flex items-center gap-1">
                      <Label className=" w-20 font-semibold text-[var(--primary-blue)]">
                        จังหวัด
                      </Label>
                      <ProviceCombobox
                        selectProvince={signUpCommonForm?.province as Province}
                        handleDataFromCombobox={handleDataFromCombobox}
                      />
                    </div>

                    <FieldError className="text-xs text-red-600" />
                  </TextField>

                  <TextField
                    type="text"
                    isRequired
                    className=" flex flex-col gap-1"
                  >
                    <div className="flex items-center gap-1">
                      <Label className="w-20 font-semibold text-[var(--primary-blue)]">
                        อำเภอ
                      </Label>
                      <AmphureCombobox
                        handleDataFromCombobox={handleDataFromCombobox}
                        selectAmphure={signUpCommonForm?.district as Amphure}
                        selectProvinceId={
                          signUpCommonForm?.province?.originalId as number
                        }
                      />
                    </div>

                    <FieldError className="text-xs text-red-600" />
                  </TextField>
                  <TextField
                    type="text"
                    isRequired
                    className=" flex flex-col gap-1"
                  >
                    <div className="flex items-center gap-1">
                      <Label className="w-20 font-semibold text-[var(--primary-blue)]">
                        ตำบล
                      </Label>
                      <TambonCombobox
                        handleDataFromCombobox={handleDataFromCombobox}
                        selectAmphureId={
                          signUpCommonForm?.district?.originalId as number
                        }
                        selectTambon={signUpCommonForm?.subDistrict as Tambon}
                      />
                    </div>

                    <FieldError className="text-xs text-red-600" />
                  </TextField>

                  <TextField
                    type="text"
                    isRequired
                    className=" flex flex-col gap-1"
                  >
                    <Label className="font-semibold text-[var(--primary-blue)]">
                      รหัสไปรษณีย์
                    </Label>
                    <Input
                      onChange={handleChangeSignUpCommonForm}
                      name="zipCode"
                      type="text"
                      className="h-10 w-full rounded-md bg-slate-300 p-2 pl-4"
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
                    className="relative flex flex-col gap-3"
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
                    className="relative flex flex-col gap-3"
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
    </HomeLayout>
  );
};

export default Index;
