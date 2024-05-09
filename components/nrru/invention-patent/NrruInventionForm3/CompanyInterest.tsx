import React from "react";
import Number from "../../../Number";
import { FiPlusCircle } from "react-icons/fi";
import { Input, Label, TextField } from "react-aria-components";

function CompanyInterest() {
  return (
    <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
      <section className="flex items-center gap-3">
        <Number number={4} />
        <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
          หน่วยงาน/บริษัทที่สนใจ หรือคาดว่าจะสนใจ
          หรือเกี่ยวข้องกับการประดิษฐ์/ผลงานนี้
        </p>
      </section>

      <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem] md:flex-row md:gap-5 md:pl-10 md:text-base">
        <section className="flex w-full flex-col justify-between md:flex-row md:items-center ">
          <p>
            (กรุณาระบุชื่อบริษัท ชื่อผู้ประสานงาน
            เบอร์โทรศัพท์ของหน่วยงาน/ผู้ที่สนใจ)
          </p>
          <button className="my-3 flex w-48 items-center justify-center gap-3 rounded-md bg-[#9747FF] p-2 text-xs font-semibold text-white duration-300 hover:bg-purple-700 md:px-3 md:py-2 md:text-base ">
            <FiPlusCircle /> <p>เพิ่มข้อมูล</p>
          </button>
        </section>
        <section className="flex w-full items-center justify-between rounded-md border-[1px] border-solid border-[#BED6FF] p-2 ">
          <div className="flex w-full flex-col gap-3 pl-0 text-[0.75rem] md:gap-2 md:pl-0 md:text-[0.85rem] lg:flex-row">
            <TextField className={"flex w-full items-center gap-2 "}>
              <Label className=" text-[var(--primary-blue) min-w-20 font-medium md:min-w-44">
                1) ชื่อหน่วยงาน/บริษัทที่สนใจ :
              </Label>
              <Input
                name=""
                type="text"
                className="h-8 w-auto rounded-md bg-slate-300 p-1 pl-3 md:h-10  md:pl-4 "
                placeholder="กรอกข้อมูล"
              />
            </TextField>
            <TextField className={"flex w-full  items-center gap-2 "}>
              <Label className=" text-[var(--primary-blue) min-w-20 font-medium md:min-w-14">
                ชื่อผู้ประสาน :
              </Label>
              <Input
                name=""
                type="text"
                className="h-8 w-auto rounded-md bg-slate-300 p-1 pl-3 md:h-10  md:pl-4 "
                placeholder="กรอกข้อมูล"
              />
            </TextField>
            <TextField className={"flex w-full  items-center gap-2 "}>
              <Label className=" text-[var(--primary-blue) min-w-20 font-medium md:min-w-14">
                เบอร์ติดต่อ :
              </Label>
              <Input
                name=""
                type="text"
                className="h-8 w-auto rounded-md bg-slate-300 p-1 pl-3 md:h-10  md:pl-4 "
                placeholder="กรอกข้อมูล"
              />
            </TextField>
          </div>
        </section>
      </div>
    </section>
  );
}

export default CompanyInterest;
