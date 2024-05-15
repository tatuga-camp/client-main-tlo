import Number from "@/components/Number";
import React from "react";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "react-aria-components";
import { InputMask, InputMaskChangeEvent } from "primereact/inputmask";
import { FiPlusCircle } from "react-icons/fi";
import ProviceCombobox from "@/components/Combobox/proviceCombobox";
import AmphureCombobox from "@/components/Combobox/amphureCombobox";
import TambonCombobox from "@/components/Combobox/tambonCombobox";

const NrruCopyrightForm1 = () => {
  return (
    <div className=" w-full  rounded-md border-[1px] border-solid border-[#BED6FF] bg-white p-5 py-10 md:p-10">
      <Form className="mx-0 my-5 flex flex-col gap-5 md:mx-5 md:my-10 ">
        {/* ข้อ 1*/}
        <section className="flex items-start justify-center gap-3 md:items-center md:gap-5">
          <Number number={1} />
          <div className="flex w-full flex-col gap-3 text-[0.8rem] md:flex-row md:gap-5 md:text-base">
            <TextField
              isRequired
              className={"flex w-full items-center gap-3 md:w-[50%]"}
            >
              <Label className=" text-[var(--primary-blue) min-w-20 font-semibold md:min-w-24">
                คำนำหน้าชื่อ
              </Label>
              <section className="flex flex-col gap-1">
                <Input
                  name=""
                  type="text"
                  className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                  placeholder="คำนำหน้า"
                />
                <FieldError className="text-xs text-red-700" />
              </section>
            </TextField>
            <TextField
              isRequired
              className={"flex w-full items-center gap-3 md:w-[50%]"}
            >
              <Label className="min-w-14 font-semibold text-[var(--primary-blue)] md:min-w-16">
                ชื่อ-สกุล
              </Label>
              <section className="flex flex-col gap-1">
                <Input
                  name=""
                  type="text"
                  className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10  md:p-2 md:pl-4"
                  placeholder="ฐิติวรดา หาญแก้"
                />
                <FieldError className="text-xs text-red-700" />
              </section>
            </TextField>
          </div>
        </section>

        {/* ข้อ 2*/}
        <section className="flex items-start justify-center gap-3 md:items-center md:gap-5">
          <Number number={2} />
          <div className="flex w-full flex-col gap-3 text-[0.8rem] md:flex-row md:gap-5 md:text-base">
            <TextField
              isRequired
              className={
                "flex w-full flex-col gap-3 md:w-[60%] md:flex-row md:items-center "
              }
            >
              <Label className=" text-[var(--primary-blue) min-w-24 font-semibold md:min-w-44">
                เลขบัตรประจำตัวประชาชน
              </Label>
              <section className="flex flex-col gap-1">
                <InputMask
                  required
                  name="idCard"
                  className="h-8 w-52 rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:w-72 md:pl-4 "
                  placeholder="กรอกหมายเลขบัตรประชาชน"
                  maxLength={13}
                  inputMode="numeric"
                  type="text"
                  mask="9-9999-99999-99-9"
                />
                <FieldError className="text-xs text-red-700" />
              </section>
            </TextField>
          </div>
        </section>

        {/* ข้อ 3*/}
        <section className="flex items-start justify-start  gap-3  md:gap-5">
          <Number number={3} />
          <div className="flex w-full flex-col gap-3 text-[0.8rem] md:flex-row md:flex-wrap md:gap-5 md:text-base">
            <TextField isRequired className={"flex  items-center gap-3  "}>
              <p className="font-semibold">ที่อยู่ (ตามบัตรประชาชน)</p>
              <Label className=" text-[var(--primary-blue) font-medium ">
                บ้านเลขที่
              </Label>
              <section className="flex flex-col gap-1">
                <Input
                  name=""
                  type="text"
                  className="h-8 w-auto  max-w-20 rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                  placeholder="325"
                />
                <FieldError className="text-xs text-red-700" />
              </section>
            </TextField>
            <TextField isRequired className={"flex  items-center gap-3  "}>
              <Label className=" text-[var(--primary-blue) font-medium ">
                หมู่ที่
              </Label>
              <section className="flex flex-col gap-1">
                <Input
                  name=""
                  type="text"
                  className="h-8 w-auto  max-w-14 rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                  placeholder="5"
                />
                <FieldError className="text-xs text-red-700" />
              </section>
            </TextField>
            <TextField isRequired className={"flex w-60  items-center gap-3  "}>
              <Label className=" text-[var(--primary-blue) font-medium ">
                จังหวัด
              </Label>

              <section className="flex flex-col gap-1">
                <ProviceCombobox />
                <FieldError className="text-xs text-red-700" />
              </section>
            </TextField>
            <TextField isRequired className={"flex w-60  items-center gap-3  "}>
              <Label className=" text-[var(--primary-blue) font-medium ">
                อำเภอ
              </Label>

              <section className="flex flex-col gap-1">
                <AmphureCombobox />
                <FieldError className="text-xs text-red-700" />
              </section>
            </TextField>
            <TextField isRequired className={"flex w-60  items-center gap-3  "}>
              <Label className=" text-[var(--primary-blue) font-medium ">
                ตำบล
              </Label>
              <section className="flex flex-col gap-1">
                <TambonCombobox />
                <FieldError className="text-xs text-red-700" />
              </section>
            </TextField>
            <TextField isRequired className={"flex  items-center gap-3  "}>
              <Label className=" text-[var(--primary-blue) font-medium ">
                รหัสไปรษณีย์
              </Label>
              <section className="flex flex-col gap-1">
                <Input
                  name=""
                  type="text"
                  className="h-8 w-auto rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                  placeholder="36120"
                />
                <FieldError className="text-xs text-red-700" />
              </section>
            </TextField>
          </div>
        </section>

        {/* ข้อ 4*/}
        <section className="flex items-start justify-center gap-3 md:items-center md:gap-5">
          <Number number={4} />
          <div className="flex w-full flex-col gap-3 text-[0.8rem] md:flex-row md:gap-5 md:text-base">
            <TextField
              isRequired
              className={"flex w-full items-center gap-3 md:w-[60%] "}
            >
              <Label className=" text-[var(--primary-blue) min-w-24 font-semibold md:min-w-44">
                สถานะผู้ประดิษฐ์
              </Label>

              <section className="flex flex-col gap-1">
                <Input
                  name=""
                  type="text"
                  className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                  placeholder="เลือกสถานะผู้ประดิษฐ์"
                />
                <FieldError className="text-xs text-red-700" />
              </section>
            </TextField>
          </div>
        </section>

        {/* ข้อ 5*/}
        <section className="flex items-start justify-start  gap-3  md:gap-5">
          <Number number={5} />{" "}
          <p className="my-2 text-[0.8rem] font-semibold md:text-base">
            สังกัด
          </p>
          <div className=" grid w-full grid-cols-1  flex-col gap-3 text-[0.8rem] md:grid-cols-3  md:gap-5 md:text-base">
            <TextField isRequired className={"flex  items-center gap-3  "}>
              <Label className=" text-[var(--primary-blue) min-w-16 font-medium ">
                สาขาวิชา
              </Label>
              <div className="flex flex-col gap-1">
                <Input
                  name=""
                  type="text"
                  className="h-8 w-full rounded-md  bg-slate-300 p-1 pl-3 md:h-10 md:w-48 md:pl-4 "
                  placeholder="ภาษาอังกฤษ"
                />
                <FieldError className="text-xs text-red-700" />
              </div>
            </TextField>
            <TextField isRequired className={"flex  items-center gap-3  "}>
              <Label className=" text-[var(--primary-blue) min-w-12 font-medium ">
                คณะ
              </Label>
              <div className="flex flex-col gap-1">
                <Input
                  name=""
                  type="text"
                  className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:w-48 md:pl-4 "
                  placeholder="มนุษยศาสตร์และสังคมศาสตร์"
                />
                <FieldError className="text-xs text-red-700" />
              </div>
            </TextField>
            <TextField isRequired className={"flex  items-center gap-3  "}>
              <Label className=" text-[var(--primary-blue) min-w-16 font-medium ">
                หน่วยงาน
              </Label>

              <section className="flex flex-col gap-1">
                <Input
                  name=""
                  type="text"
                  className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:w-60 md:pl-4 "
                  placeholder="หน่วยงาน"
                />
                <FieldError className="text-xs text-red-700" />
              </section>
            </TextField>
          </div>
        </section>

        {/* ข้อ 6*/}
        <section className="flex items-start justify-center gap-3 md:items-center md:gap-5">
          <Number number={6} />
          <div className="flex w-full flex-col gap-3 text-[0.8rem] md:flex-row md:gap-5 md:text-base">
            <TextField
              isRequired
              className={"flex w-full items-center gap-3 md:w-[40%] "}
            >
              <Label className=" text-[var(--primary-blue) min-w-24 font-semibold md:min-w-36">
                หมายเลขโทรศัพท์
              </Label>

              <section className="flex flex-col gap-1">
                <InputMask
                  name="phone"
                  className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                  placeholder="กรอกหมายเลขโทรศัพท์"
                  maxLength={10}
                  inputMode="numeric"
                  type="text"
                  mask="999-999-9999"
                />
                <FieldError className="text-xs text-red-700" />
              </section>
            </TextField>
          </div>
        </section>
        {/* ข้อ 7*/}
        <section className="flex items-start justify-center gap-3 md:items-center md:gap-5">
          <Number number={7} />
          <div className="flex w-full flex-col gap-3 text-[0.8rem] md:flex-row md:gap-5 md:text-base">
            <TextField
              isRequired
              className={"flex w-full items-center gap-3 md:w-[40%] "}
            >
              <Label className=" text-[var(--primary-blue) min-w-24 font-semibold md:min-w-20">
                E-mail
              </Label>

              <section className="flex flex-col gap-1">
                <Input
                  name=""
                  type="email"
                  className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                  placeholder="ploytitiworda.123@gmail.com"
                />
                <FieldError className="text-xs text-red-700" />
              </section>
            </TextField>
          </div>
        </section>
        {/* ข้อ 8*/}
        <section className="flex items-start justify-center gap-3 md:items-center md:gap-5">
          <Number number={8} />
          <div className="flex w-full flex-col gap-3 text-[0.8rem] md:flex-row md:gap-5 md:text-base">
            <TextField
              isRequired
              className={"flex w-full items-center gap-3 md:w-[30%] "}
            >
              <Label className=" text-[var(--primary-blue) min-w-24 font-semibold md:min-w-20">
                % ส่วนร่วม
              </Label>

              <section className="flex flex-col gap-1">
                <Input
                  name=""
                  type="text"
                  className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                  placeholder="40"
                />
                <FieldError className="text-xs text-red-700" />
              </section>
            </TextField>
          </div>
        </section>

        <button className="my-3 flex w-48 items-center justify-center gap-3 rounded-md bg-[#9747FF] p-2 text-xs font-semibold text-white duration-300 hover:bg-purple-700 md:px-3 md:py-2 md:text-base ">
          <FiPlusCircle /> <p>เพิ่มชื่อผู้ประดิษฐ์</p>
        </button>
      </Form>
    </div>
  );
};

export default NrruCopyrightForm1;
