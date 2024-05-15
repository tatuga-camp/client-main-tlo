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
import Checkbox from "@mui/material/Checkbox";

const TrademarkForm1 = () => {
  return (
    <div className=" w-full  rounded-md border-[1px] border-solid border-[#BED6FF] bg-white p-5 py-10 md:p-10">
      <Form className="mx-0 my-5 flex flex-col gap-5 md:mx-5 md:my-10 ">
        {/* ข้อ 1*/}
        <section className="flex flex-col items-start justify-center gap-3 md:gap-5">
          <section className="flex flex-col items-center gap-5 md:flex-row">
            <section className="flex items-center gap-5">
              <Number number={1} />
              <h1 className="text-xs font-bold md:text-base">เจ้าของ</h1>
            </section>

            <TextField
              isRequired
              className={"flex items-center gap-3 text-[0.8rem] md:text-base"}
            >
              <section className="flex flex-col">
                <Input
                  name=""
                  type="text"
                  className="h-8 rounded-md bg-slate-300 p-1 pl-3 md:h-10  md:pl-4 "
                  placeholder="บุคคลธรรมดา"
                />
                <FieldError className="text-xs text-red-700" />
              </section>
            </TextField>
            <Button className="flex items-center justify-center  gap-3 rounded-md bg-[#BED6FF] p-2 px-5 text-[0.8rem] font-semibold duration-300 hover:bg-[#91B2EB] md:gap-5 md:text-base">
              <p>
                การกรอกชื่อกรณีที่ยื่นคำขอในนามนิติบุคคล หรือส่วนราชการไทย(คลิก)
              </p>
            </Button>
          </section>
        </section>

        {/* ข้อ 2*/}
        <section className="mt-5 flex flex-col items-start justify-center gap-3 md:gap-5">
          <section className="flex flex-col items-center gap-5 md:flex-row">
            <section className="flex items-center gap-5">
              <Number number={2} />
              <h1 className="min-w-52 text-xs font-bold md:text-base">
                ชื่อและสถานที่ติดต่อ
              </h1>
            </section>
          </section>

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
                        placeholder="1360401295700"
                      />
                      <FieldError className="text-xs text-red-700" />
                    </section>
                  </TextField>
                </div>
              </section>
            </div>
          </section>
        </section>
      </Form>
    </div>
  );
};

export default TrademarkForm1;
