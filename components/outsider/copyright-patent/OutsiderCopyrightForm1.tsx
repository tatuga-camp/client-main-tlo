import Number from "@/components/Number";
import React from "react";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  Radio,
  RadioGroup,
  TextField,
} from "react-aria-components";
import { InputMask, InputMaskChangeEvent } from "primereact/inputmask";
import { FiPlusCircle } from "react-icons/fi";
import ProviceCombobox from "@/components/Combobox/proviceCombobox";
import AmphureCombobox from "@/components/Combobox/amphureCombobox";
import TambonCombobox from "@/components/Combobox/tambonCombobox";
import Checkbox from "@mui/material/Checkbox";
import {
  MdOutlineRadioButtonChecked,
  MdOutlineRadioButtonUnchecked,
} from "react-icons/md";

const OutsiderCopyrightForm1 = () => {
  return (
    <div className=" w-full  rounded-md border-[1px] border-solid border-[#BED6FF] bg-white p-5 py-10 md:p-10">
      <Form className="mx-0 my-5 flex flex-col gap-5 md:mx-5 md:my-10 ">
        {/* ข้อ 1*/}
        <section className="flex flex-col items-start justify-center gap-3 md:gap-5">
          <section className="flex flex-col items-center gap-5 md:flex-row">
            <section className="flex items-center gap-5">
              <Number number={1} />
              <h1 className="min-w-52 text-xs font-bold md:text-base">
                เจ้าของลิขสิทธิ์
              </h1>
            </section>

            <TextField
              isRequired
              className={
                "flex w-full items-center gap-3 text-[0.8rem]  md:w-[50%] md:text-base"
              }
            >
              <section className="flex flex-col">
                <Input
                  name=""
                  type="text"
                  className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:w-auto md:pl-4 "
                  placeholder="บุคคลธรรมดา"
                />
                <FieldError className="text-xs text-red-700" />
              </section>
            </TextField>
          </section>

          <div className="flex w-full flex-col gap-3 text-[0.8rem] md:flex-row md:gap-5 md:text-base">
            <TextField
              isRequired
              className={"flex w-full items-center gap-3 md:w-[50%]"}
            >
              <Label className=" text-[var(--primary-blue) min-w-20 font-semibold md:min-w-32">
                1. คำนำหน้าชื่อ
              </Label>
              <section className="flex flex-col">
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
              <section className="flex flex-col">
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

        <section className="flex items-start justify-center gap-3 md:items-center md:gap-5">
          <div className="flex w-full flex-col gap-3 text-[0.8rem] md:flex-row md:gap-5 md:text-base">
            <TextField
              isRequired
              className={"flex w-full items-center gap-3 md:w-[80%] "}
            >
              <Label className=" text-[var(--primary-blue) min-w-24 font-semibold md:min-w-80">
                2.
                เลขบัตรประจำตัวประชาชน/เลขทะเบียนนิติบุคคล/เลขที่หนังสือเดินทาง
              </Label>
              <section className="flex flex-col">
                <InputMask
                  name="id"
                  className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                  placeholder="1324400966551"
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

        <section className="flex items-start justify-start  gap-3  md:gap-5">
          <div className="flex w-full flex-col gap-3 text-[0.8rem] md:flex-row md:flex-wrap md:gap-5 md:text-base">
            <TextField isRequired className={"flex  items-center gap-3  "}>
              <p className="font-semibold">3. ที่อยู่ (ตามบัตรประชาชน)</p>
              <Label className=" text-[var(--primary-blue) font-medium ">
                บ้านเลขที่
              </Label>

              <section className="flex flex-col">
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

              <section className="flex flex-col">
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

              <section className="flex flex-col">
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

        <section className="flex items-start justify-center gap-3 md:items-center md:gap-5">
          <div className="flex w-full flex-col gap-3 text-[0.8rem] md:flex-row md:gap-5 md:text-base">
            <TextField isRequired className={"flex  items-center gap-3  "}>
              <Label className=" text-[var(--primary-blue) font-medium ">
                4. สัญชาติ
              </Label>

              <section className="flex flex-col">
                <Input
                  name=""
                  type="text"
                  className="h-8 w-auto rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                  placeholder="ไทย"
                />
                <FieldError className="text-xs text-red-700" />
              </section>
            </TextField>
          </div>
        </section>

        <section className="flex items-start justify-center gap-3 md:items-center md:gap-5">
          <div className="flex w-full flex-col gap-3 text-[0.8rem] md:flex-row md:gap-5 md:text-base">
            <TextField
              isRequired
              className={"flex w-full items-center gap-3 md:w-[40%] "}
            >
              <Label className=" text-[var(--primary-blue) min-w-24 font-semibold md:min-w-36">
                5. โทรศัพท์
              </Label>
              <section className="flex flex-col">
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

        <section className="flex items-start justify-center gap-3 md:items-center md:gap-5">
          <div className="flex w-full flex-col gap-3 text-[0.8rem] md:flex-row md:gap-5 md:text-base">
            <TextField
              isRequired
              className={"flex w-full items-center gap-3 md:w-[40%] "}
            >
              <Label className=" text-[var(--primary-blue) min-w-24 font-semibold md:min-w-36">
                6. โทรสาร
              </Label>
              <section className="flex flex-col">
                <InputMask
                  name="phone"
                  className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                  placeholder="กรอกหมายเลขโทรสาร"
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

        <section className="flex items-start justify-center gap-3 md:items-center md:gap-5">
          <div className="flex w-full flex-col gap-3 text-[0.8rem] md:flex-row md:gap-5 md:text-base">
            <TextField
              isRequired
              className={"flex w-full items-center gap-3 md:w-[40%] "}
            >
              <Label className=" text-[var(--primary-blue) min-w-24 font-semibold md:min-w-20">
                7. อีเมล
              </Label>
              <section className="flex flex-col">
                <Input
                  name=""
                  type="email"
                  className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                  placeholder="ploy@gmail.com"
                />
                <FieldError className="text-xs text-red-700" />
              </section>
            </TextField>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h1 className="font-semibold text-purple-500">หมายเหตุ</h1>
          <div className="md:ml-5">
            <p>
              1. กรุณาระบุข้อมูลทั่วไปของเจ้าของลิขสิทธิ์ให้ครบถ้วน
              (การระบุเลขประจำตัวประชาชน/เลขนิติบุคคล/เลขที่หนังสือเดินทาง
              เนื่องจากจะต้องนำข้อมูลดังกล่าวไปกรอก
              ในแบบคำขอจดแจ้งข้อมูลลิขสิทธิ์ของกรมทรัพย์สินทางปัญญา)
            </p>
            <p>
              2. กรณียื่นคำขอในนามนิติบุคคลหรือส่วนราชการไทย
              กรุณาระบุชื่อนิติบุคคลหรือส่วนราชการไทย
              พร้อมชื่อของผู้มีอำนาจในการลงนามเอกสาร และสถานที่ตั้ง เช่น บริษัท
              ทรัพย์สินทวี จำกัด (นายปัญญา งานดี) ที่อยู่ 111/1 ม.1 ต.ในเมือง
              อ.เมืองนครราชสีมา จ.นครราชสีมา 30000
            </p>
          </div>
        </section>

        {/* ข้อ 2*/}
        <section className="mt-5 flex flex-col items-start justify-center gap-3 md:gap-5">
          <section className="flex flex-col items-center gap-5 md:flex-row">
            <section className="flex items-center gap-5">
              <Number number={2} />
              <h1 className="min-w-52 text-xs font-bold md:text-base">
                ผู้สร้างสรรค์ผลงาน
              </h1>
            </section>
          </section>

          <RadioGroup className="my-3 flex w-full flex-col items-start justify-center gap-2 md:ml-10 md:gap-5  lg:flex-row">
            <div className="flex w-full flex-col   gap-1.5 px-5 text-[0.8rem] md:gap-3 md:pl-0 md:text-base">
              <Radio value={"1"} className="flex w-full items-center">
                {({ isSelected }) => (
                  <div className="flex flex-col justify-center gap-2 md:flex-row md:items-center">
                    <div className="flex items-center gap-2 text-2xl">
                      {isSelected ? (
                        <MdOutlineRadioButtonChecked />
                      ) : (
                        <MdOutlineRadioButtonUnchecked />
                      )}
                      <span className="text-[0.9rem] font-medium md:text-base">
                        ชื่อและที่อยู่เดียวกันกับเจ้าของลิขสิทธิ์
                      </span>
                    </div>
                  </div>
                )}
              </Radio>

              <Radio value={"2"} className="flex items-center">
                {({ isSelected }) => (
                  <div className="flex items-center justify-center gap-2">
                    <div className="text-2xl">
                      {isSelected ? (
                        <MdOutlineRadioButtonChecked />
                      ) : (
                        <MdOutlineRadioButtonUnchecked />
                      )}
                    </div>
                    <span className="font-medium md:min-w-[7rem]">
                      คนละชื่อและที่อยู่กับเจ้าของลิขสิทธิ์
                    </span>
                  </div>
                )}
              </Radio>
            </div>
          </RadioGroup>
          <section className="flex flex-col gap-3 md:ml-10">
            <div className="flex w-full flex-col gap-5 md:-ml-10">
              <section className="flex flex-col items-start justify-center gap-3 md:gap-5">
                <div className="flex w-full flex-col gap-3 text-[0.8rem] md:flex-row md:gap-5 md:text-base">
                  <TextField
                    isRequired
                    className={"flex w-full items-center gap-3 md:w-[50%]"}
                  >
                    <Label className=" text-[var(--primary-blue) min-w-20 font-semibold md:min-w-32">
                      1. คำนำหน้าชื่อ
                    </Label>
                    <section className="flex flex-col">
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
                    <section className="flex flex-col">
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

              <section className="flex items-start justify-center gap-3 md:items-center md:gap-5">
                <div className="flex w-full flex-col gap-3 text-[0.8rem] md:flex-row md:gap-5 md:text-base">
                  <TextField
                    isRequired
                    className={"flex w-full items-center gap-3 md:w-[60%] "}
                  >
                    <Label className=" text-[var(--primary-blue) min-w-24 font-semibold md:min-w-52">
                      2. เลขบัตรประจำตัวประชาชน
                    </Label>
                    <section className="flex flex-col">
                      <InputMask
                        name="idCard"
                        className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                        placeholder="1324400966551"
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

              <section className="flex items-start justify-start  gap-3  md:gap-5">
                <div className="flex w-full flex-col gap-3 text-[0.8rem] md:flex-row md:flex-wrap md:gap-5 md:text-base">
                  <TextField
                    isRequired
                    className={"flex  items-center gap-3  "}
                  >
                    <p className="font-semibold">3. ที่อยู่ (ตามบัตรประชาชน)</p>
                    <Label className=" text-[var(--primary-blue) font-medium ">
                      บ้านเลขที่
                    </Label>

                    <section className="flex flex-col">
                      <Input
                        name=""
                        type="text"
                        className="h-8 w-auto  max-w-20 rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                        placeholder="325"
                      />
                      <FieldError className="text-xs text-red-700" />
                    </section>
                  </TextField>
                  <TextField
                    isRequired
                    className={"flex  items-center gap-3  "}
                  >
                    <Label className=" text-[var(--primary-blue) font-medium ">
                      หมู่ที่
                    </Label>

                    <section className="flex flex-col">
                      <Input
                        name=""
                        type="text"
                        className="h-8 w-auto  max-w-14 rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                        placeholder="5"
                      />
                      <FieldError className="text-xs text-red-700" />
                    </section>
                  </TextField>
                  <TextField
                    isRequired
                    className={"flex w-60  items-center gap-3  "}
                  >
                    <Label className=" text-[var(--primary-blue) font-medium ">
                      จังหวัด
                    </Label>

                    <section className="flex flex-col gap-1">
                      <ProviceCombobox />
                      <FieldError className="text-xs text-red-700" />
                    </section>
                  </TextField>
                  <TextField
                    isRequired
                    className={"flex w-60  items-center gap-3  "}
                  >
                    <Label className=" text-[var(--primary-blue) font-medium ">
                      อำเภอ
                    </Label>

                    <section className="flex flex-col gap-1">
                      <AmphureCombobox />
                      <FieldError className="text-xs text-red-700" />
                    </section>
                  </TextField>
                  <TextField
                    isRequired
                    className={"flex w-60  items-center gap-3  "}
                  >
                    <Label className=" text-[var(--primary-blue) font-medium ">
                      ตำบล
                    </Label>
                    <section className="flex flex-col gap-1">
                      <TambonCombobox />
                      <FieldError className="text-xs text-red-700" />
                    </section>
                  </TextField>
                  <TextField
                    isRequired
                    className={"flex  items-center gap-3  "}
                  >
                    <Label className=" text-[var(--primary-blue) font-medium ">
                      รหัสไปรษณีย์
                    </Label>

                    <section className="flex flex-col">
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

              <section className="flex items-start justify-center gap-3 md:items-center md:gap-5">
                <div className="flex w-full flex-col gap-3 text-[0.8rem] md:flex-row md:gap-5 md:text-base">
                  <TextField
                    isRequired
                    className={"flex  items-center gap-3  "}
                  >
                    <Label className=" text-[var(--primary-blue) font-medium ">
                      สัญชาติ
                    </Label>

                    <section className="flex flex-col">
                      <Input
                        name=""
                        type="text"
                        className="h-8 w-auto rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                        placeholder="ไทย"
                      />
                      <FieldError className="text-xs text-red-700" />
                    </section>
                  </TextField>
                </div>
              </section>

              <section className="flex items-start justify-center gap-3 md:items-center md:gap-5">
                <div className="flex w-full flex-col gap-3 text-[0.8rem] md:flex-row md:gap-5 md:text-base">
                  <TextField
                    isRequired
                    className={"flex w-full items-center gap-3 md:w-[40%] "}
                  >
                    <Label className=" text-[var(--primary-blue) min-w-24 font-semibold md:min-w-36">
                      5. โทรศัพท์
                    </Label>
                    <section className="flex flex-col">
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

              <section className="flex items-start justify-center gap-3 md:items-center md:gap-5">
                <div className="flex w-full flex-col gap-3 text-[0.8rem] md:flex-row md:gap-5 md:text-base">
                  <TextField
                    isRequired
                    className={"flex w-full items-center gap-3 md:w-[40%] "}
                  >
                    <Label className=" text-[var(--primary-blue) min-w-24 font-semibold md:min-w-36">
                      6. โทรสาร
                    </Label>
                    <section className="flex flex-col">
                      <InputMask
                        name="phone"
                        className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                        placeholder="กรอกหมายเลขโทรสาร"
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

              <section className="flex items-start justify-center gap-3 md:items-center md:gap-5">
                <div className="flex w-full flex-col gap-3 text-[0.8rem] md:flex-row md:gap-5 md:text-base">
                  <TextField
                    isRequired
                    className={"flex w-full items-center gap-3 md:w-[40%] "}
                  >
                    <Label className=" text-[var(--primary-blue) min-w-24 font-semibold md:min-w-20">
                      7. อีเมล
                    </Label>
                    <section className="flex flex-col">
                      <Input
                        name=""
                        type="email"
                        className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                        placeholder="ploy@gmail.com"
                      />
                      <FieldError className="text-xs text-red-700" />
                    </section>
                  </TextField>
                </div>
              </section>
            </div>
          </section>
        </section>

        <button className="my-3 flex w-48 items-center justify-center gap-3 rounded-md bg-[#9747FF] p-2 text-xs font-semibold text-white duration-300 hover:bg-purple-700 md:px-3 md:py-2 md:text-base ">
          <FiPlusCircle /> <p>เพิ่มชื่อผู้ประดิษฐ์</p>
        </button>

        <section className="flex w-full flex-col gap-5">
          <h1 className="font-bold text-purple-500 underline">หมายเหตุ</h1>
          <div className="w-full md:ml-10 md:w-[80%]">
            <p>
              1. กรุณาระบุข้อมูลของผู้ประดิษฐ์ทุกรายให้ครบถ้วน
              (การระบุเลขประจำตัวประชาชน
              เนื่องจากจะต้องนำข้อมูลดังกล่าวไปกรอกในแบบพิมพ์คำขอรับสิทธิบัตร/อนุสิทธิบัตรของกรมทรัพย์สินทางปัญญา){" "}
            </p>
            <p>
              2. กรณีมีผู้ประดิษฐ์ตั้งแต่ 3 ท่านขึ้นไป
              เมื่อมีการออกหนังสือรับจดทะเบียนสิทธิบัตร/อนุสิทธิบัตร
              ชื่อผู้ประดิษฐ์ลำดับแรกจะปรากฏในหนังสือดังกล่าว ตามด้วยคำว่า
              “และคณะ” ดังนั้นขอให้ตกลงกัน ก่อนที่จะลงนามว่าผู้ใดเป็นชื่อแรก
              เพราะเมื่อกรมทรัพย์สินทางปัญญาออกหนังสือรับจดทะเบียนแล้ว
              จะไม่สามารถแก้ไขได้อีก
            </p>
          </div>
        </section>
      </Form>
    </div>
  );
};

export default OutsiderCopyrightForm1;
