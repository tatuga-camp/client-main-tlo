import Number from "@/components/Number";
import React from "react";
import {
  Button,
  FieldError,
  Checkbox,
  CheckboxGroup,
  Form,
  Input,
  Label,
  TextField,
  Radio,
  RadioGroup,
} from "react-aria-components";
import { InputMask, InputMaskChangeEvent } from "primereact/inputmask";
import { FiPlusCircle } from "react-icons/fi";
import { IoIosCheckbox } from "react-icons/io";
import {
  MdCheckBoxOutlineBlank,
  MdOutlineRadioButtonChecked,
  MdOutlineRadioButtonUnchecked,
} from "react-icons/md";
import { menuNrruDesign3 } from "@/data/menuDesign";

const NrruDesignForm3 = () => {
  return (
    <div className=" w-full  rounded-md border-[1px] border-solid border-[#BED6FF] bg-white p-5 py-10 md:p-10">
      <Form className="mx-0 my-5 flex flex-col gap-5 md:mx-5 md:my-10 ">
        {/* ข้อ 1 */}
        <section className="flex flex-col items-start justify-center gap-3 md:gap-5  lg:flex-row">
          <section className="flex items-center gap-3">
            <Number number={1} />
            <p className="my-2 text-[0.8rem] font-semibold md:min-w-[25rem] md:text-base">
              ระยะเวลาในการออกแบบผลิตภัณฑ์/การวิจัย :
            </p>
          </section>
          <div className="flex w-full flex-col gap-3 pl-7 text-[0.8rem] md:flex-row md:gap-5 md:pl-0 md:text-base">
            <TextField
              isRequired
              className={"flex w-full min-w-60 items-center gap-3 "}
            >
              <section className="flex flex-col">
                <Input
                  name=""
                  type="text"
                  className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10  md:pl-4 "
                  placeholder="จำนวนปี"
                />
                <FieldError className="text-xs text-red-700" />
              </section>

              <Label className=" text-[var(--primary-blue) min-w-24 font-medium md:min-w-24">
                ปี
              </Label>
            </TextField>
            <TextField
              isRequired
              className={"flex w-full min-w-60 items-center gap-3 "}
            >
              <section className="flex flex-col">
                <Input
                  name=""
                  type="text"
                  className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10  md:pl-4 "
                  placeholder="จำนวนเดือน"
                />
                <FieldError className="text-xs text-red-700" />
              </section>

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
              ค่าใช้จ่ายที่ใช้ในการประดิษฐ์ผลงาน/ดำเนินการวิจัย :
            </p>
          </section>
          <div className="flex w-full flex-col gap-3 pl-7 text-[0.8rem] md:flex-row md:gap-5 md:pl-0 md:text-base">
            <TextField
              isRequired
              className={"flex w-full min-w-60 items-center gap-3 "}
            >
              <section className="flex flex-col">
                <Input
                  name=""
                  type="text"
                  className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10  md:pl-4 "
                  placeholder=""
                />
                <FieldError className="text-xs text-red-700" />
              </section>
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
              ผลงานนี้สามารถนำไปใช้ประโยชน์ในรูปแบบหรือลักษณะใด (ตอบได้มากกว่า 1
              ข้อ)
            </p>
          </section>

          <CheckboxGroup className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
            <div className="grid w-full grid-cols-1 gap-1.5 px-5 text-[0.8rem] md:grid-cols-2 md:gap-3 md:pl-0 md:text-base">
              {/* row1 */}

              {menuNrruDesign3.map((item, index) => {
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
            <section className="flex w-full flex-col gap-2 px-5 md:flex-row md:px-0">
              <div className="flex items-center gap-2">
                <div>
                  <Checkbox />
                </div>
                <p className="text-[0.8rem] font-medium md:text-base">
                  การใช้ประโยชน์ด้านอื่นๆ (โปรดระบุ)
                </p>
              </div>

              <TextField className={"ml-3"}>
                <Input
                  name=""
                  type="text"
                  className="h-8 w-full rounded-md  bg-slate-300 p-1 pl-3 text-[0.8rem] md:h-10 md:p-2  md:pl-4 md:text-base"
                  placeholder="โปรดระบุ"
                />
                <FieldError className="text-xs text-red-700" />
              </TextField>
            </section>
          </CheckboxGroup>
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
                <TextField
                  isRequired
                  className={"flex w-full items-center gap-2 "}
                >
                  <Label className=" text-[var(--primary-blue) min-w-20 font-medium md:min-w-44">
                    1) ชื่อหน่วยงาน/บริษัทที่สนใจ :
                  </Label>
                  <section className="flex flex-col">
                    <Input
                      name=""
                      type="text"
                      className="h-8 w-auto rounded-md bg-slate-300 p-1 pl-3 md:h-10  md:pl-4 "
                      placeholder="กรอกข้อมูล"
                    />
                    <FieldError className="text-xs text-red-700" />
                  </section>
                </TextField>
                <TextField
                  isRequired
                  className={"flex w-full  items-center gap-2 "}
                >
                  <Label className=" text-[var(--primary-blue) min-w-20 font-medium md:min-w-14">
                    ชื่อผู้ประสาน :
                  </Label>
                  <section className="flex flex-col">
                    <Input
                      name=""
                      type="text"
                      className="h-8 w-auto rounded-md bg-slate-300 p-1 pl-3 md:h-10  md:pl-4 "
                      placeholder="กรอกข้อมูล"
                    />
                    <FieldError className="text-xs text-red-700" />
                  </section>
                </TextField>
                <TextField
                  isRequired
                  className={"flex w-full  items-center gap-2 "}
                >
                  <Label className=" text-[var(--primary-blue) min-w-20 font-medium md:min-w-14">
                    เบอร์ติดต่อ :
                  </Label>
                  <section className="flex flex-col">
                    <Input
                      name=""
                      type="text"
                      className="h-8 w-auto rounded-md bg-slate-300 p-1 pl-3 md:h-10  md:pl-4 "
                      placeholder="กรอกข้อมูล"
                    />

                    <FieldError className="text-xs text-red-700" />
                  </section>
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

          <RadioGroup className="my-3 flex flex-col items-start justify-center gap-2 md:gap-5  lg:flex-row">
            <div className="flex w-full flex-col  gap-1.5 px-5 text-[0.8rem] md:gap-3 md:pl-0 md:text-base">
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
                    <span className="font-medium">ยินยอม</span>
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
                      ไม่ยินยอม
                    </span>
                    <TextField
                      className={"flex w-full items-center gap-3 md:w-[70%]"}
                    >
                      <section className="flex w-full flex-col">
                        <Input
                          name=""
                          type="text"
                          className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                          placeholder="กรุณาระบุเหตุผล"
                        />
                        <FieldError className="text-xs text-red-700" />
                      </section>
                    </TextField>
                  </div>
                )}
              </Radio>
            </div>
          </RadioGroup>
        </section>
      </Form>
    </div>
  );
};

export default NrruDesignForm3;
