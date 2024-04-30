import React, { useState } from "react";
import {
  Amphure,
  ErrorMessages,
  Province,
  Tambon,
  User,
} from "../../../models";
import { DefinedUseQueryResult } from "@tanstack/react-query";
import { InputMask, InputMaskChangeEvent } from "primereact/inputmask";
import {
  Button,
  FieldError,
  FileTrigger,
  Form,
  Input,
  Label,
  Link,
  TextField,
} from "react-aria-components";
import Image from "next/image";
import { FaImagePortrait } from "react-icons/fa6";
import ProviceCombobox from "../../Combobox/proviceCombobox";
import AmphureCombobox from "../../Combobox/amphureCombobox";
import TambonCombobox from "../../Combobox/tambonCombobox";
import Swal from "sweetalert2";
import { UpdateUserService } from "../../../services/user";
import {
  GetSignURLService,
  UploadSignURLService,
} from "../../../services/google-storage";
type BasicInformationProps = {
  user: DefinedUseQueryResult<User, Error>;
};
function BasicInformation({ user }: BasicInformationProps) {
  const [userForm, setUserForm] = useState<{
    firstName?: string;
    lastName?: string;
    title?: string;
    phone?: string;
    picture?: {
      url: string;
      file?: File;
    };
    idCard?: string;
    houseNumber?: string;
    villageNumber?: string;
    subDistrict?: Tambon;
    district?: Amphure;
    province?: Province;
    road?: string;
    zipCode?: string;
    department?: string;
    faculty?: string;
    major?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({
    firstName: user.data?.firstName,
    lastName: user.data?.lastName,
    picture: {
      url: user.data?.picture as string,
    },
    title: user.data?.title,
    phone: user.data?.phone,
    idCard: user.data?.idCard,
    houseNumber: user.data?.addressNumber,
    villageNumber: user.data?.moo,
    subDistrict: {
      name_th: user.data?.tambon,
    },
    district: {
      name_th: user.data?.amphure,
    },
    province: {
      name_th: user.data?.province,
    },

    road: user.data?.road,
    zipCode: user.data?.postalCode,
    department: user.data?.department,
    faculty: user.data?.faculty,
    major: user.data?.major,
  });

  const handleDataFromCombobox = ({
    value,
    type,
  }: {
    value: Province | Amphure | Tambon;
    type: "provice" | "amphure" | "tambon";
  }) => {
    if (type === "provice") {
      setUserForm({
        ...userForm,
        province: value as Province,
      });
    } else if (type === "amphure") {
      setUserForm({
        ...userForm,
        district: value as Amphure,
      });
    } else if (type === "tambon") {
      setUserForm({
        ...userForm,
        subDistrict: value as Tambon,
      });
    }
  };

  const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      Swal.fire({
        title: "กำลังแก้ไขข้อมูล",
        text: "กรุณารอสักครู่",
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });

      let profileURL = {
        picture: userForm?.picture?.url,
      };
      if (userForm.picture?.file) {
        const getSignURL = await GetSignURLService({
          fileName: userForm?.picture?.file?.name,
          fileType: userForm?.picture?.file?.type,
        });
        const uploadFile = await UploadSignURLService({
          contentType: userForm?.picture?.file?.type,
          file: userForm?.picture?.file,
          signURL: getSignURL.signURL,
        });
        profileURL.picture = getSignURL.originalURL;
      }
      if (profileURL.picture?.startsWith("data:image/jpeg;base64")) {
        delete profileURL.picture;
      }
      const updateUser = await UpdateUserService({
        title: userForm?.title,
        firstName: userForm?.firstName,
        lastName: userForm?.lastName,
        phone: userForm?.phone?.replace(/-/g, ""),
        ...profileURL,
        idCard: userForm?.idCard?.replace(/-/g, ""),
        addressNumber: userForm?.houseNumber,
        moo: userForm?.villageNumber,
        road: userForm?.road,
        tambon: userForm?.subDistrict?.name_th,
        amphure: userForm?.district?.name_th,
        province: userForm?.province?.name_th,
        postalCode: userForm?.zipCode,
        major: userForm?.major,
        faculty: userForm?.faculty,
        department: userForm?.department,
      });
      await user.refetch();
      setUserForm(() => {
        return {
          firstName: user.data?.firstName,
          lastName: user.data?.lastName,
          picture: {
            url: user.data?.picture as string,
          },
          title: user.data?.title,
          phone: user.data?.phone,
          idCard: user.data?.idCard,
          houseNumber: user.data?.addressNumber,
          villageNumber: user.data?.moo,
          subDistrict: {
            name_th: user.data?.tambon,
          },
          district: {
            name_th: user.data?.amphure,
          },
          province: {
            name_th: user.data?.province,
          },
          road: user.data?.road,
          zipCode: user.data?.postalCode,
          department: user.data?.department,
          faculty: user.data?.faculty,
          major: user.data?.major,
        };
      });
      Swal.fire({
        title: "แก้ไขข้อมูลสำเร็จ",
        text: "ข้อมูลของคุณได้รับการแก้ไขแล้ว",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
      let result = error as ErrorMessages;
      Swal.fire({
        title: `${result.error ? result.error : "เกิดข้อผิดพลาด"}`,
        text: result.message.toString(),
        footer:
          result.statusCode &&
          "รหัสข้อผิดพลาด: " + result.statusCode?.toString(),
        icon: "error",
      });
    }
  };

  const handleChangeUserForm = (
    e: React.ChangeEvent<HTMLInputElement> | InputMaskChangeEvent,
  ) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Form
      onSubmit={handleUpdateUser}
      className=" flex w-11/12 flex-col gap-2 bg-white p-8 md:w-6/12 "
    >
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="relative h-20 w-20 overflow-hidden rounded-sm">
          <Image
            src={userForm?.picture?.url as string}
            alt="profile"
            fill
            className="object-cover"
          />
        </div>
        <FileTrigger
          acceptedFileTypes={["image/png", "image/jpeg", "image/jpg"]}
          onSelect={(e) => {
            if (!e) return null;
            const files: FileList = e;
            const url = URL.createObjectURL(files[0]);
            setUserForm((prev) => {
              return {
                ...prev,
                picture: {
                  url,
                  file: files[0],
                },
              };
            });
            const reader = new FileReader();
            reader.readAsDataURL(files[0]);
          }}
        >
          <Button
            className="flex items-center justify-center gap-1 rounded-md bg-main-color px-4 py-1
         text-white drop-shadow-md transition duration-100 hover:bg-second-color hover:text-black active:scale-105"
          >
            <FaImagePortrait />
            อัพโหลดรูปภาพ
          </Button>
        </FileTrigger>
      </div>
      <TextField type="text" className="flex flex-col gap-1">
        <Label className="font-semibold text-[var(--primary-blue)]">
          คำนำหน้า
        </Label>
        <Input
          value={userForm?.title}
          onChange={handleChangeUserForm}
          name="title"
          type="text"
          className="h-10 w-full rounded-md bg-slate-300 p-2 pl-4"
          placeholder="คำนำหน้า"
        />
      </TextField>
      <TextField type="text" isRequired className="flex flex-col gap-1">
        <Label className="font-semibold text-[var(--primary-blue)]">
          ชื่อจริง
        </Label>
        <Input
          onChange={handleChangeUserForm}
          value={userForm?.firstName}
          name="firstName"
          type="text"
          className="h-10 w-full rounded-md bg-slate-300 p-2 pl-4"
          placeholder="ชื่อจริง"
        />
        <FieldError className="text-xs text-red-600" />
      </TextField>

      <TextField type="text" isRequired className=" flex flex-col gap-1">
        <Label className="font-semibold text-[var(--primary-blue)]">
          นามสกุล
        </Label>
        <Input
          onChange={handleChangeUserForm}
          value={userForm?.lastName}
          name="lastName"
          type="text"
          className="h-10 w-full rounded-md bg-slate-300 p-2 pl-4"
          placeholder="นามสกุล"
        />
        <FieldError className="text-xs text-red-600" />
      </TextField>

      <TextField type="telephone" isRequired className=" flex flex-col gap-1">
        <Label className="font-semibold text-[var(--primary-blue)]">
          หมายเลขโทรศัพท์
        </Label>
        <InputMask
          onChange={handleChangeUserForm}
          value={userForm?.phone}
          name="phone"
          className="h-10 w-full rounded-md bg-slate-300 p-2 pl-4"
          placeholder="กรอกหมายเลขโทรศัพท์"
          maxLength={10}
          inputMode="numeric"
          type="text"
          mask="999-999-9999"
        />
        <FieldError className="text-xs text-red-600" />
      </TextField>
      <TextField type="text" isRequired className=" flex flex-col gap-1">
        <Label className="font-semibold text-[var(--primary-blue)]">
          หมายเลขบัตรประชาชน
        </Label>
        <InputMask
          onChange={handleChangeUserForm}
          value={userForm?.idCard}
          name="idCard"
          className="h-10 w-full rounded-md bg-slate-300 p-2 pl-4"
          placeholder="กรอกหมายเลขบัตรประชาชน"
          maxLength={13}
          inputMode="numeric"
          type="text"
          mask="9-9999-99999-99-9"
        />

        <FieldError className="text-xs text-red-600" />
      </TextField>

      <p className="mt-14 font-bold text-[var(--primary-blue)]">ที่อยู่</p>

      <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
        <TextField type="text" isRequired className=" flex flex-col  gap-1">
          <div className="flex items-center gap-1">
            <Label className="w-20 font-semibold text-[var(--primary-blue)]">
              บ้านเลขที่
            </Label>
            <Input
              onChange={handleChangeUserForm}
              value={userForm?.houseNumber}
              name="houseNumber"
              type="text"
              className="h-10 w-full rounded-md bg-slate-300 p-2 pl-4 md:w-24"
              placeholder="บ้านเลขที่"
            />
          </div>

          <FieldError className="text-xs text-red-600" />
        </TextField>
        <TextField type="text" isRequired className=" flex flex-col gap-1">
          <div className="flex items-center ">
            <Label className="w-20 font-semibold text-[var(--primary-blue)]">
              หมู่ที่
            </Label>
            <Input
              onChange={handleChangeUserForm}
              value={userForm?.villageNumber}
              name="villageNumber"
              type="text"
              className="h-10 w-full rounded-md bg-slate-300 p-2 pl-4 md:w-24"
              placeholder="หมู่ที่"
            />
          </div>

          <FieldError className="text-xs text-red-600" />
        </TextField>
        <TextField type="text" isRequired className=" flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <Label className="w-20 font-semibold text-[var(--primary-blue)]">
              ถนน
            </Label>
            <Input
              onChange={handleChangeUserForm}
              value={userForm?.road}
              name="road"
              type="text"
              className="h-10 w-full rounded-md bg-slate-300 p-2 pl-4 md:w-24"
              placeholder="ถนน"
            />
          </div>

          <FieldError className="text-xs text-red-600" />
        </TextField>
      </div>

      <TextField type="text" isRequired className=" flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <Label className="w-20 font-semibold text-[var(--primary-blue)]">
            จังหวัด
          </Label>
          <ProviceCombobox
            selectProvince={userForm?.province as Province}
            handleDataFromCombobox={handleDataFromCombobox}
          />
        </div>

        <FieldError className="text-xs text-red-600" />
      </TextField>

      <TextField type="text" isRequired className=" flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <Label className="w-20 font-semibold text-[var(--primary-blue)]">
            อำเภอ
          </Label>
          <AmphureCombobox
            handleDataFromCombobox={handleDataFromCombobox}
            selectAmphure={userForm?.district as Amphure}
            selectProvinceId={userForm?.province?.originalId as number}
          />
        </div>

        <FieldError className="text-xs text-red-600" />
      </TextField>
      <TextField type="text" isRequired className=" flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <Label className="w-20 font-semibold text-[var(--primary-blue)]">
            ตำบล
          </Label>
          <TambonCombobox
            handleDataFromCombobox={handleDataFromCombobox}
            selectAmphureId={userForm?.district?.originalId as number}
            selectTambon={userForm?.subDistrict as Tambon}
          />
        </div>

        <FieldError className="text-xs text-red-600" />
      </TextField>

      <TextField type="text" isRequired className=" flex flex-col gap-1">
        <Label className=" font-semibold text-[var(--primary-blue)]">
          รหัสไปรษณีย์
        </Label>
        <Input
          onChange={handleChangeUserForm}
          value={userForm?.zipCode}
          name="zipCode"
          type="text"
          className="h-10 w-full rounded-md bg-slate-300 p-2 pl-4"
          placeholder="รหัสไปรษณีย์"
        />
        <FieldError className="text-xs text-red-600" />
      </TextField>

      <TextField type="text" isRequired className="mt-10 flex  flex-col gap-1">
        <Label className="font-semibold text-[var(--primary-blue)]">
          หน่วยงาน/สังกัด
        </Label>
        <Input
          onChange={handleChangeUserForm}
          value={userForm?.department}
          name="department"
          type="text"
          className="h-10 w-full rounded-md bg-slate-300 p-2 pl-4"
          placeholder="กรุณาเลือกหน่วยงาน/สังกัด"
        />
        <FieldError className="text-xs text-red-600" />
      </TextField>
      <TextField type="text" isRequired className=" flex flex-col gap-1">
        <Label className="font-semibold text-[var(--primary-blue)]">คณะ</Label>
        <Input
          onChange={handleChangeUserForm}
          value={userForm?.faculty}
          name="faculty"
          type="text"
          className="h-10 w-full rounded-md bg-slate-300 p-2 pl-4"
          placeholder="รหัสผ่าน"
        />
        <FieldError className="text-xs text-red-600" />
      </TextField>
      <TextField type="text" isRequired className=" flex flex-col gap-1">
        <Label className="font-semibold text-[var(--primary-blue)]">
          สาขาวิชา
        </Label>
        <Input
          onChange={handleChangeUserForm}
          value={userForm?.major}
          name="major"
          type="text"
          className="h-10 w-full rounded-md bg-slate-300 p-2 pl-4"
          placeholder="สาขาวิชา"
        />
        <FieldError className="text-xs text-red-600" />
      </TextField>

      <div className="mt-5 flex justify-center gap-6">
        <Button
          type="submit"
          className="rounded-md border-2 border-solid border-[var(--primary-blue)] bg-white px-3 py-2 font-semibold text-[var(--primary-blue)] duration-300 hover:border-blue-500 hover:text-blue-500"
        >
          แก้ไขข้อมูล
        </Button>
      </div>
    </Form>
  );
}

export default BasicInformation;
