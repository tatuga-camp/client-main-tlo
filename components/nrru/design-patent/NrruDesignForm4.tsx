import Number from "@/components/Number";
import React from "react";
import {
  Button,
  FieldError,
  FileTrigger,
  Form,
  Input,
  Label,
  TextField,
} from "react-aria-components";
import { IoTrashOutline } from "react-icons/io5";

const NrruDesignForm4 = () => {
  return (
    <div className=" w-full  rounded-md border-[1px] border-solid border-[#BED6FF] bg-white p-5 py-10 md:p-10">
      <Form className="mx-0 my-5 flex flex-col gap-5 md:mx-5 md:my-10 ">
        {/* ข้อ 1*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={1} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              สำเนาบัตรประจำตัวประชาชนของผู้ประดิษฐ์ทุกราย
              (พร้อมรับรองสำเนาถูกต้อง)
            </p>
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem]  md:gap-4 md:pl-10 md:text-base">
            <p className="-mt-2 font-semibold text-purple-500 md:-mt-4">
              โดยระบุข้อความ “ใช้ประกอบการยื่นคำขอด้านทรัพย์สินทางปัญญาเท่านั้น”
              ไม่ต้องระบุวันที่
            </p>
            <section className="flex flex-col gap-2 md:flex-row md:items-start">
              <FileTrigger>
                <Button className="rounded-md bg-[var(--secondary-yellow)] px-3 py-3 font-semibold shadow-md">
                  อัพโหลดไฟล์ .pdf/.jpg
                </Button>
              </FileTrigger>
              <section className="flex flex-col gap-2">
                <div className="flex items-center justify-between rounded-md border-[1px] border-solid border-[#BED6FF] p-2 md:min-w-72 ">
                  <p className="ml-4 text-[#2166DD] underline">File name.pdf</p>
                  <button className="rounded-md bg-[var(--primary-blue)] p-2 text-xl text-white">
                    <IoTrashOutline />
                  </button>
                </div>
              </section>
            </section>
          </div>
        </section>

        {/* ข้อ 2*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={2} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              ภาพวาดหรือภาพถ่ายของผลิตภัณฑ์ จำนวน 7 ภาพ
            </p>
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem]  md:gap-4 md:pl-10 md:text-base">
            <section className="flex flex-col gap-2 md:flex-row md:items-start">
              <FileTrigger>
                <Button className="rounded-md bg-[var(--secondary-yellow)] px-3 py-3 font-semibold shadow-md">
                  อัพโหลดไฟล์ .pdf/.jpg
                </Button>
              </FileTrigger>
              <button className="rounded-md bg-[#BED6FF] p-3 font-semibold duration-300 hover:bg-[#91B2EB]">
                ตัวอย่างการแสดงภาพของผลิตภัณฑ์ (คลิก)
              </button>
            </section>
          </div>
        </section>

        {/* ข้อ 3*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={3} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              เอกสารแนบอื่นๆ (ถ้ามี)
            </p>
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem]  md:gap-4 md:pl-10 md:text-base">
            <p className="-mt-2 font-medium md:-mt-4">
              เช่น หนังสือรับรองการเผยแพร่ผลงาน
            </p>
            <section className="flex flex-col gap-2 md:flex-row md:items-start">
              <FileTrigger>
                <Button className="rounded-md bg-[var(--secondary-yellow)] px-3 py-3 font-semibold shadow-md">
                  อัพโหลดไฟล์ .pdf/.jpg
                </Button>
              </FileTrigger>
              <section className="flex flex-col gap-2">
                <div className="flex items-center justify-between rounded-md border-[1px] border-solid border-[#BED6FF] p-2 md:min-w-72 ">
                  <p className="ml-4 text-[#2166DD] underline">File name.pdf</p>
                  <button className="rounded-md bg-[var(--primary-blue)] p-2 text-xl text-white">
                    <IoTrashOutline />
                  </button>
                </div>
                <div className="flex items-center justify-between rounded-md border-[1px] border-solid border-[#BED6FF] p-2 md:min-w-72 ">
                  <p className="ml-4 text-[#2166DD] underline">File name.pdf</p>
                  <button className="rounded-md bg-[var(--primary-blue)] p-2 text-xl text-white">
                    <IoTrashOutline />
                  </button>
                </div>
                <div className="flex items-center justify-between rounded-md border-[1px] border-solid border-[#BED6FF] p-2 md:min-w-72 ">
                  <p className="ml-4 text-[#2166DD] underline">File name.pdf</p>
                  <button className="rounded-md bg-[var(--primary-blue)] p-2 text-xl text-white">
                    <IoTrashOutline />
                  </button>
                </div>
              </section>
            </section>
          </div>
        </section>
      </Form>
    </div>
  );
};

export default NrruDesignForm4;
