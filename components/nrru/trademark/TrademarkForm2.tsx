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
  menuTrademark2,
  menuWebDesign,
} from "@/data/menu";
import { IoIosCheckbox } from "react-icons/io";
import {
  MdCheckBoxOutlineBlank,
  MdOutlineRadioButtonChecked,
  MdOutlineRadioButtonUnchecked,
} from "react-icons/md";
import { HiOutlinePhotograph } from "react-icons/hi";

const TrademarkForm2 = () => {
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
            <p className="my-2 text-[0.8rem] font-semibold md:min-w-32 md:text-base">
              ชื่อเครื่องหมาย
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
            <p>การเลือกประเภทเครื่องหมายการค้า (คลิก)</p>
          </Button>
          <div className="grid w-full grid-cols-1 gap-1.5 px-5 text-[0.8rem] md:grid-cols-3 md:gap-3 md:pl-10 md:text-base">
            {menuTrademark2.map((item, index) => {
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
        <section className=" flex items-start justify-center gap-3  md:gap-5">
          <div className="mt-2 md:mt-0">
            <Number number={3} />
          </div>

          <div className="flex w-full flex-col gap-3 text-[0.8rem]  md:gap-5 md:text-base">
            <TextField isRequired className={"flex w-full items-center gap-3 "}>
              <Label className="min-w-28 font-semibold text-[var(--primary-blue)] md:min-w-32">
                ภาพเครื่องหมาย
              </Label>
            </TextField>
            <section className="flex flex-col gap-3">
              <FileTrigger>
                <Button className="w-44 rounded-md bg-[var(--secondary-yellow)] px-3 py-3 font-semibold shadow-md md:w-52">
                  อัพโหลดไฟล์ .pdf/.jpg
                </Button>
              </FileTrigger>
              <div className="flex h-44 w-44 items-center justify-center rounded-md border-2 border-solid border-[#BED6FF] text-4xl">
                <HiOutlinePhotograph />
              </div>
            </section>
          </div>
        </section>

        {/* ข้อ 4*/}
        <section className="flex flex-col items-start justify-center gap-3 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={4} />
            <p className="my-2 text-[0.8rem] font-semibold  md:text-base">
              คำอ่านและคำแปลเป็นภาษาไทย
              (กรณีที่ยื่นเครื่องหมายเป็นอักษรต่างประเทศ)
            </p>
          </section>
          <div className="flex w-full flex-col flex-wrap gap-3 pl-7 text-[0.8rem] md:ml-10 md:flex-row md:gap-5 md:pl-0 md:text-base">
            <TextField
              isRequired
              className={"flex w-full min-w-60 items-center gap-3 "}
            >
              <Label className="my-2 text-[0.8rem] font-semibold md:text-base">
                คำอ่าน
              </Label>
              <section className="flex flex-col">
                <Input
                  name=""
                  type="text"
                  className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:min-w-80 md:pl-4 "
                  placeholder="โปรดระบุ"
                />

                <FieldError className="text-xs text-red-700" />
              </section>
            </TextField>
            <TextField
              isRequired
              className={"flex w-full min-w-60 items-center gap-3 "}
            >
              <Label className="my-2 text-[0.8rem] font-semibold md:text-base">
                คำแปล
              </Label>
              <section className="flex flex-col">
                <Input
                  name=""
                  type="text"
                  className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:min-w-80 md:pl-4 "
                  placeholder="โปรดระบุ"
                />

                <FieldError className="text-xs text-red-700" />
              </section>
            </TextField>
          </div>
        </section>

        {/* ข้อ 5*/}
        <section className="flex flex-col items-start justify-center gap-3 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={5} />
            <p className="my-2 text-[0.8rem] font-semibold  md:text-base">
              รายการสินค้าหรือบริการ
            </p>
          </section>
          <p className="text-[0.8rem] md:-mt-5 md:ml-10 md:text-base">
            ให้ระบุรายการสินค้าที่จำหน่าย เช่น เนื้อหมู ขนมปัง กระเป๋า
            ครีมบำรุงผิว บริการร้านอาหารและเครื่องดื่ม เป็นต้น
          </p>
          <div className="flex w-full flex-col flex-wrap gap-3 pl-7 text-[0.8rem] md:ml-10 md:flex-row md:gap-5 md:pl-0 md:text-base">
            <TextField
              isRequired
              className={"flex w-full min-w-60 items-center gap-3 "}
            >
              <section className="flex flex-col">
                <Input
                  name=""
                  type="text"
                  className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:min-w-80 md:pl-4 "
                  placeholder="โปรดระบุ"
                />

                <FieldError className="text-xs text-red-700" />
              </section>
            </TextField>
          </div>
        </section>

        {/* ข้อ 6*/}
        <section className="flex flex-col items-start justify-center gap-3 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={6} />
            <p className="my-2 text-[0.8rem] font-semibold  md:text-base">
              ผู้ประกอบการ OTOP (ตอบเฉพาะผู้ประกอบการ OTOP)
            </p>
          </section>
          <div className="flex w-full flex-col flex-wrap gap-3 pl-7 text-[0.8rem] md:ml-10 md:flex-row md:gap-5 md:pl-0 md:text-base">
            <TextField
              isRequired
              className={"flex w-full min-w-60 items-center gap-3 "}
            >
              <Label className="my-2 min-w-44 text-[0.8rem] font-semibold md:text-base">
                6.1 ประเภทผู้ประกอบการ
              </Label>
              <section className="flex flex-col">
                <Input
                  name=""
                  type="text"
                  className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:min-w-80 md:pl-4 "
                  placeholder="SMEs"
                />

                <FieldError className="text-xs text-red-700" />
              </section>
            </TextField>
            <TextField
              isRequired
              className={"flex w-full min-w-60 items-center gap-3 "}
            >
              <Label className="my-2 min-w-44 text-[0.8rem] font-semibold md:text-base">
                6.2 เลขทะเบียน OTOP
              </Label>
              <section className="flex flex-col">
                <Input
                  name=""
                  type="text"
                  className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:min-w-80 md:pl-4 "
                  placeholder="โปรดระบุ"
                />

                <FieldError className="text-xs text-red-700" />
              </section>
            </TextField>
          </div>
        </section>

        {/* ข้อ 7*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={7} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              การขอจดทะเบียนเครื่องหมายที่มีลักษณะเป็นกลุ่มของสี
            </p>
          </section>

          <p className="text-[0.8rem] md:-mt-5 md:ml-10 md:text-base">
            กลุ่มของสี หมายถึง การรวมกันของสีตั้งแต่ 2 สี ขึ้นไป
            และแสดงโดยลักษณะพิเศษ เช่น ภาพลวดลายที่เป็นสีต่าง ๆ
          </p>

          <RadioGroup className="my-3 flex flex-col items-start justify-center gap-2 md:gap-5  lg:flex-row">
            <div className="flex w-full flex-col  gap-1.5 px-5 text-[0.8rem] md:gap-3 md:pl-10 md:text-base">
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
                        ไม่ขอรับความคุ้มครอง
                      </span>
                    </div>
                  )}
                </Radio>
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
                        ขอรับความคุ้มครอง
                        (ให้บรรยายลักษณะกลุ่มของสีและระบุสีให้ชัดเจน
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
            </div>
          </RadioGroup>
        </section>

        {/* ข้อ 8*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={8} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              การขอจดทะเบียนเครื่องหมายที่มีลักษณะเป็นรูปร่างหรือรูปทรงของวัตถุ
            </p>
          </section>

          <p className="text-[0.8rem] md:-mt-5 md:ml-10 md:text-base">
            รูปร่างหรือรูปทรงของวัตถุ หมายถึง เครื่องหมายที่แสดงด้านกว้าง
            ด้านยาว ด้านลึก หรือสามมิติ
          </p>

          <RadioGroup className="my-3 flex flex-col items-start justify-center gap-2 md:gap-5  lg:flex-row">
            <div className="flex w-full flex-col  gap-1.5 px-5 text-[0.8rem] md:gap-3 md:pl-10 md:text-base">
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
                        ไม่ขอรับความคุ้มครอง
                      </span>
                    </div>
                  )}
                </Radio>
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
                        ขอรับความคุ้มครอง (ให้แสดงภาพด้านอื่น ๆ
                        ของเครื่องหมายลงในภาพเครื่องหมายข้อ 3 ด้วย)
                      </span>
                    </div>
                  )}
                </Radio>
              </section>
            </div>
          </RadioGroup>
        </section>

        {/* ข้อ 9*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={9} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              การใช้เครื่องหมายโดยการจำหน่าย เผยแพร่ หรือโฆษณาก่อนยื่นคำขอนี้
            </p>
          </section>

          <RadioGroup className="my-3 flex flex-col items-start justify-center gap-2 md:gap-5  lg:flex-row">
            <div className="flex w-full flex-col  gap-1.5 px-5 text-[0.8rem] md:gap-3 md:pl-10 md:text-base">
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
                        ได้ใช้หรืออนุญาตให้ใช้
                      </span>
                    </div>
                  )}
                </Radio>
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
                        ไม่เคยใช้หรืออนุญาตให้ใช้
                      </span>
                    </div>
                  )}
                </Radio>
              </section>
            </div>
          </RadioGroup>
        </section>

        {/* ข้อ 10*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={10} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              การขอให้ถือว่าวันที่ยื่นคําขอนอกราชอาณาจักรครั้งแรกเป็นวันยื่นคําขอในราชอาณาจักร/การขอใหถือวาวันที่นําสินคาที่ใชเครื่องหมายการคาออกแสดงในงานแสดงสินคา
              ระหว่างประเทศ
            </p>
          </section>

          <RadioGroup className="my-3 flex flex-col items-start justify-center gap-2 md:gap-5  lg:flex-row">
            <div className="flex w-full flex-col  gap-1.5 px-5 text-[0.8rem] md:gap-3 md:pl-10 md:text-base">
              <section className="flex flex-col gap-3 ">
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
                      <span className="font-medium md:min-w-[25rem]">
                        ไม่ขอรับความคุมครอง
                      </span>
                    </div>
                  )}
                </Radio>
              </section>

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
                        ขอถือสิทธิและได้ยื่นคําขอพร้อมเอกสารหลักฐาน
                      </span>
                    </div>
                  )}
                </Radio>
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
                        ขอถือสิทธิและได้ยื่นหนังสือขอผอนผันการส่งเอกสารหลักฐาน
                      </span>
                    </div>
                  )}
                </Radio>
              </section>
            </div>
          </RadioGroup>
        </section>
      </Form>
    </div>
  );
};

export default TrademarkForm2;
