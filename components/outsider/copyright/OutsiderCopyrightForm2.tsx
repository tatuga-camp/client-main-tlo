import Number from "@/components/Number";
import React, { useState } from "react";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  FieldError,
  FileTrigger,
  Form,
  Input,
  Label,
  Radio,
  RadioGroup,
  TextArea,
  TextField,
} from "react-aria-components";
import { Calendar } from "primereact/calendar";
import { FiPlusCircle } from "react-icons/fi";
import {
  menuDesignForm2,
  menuNrruCopyright2,
  menuWebDesign,
} from "@/data/menu";
import { IoIosCheckbox } from "react-icons/io";
import {
  MdCheckBoxOutlineBlank,
  MdOutlineRadioButtonChecked,
  MdOutlineRadioButtonUnchecked,
} from "react-icons/md";

const OutsiderCopyrightForm2 = () => {
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
              ชื่อผลงาน
            </p>
          </section>
          <div className="flex w-full flex-col flex-wrap gap-3 pl-7 text-[0.8rem] md:flex-row md:gap-5 md:pl-0 md:text-base">
            <TextField
              isRequired
              className={"flex w-full min-w-60 items-center gap-3 "}
            >
              <section className="flex flex-col">
                <Input
                  name=""
                  type="text"
                  className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:min-w-80 md:pl-4 "
                  placeholder="กรอกชื่อภาษาไทย"
                />

                <FieldError className="text-xs text-red-700" />
              </section>
            </TextField>
          </div>
        </section>

        {/* ข้อ 2*/}
        <RadioGroup className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={2} />
            <Label className="my-2 text-[0.8rem] font-semibold md:min-w-64 md:text-base">
              ประเภทของงานอันมีลิขสิทธิ์
            </Label>
          </section>
          <Button className=" ml-5 flex items-center justify-center  gap-3 rounded-md bg-[#BED6FF] p-2 px-5 text-[0.8rem] font-semibold duration-300 hover:bg-[#91B2EB] md:ml-10 md:gap-5 md:text-base">
            <p>การเลือกประเภทงานอันมีลิขสิทธิ์ (คลิก)</p>
          </Button>
          <div className="grid w-full grid-cols-1 gap-1.5 px-5 text-[0.8rem] md:grid-cols-3 md:gap-3 md:pl-10 md:text-base">
            {menuNrruCopyright2.map((item, index) => {
              return (
                <Radio
                  key={index}
                  className={({ isPressed, isSelected }) =>
                    isSelected ? "" : ""
                  }
                  value={item.title}
                >
                  {({ isSelected }) => (
                    <div className="flex items-center justify-start gap-2 ">
                      <div className=" text-2xl">
                        {isSelected ? (
                          <MdOutlineRadioButtonChecked />
                        ) : (
                          <MdOutlineRadioButtonUnchecked />
                        )}
                      </div>
                      <span className="font-medium">{item.title}</span>
                    </div>
                  )}
                </Radio>
              );
            })}
          </div>
        </RadioGroup>

        {/* ข้อ 3*/}
        <section className=" flex items-start justify-center gap-3 md:items-center md:gap-5">
          <div className="mt-2 md:mt-0">
            <Number number={3} />
          </div>

          <div className="flex w-full flex-col gap-3 text-[0.8rem] md:flex-row md:gap-5 md:text-base">
            <TextField
              isRequired
              className={"flex w-full items-center gap-3 md:w-[50%]"}
            >
              <Label className="min-w-28 font-semibold text-[var(--primary-blue)] md:min-w-32">
                ปีที่สร้างสรรค์ผลงานแล้วเสร็จ
              </Label>
              <section className="flex flex-col">
                <div className="w-32 rounded-lg bg-slate-300 p-1 text-xs md:w-40 md:text-base">
                  <Calendar
                    required
                    locale="th"
                    view="year"
                    placeholder="ปี 2024"
                    dateFormat="yy"
                  />
                </div>
                <FieldError className="text-xs text-red-700" />
              </section>
            </TextField>
          </div>
        </section>

        {/* ข้อ 4*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={4} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              ลักษณะการสร้างสรรค์
            </p>
          </section>

          <RadioGroup className="my-3 flex flex-col items-start justify-center gap-2 md:gap-5  lg:flex-row">
            <div className="flex w-full flex-col  gap-1.5 px-5 text-[0.8rem] md:gap-3 md:pl-10 md:text-base">
              <Radio value={"1"} className="flex items-center">
                {({ isSelected }) => (
                  <div className="flex items-center justify-center gap-2">
                    <div className="text-2xl">
                      {isSelected ? (
                        <MdOutlineRadioButtonChecked />
                      ) : (
                        <MdOutlineRadioButtonUnchecked />
                      )}
                    </div>
                    <span className="font-medium">
                      สร้างสรรค์ขึ้นเองทั้งหมด
                    </span>
                  </div>
                )}
              </Radio>
              <section className="flex flex-col gap-3 ">
                <Radio value={"2"} className="flex w-full items-center">
                  {({ isSelected }) => (
                    <div className="flex items-center justify-center gap-2">
                      <div className="text-2xl">
                        {isSelected ? (
                          <MdOutlineRadioButtonChecked />
                        ) : (
                          <MdOutlineRadioButtonUnchecked />
                        )}
                      </div>
                      <span className="font-medium md:min-w-[25rem]">
                        สร้างสรรค์บางส่วน (ระบุ)
                      </span>
                    </div>
                  )}
                </Radio>
                <TextField
                  className={
                    "flex w-full items-center gap-3 md:ml-8 md:w-[70%]"
                  }
                >
                  <section className="flex w-full flex-col">
                    <Input
                      name=""
                      type="text"
                      className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                      placeholder="โปรดระบุ Keyword"
                    />
                    <FieldError className="text-xs text-red-700" />
                  </section>
                </TextField>
              </section>

              <section className="flex flex-col gap-3 ">
                <Radio value={"3"} className="flex w-full items-center">
                  {({ isSelected }) => (
                    <div className="flex items-center justify-center gap-2">
                      <div className="text-2xl">
                        {isSelected ? (
                          <MdOutlineRadioButtonChecked />
                        ) : (
                          <MdOutlineRadioButtonUnchecked />
                        )}
                      </div>
                      <span className="font-medium md:min-w-[25rem]">
                        จ้างทำของ
                      </span>
                    </div>
                  )}
                </Radio>
                <TextField
                  className={
                    "flex w-full items-center gap-3 md:ml-8 md:w-[70%]"
                  }
                >
                  <section className="flex w-full flex-col">
                    <Input
                      name=""
                      type="text"
                      className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                      placeholder="ไม่มีหนังสือตกลงฯ"
                    />
                    <FieldError className="text-xs text-red-700" />
                  </section>
                </TextField>
              </section>

              <Radio value={"4"} className="flex items-center">
                {({ isSelected }) => (
                  <div className="flex items-center justify-center gap-2">
                    <div className="text-2xl">
                      {isSelected ? (
                        <MdOutlineRadioButtonChecked />
                      ) : (
                        <MdOutlineRadioButtonUnchecked />
                      )}
                    </div>
                    <span className="font-medium">ไม่มี</span>
                  </div>
                )}
              </Radio>
              <Radio value={"5"} className="flex items-center">
                {({ isSelected }) => (
                  <div className="flex items-center justify-center gap-2">
                    <div className="text-2xl">
                      {isSelected ? (
                        <MdOutlineRadioButtonChecked />
                      ) : (
                        <MdOutlineRadioButtonUnchecked />
                      )}
                    </div>
                    <span className="font-medium">
                      เป็นผู้ดัดแปลงโดยได้รับอนุญาตจากเจ้าของลิขสิทธิ์
                    </span>
                  </div>
                )}
              </Radio>
              <Radio value={"6"} className="flex items-center">
                {({ isSelected }) => (
                  <div className="flex items-center justify-center gap-2">
                    <div className="text-2xl">
                      {isSelected ? (
                        <MdOutlineRadioButtonChecked />
                      ) : (
                        <MdOutlineRadioButtonUnchecked />
                      )}
                    </div>
                    <span className="font-medium">
                      เป็นผู้รวบรวมหรือประกอบเข้ากัน
                      โดยได้รับอนุญาตจากเจ้าของลิขสิทธิ์ ( เช่น พจนานุกรม
                      หรือเว็บเพจ)
                    </span>
                  </div>
                )}
              </Radio>
              <Radio value={"7"} className="flex items-center">
                {({ isSelected }) => (
                  <div className="flex items-center justify-center gap-2">
                    <div className="text-2xl">
                      {isSelected ? (
                        <MdOutlineRadioButtonChecked />
                      ) : (
                        <MdOutlineRadioButtonUnchecked />
                      )}
                    </div>
                    <span className="font-medium">
                      เป็นผู้นำเอาข้อมูลหรือสิ่งอื่นใดมารวบรวมหรือประกอบเข้ากันในรูปฐานข้อมูลหรืออื่นๆ
                    </span>
                  </div>
                )}
              </Radio>
              <section className="flex flex-col gap-3 ">
                <Radio value={"8"} className="flex w-full items-center">
                  {({ isSelected }) => (
                    <div className="flex items-center justify-center gap-2">
                      <div className="text-2xl">
                        {isSelected ? (
                          <MdOutlineRadioButtonChecked />
                        ) : (
                          <MdOutlineRadioButtonUnchecked />
                        )}
                      </div>
                      <span className="font-medium md:min-w-[25rem]">
                        อื่น ๆ
                      </span>
                    </div>
                  )}
                </Radio>
                <TextField
                  className={
                    "flex w-full items-center gap-3 md:ml-8 md:w-[70%]"
                  }
                >
                  <section className="flex w-full flex-col">
                    <Input
                      name=""
                      type="text"
                      className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                      placeholder="โปรดระบุ"
                    />
                    <FieldError className="text-xs text-red-700" />
                  </section>
                </TextField>
              </section>
            </div>
          </RadioGroup>
        </section>

        {/* ข้อ 5*/}
        <CheckboxGroup className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={5} />
            <Label className="my-2 text-[0.8rem] font-semibold md:min-w-64 md:text-base">
              สิ่งที่ได้จากการประดิษฐ์/งานวิจัย/ข้อค้นพบ (ตอบได้มากกว่า 1 ข้อ)
            </Label>
          </section>

          <div className="grid w-full grid-cols-1 gap-1.5 px-5 text-[0.8rem] md:ml-10 md:grid-cols-3 md:gap-3 md:pl-0 md:text-base">
            {menuDesignForm2.map((item, index) => {
              return (
                <Checkbox
                  key={index}
                  className={({ isPressed, isSelected }) =>
                    isSelected ? "" : ""
                  }
                  value={item.title}
                >
                  {({ isSelected }) => (
                    <div className="flex items-center justify-start gap-2 ">
                      <div className=" text-3xl">
                        {isSelected ? (
                          <IoIosCheckbox />
                        ) : (
                          <MdCheckBoxOutlineBlank />
                        )}
                      </div>
                      <span className="font-medium">{item.title}</span>
                    </div>
                  )}
                </Checkbox>
              );
            })}
          </div>
          <section className="flex w-full flex-col gap-2 px-5 md:ml-10 md:flex-row md:px-0">
            <Checkbox
              className={({ isPressed, isSelected }) => (isSelected ? "" : "")}
              value={"อื่นๆ"}
            >
              {({ isSelected }) => (
                <div className="flex items-center justify-start gap-2 ">
                  <div className=" text-3xl">
                    {isSelected ? (
                      <IoIosCheckbox />
                    ) : (
                      <MdCheckBoxOutlineBlank />
                    )}
                  </div>
                  <span className="font-medium">อื่นๆ (โปรดระบุ)</span>
                </div>
              )}
            </Checkbox>

            <TextField className={"ml-3"}>
              <Input
                name=""
                type="text"
                className="h-8 w-full rounded-md  bg-slate-300 p-1 pl-3 text-[0.8rem] md:h-10 md:p-2  md:pl-4 md:text-base"
                placeholder=""
              />
              <FieldError className="text-xs text-red-700" />
            </TextField>
          </section>
        </CheckboxGroup>

        {/* ข้อ 6*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={6} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              การจัดทำสื่อสำหรับคนพิการ
            </p>
          </section>

          <RadioGroup className="my-3 flex flex-col items-start justify-center gap-2 md:ml-10 md:gap-5  lg:flex-row">
            <div className="flex w-full flex-col  gap-1.5 px-5 text-[0.8rem] md:gap-3 md:pl-0 md:text-base">
              <section className="flex flex-col gap-3 md:flex-row">
                <Radio value={"1"} className="flex w-full items-center">
                  {({ isSelected }) => (
                    <div className="flex items-center justify-center gap-2">
                      <div className="text-2xl">
                        {isSelected ? (
                          <MdOutlineRadioButtonChecked />
                        ) : (
                          <MdOutlineRadioButtonUnchecked />
                        )}
                      </div>
                      <span className="font-medium md:min-w-[25rem]">มี</span>
                    </div>
                  )}
                </Radio>
              </section>

              <RadioGroup className=" flex flex-col items-start justify-center gap-2 md:gap-5 ">
                <section className="flex items-center gap-3">
                  <Label className="my-2 text-[0.8rem] font-semibold md:ml-5 md:min-w-64 md:text-base">
                    ประเภทสื่อ
                  </Label>
                </section>

                <div className="grid w-full grid-cols-1 gap-1.5 px-5 text-[0.8rem] md:grid-cols-3 md:gap-3 md:pl-10 md:text-base">
                  {menuNrruCopyright2.map((item, index) => {
                    return (
                      <Radio
                        key={index}
                        className={({ isPressed, isSelected }) =>
                          isSelected ? "" : ""
                        }
                        value={item.title}
                      >
                        {({ isSelected }) => (
                          <div className="flex items-center justify-start gap-2 ">
                            <div className=" text-2xl">
                              {isSelected ? (
                                <MdOutlineRadioButtonChecked />
                              ) : (
                                <MdOutlineRadioButtonUnchecked />
                              )}
                            </div>
                            <span className="font-medium">{item.title}</span>
                          </div>
                        )}
                      </Radio>
                    );
                  })}
                </div>
              </RadioGroup>

              <Radio value={"3"} className="flex items-center">
                {({ isSelected }) => (
                  <div className="flex items-center justify-center gap-2">
                    <div className="text-2xl">
                      {isSelected ? (
                        <MdOutlineRadioButtonChecked />
                      ) : (
                        <MdOutlineRadioButtonUnchecked />
                      )}
                    </div>
                    <span className="font-medium">ไม่มี</span>
                  </div>
                )}
              </Radio>
            </div>
          </RadioGroup>
        </section>

        {/* ข้อ 7*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={7} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              การแจ้ง/จดทะเบียนลิขสิทธิ์ในต่างประเทศ
            </p>
          </section>

          <RadioGroup className="mb-3 flex flex-col items-start justify-center gap-2 md:ml-10 md:gap-5  lg:flex-row">
            <div className="flex w-full flex-col  gap-1.5 px-5 text-[0.8rem] md:gap-3 md:pl-0 md:text-base">
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
                      ไม่เคยแจ้งหรือจดทะเบียน
                    </span>
                  </div>
                )}
              </Radio>
              <Radio value={"1"} className="flex w-full items-center">
                {({ isSelected }) => (
                  <div className="flex flex-col justify-center gap-2  md:flex-row md:items-center">
                    <div className="flex w-full gap-2 text-2xl md:items-center">
                      {isSelected ? (
                        <MdOutlineRadioButtonChecked />
                      ) : (
                        <MdOutlineRadioButtonUnchecked />
                      )}
                      <div className="flex flex-col items-center md:flex-row">
                        <span className="w-full text-[0.9rem] font-medium md:min-w-64 md:text-base">
                          แจ้งหรือจดทะเบียนไว้ที่ประเทศ (ระบุ)
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </Radio>
              <TextField className={"flex w-full items-center gap-3"}>
                <section className="flex w-full flex-col">
                  <Input
                    name=""
                    type="text"
                    className="md:w-62 h-8 rounded-md bg-slate-300 p-1 pl-3 md:ml-8 md:h-10 "
                    placeholder=""
                  />
                  <FieldError className="text-xs text-red-700" />
                </section>
              </TextField>
            </div>
          </RadioGroup>
        </section>

        {/* ข้อ 8*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={8} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              การโฆษณางาน
            </p>
          </section>
          <p className="pl-5 text-[0.85rem] font-medium  md:-mt-5 md:ml-11 md:pl-0 md:text-base">
            การนำสำเนางานออกจำหน่ายโดยความยินยอมของผู้สร้างสรรค์
            โดยสำเนามีจำนวนมากพอสมควร
          </p>
          <RadioGroup className="mb-3 flex flex-col items-start justify-center gap-2 md:ml-10 md:gap-5  lg:flex-row">
            <div className="flex w-full flex-col  gap-1.5 px-5 text-[0.8rem] md:gap-3 md:pl-0 md:text-base">
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
                      ยังไม่ได้โฆษณา
                    </span>
                  </div>
                )}
              </Radio>
              <Radio value={"1"} className="flex w-full items-center">
                {({ isSelected }) => (
                  <div className="flex flex-col justify-center gap-2  md:flex-row md:items-center">
                    <div className="flex w-full gap-2 text-2xl md:items-center">
                      {isSelected ? (
                        <MdOutlineRadioButtonChecked />
                      ) : (
                        <MdOutlineRadioButtonUnchecked />
                      )}
                      <div className="flex flex-col items-center md:flex-row">
                        <span className="w-full text-[0.9rem] font-medium md:min-w-64 md:text-base">
                          ได้โฆษณาแล้วโดยโฆษณาครั้งแรก
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </Radio>
              <section className="flex flex-row gap-3 md:ml-10">
                <p className="my-2 text-[0.8rem] font-semibold md:min-w-16 md:text-base">
                  วัน/เดือน/ปี :
                </p>
                <div className="w-40 rounded-lg bg-slate-300 p-1">
                  <Calendar
                    required
                    locale="th"
                    view="month"
                    placeholder="01/02/2024"
                    dateFormat="dd/mm/yy"
                  />
                </div>
                <FieldError className="text-xs text-red-700" />
              </section>
              <TextField className={"flex w-full items-center gap-3 md:ml-10"}>
                <Label className="my-2 w-16 text-[0.8rem] font-semibold md:min-w-16 md:text-base">
                  ประเทศ :
                </Label>
                <section className="flex w-full flex-col">
                  <Input
                    name=""
                    type="text"
                    className="md:w-62 h-8 rounded-md bg-slate-300 p-1 pl-3 md:ml-2 md:h-10 "
                    placeholder=""
                  />
                  <FieldError className="text-xs text-red-700" />
                </section>
              </TextField>
            </div>
          </RadioGroup>
        </section>

        {/* ข้อ 9*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={9} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              การอนุญาตให้ใช้สิทธิ์/โอนลิขสิทธิ์
            </p>
          </section>

          <RadioGroup className="mb-3 flex flex-col items-start justify-center gap-2 md:ml-10 md:gap-5  lg:flex-row">
            <div className="flex w-full flex-col  gap-1.5 px-5 text-[0.8rem] md:gap-3 md:pl-0 md:text-base">
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
                      ไม่เคยอนุญาตให้ใช้สิทธิ์/โอนลิขสิทธิ์
                    </span>
                  </div>
                )}
              </Radio>
              <Radio value={"1"} className="flex w-full items-center">
                {({ isSelected }) => (
                  <div className="flex flex-col justify-center gap-2  md:flex-row md:items-center">
                    <div className="flex w-full gap-2 text-2xl md:items-center">
                      {isSelected ? (
                        <MdOutlineRadioButtonChecked />
                      ) : (
                        <MdOutlineRadioButtonUnchecked />
                      )}
                      <div className="flex flex-col items-center md:flex-row">
                        <span className="w-full text-[0.9rem] font-medium md:min-w-64 md:text-base">
                          อนุญาตให้ใช้สิทธิ์/โอนลิขสิทธิ์ให้แก่ :
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </Radio>
              <TextField className={"flex w-full items-center gap-3 md:ml-10"}>
                <section className="flex w-full flex-col">
                  <Input
                    name=""
                    type="text"
                    className="h-8 rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:w-96 "
                    placeholder=""
                  />
                  <FieldError className="text-xs text-red-700" />
                </section>
              </TextField>
              <section className="flex flex-row gap-3 md:ml-10">
                <p className="my-2 w-28 text-[0.8rem] font-semibold md:min-w-16 md:text-base">
                  เมื่อวัน/เดือน/ปี :
                </p>
                <div className="w-40 rounded-lg bg-slate-300 p-1">
                  <Calendar
                    required
                    locale="th"
                    view="month"
                    placeholder="01/02/2024"
                    dateFormat="dd/mm/yy"
                  />
                </div>
                <FieldError className="text-xs text-red-700" />
              </section>
              <h1 className="font-semibold md:ml-10">ลักษณะการโอนสิทธิ :</h1>
              <RadioGroup className="mb-3 flex flex-col items-start justify-center gap-2 md:ml-12 md:gap-5  lg:flex-row">
                <div className="flex w-full flex-col  gap-1.5 px-5 text-[0.8rem] md:gap-3 md:pl-0 md:text-base">
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
                          โอนสิทธิทั้งหมด
                        </span>
                      </div>
                    )}
                  </Radio>
                  <Radio value={"1"} className="flex w-full items-center">
                    {({ isSelected }) => (
                      <div className="flex flex-col justify-center gap-2  md:flex-row md:items-center">
                        <div className="flex w-full gap-2 text-2xl md:items-center">
                          {isSelected ? (
                            <MdOutlineRadioButtonChecked />
                          ) : (
                            <MdOutlineRadioButtonUnchecked />
                          )}
                          <div className="flex flex-col items-center md:flex-row">
                            <span className="w-full text-[0.9rem] font-medium md:min-w-64 md:text-base">
                              โอนสิทธิบางส่วน (ระบุ)
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </Radio>
                  <TextField
                    className={"flex w-full items-center gap-3 md:ml-10"}
                  >
                    <section className="flex w-full flex-col">
                      <Input
                        name=""
                        type="text"
                        className="h-8 rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:w-56 "
                        placeholder=""
                      />
                      <FieldError className="text-xs text-red-700" />
                    </section>
                  </TextField>
                </div>
              </RadioGroup>
              <h1 className="font-semibold md:ml-10">ระยะเวลาโอนสิทธิ :</h1>
              <RadioGroup className="mb-3 flex flex-col items-start justify-center gap-2 md:ml-12 md:gap-5  lg:flex-row">
                <div className="flex w-full flex-col  gap-1.5 px-5 text-[0.8rem] md:gap-3 md:pl-0 md:text-base">
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
                          ตลอดอายุลิขสิทธิ์
                        </span>
                      </div>
                    )}
                  </Radio>
                  <Radio value={"1"} className="flex w-full items-center">
                    {({ isSelected }) => (
                      <div className="flex flex-col justify-center gap-2  md:flex-row md:items-center">
                        <div className="flex w-full gap-2 text-2xl md:items-center">
                          {isSelected ? (
                            <MdOutlineRadioButtonChecked />
                          ) : (
                            <MdOutlineRadioButtonUnchecked />
                          )}
                          <div className="flex flex-col items-center md:flex-row">
                            <span className="w-full text-[0.9rem] font-medium md:min-w-64 md:text-base">
                              มีกำหนดเวลา (ระบุ)
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </Radio>
                  <TextField
                    className={"flex w-full items-center gap-3 md:ml-10"}
                  >
                    <section className="flex w-full flex-col">
                      <Input
                        name=""
                        type="text"
                        className="h-8 rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:w-56 "
                        placeholder=""
                      />
                      <FieldError className="text-xs text-red-700" />
                    </section>
                  </TextField>
                </div>
              </RadioGroup>
            </div>
          </RadioGroup>
        </section>

        {/* ข้อ 10*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={10} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              รายละเอียดผลงานโดยย่อ
            </p>
          </section>
          <p className="pl-5 text-[0.85rem] font-medium md:ml-10 md:pl-0 md:text-base">
            บรรยายถึงที่มาหรือวัตถุประสงค์ในการสร้างสรรค์ผลงาน
            แรงบันดาลใจในการสร้างสรรค์ผลงาน ลักษณะของผลงานหรือการนำผลงานไปใช้
            ประโยชน์ในด้านต่างๆ
          </p>
          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem] md:flex-row md:gap-5 md:pl-0 md:text-base">
            <TextField className={"w-full md:px-8"}>
              <TextArea
                name=""
                className="h-40 w-full resize-none rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem]  md:p-2  md:pl-4 md:text-base"
                placeholder="กรอกข้อมูล"
              />
            </TextField>
          </div>
        </section>
      </Form>
    </div>
  );
};

export default OutsiderCopyrightForm2;
