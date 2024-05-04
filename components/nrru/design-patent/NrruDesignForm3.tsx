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
import Checkbox from "@mui/material/Checkbox";

const NrruDesignForm3 = () => {
  return (
    <div className=" w-full  rounded-md border-[1px] border-solid border-[#BED6FF] bg-white p-5 py-10 md:p-10">
      <Form className="mx-0 my-5 flex flex-col gap-5 md:mx-5 md:my-10 ">
        {/* ข้อ 1 */}
        <section className="flex flex-col items-start justify-center gap-3 md:gap-5  lg:flex-row">
          <section className="flex items-center gap-3">
            <Number number={1} />
            <p className="my-2 text-[0.8rem] font-semibold md:min-w-64 md:text-base">
              ระยะเวลาในการประดิษฐ์/การวิจัย :
            </p>
          </section>
          <div className="flex w-full flex-col gap-3 pl-7 text-[0.8rem] md:flex-row md:gap-5 md:pl-0 md:text-base">
            <TextField className={"flex w-full min-w-60 items-center gap-3 "}>
              <Input
                name=""
                type="text"
                className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10  md:pl-4 "
                placeholder="จำนวนปี"
              />
              <Label className=" text-[var(--primary-blue) min-w-24 font-medium md:min-w-24">
                ปี
              </Label>
            </TextField>
            <TextField className={"flex w-full min-w-60 items-center gap-3 "}>
              <Input
                name=""
                type="text"
                className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10  md:pl-4 "
                placeholder="จำนวนเดือน"
              />
              <Label className=" text-[var(--primary-blue) min-w-24 font-medium md:min-w-24">
                เดือน
              </Label>
            </TextField>
          </div>
        </section>
        {/* ข้อ 2 */}
        <section className="flex flex-col items-start justify-center gap-3 md:gap-5  lg:flex-row">
          <section className="flex items-center gap-3">
            <Number number={2} />
            <p className="my-2 text-[0.8rem] font-semibold md:min-w-96 md:text-base">
              ค่าใช้จ่ายที่ใช้ในการออกแบบผลิตภัณฑ์/ดำเนินการวิจัย :
            </p>
          </section>
          <div className="flex w-full flex-col gap-3 pl-7 text-[0.8rem] md:flex-row md:gap-5 md:pl-0 md:text-base">
            <TextField className={"flex w-full min-w-60 items-center gap-3 "}>
              <Input
                name=""
                type="text"
                className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10  md:pl-4 "
                placeholder=""
              />
              <Label className=" text-[var(--primary-blue) min-w-24 font-medium md:min-w-24">
                บาท
              </Label>
            </TextField>
          </div>
        </section>
        {/* ข้อ 3*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={3} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              ข้อมูลประกอบการสืบค้นสิทธิบัตรเบื้องต้น
            </p>
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem] md:flex-row md:gap-5 md:pl-0 md:text-base">
            <section className="flex w-full flex-col  gap-3 md:pl-10">
              <div className="grid grid-cols-1 gap-1.5 px-5 text-[0.8rem] md:w-[80%] md:grid-cols-2 md:gap-3 md:pl-0 md:text-[0.9rem]">
                {/* row1 */}
                <section className=" flex items-center gap-2 ">
                  <div>
                    <Checkbox inputProps={{ "aria-label": "controlled" }} />
                  </div>
                  <p className="font-medium"> การใช้ประโยชน์เชิงวิชาการ</p>
                </section>
                <section className=" flex items-center gap-2">
                  <div>
                    <Checkbox inputProps={{ "aria-label": "controlled" }} />
                  </div>
                  <p className="font-medium"> การใช้ประโยชน์เชิงนโยบาย</p>
                </section>
                <section className=" flex items-center gap-2">
                  <div>
                    <Checkbox inputProps={{ "aria-label": "controlled" }} />
                  </div>
                  <p className="font-medium">การใช้ประโยชน์เชิงสาธารณะ</p>
                </section>
                <section className=" flex items-center gap-2">
                  <div>
                    <Checkbox inputProps={{ "aria-label": "controlled" }} />
                  </div>
                  <p className="font-medium"> การใช้ประโยชน์เชิงพาณิชย์</p>
                </section>
              </div>
              <section className="flex w-full flex-col gap-2 px-5 md:flex-row md:px-0">
                <div className="flex items-center gap-2">
                  <div>
                    <Checkbox inputProps={{ "aria-label": "controlled" }} />
                  </div>
                  <p className="font-medium md:text-[0.9rem]">
                    การใช้ประโยชน์ด้านอื่นๆ (โปรดระบุ)
                  </p>
                </div>

                <TextField className={"ml-3"}>
                  <Input
                    name=""
                    type="text"
                    className=" h-8 w-full rounded-md  bg-slate-300 p-1 pl-3 text-[0.8rem] md:h-10 md:p-2  md:pl-4 md:text-base"
                    placeholder=""
                  />
                </TextField>
              </section>
              <button className=" flex w-full items-center justify-center gap-3  rounded-md bg-[#BED6FF] p-2 px-5 font-semibold duration-300 hover:bg-[#91B2EB]   md:w-72 md:gap-5">
                <p>รูปแบบการใช้ประโยชน์ (คลิก)</p>
              </button>
            </section>
          </div>
        </section>
        {/* ข้อ 4*/}
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

        {/* ข้อ 5*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={5} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              การประชาสัมพันธ์ผลงานการประดิษฐ์นี้โดยมหาวิทยาลัย
            </p>
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem] md:flex-row md:gap-5 md:pl-10 md:text-base">
            <section className="flex w-full flex-col gap-2 px-5 md:flex-row md:px-0">
              <div className="flex items-center gap-2">
                <div>
                  <Checkbox inputProps={{ "aria-label": "controlled" }} />
                </div>
                <p className="text-[0.8rem] font-medium md:text-base">ยินยอม</p>
              </div>
            </section>
            <section className="flex w-full flex-col gap-2 px-5 md:flex-row md:px-0">
              <div className="flex items-center gap-2">
                <div>
                  <Checkbox inputProps={{ "aria-label": "controlled" }} />
                </div>
                <p className="text-[0.8rem] font-medium md:text-base">
                  ไม่ยินยอม
                </p>
              </div>

              <TextField className={"ml-3"}>
                <Input
                  name=""
                  type="text"
                  className="h-8 w-full rounded-md  bg-slate-300 p-1 pl-3 text-[0.8rem] md:h-10 md:p-2  md:pl-4 md:text-base"
                  placeholder="กรุณาระบุเหตุผล"
                />
              </TextField>
            </section>
          </div>
        </section>
      </Form>
    </div>
  );
};

export default NrruDesignForm3;
