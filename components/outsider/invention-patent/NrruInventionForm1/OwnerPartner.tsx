import React, { useState } from "react";
import { PartnerStatus, partnerStatus } from "../../../../data/invention";
import { Amphure, Province, Tambon } from "../../../../models";
import { Dropdown } from "primereact/dropdown";
import NumberTitle from "@/components/Number";
import { FieldError, Input, Label, TextField } from "react-aria-components";
import { InputMask, InputMaskChangeEvent } from "primereact/inputmask";
import ProviceCombobox from "../../../Combobox/proviceCombobox";
import AmphureCombobox from "../../../Combobox/amphureCombobox";
import TambonCombobox from "../../../Combobox/tambonCombobox";
import SnackbarSaveData from "../../../Snackbars/SnackbarSaveData";
import { OwnerPartnerType } from "./NrruInventionForm1";

type OwnerPartnerProps = {
  setSnackBarData: (
    value: React.SetStateAction<{
      open: boolean;
      action: React.ReactNode;
    }>,
  ) => void;
  ownerData: OwnerPartnerType | undefined;
  setOwnerData: React.Dispatch<
    React.SetStateAction<OwnerPartnerType | undefined>
  >;
};
function OwnerPartner({
  setSnackBarData,
  ownerData,
  setOwnerData,
}: OwnerPartnerProps) {
  const handleChangePartnerData = (
    e: React.ChangeEvent<HTMLInputElement> | InputMaskChangeEvent,
  ) => {
    setSnackBarData(() => {
      return {
        open: true,
        action: <SnackbarSaveData />,
      };
    });

    const { name, value } = e.target;
    setOwnerData({ ...ownerData, [name]: value });
  };

  const handleDataFromCombobox = ({
    id,
    value,
    type,
  }: {
    id?: string;
    value: Province | Amphure | Tambon;
    type: "provice" | "amphure" | "tambon";
  }) => {
    if (type === "provice") {
      setOwnerData((prev) => {
        return {
          ...prev,
          province: value as Province,
        };
      });
    } else if (type === "amphure") {
      setOwnerData((prev) => {
        return {
          ...prev,
          amphure: value as Province,
        };
      });
    } else if (type === "tambon") {
      setOwnerData((prev) => {
        return {
          ...prev,
          tambon: value as Province,
        };
      });
    }
  };

  return (
    <div
      className={`flex flex-col gap-5 rounded-lg p-5 ring-1 ring-gray-400  `}
    >
      <h1 className="text-lg font-semibold underline underline-offset-2">
        ผู้ขอรับสิทธิบัตร/อนุสิทธิบัตร
      </h1>
      <div className="flex flex-col gap-1">
        <div className="w-80 rounded-lg bg-slate-300 p-1">
          <Dropdown
            required
            value={ownerData?.status}
            onChange={(e) =>
              setOwnerData({ ...ownerData, status: e.value as PartnerStatus })
            }
            options={partnerStatus}
            placeholder="เลือกสถานะ"
            className="md:w-14rem w-full"
          />
        </div>

        {!ownerData?.status && (
          <span className="text-xs text-red-700">
            Please fill out this field.
          </span>
        )}
      </div>
      <section className="flex items-start justify-start gap-3 md:items-center md:gap-5">
        <NumberTitle number={1} />
        {(ownerData?.status === "นิติบุคคล" ||
          ownerData?.status === "มูลนิธิ" ||
          ownerData?.status === "หน่วยงานรัฐ") && (
          <TextField className={"flex w-full items-center gap-3 "}>
            <Label className=" text-[var(--primary-blue) min-w-20 font-semibold md:min-w-24">
              ชื่อของนิติบุคคลหรือหน่วยงานรัฐหรือมูลนิธ
            </Label>
            <div className="flex w-96 flex-col gap-1">
              <Input
                required
                name="fullName"
                onChange={handleChangePartnerData}
                value={ownerData?.fullName}
                type="text"
                className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                placeholder="ระบุชื่อ"
              />
              <FieldError className="text-xs text-red-700" />
            </div>
          </TextField>
        )}
        {(ownerData?.status === "บุคคลธรรมดา" ||
          ownerData?.status === "อื่น ๆ" ||
          !ownerData?.status) && (
          <div className="flex w-full flex-col gap-3 text-[0.8rem] md:flex-row md:gap-5 md:text-base">
            <TextField className={"flex w-full items-center gap-3 md:w-[50%]"}>
              <Label className=" text-[var(--primary-blue) min-w-20 font-semibold md:min-w-24">
                คำนำหน้าชื่อ
              </Label>
              <div className="flex flex-col gap-1">
                <Input
                  required
                  name="title"
                  onChange={handleChangePartnerData}
                  value={ownerData?.title}
                  type="text"
                  className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                  placeholder="คำนำหน้า"
                />
                <FieldError className="text-xs text-red-700" />
              </div>
            </TextField>
            <TextField className={"flex w-full items-center gap-3 md:w-[50%]"}>
              <Label className="min-w-14 font-semibold text-[var(--primary-blue)] md:min-w-16">
                ชื่อ
              </Label>
              <div className="flex flex-col gap-1">
                <Input
                  required
                  value={ownerData?.firstName}
                  onChange={handleChangePartnerData}
                  name="firstName"
                  type="text"
                  className="h-8 w-60 rounded-md bg-slate-300 p-1 pl-3 md:h-10  md:p-2 md:pl-4"
                  placeholder="ชื่อจริง"
                />

                <FieldError className="text-xs text-red-700" />
              </div>
            </TextField>
            <TextField className={"flex w-full items-center gap-3 md:w-[50%]"}>
              <Label className="min-w-14 font-semibold text-[var(--primary-blue)] md:min-w-16">
                นามสกุล
              </Label>
              <div className="flex flex-col gap-1">
                <Input
                  required
                  value={ownerData?.lastName}
                  onChange={handleChangePartnerData}
                  name="lastName"
                  type="text"
                  className="h-8 w-60 rounded-md bg-slate-300 p-1 pl-3 md:h-10  md:p-2 md:pl-4"
                  placeholder="นามสกุล"
                />
                <FieldError className="text-xs text-red-700" />
              </div>
            </TextField>
          </div>
        )}
      </section>

      {/* ข้อ 2*/}
      <section className="flex items-start justify-center gap-3 md:items-center md:gap-5">
        <NumberTitle number={2} />
        <div className="flex w-full flex-col gap-3 text-[0.8rem] md:flex-row md:gap-5 md:text-base">
          <TextField className={"flex w-full items-center gap-3 md:w-[60%] "}>
            <Label className=" text-[var(--primary-blue) min-w-24 font-semibold md:min-w-max">
              เลขประจำตัวประชาชน/เลขทะเบียนนิติบุคคล/เลขประจำตัวผู้เสียภาษีอาการ
            </Label>
            <div className="flex flex-col gap-1">
              <InputMask
                required
                value={ownerData?.idCard}
                onChange={handleChangePartnerData}
                name="idCard"
                className="h-8 w-72 rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                placeholder="กรอกหมายเลขบัตรประชาชน"
                inputMode="numeric"
                type="text"
                mask="9-9999-99999-99-9"
              />
              <FieldError className="text-xs text-red-700" />
            </div>
          </TextField>
        </div>
      </section>

      {/* ข้อ 3*/}
      <section className="flex items-start justify-start  gap-3  md:gap-5">
        <NumberTitle number={3} />
        <div className="flex w-full flex-wrap gap-5">
          <TextField className={"flex  items-center gap-3  "}>
            <p className="font-semibold">ที่อยู่ (ตามบัตรประชาชน)</p>
            <Label className=" text-[var(--primary-blue) font-medium ">
              บ้านเลขที่
            </Label>
            <div className="flex flex-col gap-1">
              <Input
                required
                value={ownerData?.houseNumber}
                onChange={handleChangePartnerData}
                name="houseNumber"
                type="text"
                className="ounded-md h-8  w-40 bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                placeholder="บ้านเลขที่"
              />
              <FieldError className="text-xs text-red-700" />
            </div>
          </TextField>
          <TextField className={"flex  items-center gap-3  "}>
            <Label className=" text-[var(--primary-blue) font-medium ">
              หมู่ที่
            </Label>
            <div className="flex flex-col gap-1">
              <Input
                required
                value={ownerData?.villageNumber}
                onChange={handleChangePartnerData}
                name="villageNumber"
                type="text"
                className="h-8 w-40   rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                placeholder="หมู่"
              />
              <FieldError className="text-xs text-red-700" />
            </div>
          </TextField>
          <TextField className={"flex   items-center gap-3  "}>
            <Label className=" text-[var(--primary-blue) font-medium ">
              ถนน
            </Label>
            <div className="flex flex-col gap-1">
              <Input
                required
                value={ownerData?.road}
                onChange={handleChangePartnerData}
                name="road"
                type="text"
                className="h-8 w-40  rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                placeholder="ถนน"
              />
              <FieldError className="text-xs text-red-700" />
            </div>
          </TextField>
          <TextField className={"flex w-72  items-center gap-3  "}>
            <Label className=" text-[var(--primary-blue) font-medium ">
              จังหวัด
            </Label>

            <ProviceCombobox
              selectProvince={ownerData?.province}
              handleDataFromCombobox={handleDataFromCombobox}
            />
          </TextField>
          <TextField className={"flex w-72  items-center gap-3  "}>
            <Label className=" text-[var(--primary-blue) font-medium ">
              อำเภอ
            </Label>

            <AmphureCombobox
              selectAmphure={ownerData?.amphure}
              selectProvinceId={ownerData?.province?.originalId}
              handleDataFromCombobox={handleDataFromCombobox}
            />
          </TextField>
          <TextField className={"flex w-72  items-center gap-3  "}>
            <Label className=" text-[var(--primary-blue) font-medium ">
              ตำบล
            </Label>
            <TambonCombobox
              selectAmphureId={ownerData?.amphure?.originalId}
              selectTambon={ownerData?.tambon}
              handleDataFromCombobox={handleDataFromCombobox}
            />
          </TextField>
          <TextField className={"flex  items-center gap-3  "}>
            <Label className=" text-[var(--primary-blue) font-medium ">
              รหัสไปรษณีย์
            </Label>
            <div className="flex flex-col gap-1">
              <Input
                required
                value={ownerData?.zipCode}
                onChange={handleChangePartnerData}
                name="zipCode"
                type="text"
                className="h-8 w-40 rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                placeholder="36120"
              />
              <FieldError className="text-xs text-red-700" />
            </div>
          </TextField>
        </div>
      </section>

      {/* ข้อ 6*/}
      <section className="flex items-start justify-center gap-3 md:items-center md:gap-5">
        <NumberTitle number={4} />
        <div className="flex w-full flex-col gap-3 text-[0.8rem] md:flex-row md:gap-5 md:text-base">
          <TextField className={"flex w-full items-center gap-3 md:w-[40%] "}>
            <Label className=" text-[var(--primary-blue) min-w-24 font-semibold md:min-w-36">
              หมายเลขโทรศัพท์
            </Label>
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-1">
                <InputMask
                  required
                  value={ownerData?.phone}
                  onChange={handleChangePartnerData}
                  name="phone"
                  className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                  placeholder="กรอกหมายเลขโทรศัพท์"
                  maxLength={10}
                  inputMode="numeric"
                  type="text"
                  mask="999-999-9999"
                />
                <FieldError className="text-xs text-red-700" />
              </div>
            </div>
          </TextField>
        </div>
      </section>
      {/* ข้อ 7*/}
      <section className="flex items-start justify-center gap-3 md:items-center md:gap-5">
        <NumberTitle number={5} />
        <div className="flex w-full flex-col gap-3 text-[0.8rem] md:flex-row md:gap-5 md:text-base">
          <TextField className={"flex w-full items-center gap-3 md:w-[40%] "}>
            <Label className=" text-[var(--primary-blue) min-w-24 font-semibold md:min-w-20">
              E-mail
            </Label>
            <div className="flex w-full flex-col gap-1">
              <Input
                value={ownerData?.email}
                onChange={handleChangePartnerData}
                required
                name="email"
                type="email"
                className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                placeholder="กรอก E-mail ของคุณ"
              />
              <FieldError className="text-xs text-red-700" />
            </div>
          </TextField>
        </div>
      </section>
      {/* ข้อ 8*/}
      <section className="flex items-start justify-center gap-3 md:items-center md:gap-5">
        <NumberTitle number={6} />
        <div className="flex w-full flex-col gap-3 text-[0.8rem] md:flex-row md:gap-5 md:text-base">
          <TextField className={"flex w-full items-center gap-3 md:w-[30%] "}>
            <Label className=" text-[var(--primary-blue) min-w-24 font-semibold md:min-w-20">
              สัญชาติ
            </Label>
            <div className="flex flex-col gap-1">
              <Input
                required
                value={ownerData?.nationality}
                onChange={handleChangePartnerData}
                name="nationality"
                type="text"
                className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                placeholder="ใส่สัญชาติ"
              />
              <FieldError className="text-xs text-red-700" />
            </div>
          </TextField>
        </div>
      </section>
    </div>
  );
}

export default OwnerPartner;
