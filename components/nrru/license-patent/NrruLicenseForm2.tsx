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
import { FaRegCircle } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";

const NrruLicenseForm2 = () => {
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
        <section className="flex items-start justify-center gap-3 md:items-center md:gap-5">
          <Number number={1} />
          <div className="flex w-full flex-col gap-3 text-[0.8rem] md:flex-row md:gap-5 md:text-base">
            <TextField
              className={
                "flex w-full flex-col gap-3 md:w-[50%] md:flex-row md:items-center"
              }
            >
              <Label className=" text-[var(--primary-blue) min-w-28 font-semibold md:min-w-52">
                ชื่อผลงาน
              </Label>
              <Input
                name=""
                type="text"
                className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                placeholder="กรอกชื่อภาษาไทย"
              />
            </TextField>
          </div>
        </section>

        {/* ข้อ 2*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={2} />
            <p className="my-2 text-[0.8rem] font-semibold md:min-w-64 md:text-base">
              ประเภทของงานอันมีลิขสิทธิ์
            </p>
          </section>

          <div className="grid w-full grid-cols-1 gap-1.5 px-5 text-[0.8rem] md:grid-cols-3 md:gap-3 md:pl-0 md:text-base">
            {/* row1 */}
            <section className=" flex items-center gap-2">
              <div>
                <Checkbox inputProps={{ "aria-label": "controlled" }} />
              </div>
              <p className="font-medium"> วรรณกรรม</p>
            </section>
            <section className=" flex items-center gap-2">
              <div>
                <Checkbox inputProps={{ "aria-label": "controlled" }} />
              </div>
              <p className="font-medium"> ภาพยนตร์</p>
            </section>
            <section className=" flex items-center gap-2">
              <div>
                <Checkbox inputProps={{ "aria-label": "controlled" }} />
              </div>
              <p className="font-medium"> ดนตรีกรรม</p>
            </section>
            {/* row2 */}
            <section className=" flex items-center gap-2">
              <div>
                <Checkbox inputProps={{ "aria-label": "controlled" }} />
              </div>
              <p className="font-medium"> โสตทัศนวัสดุ</p>
            </section>
            <section className=" flex items-center gap-2">
              <div>
                <Checkbox inputProps={{ "aria-label": "controlled" }} />
              </div>
              <p className="font-medium"> ศิลปกรรม</p>
            </section>
            <section className=" flex items-center gap-2">
              <div>
                <Checkbox inputProps={{ "aria-label": "controlled" }} />
              </div>
              <p className="font-medium"> งานแพร่เสียงแพร่ภาพ</p>
            </section>
            {/* row3 */}
            <section className=" flex items-center gap-2">
              <div>
                <Checkbox inputProps={{ "aria-label": "controlled" }} />
              </div>
              <p className="font-medium"> นาฏกรรม</p>
            </section>
            <section className=" flex items-center gap-2">
              <div>
                <Checkbox inputProps={{ "aria-label": "controlled" }} />
              </div>
              <p className="font-medium"> สิ่งบันทึกเสียง</p>
            </section>
            <section className=" flex items-center gap-2">
              <div>
                <Checkbox inputProps={{ "aria-label": "controlled" }} />
              </div>
              <p className="font-medium">
                {" "}
                งานอื่นใดในแผนกวรรณคดีแผนกวิทยาศาสตร์หรือแผนกศิลปะ
              </p>
            </section>
            <button className=" flex items-center  justify-center gap-3 rounded-md bg-[#BED6FF] p-2 px-5 font-semibold duration-300 hover:bg-[#91B2EB]  md:gap-5">
              <p>การเลือกประเภทงานอันมีลิขสิทธิ์ (คลิก) (ถ้ามี)</p>
            </button>
          </div>
        </section>

        {/* ข้อ 3*/}
        <section className="flex items-start justify-center gap-3 md:items-center md:gap-5">
          <Number number={3} />
          <div className="flex w-full flex-col gap-3 text-[0.8rem] md:flex-row md:gap-5 md:text-base">
            <TextField
              className={
                "flex w-full flex-col gap-3 md:w-[50%] md:flex-row md:items-center"
              }
            >
              <Label className=" text-[var(--primary-blue) min-w-28 font-semibold md:min-w-52">
                ปีที่สร้างสรรค์ผลงานแล้วเสร็จ
              </Label>
              <Input
                name=""
                type="text"
                className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                placeholder="ปี 2565"
              />
            </TextField>
          </div>
        </section>

        {/* ข้อ 4*/}
        <section className="flex items-start justify-center gap-3  md:gap-5">
          <Number number={4} />
          <div className="flex w-full flex-col gap-3 text-[0.8rem] md:flex-row md:gap-5 md:text-base">
            <TextField className={"flex w-full flex-col gap-3 md:w-[50%] "}>
              <Label className=" text-[var(--primary-blue) min-w-28 font-semibold md:min-w-52">
                ลักษณะการสร้างสรรค์
              </Label>
              <section className=" flex items-center gap-2">
                <div>
                  <Checkbox inputProps={{ "aria-label": "controlled" }} />
                </div>
                <p className="font-medium"> สร้างสรรค์ขึ้นเองทั้งหมด</p>
              </section>
              <section className=" flex items-center gap-2">
                <div>
                  <Checkbox inputProps={{ "aria-label": "controlled" }} />
                </div>
                <p className="font-medium"> สร้างสรรค์บางส่วน (ระบุ)</p>
              </section>
              <TextField
                className={
                  "flex w-full flex-col gap-3 md:ml-10 md:w-[50%] md:flex-row md:items-center"
                }
              >
                <Input
                  name=""
                  type="text"
                  className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                  placeholder="โปรดระบุ Keyword"
                />
              </TextField>
              <section className=" flex items-center gap-2">
                <div>
                  <Checkbox inputProps={{ "aria-label": "controlled" }} />
                </div>
                <p className="font-medium"> จ้างทำของ</p>
              </section>
              <TextField
                className={
                  "flex w-full flex-col gap-3 md:ml-10 md:w-[50%] md:flex-row md:items-center"
                }
              >
                <Input
                  name=""
                  type="text"
                  className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                  placeholder="ไม่มีหนังสือตกลงฯ"
                />
              </TextField>
              <section className=" flex items-center gap-2">
                <div>
                  <Checkbox inputProps={{ "aria-label": "controlled" }} />
                </div>
                <p className="font-medium">
                  {" "}
                  เป็นผู้ดัดแปลงโดยได้รับอนุญาตจากเจ้าของลิขสิทธิ์
                </p>
              </section>
              <section className=" flex items-center gap-2">
                <div>
                  <Checkbox inputProps={{ "aria-label": "controlled" }} />
                </div>
                <p className="font-medium">
                  {" "}
                  เป็นผู้รวบรวมหรือประกอบเข้ากัน
                  โดยได้รับอนุญาตจากเจ้าของลิขสิทธิ์ ( เช่น พจนานุกรม
                  หรือเว็บเพจ)
                </p>
              </section>
              <section className=" flex items-center gap-2">
                <div>
                  <Checkbox inputProps={{ "aria-label": "controlled" }} />
                </div>
                <p className="font-medium">
                  {" "}
                  เป็นผู้นำเอาข้อมูลหรือสิ่งอื่นใดมารวบรวมหรือประกอบเข้ากันในรูปฐานข้อมูลหรืออื่นๆ
                </p>
              </section>
              <section className=" flex items-center gap-2">
                <div>
                  <Checkbox inputProps={{ "aria-label": "controlled" }} />
                </div>
                <p className="font-medium"> อื่น ๆ</p>
              </section>
              <TextField
                className={
                  "flex w-full flex-col gap-3 md:ml-10 md:w-[50%] md:flex-row md:items-center"
                }
              >
                <Input
                  name=""
                  type="text"
                  className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                  placeholder="โปรดระบุ"
                />
              </TextField>
            </TextField>
          </div>
        </section>

        {/* ข้อ 5*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={5} />
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

        {/* ข้อ 6*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={6} />
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

        {/* ข้อ 8*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={8} />
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
                <p className="text-[0.8rem] font-medium md:text-base">มี</p>
              </div>
            </section>

            <section className="flex flex-col items-start justify-center gap-2 md:ml-10 md:gap-5 ">
              <p className="font-semibold">ประเภทสื่อ</p>
              <div className="grid w-full grid-cols-1 gap-1.5 px-5 text-[0.8rem] md:grid-cols-3 md:gap-3 md:pl-0 md:text-base">
                {/* row1 */}
                <section className=" flex items-center gap-2">
                  <div>
                    <Checkbox
                      icon={<FaRegCircle />}
                      checkedIcon={<FaCircleCheck />}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </div>
                  <p className="font-medium"> หนังสืออักษรเบรลล์</p>
                </section>
                <section className=" flex items-center gap-2">
                  <div>
                    <Checkbox
                      icon={<FaRegCircle />}
                      checkedIcon={<FaCircleCheck />}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </div>
                  <p className="font-medium"> สื่อที่มีลักษณะเป็นสื่อผสม</p>
                </section>
                <section className=" flex items-center gap-2">
                  <div>
                    <Checkbox
                      icon={<FaRegCircle />}
                      checkedIcon={<FaCircleCheck />}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </div>
                  <p className="font-medium"> สื่อเสียง</p>
                </section>
                {/* row2 */}
                <section className=" flex items-center gap-2">
                  <div>
                    <Checkbox
                      icon={<FaRegCircle />}
                      checkedIcon={<FaCircleCheck />}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </div>
                  <p className="font-medium"> สื่อภาษามือ</p>
                </section>
                <section className=" flex items-center gap-2">
                  <div>
                    <Checkbox
                      icon={<FaRegCircle />}
                      checkedIcon={<FaCircleCheck />}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </div>
                  <p className="font-medium"> สื่อที่มีลักษณะเป็นสื่อผสม</p>
                </section>
                <section className=" flex items-center gap-2">
                  <div>
                    <Checkbox
                      icon={<FaRegCircle />}
                      checkedIcon={<FaCircleCheck />}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </div>
                  <p className="font-medium"> คำบรรยายแทนเสียง</p>
                </section>
                {/* row3 */}
                <section className=" flex items-center gap-2">
                  <div>
                    <Checkbox
                      icon={<FaRegCircle />}
                      checkedIcon={<FaCircleCheck />}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </div>
                  <p className="font-medium"> ตัวหนังสือนูนแผนภาพนูน</p>
                </section>
                <section className=" flex items-center gap-2">
                  <div>
                    <Checkbox
                      icon={<FaRegCircle />}
                      checkedIcon={<FaCircleCheck />}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </div>
                  <p className="font-medium"> สื่อการสอนรูปทรงเรขาคณิต</p>
                </section>
                <section className=" flex items-center gap-2">
                  <div>
                    <Checkbox
                      icon={<FaRegCircle />}
                      checkedIcon={<FaCircleCheck />}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </div>
                  <p className="font-medium"> รูปจำลอง</p>
                </section>
                {/* row4 */}
                <section className=" flex items-center gap-2">
                  <div>
                    <Checkbox
                      icon={<FaRegCircle />}
                      checkedIcon={<FaCircleCheck />}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </div>
                  <p className="font-medium">
                    {" "}
                    สื่อเพื่อการเรียนรู้และพัฒนาทักษะ
                  </p>
                </section>
                <section className=" flex items-center gap-2">
                  <div>
                    <Checkbox
                      icon={<FaRegCircle />}
                      checkedIcon={<FaCircleCheck />}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </div>
                  <p className="font-medium">
                    {" "}
                    สื่ออิเล็กทรอนิกส์ตามมาตรฐานสากล
                  </p>
                </section>
              </div>
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
        {/* ข้อ 9*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={9} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              การแจ้ง/จดทะเบียนลิขสิทธิ์ในต่างประเทศ
            </p>
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem] md:flex-row md:gap-5 md:pl-0 md:text-base">
            <section className="flex w-full flex-col gap-2 px-5 md:flex-row md:px-0">
              <div className="flex items-center gap-2">
                <div>
                  <Checkbox inputProps={{ "aria-label": "controlled" }} />
                </div>
                <p className="text-[0.8rem] font-medium md:text-base">
                  ไม่เคยแจ้งหรือจดทะเบียน
                </p>
              </div>
            </section>

            <section className="flex w-full flex-col gap-2 px-5 md:flex-row md:px-0">
              <div className="flex items-center gap-2">
                <div>
                  <Checkbox inputProps={{ "aria-label": "controlled" }} />
                </div>
                <p className="text-[0.8rem] font-medium md:text-base">
                  แจ้งหรือจดทะเบียนไว้ที่ประเทศ (ระบุ)
                </p>
              </div>
            </section>
            <TextField className={"ml-3 flex items-center"}>
              <Input
                name=""
                type="text"
                className="h-8 w-full rounded-md bg-slate-300 p-1  pl-3 text-[0.8rem] md:-mt-3 md:ml-10 md:h-10 md:p-2  md:pl-4 md:text-base"
                placeholder=""
              />
            </TextField>
          </div>
        </section>

        {/* ข้อ 10*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={10} />
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
                <p className="text-[0.8rem] font-medium md:text-base">
                  ยังไม่ได้โฆษณา
                </p>
              </div>
            </section>
            <section className="flex w-full flex-col gap-2 px-5 md:flex-row md:px-0">
              <div className="flex items-center gap-2">
                <div>
                  <Checkbox inputProps={{ "aria-label": "controlled" }} />
                </div>
                <p className="text-[0.8rem] font-medium md:text-base">
                  ได้โฆษณาแล้วโดยโฆษณาครั้งแรก
                </p>
              </div>

              <TextField className={"ml-3 flex items-center"}>
                <Label className="min-w-28  text-[var(--primary-blue)] md:min-w-24">
                  วัน/เดือน/ปี :
                </Label>
                <Input
                  name=""
                  type="text"
                  className="h-8 w-full  rounded-md  bg-slate-300 p-1 pl-3 text-[0.8rem] md:h-10 md:p-2  md:pl-4 md:text-base"
                  placeholder=""
                />
              </TextField>
              <TextField className={"ml-3 flex items-center"}>
                <Label className="min-w-28  text-[var(--primary-blue)] md:min-w-24">
                  ประเทศ :
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
          </div>
        </section>

        {/* ข้อ 11*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={11} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              การอนุญาตให้ใช้สิทธิ์/โอนลิขสิทธิ์
            </p>
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem]  md:gap-5 md:pl-0 md:text-base">
            <section className="flex w-full flex-col gap-2 px-5 md:flex-row md:px-0">
              <div className="flex items-center gap-2">
                <div>
                  <Checkbox inputProps={{ "aria-label": "controlled" }} />
                </div>
                <p className="text-[0.8rem] font-medium md:text-base">
                  ไม่เคยอนุญาตให้ใช้สิทธิ์/โอนลิขสิทธิ์
                </p>
              </div>
            </section>

            <section className="flex w-full flex-col gap-2 px-5 md:flex-row md:px-0">
              <div className="flex items-center gap-2">
                <div>
                  <Checkbox inputProps={{ "aria-label": "controlled" }} />
                </div>
                <p className="text-[0.8rem] font-medium md:text-base">
                  อนุญาตให้ใช้สิทธิ์/โอนลิขสิทธิ์ให้แก่ :
                </p>
              </div>
            </section>
            <TextField className={"ml-3 flex items-center"}>
              <Input
                name=""
                type="text"
                className="h-8 w-full max-w-[20rem] rounded-md bg-slate-300 p-1 pl-3  text-[0.8rem] md:-mt-3 md:ml-10 md:h-10 md:min-w-[45rem] md:p-2  md:pl-4 md:text-base"
                placeholder=""
              />
            </TextField>
            <TextField className={"ml-3 flex items-center"}>
              <Label className="min-w-28 font-semibold text-[var(--primary-blue)]  md:ml-10 md:min-w-36">
                เมื่อวันที่/เดือน/ปี :
              </Label>
              <Input
                name=""
                type="text"
                className="h-8 w-full rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem] md:h-10 md:w-[10rem] md:p-2  md:pl-4 md:text-base"
                placeholder=""
              />
            </TextField>
            <section className="flex flex-col gap-3 md:ml-10">
              <p className="font-semibold">ลักษณะการโอนสิทธิ:</p>
              <section className="flex w-full flex-col gap-2 px-5 md:flex-row md:px-0">
                <div className="flex items-center gap-2">
                  <div>
                    <Checkbox
                      icon={<FaRegCircle />}
                      checkedIcon={<FaCircleCheck />}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </div>
                  <p className="text-[0.8rem] font-medium md:text-base">
                    โอนสิทธิทั้งหมด
                  </p>
                </div>
              </section>

              <section className="flex w-full flex-col gap-2 px-5 md:flex-row md:px-0">
                <div className="flex items-center gap-2">
                  <div>
                    <Checkbox
                      icon={<FaRegCircle />}
                      checkedIcon={<FaCircleCheck />}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </div>
                  <p className="text-[0.8rem] font-medium md:text-base">
                    โอนสิทธิบางส่วน (ระบุ) :
                  </p>
                </div>
              </section>
              <TextField className={"ml-3 flex items-center"}>
                <Input
                  name=""
                  type="text"
                  className="h-8 w-auto rounded-md  bg-slate-300 p-1 pl-3 text-[0.8rem]  md:ml-10  md:h-10 md:min-w-[10rem] md:min-w-[45rem] md:p-2  md:pl-4 md:text-base"
                  placeholder=""
                />
              </TextField>
            </section>
            <section className="flex flex-col gap-3 md:ml-10">
              <p className="font-semibold">ระยะเวลาโอนสิทธิ:</p>
              <section className="flex w-full flex-col gap-2 px-5 md:flex-row md:px-0">
                <div className="flex items-center gap-2">
                  <div>
                    <Checkbox
                      icon={<FaRegCircle />}
                      checkedIcon={<FaCircleCheck />}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </div>
                  <p className="text-[0.8rem] font-medium md:text-base">
                    ตลอดอายุลิขสิทธิ์
                  </p>
                </div>
              </section>

              <section className="flex w-full flex-col gap-2 px-5 md:flex-row md:px-0">
                <div className="flex items-center gap-2">
                  <div>
                    <Checkbox
                      icon={<FaRegCircle />}
                      checkedIcon={<FaCircleCheck />}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </div>
                  <p className="text-[0.8rem] font-medium md:text-base">
                    มีกำหนดเวลา (ระบุ) :
                  </p>
                </div>
              </section>
              <TextField className={"ml-3 flex items-center"}>
                <Input
                  name=""
                  type="text"
                  className="h-8 w-auto rounded-md bg-slate-300 p-1 pl-3 text-[0.8rem]  md:ml-10  md:h-10 md:w-[5rem] md:min-w-[10rem] md:p-2  md:pl-4 md:text-base"
                  placeholder=""
                />
              </TextField>
            </section>
          </div>
        </section>

        {/* ข้อ 12*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={12} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              รายละเอียดผลงานโดยย่อ
            </p>
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem] md:flex-row md:gap-5 md:pl-0 md:text-base">
            <p className={"w-full md:px-8"}>
              บรรยายถึงที่มาหรือวัตถุประสงค์ในการสร้างสรรค์ผลงาน
              แรงบันดาลใจในการสร้างสรรค์ผลงาน ลักษณะของผลงานหรือการนำผลงานไปใช้
              ประโยชน์ในด้านต่างๆ
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
      </Form>
    </div>
  );
};

export default NrruLicenseForm2;
