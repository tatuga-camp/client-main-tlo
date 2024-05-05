import Number from "@/components/Number";
import React, { useState } from "react";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "react-aria-components";
import Checkbox from "@mui/material/Checkbox";
import { FiPlusCircle } from "react-icons/fi";

const NrruDesignForm2 = () => {
  const [activeContent, setActiveContent] = useState(1);

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
    contentNumber: number,
  ) => {
    e.preventDefault();
    setActiveContent(contentNumber);
  };
  return (
    <div className=" w-full  rounded-md border-[1px] border-solid border-[#BED6FF] bg-white p-5 py-10 md:p-10">
      <Form className="mx-0 my-5 flex flex-col gap-5 md:mx-5 md:my-10 ">
        {/* ข้อ 1*/}
        <section className="flex flex-col items-start justify-center gap-3 md:gap-5  lg:flex-row">
          <section className="flex items-center gap-3">
            <Number number={1} />
            <p className="my-2 text-[0.8rem] font-semibold md:min-w-64 md:text-base">
              ชื่อที่แสดงถึงการประดิษฐ์
            </p>
          </section>
          <div className="flex w-full flex-col flex-wrap gap-3 pl-7 text-[0.8rem] md:flex-row md:gap-5 md:pl-0 md:text-base">
            <TextField className={"flex w-full min-w-60 items-center gap-3 "}>
              <Label className=" text-[var(--primary-blue) min-w-24 font-medium md:min-w-40">
                ชื่อภาษาไทย
              </Label>
              <Input
                name=""
                type="text"
                className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:min-w-80 md:pl-4 "
                placeholder="กรอกชื่อภาษาไทย"
              />
            </TextField>
          </div>
        </section>

        {/* ข้อ 2*/}
        <section className="flex items-start justify-center gap-3 md:items-center md:gap-5">
          <Number number={2} />
          <div className="flex w-full flex-col gap-3 text-[0.8rem] md:flex-row md:gap-5 md:text-base">
            <TextField className={"flex w-full items-center gap-3 md:w-[50%]"}>
              <Label className=" text-[var(--primary-blue) min-w-28 font-semibold md:min-w-32">
                ปีที่เริ่มการประดิษฐ์
              </Label>
              <Input
                name=""
                type="text"
                className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                placeholder="ปี 2565"
              />
            </TextField>
            <TextField className={"flex w-full items-center gap-3 md:w-[50%]"}>
              <Label className="min-w-28 font-semibold text-[var(--primary-blue)] md:min-w-32">
                ปีที่ผลงานแล้วเสร็จ
              </Label>
              <Input
                name=""
                type="text"
                className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10  md:p-2 md:pl-4"
                placeholder="ปี 2567"
              />
            </TextField>
          </div>
        </section>

        {/* ข้อ 3*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={3} />
            <p className="my-2 text-[0.8rem] font-semibold md:min-w-64 md:text-base">
              สิ่งที่ได้จากการประดิษฐ์/งานวิจัย/ข้อค้นพบ (ตอบได้มากกว่า 1 ข้อ)
            </p>
          </section>

          <div className="grid w-full grid-cols-1 gap-1.5 px-5 text-[0.8rem] md:grid-cols-3 md:gap-3 md:pl-0 md:text-base">
            {/* row1 */}
            <section className=" flex items-center gap-2">
              <div>
                <Checkbox inputProps={{ "aria-label": "controlled" }} />
              </div>
              <p className="font-medium"> ตัวผลิตภัณฑ์</p>
            </section>
            <section className=" flex items-center gap-2">
              <div>
                <Checkbox inputProps={{ "aria-label": "controlled" }} />
              </div>
              <p className="font-medium"> กรรมวิธีการผลิต</p>
            </section>
            <section className=" flex items-center gap-2">
              <div>
                <Checkbox inputProps={{ "aria-label": "controlled" }} />
              </div>
              <p className="font-medium"> ระบบการทำงาน</p>
            </section>
            {/* row2 */}
            <section className=" flex items-center gap-2">
              <div>
                <Checkbox inputProps={{ "aria-label": "controlled" }} />
              </div>
              <p className="font-medium"> โครงสร้างของเครื่อง</p>
            </section>
            <section className=" flex items-center gap-2">
              <div>
                <Checkbox inputProps={{ "aria-label": "controlled" }} />
              </div>
              <p className="font-medium"> โปรแกรมคอมพิวเตอร์</p>
            </section>
            <section className=" flex items-center gap-2">
              <div>
                <Checkbox inputProps={{ "aria-label": "controlled" }} />
              </div>
              <p className="font-medium"> องค์ความรู้</p>
            </section>
            {/* row3 */}
            <section className=" flex items-center gap-2">
              <div>
                <Checkbox inputProps={{ "aria-label": "controlled" }} />
              </div>
              <p className="font-medium"> คู่มือ</p>
            </section>
            <section className=" flex items-center gap-2">
              <div>
                <Checkbox inputProps={{ "aria-label": "controlled" }} />
              </div>
              <p className="font-medium"> รูปเล่มรายงานวิจัย</p>
            </section>
            <section className=" flex items-center gap-2">
              <div>
                <Checkbox inputProps={{ "aria-label": "controlled" }} />
              </div>
              <p className="font-medium"> สื่อการเรียนการสอน</p>
            </section>
            {/* row4 */}
            <section className=" flex items-center gap-2">
              <div>
                <Checkbox inputProps={{ "aria-label": "controlled" }} />
              </div>
              <p className="font-medium">
                {" "}
                สื่อประชาสัมพันธ์ เช่น โบชัวร์ แผ่นพับ คลิปวิดีโอ
              </p>
            </section>
            <section className=" flex items-center gap-2">
              <div>
                <Checkbox inputProps={{ "aria-label": "controlled" }} />
              </div>
              <p className="font-medium"> สูตร/ส่วนผสมของผลิตภัณฑ์</p>
            </section>
          </div>
          <section className="flex w-full flex-col gap-2 px-5 md:flex-row md:px-0">
            <div className="flex items-center gap-2">
              <div>
                <Checkbox inputProps={{ "aria-label": "controlled" }} />
              </div>
              <p className="text-[0.8rem] font-medium md:text-base">
                อื่นๆ (โปรดระบุ)
              </p>
            </div>

            <TextField className={"ml-3"}>
              <Input
                name=""
                type="text"
                className="h-8 w-full rounded-md  bg-slate-300 p-1 pl-3 text-[0.8rem] md:h-10 md:p-2  md:pl-4 md:text-base"
                placeholder=""
              />
            </TextField>
          </section>
        </section>

        {/* ข้อ 4*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={4} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              ผลิตภัณฑ์/ผลงานนี้ได้รับทุนอุดหนุนหรืออยู่ภายใต้ข้อตกลง
              หรือสัญญาใด ๆ กับหน่วยงานอื่น หรือไม่ (ให้ระบุ)
            </p>
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem] md:flex-row md:gap-5 md:pl-0 md:text-base">
            <TextField className={"flex w-full items-center gap-3 md:w-[80%]"}>
              <Input
                name=""
                type="text"
                className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                placeholder="เลือกประเภททุนอุดหนุน"
              />
            </TextField>

            <section className="flex flex-col gap-5 md:flex-row">
              <TextField
                className={"flex w-full items-center gap-3 md:w-[50%]"}
              >
                <Label className=" text-[var(--primary-blue) min-w-28 font-semibold md:min-w-20">
                  แหล่งทุน
                </Label>
                <Input
                  name=""
                  type="text"
                  className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                  placeholder="แหล่งทุน"
                />
              </TextField>
              <TextField
                className={"flex w-full items-center gap-3 md:w-[50%]"}
              >
                <Label className="min-w-28 font-semibold text-[var(--primary-blue)] md:min-w-24">
                  ปีงบประมาณ
                </Label>
                <Input
                  name=""
                  type="text"
                  className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10  md:p-2 md:pl-4"
                  placeholder="ปี 2567"
                />
              </TextField>
            </section>
          </div>
        </section>

        {/* ข้อ 5*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={5} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              การยื่นขอความเป็นเจ้าของผลงานวิจัยและนวัตกรรมกับแหล่งให้ทุน
              (กรณีรับทุนวิจัยจากแหล่งทุนภายนอก)
            </p>
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem] md:flex-row md:gap-5 md:pl-0 md:text-base">
            <TextField className={"flex w-full items-center gap-3 md:w-[70%]"}>
              <Input
                name=""
                type="text"
                className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                placeholder="มีการยื่นขอเป็นเจ้าของผลงานวิจัยและนวัตกรรมกับแหล่งทุนแล้ว"
              />
            </TextField>
            <button className=" flex  items-center justify-center gap-3 rounded-md bg-[#BED6FF] p-2 px-5 font-semibold duration-300 hover:bg-[#91B2EB] md:gap-5">
              <span className="text-3xl md:text-base">
                <FiPlusCircle />
              </span>
              <p>แนบหนังสือแสดงความเป็นเจ้าของผลงานวิจัยและนวัตกรรม</p>
            </button>
          </div>
        </section>

        {/* ข้อ 6*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={6} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              ส่วนใดส่วนหนึ่งของการวิจัยที่นำมาซึ่งการประดิษฐ์นี้
              ได้มีการลงนามหรืออยู่ภายใต้ข้อตกลงหรือสัญญาใด ๆ
              กับหน่วยงานอื่นหรือไม่ (ให้ระบุ)
            </p>
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem] md:flex-row md:gap-5 md:pl-0 md:text-base">
            <section className="flex w-full flex-col gap-2 px-5 md:flex-row md:px-0">
              <div className="flex items-center gap-2">
                <div>
                  <Checkbox inputProps={{ "aria-label": "controlled" }} />
                </div>
                <p className="text-[0.8rem] font-medium md:text-base">
                  สัญญาถ่ายโอนวัสดุชีวภาพ (ระบุชื่อหน่วยงาน ปีที่ได้ลงนาม)
                </p>
              </div>

              <TextField className={"ml-3"}>
                <Input
                  name=""
                  type="text"
                  className="h-8 w-full rounded-md  bg-slate-300 p-1 pl-3 text-[0.8rem] md:h-10 md:p-2  md:pl-4 md:text-base"
                  placeholder=""
                />
              </TextField>
            </section>
            <section className="flex w-full flex-col gap-2 px-5 md:flex-row md:px-0">
              <div className="flex items-center gap-2">
                <div>
                  <Checkbox inputProps={{ "aria-label": "controlled" }} />
                </div>
                <p className="text-[0.8rem] font-medium md:text-base">
                  อื่นๆ (โปรดระบุ)
                </p>
              </div>

              <TextField className={"ml-3"}>
                <Input
                  name=""
                  type="text"
                  className="h-8 w-full rounded-md  bg-slate-300 p-1 pl-3 text-[0.8rem] md:h-10 md:p-2  md:pl-4 md:text-base"
                  placeholder=""
                />
              </TextField>
            </section>
            <section className="flex w-full flex-col gap-2 px-5 md:flex-row md:px-0">
              <div className="flex items-center gap-2">
                <div>
                  <Checkbox inputProps={{ "aria-label": "controlled" }} />
                </div>
                <p className="text-[0.8rem] font-medium md:text-base">ไม่มี</p>
              </div>
            </section>
          </div>
        </section>

        {/* ข้อ 7*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={7} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              ข้อมูลประกอบการสืบค้นสิทธิบัตรเบื้องต้น
            </p>
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem] md:flex-row md:gap-5 md:pl-0 md:text-base">
            <section className="flex w-full items-center gap-3 md:pl-10">
              <p className="font-semibold md:min-w-52">
                7.1 Keyword ที่ใช้ในการสืบค้น
              </p>
              <TextField className={"w-full md:px-8"}>
                <Input
                  name=""
                  type="text"
                  className="h-8 w-auto rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem] md:h-10 md:p-2   md:text-base"
                  placeholder="โปรดระบุ Keyword"
                />
              </TextField>
            </section>
            <section className="flex w-full flex-col  gap-3 md:pl-10">
              <p className="font-semibold md:min-w-52">
                7.2 เว็บไซต์/ฐานข้อมูลที่ใช้ในการสืบค้น
              </p>
              <div className="grid w-full grid-cols-1 gap-1.5 px-5 text-[0.8rem] md:grid-cols-2 md:gap-3 md:pl-0 md:text-base">
                {/* row1 */}
                <section className=" flex items-center gap-2">
                  <div>
                    <Checkbox inputProps={{ "aria-label": "controlled" }} />
                  </div>
                  <p className="font-medium">
                    {" "}
                    ประเทศไทย : www.ipthailand.go.th
                  </p>
                </section>
                <section className=" flex items-center gap-2">
                  <div>
                    <Checkbox inputProps={{ "aria-label": "controlled" }} />
                  </div>
                  <p className="font-medium"> สหรัฐอเมริกา : www.uspto.gov</p>
                </section>
                <section className=" flex items-center gap-2">
                  <div>
                    <Checkbox inputProps={{ "aria-label": "controlled" }} />
                  </div>
                  <p className="font-medium"> ญี่ปุ่น : www.jpo.go.jp</p>
                </section>
                <section className=" flex items-center gap-2">
                  <div>
                    <Checkbox inputProps={{ "aria-label": "controlled" }} />
                  </div>
                  <p className="font-medium"> ยุโรป : www.espacenet.com</p>
                </section>
                <section className="flex w-full flex-col gap-2 px-5 md:flex-row md:px-0">
                  <div className="flex items-center gap-2">
                    <div>
                      <Checkbox inputProps={{ "aria-label": "controlled" }} />
                    </div>
                    <p className="text-[0.8rem] font-medium md:text-base">
                      อื่นๆ (วารสาร แหล่งข้อมูลอื่น)
                    </p>
                  </div>

                  <TextField className={"ml-3"}>
                    <Input
                      name=""
                      type="text"
                      className="h-8 w-full rounded-md  bg-slate-300 p-1 pl-3 text-[0.8rem] md:h-10 md:p-2  md:pl-4 md:text-base"
                      placeholder="โปรดระบุ"
                    />
                  </TextField>
                </section>
              </div>
            </section>
            <section className="flex w-full items-center gap-3 md:pl-10">
              <p className="font-semibold md:min-w-52">
                7.3 ผลของการสืบค้นพบว่า
              </p>
              <TextField className={"w-full md:px-8"}>
                <Input
                  name=""
                  type="text"
                  className="h-8 w-auto rounded-md bg-slate-300 p-1  pl-3 text-[0.8rem] md:h-10 md:min-w-96 md:p-2   md:text-base"
                  placeholder="ไม่เหมือนหรือคล้ายกับงานที่ปรากฏอยู่ก่อนแล้ว"
                />
              </TextField>
            </section>
            <section className="flex w-full flex-col gap-3 md:pl-10">
              <p className="font-semibold md:min-w-52">
                7.4 สิทธิบัตรหรืออนุสิทธิบัตรที่เกี่ยวข้องที่ได้จากการสืบค้น
                หรืองานที่ปรากฏอยู่ก่อน
              </p>
              <div className="flex flex-col items-center justify-center md:w-full">
                <div className="flex w-[80%] flex-col items-center justify-center md:w-[60%]">
                  <section className="flex w-full flex-col gap-2 md:flex-row">
                    <button
                      onClick={(e) => handleClick(e, 1)}
                      className={`w-full border-[1px]  border-solid border-[#BED6FF] px-5 py-2 font-medium md:min-w-52 ${
                        activeContent === 1
                          ? "bg-[#BED6FF] text-[var(--primary-blue)]"
                          : "bg-white text-[#78A9FF] "
                      }`}
                    >
                      สิทธิบัตรหรืออนุสิทธิบัตร
                    </button>
                    <button
                      onClick={(e) => handleClick(e, 2)}
                      className={`w-full border-[1px] border-solid border-[#BED6FF] px-5 py-2 font-medium md:min-w-52 ${
                        activeContent === 2
                          ? "bg-[#BED6FF] text-[var(--primary-blue)]"
                          : "bg-white text-[#78A9FF] "
                      }`}
                    >
                      วารสารวิชาการ
                    </button>
                    <button
                      onClick={(e) => handleClick(e, 3)}
                      className={`w-full border-[1px] border-solid border-[#BED6FF] px-5 py-2 font-medium md:min-w-52 ${
                        activeContent === 3
                          ? "bg-[#BED6FF] text-[var(--primary-blue)]"
                          : "bg-white text-[#78A9FF] "
                      }`}
                    >
                      อื่น ๆ
                    </button>
                  </section>
                  <div className="mt-4 w-full items-center justify-center border-[1px] border-solid border-[#BED6FF] p-5 font-medium">
                    {activeContent === 1 && (
                      <section className="flex flex-col items-center gap-2">
                        <TextField
                          className={
                            "ml-3 flex flex-col items-center gap-3 md:flex-row"
                          }
                        >
                          <Label className="min-w-28  text-[var(--primary-blue)] md:min-w-44">
                            ชื่อที่แสดงถึงการประดิษฐ์ :
                          </Label>
                          <Input
                            name=""
                            type="text"
                            className="h-8 rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem] md:h-10 md:w-72 md:p-2  md:pl-4 md:text-base"
                            placeholder=""
                          />
                        </TextField>
                        <TextField
                          className={
                            "ml-3 flex flex-col items-center gap-3 md:flex-row"
                          }
                        >
                          <Label className="min-w-28  text-[var(--primary-blue)] md:min-w-44">
                            เลขที่คำขอ/เลขที่สิทธิบัตร :
                          </Label>
                          <Input
                            name=""
                            type="text"
                            className="h-8 rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem] md:h-10 md:w-72 md:p-2  md:pl-4 md:text-base"
                            placeholder=""
                          />
                        </TextField>
                        <TextField
                          className={
                            "ml-3 flex flex-col items-center gap-3 md:flex-row"
                          }
                        >
                          <Label className="min-w-28  text-[var(--primary-blue)] md:min-w-44">
                            ประเทศ :
                          </Label>
                          <Input
                            name=""
                            type="text"
                            className="h-8 rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem] md:h-10 md:w-72 md:p-2  md:pl-4 md:text-base"
                            placeholder=""
                          />
                        </TextField>
                        <button className="my-3 flex w-48 items-center justify-center gap-3 rounded-md bg-[#9747FF] p-2 text-xs font-semibold text-white duration-300 hover:bg-purple-700 md:px-3 md:py-2 md:text-base ">
                          <FiPlusCircle /> <p>เพิ่มข้อมูล</p>
                        </button>
                      </section>
                    )}
                    {activeContent === 2 && (
                      <section className="flex flex-col items-center gap-2">
                        <TextField
                          className={
                            "ml-3 flex flex-col items-center gap-3 md:flex-row"
                          }
                        >
                          <Label className="min-w-28  text-[var(--primary-blue)] md:min-w-44">
                            ชื่อที่แสดงถึงการประดิษฐ์ :
                          </Label>
                          <Input
                            name=""
                            type="text"
                            className="h-8 rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem] md:h-10 md:w-72 md:p-2  md:pl-4 md:text-base"
                            placeholder=""
                          />
                        </TextField>
                        <TextField
                          className={
                            "ml-3 flex flex-col items-center gap-3 md:flex-row"
                          }
                        >
                          <Label className="min-w-28  text-[var(--primary-blue)] md:min-w-44">
                            ชื่อวารสาร :
                          </Label>
                          <Input
                            name=""
                            type="text"
                            className="h-8 rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem] md:h-10 md:w-72 md:p-2  md:pl-4 md:text-base"
                            placeholder=""
                          />
                        </TextField>
                        <TextField
                          className={
                            "ml-3 flex flex-col items-center gap-3 md:flex-row"
                          }
                        >
                          <Label className="min-w-28  text-[var(--primary-blue)] md:min-w-44">
                            วันที่เผยแพร่ :
                          </Label>
                          <Input
                            name=""
                            type="text"
                            className="h-8 rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem] md:h-10 md:w-72 md:p-2  md:pl-4 md:text-base"
                            placeholder=""
                          />
                        </TextField>
                        <button className="my-3 flex w-48 items-center justify-center gap-3 rounded-md bg-[#9747FF] p-2 text-xs font-semibold text-white duration-300 hover:bg-purple-700 md:px-3 md:py-2 md:text-base ">
                          <FiPlusCircle /> <p>เพิ่มข้อมูล</p>
                        </button>
                      </section>
                    )}
                    {activeContent === 3 && (
                      <section className="flex flex-col items-center gap-2">
                        <TextField
                          className={
                            "ml-3 flex flex-col items-center gap-3 md:flex-row"
                          }
                        >
                          <Label className="min-w-28  text-[var(--primary-blue)] md:min-w-44">
                            ชื่อที่แสดงถึงการประดิษฐ์ :
                          </Label>
                          <Input
                            name=""
                            type="text"
                            className="h-8 rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem] md:h-10 md:w-72 md:p-2  md:pl-4 md:text-base"
                            placeholder=""
                          />
                        </TextField>
                        <TextField
                          className={
                            "ml-3 flex flex-col items-center gap-3 md:flex-row"
                          }
                        >
                          <Label className="min-w-28  text-[var(--primary-blue)] md:min-w-44">
                            ชื่อแหล่งข้อมูล :
                          </Label>
                          <Input
                            name=""
                            type="text"
                            className="h-8 rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem] md:h-10 md:w-72 md:p-2  md:pl-4 md:text-base"
                            placeholder=""
                          />
                        </TextField>
                        <TextField
                          className={
                            "ml-3 flex flex-col items-center gap-3 md:flex-row"
                          }
                        >
                          <Label className="min-w-28  text-[var(--primary-blue)] md:min-w-44">
                            วันที่เผยแพร่ :
                          </Label>
                          <Input
                            name=""
                            type="text"
                            className="h-8 rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem] md:h-10 md:w-72 md:p-2  md:pl-4 md:text-base"
                            placeholder=""
                          />
                        </TextField>
                        <button className="my-3 flex w-48 items-center justify-center gap-3 rounded-md bg-[#9747FF] p-2 text-xs font-semibold text-white duration-300 hover:bg-purple-700 md:px-3 md:py-2 md:text-base ">
                          <FiPlusCircle /> <p>เพิ่มข้อมูล</p>
                        </button>
                      </section>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>

        {/* ข้อ 8*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={8} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              ผลิตภัณฑ์/ผลงานนี้เคยนำไปยื่นขอรับสิทธิบัตรหรือไม่
            </p>
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem] md:flex-row md:gap-5 md:pl-0 md:text-base">
            <section className="flex w-full flex-col gap-2 px-5 md:flex-row md:px-0">
              <div className="flex items-center gap-2">
                <div>
                  <Checkbox inputProps={{ "aria-label": "controlled" }} />
                </div>
                <p className="text-[0.8rem] font-medium md:text-base">เคย</p>
              </div>

              <TextField className={"ml-3 flex items-center"}>
                <Label className="min-w-28  text-[var(--primary-blue)] md:min-w-24">
                  เลขที่คำขอ :
                </Label>
                <Input
                  name=""
                  type="text"
                  className="h-8 w-full rounded-md  bg-slate-300 p-1 pl-3 text-[0.8rem] md:h-10 md:p-2  md:pl-4 md:text-base"
                  placeholder=""
                />
              </TextField>
              <TextField className={"ml-3 flex items-center"}>
                <Label className="min-w-28  text-[var(--primary-blue)] md:min-w-24">
                  ยื่นเมื่อวันที่ :
                </Label>
                <Input
                  name=""
                  type="text"
                  className="h-8 w-full rounded-md  bg-slate-300 p-1 pl-3 text-[0.8rem] md:h-10 md:p-2  md:pl-4 md:text-base"
                  placeholder=""
                />
              </TextField>
              <TextField className={"ml-3 flex items-center"}>
                <Label className="min-w-28  text-[var(--primary-blue)] md:min-w-24">
                  ประเทศที่ยื่น :
                </Label>
                <Input
                  name=""
                  type="text"
                  className="h-8 w-full rounded-md  bg-slate-300 p-1 pl-3 text-[0.8rem] md:h-10 md:p-2  md:pl-4 md:text-base"
                  placeholder=""
                />
              </TextField>
            </section>
            <section className="flex w-full flex-col gap-2 px-5 md:flex-row md:px-0">
              <div className="flex items-center gap-2">
                <div>
                  <Checkbox inputProps={{ "aria-label": "controlled" }} />
                </div>
                <p className="text-[0.8rem] font-medium md:text-base">ไม่เคย</p>
              </div>
            </section>
          </div>
        </section>

        {/* ข้อ 9*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={9} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              การเปิดเผยสาระสำคัญของการประดิษฐ์/การเผยแพร่ผลงาน
            </p>
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem] md:flex-row md:gap-5 md:pl-0 md:text-base">
            <section className="flex w-full flex-col gap-2 px-5 md:w-[60%]  md:px-0">
              <div className="flex items-center gap-2">
                <div>
                  <Checkbox inputProps={{ "aria-label": "controlled" }} />
                </div>
                <p className="text-[0.8rem] font-medium md:text-base">
                  มีการเปิดเผยการประดิษฐ์/การเผยแพร่ผลงานแล้วในรูปแบบ :
                </p>
              </div>

              <TextField className={"ml-3"}>
                <Input
                  name=""
                  type="text"
                  className="h-8 w-full rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem] md:ml-8 md:h-10 md:p-2  md:pl-4 md:text-base"
                  placeholder="การนำเสนอผลงานในการประชุม/การแสดงสินค้า/การออก..."
                />
              </TextField>
              <button className=" flex items-center  justify-center gap-3 rounded-md bg-[#BED6FF] p-2 px-5 font-semibold duration-300 hover:bg-[#91B2EB] md:ml-11 md:gap-5">
                <span className="text-3xl md:text-base">
                  <FiPlusCircle />
                </span>

                <p>แนบรายละเอียดหรือเอกสารประกอบการเผยแพร่ (ถ้ามี)</p>
              </button>
            </section>
            <section className="flex w-full flex-col gap-2 px-5 md:flex-row md:px-0">
              <div className="flex items-center gap-2">
                <div>
                  <Checkbox inputProps={{ "aria-label": "controlled" }} />
                </div>
                <p className="text-[0.8rem] font-medium md:text-base">
                  ยังไม่เปิดเผยการประดิษฐ์/เผยแพร่ผลงาน
                </p>
              </div>
            </section>
          </div>
        </section>

        {/* ข้อ 10*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={10} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              ความใหม่ของการออกแบบผลิตภัณฑ์
            </p>
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem] md:flex-row md:gap-5 md:pl-0 md:text-base">
            <p className={"w-full md:px-8"}>
              โปรดระบุถึงลักษณะเด่นและอธิบายในรายละเอียดของความใหม่
              โดยเฉพาะในส่วนที่ได้พัฒนาให้ดีขึ้นกว่าเดิมได้
              โดยเน้นให้เห็นถึงความ แตกต่างจากแบบผลิตภัณฑ์เดิม
            </p>
            <TextField className={"w-full md:px-8"}>
              <Input
                name=""
                type="text"
                className="h-8 w-full rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem] md:h-10 md:p-2  md:pl-4 md:text-base"
                placeholder="กรอกข้อมูล"
              />
            </TextField>
          </div>
        </section>
        {/* ข้อ 11*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={11} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              คำพรรณนาผลิตภัณฑ์ (ถ้ามี)
            </p>
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem] md:flex-row md:gap-5 md:pl-0 md:text-base">
            <TextField className={"w-full md:px-8"}>
              <Input
                name=""
                type="text"
                className="h-8 w-full rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem] md:h-10 md:p-2  md:pl-4 md:text-base"
                placeholder="กรอกข้อมูล"
              />
            </TextField>
          </div>
        </section>
        {/* ข้อ 12*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={12} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              แผนการพัฒนาวิจัย ที่ต้องการพัฒนาผลิตภัณฑ์ในขั้นต่อไป (ถ้ามี)
            </p>
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem] md:flex-row md:gap-5 md:pl-0 md:text-base">
            <TextField className={"w-full md:px-8"}>
              <Input
                name=""
                type="text"
                className="h-8 w-full rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem] md:h-10 md:p-2  md:pl-4 md:text-base"
                placeholder="กรอกข้อมูล"
              />
            </TextField>
          </div>
        </section>
      </Form>
    </div>
  );
};

export default NrruDesignForm2;
