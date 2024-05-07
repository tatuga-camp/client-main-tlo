import Number from "@/components/Number";
import React, { FormEvent, useState } from "react";
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
  MdCheckBoxOutlineBlank,
  MdOutlineRadioButtonChecked,
  MdOutlineRadioButtonUnchecked,
} from "react-icons/md";
import Link from "next/link";
import { IoIosCheckbox } from "react-icons/io";
import {
  FundingLists,
  fundingLists,
  menuBenefits,
  releaseType,
  researchTypes,
  searchResults,
  websites,
} from "../../../../data/invention";
import { WorkType } from "../../../../models";
import { Dropdown } from "primereact/dropdown";
import SearchWorkInvention from "./SearchWorkInvention";
import SnackbarSaveData from "../../../Snackbars/SnackbarSaveData";

const InventionSection2 = () => {
  const [snackBarData, setSnackBarData] = useState<{
    open: boolean;
    action: React.ReactNode;
  }>({
    open: false,
    action: <></>,
  });
  const [workData, setWorkData] = useState<{
    thaiName?: string;
    englishName?: string;
    type?: WorkType;
    beginWorkAt?: string;
    finishWorkAt?: string;
    benefit?: string[];
    otherBenefit?: string;
    funding?: FundingLists;
    sourceFunding?: string;
    yearFunding?: string;
    researchOwnershipSubmission?: string;
    signedDocument?: string;
    researchResult?: string;
    keywords?: string;
    website?: string;
    searchResult?: string;
    requestNumber?: string;
    requestDate?: string;
    requestCountry?: string;
    publicType?: string;
    publicDetail?: string;
    outstandingDetail?: string;
    limitaionDetail?: string;
    marketDetail?: string;
    futureDetail?: string;
  }>();

  const handleCreateWorkInvention = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
    } catch (error) {}
  };

  const handleChangeWorkData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSnackBarData(() => {
      return {
        open: true,
        action: <SnackbarSaveData />,
      };
    });
    const { name, value } = e.target;
    setWorkData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeRaio = ({ e, name }: { e: string; name: string }) => {
    setSnackBarData(() => {
      return {
        open: true,
        action: <SnackbarSaveData />,
      };
    });
    setWorkData((prev) => {
      return {
        ...prev,
        [name]: e,
      };
    });
  };

  const handleChangeCheckbox = ({ e, name }: { e: string[]; name: string }) => {
    setSnackBarData(() => {
      return {
        open: true,
        action: <SnackbarSaveData />,
      };
    });
    setWorkData((prev) => {
      return {
        ...prev,
        [name]: e,
      };
    });
  };

  const handleChangeCalendar = ({
    value,
    name,
  }: {
    value: Date;
    name: string;
  }) => {
    if (value instanceof Date) {
      setSnackBarData(() => {
        return {
          open: true,
          action: <SnackbarSaveData />,
        };
      });
      setWorkData((prev) => {
        return {
          ...prev,
          [name]: value.toISOString(),
        };
      });
    }
  };

  console.log("workData", workData);
  return (
    <div className=" w-full  rounded-md border-[1px] border-solid border-[#BED6FF] bg-white p-5 py-10 md:p-10">
      <Form
        aria-label="form"
        onSubmit={handleCreateWorkInvention}
        className="mx-0 my-5 flex flex-col gap-8 md:mx-5 md:my-10 "
      >
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
                required
                name="thaiName"
                onChange={handleChangeWorkData}
                type="text"
                className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:min-w-80 md:pl-4 "
                placeholder="กรอกชื่อภาษาไทย"
              />
              <FieldError className="text-xs text-red-700" />
            </TextField>
            <TextField className={"flex w-full min-w-60 items-center gap-3 "}>
              <Label className=" text-[var(--primary-blue) min-w-24 font-medium md:min-w-40">
                ชื่อภาษาอังกฤษ
              </Label>
              <Input
                required
                name="englishName"
                onChange={handleChangeWorkData}
                type="text"
                className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:min-w-80 md:pl-4 "
                placeholder="กรอกชื่อภาษาอังกฤษ"
              />
              <FieldError className="text-xs text-red-700" />
            </TextField>
          </div>
        </section>
        {/* ข้อ 2*/}
        <RadioGroup
          value={workData?.type}
          onChange={(e) => handleChangeRaio({ e, name: "type" })}
          isRequired
          className="flex flex-col items-start justify-center gap-2 md:gap-5  lg:flex-row"
        >
          <section className="flex items-center gap-3">
            <Number number={2} />
            <Label className="my-2 text-[0.8rem] font-semibold md:min-w-64 md:text-base">
              ประเภทสิทธิบัตรที่จะขอรับการคุ้มครอง
            </Label>
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem] md:flex-row md:gap-5 md:pl-0 md:text-base">
            <Radio className="flex items-center " value="สิทธิบัตรการประดิษฐ์">
              {({ isSelected }) => (
                <div className=" flex items-center justify-center gap-2">
                  <div className=" text-2xl">
                    {isSelected ? (
                      <MdOutlineRadioButtonChecked />
                    ) : (
                      <MdOutlineRadioButtonUnchecked />
                    )}
                  </div>
                  <span className=" font-semibold">สิทธิบัตรการประดิษฐ์</span>
                </div>
              )}
            </Radio>

            <Radio className="flex items-center " value="อนุสิทธิบัตร">
              {({ isSelected }) => (
                <div className=" flex gap-2">
                  <div className=" text-2xl">
                    {isSelected ? (
                      <MdOutlineRadioButtonChecked />
                    ) : (
                      <MdOutlineRadioButtonUnchecked />
                    )}
                  </div>
                  <span className="font-semibold">อนุสิทธิบัตร</span>
                </div>
              )}
            </Radio>

            <Link
              target="_blank"
              href={"/"}
              className="rounded-md bg-[#BED6FF] p-2 font-semibold duration-300 hover:bg-[#91B2EB]"
            >
              เงื่อนไขการขอรับสิทธิบัตร (คลิก)
            </Link>
          </div>
          <FieldError className="text-xs text-red-700" />
        </RadioGroup>

        {/* ข้อ 3*/}
        <section className="flex items-start justify-center gap-3 md:items-center md:gap-5">
          <Number number={3} />
          <div className="flex w-full flex-col gap-3 text-[0.8rem] md:flex-row md:gap-5 md:text-base">
            <TextField className={"flex items-center gap-3 "}>
              <Label className=" text-[var(--primary-blue) min-w-28 font-semibold md:min-w-32">
                ปีที่เริ่มการประดิษฐ์
              </Label>
              <div className="w-40 rounded-lg bg-slate-300 p-1">
                <Calendar
                  value={
                    workData?.beginWorkAt
                      ? new Date(workData.beginWorkAt)
                      : null
                  }
                  onChange={(e) => {
                    handleChangeCalendar({
                      value: e.value as Date,
                      name: "beginWorkAt",
                    });
                  }}
                  required
                  locale="th"
                  view="year"
                  placeholder="ปี 2024"
                  dateFormat="yy"
                />
              </div>
              <FieldError className="text-xs text-red-700" />
            </TextField>
            <TextField className={"flex w-full items-center gap-3 md:w-[50%]"}>
              <Label className="min-w-28 font-semibold text-[var(--primary-blue)] md:min-w-32">
                ปีที่ผลงานแล้วเสร็จ
              </Label>
              <div className="w-40 rounded-lg bg-slate-300 p-1">
                <Calendar
                  value={
                    workData?.finishWorkAt
                      ? new Date(workData.finishWorkAt)
                      : null
                  }
                  onChange={(e) => {
                    handleChangeCalendar({
                      value: e.value as Date,
                      name: "finishWorkAt",
                    });
                  }}
                  required
                  locale="th"
                  view="year"
                  placeholder="ปี 2024"
                  dateFormat="yy"
                />
              </div>
              <FieldError className="text-xs text-red-700" />
            </TextField>
          </div>
        </section>

        {/* ข้อ 4*/}
        <CheckboxGroup
          value={workData?.benefit}
          onChange={(e) => handleChangeCheckbox({ e, name: "benefit" })}
          isRequired
          className="flex flex-col items-start justify-center gap-2 md:gap-5 "
        >
          <section className="flex items-center gap-3">
            <Number number={4} />
            <Label className="my-2 text-[0.8rem] font-semibold md:min-w-64 md:text-base">
              สิ่งที่ได้จากการประดิษฐ์/งานวิจัย/ข้อค้นพบ (ตอบได้มากกว่า 1 ข้อ)
            </Label>
          </section>

          <div className="grid w-full grid-cols-1 gap-1.5 px-5 text-[0.8rem] md:grid-cols-3 md:gap-3 md:pl-0 md:text-base">
            {/* row1 */}
            {menuBenefits.map((menu, index) => {
              return (
                <Checkbox
                  key={index}
                  className={({ isPressed, isSelected }) =>
                    isSelected ? "" : ""
                  }
                  value={menu.title}
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
                      <span className="font-medium">{menu.title}</span>
                    </div>
                  )}
                </Checkbox>
              );
            })}
          </div>
          <section className="flex w-full flex-col gap-2 px-5 md:flex-row md:px-0">
            <TextField className={"ml-3"}>
              <Label className="text-[0.8rem] font-medium md:text-base">
                อื่นๆ (โปรดระบุ)
              </Label>
              <Input
                value={workData?.otherBenefit}
                onChange={(e) => {
                  setWorkData((prev) => {
                    return {
                      ...prev,
                      otherBenefit: e.target.value,
                    };
                  });
                }}
                type="text"
                className="h-8 w-full rounded-md  bg-slate-300 p-1 pl-3 text-[0.8rem] md:h-10 md:p-2  md:pl-4 md:text-base"
              />
            </TextField>
          </section>
          <FieldError className="text-xs text-red-700" />
        </CheckboxGroup>

        {/* ข้อ 5*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={5} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              การประดิษฐ์/ผลงานนี้ได้รับทุนอุดหนุนหรืออยู่ภายใต้ข้อตกลง
              หรือสัญญาใด ๆ กับหน่วยงานอื่น หรือไม่ (ให้ระบุ)
            </p>
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem] md:flex-row md:gap-5 md:pl-0 md:text-base">
            <div className="w-80 rounded-lg bg-slate-300 p-1">
              <Dropdown
                value={workData?.funding}
                onChange={(e) => {
                  setWorkData((prev) => {
                    const value: FundingLists = e.value;
                    if (
                      value ===
                        "ทุนอุดหนุนงบประมาณแผ่นดิน มหาวิทยาลัยราชภัฏนครราชสีมา" ||
                      value ===
                        "ทุนอุดหนุนเงินรายได้/กองทุนวิจัย มหาวิทยาลัยราชภัฏนครราชสีมา"
                    ) {
                      return {
                        ...prev,
                        funding: value,
                        sourceFunding: "มหาวิทยาลัยราชภัฏนครราชสีมา",
                      };
                    } else {
                      return {
                        ...prev,
                        funding: value,
                        sourceFunding: "",
                        yearFunding: undefined,
                      };
                    }
                  });
                }}
                aria-label="เลือกประเภทแหล่งทุน"
                required
                options={fundingLists}
                placeholder="เลือกประเภทแหล่งทุน"
                className="md:w-14rem w-full"
              />
            </div>

            <section className="flex flex-col gap-5 md:flex-row">
              <TextField
                className={"flex w-full items-center gap-3 md:w-[50%]"}
              >
                <Label className=" text-[var(--primary-blue) min-w-28 font-semibold md:min-w-20">
                  แหล่งทุน
                </Label>
                <Input
                  disabled={workData?.funding === "ไม่ได้รับทุนอุดหนุนใดๆ"}
                  value={workData?.sourceFunding}
                  required={workData?.funding !== "ไม่ได้รับทุนอุดหนุนใดๆ"}
                  name="sourceFunding"
                  onChange={handleChangeWorkData}
                  type="text"
                  className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                  placeholder="แหล่งทุน"
                />
                <FieldError className="text-xs text-red-700" />
              </TextField>
              <TextField
                className={"flex w-full items-center gap-3 md:w-[50%]"}
              >
                <Label className="min-w-28 font-semibold text-[var(--primary-blue)] md:min-w-24">
                  ปีงบประมาณ
                </Label>
                <div className="w-40 rounded-lg bg-slate-300 p-1">
                  <Calendar
                    value={
                      workData?.yearFunding
                        ? new Date(workData.yearFunding)
                        : null
                    }
                    onChange={(e) => {
                      handleChangeCalendar({
                        value: e.value as Date,
                        name: "yearFunding",
                      });
                    }}
                    disabled={workData?.funding === "ไม่ได้รับทุนอุดหนุนใดๆ"}
                    required={workData?.funding !== "ไม่ได้รับทุนอุดหนุนใดๆ"}
                    locale="th"
                    view="year"
                    placeholder="ปี 2024"
                    dateFormat="yy"
                  />
                </div>
                <FieldError className="text-xs text-red-700" />
              </TextField>
            </section>
          </div>
        </section>

        {/* ข้อ 6*/}
        <RadioGroup
          isRequired
          className="flex flex-col items-start justify-center gap-2 md:gap-5 "
        >
          <section className="flex items-center gap-3">
            <Number number={6} />
            <Label className="my-2 text-[0.8rem] font-semibold md:min-w-64 md:text-base">
              การยื่นขอความเป็นเจ้าของผลงานวิจัยและนวัตกรรมกับแหล่งให้ทุน
              (กรณีรับทุนวิจัยจากแหล่งทุนภายนอก)
            </Label>
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem] md:flex-col md:gap-5 md:pl-0 md:text-base">
            <div className="flex gap-5">
              <Radio
                className="flex items-center "
                value="มีการยื่นขอเป็นเจ้าของผลงานวิจัยและนวัตกรรมกับแหล่งทุนแล้ว"
              >
                {({ isSelected }) => (
                  <div className=" flex items-center justify-center gap-2">
                    <div className=" text-2xl">
                      {isSelected ? (
                        <MdOutlineRadioButtonChecked />
                      ) : (
                        <MdOutlineRadioButtonUnchecked />
                      )}
                    </div>
                    <span className=" font-semibold">
                      มีการยื่นขอเป็นเจ้าของผลงานวิจัยและนวัตกรรมกับแหล่งทุนแล้ว
                    </span>
                  </div>
                )}
              </Radio>
              <FileTrigger>
                <Button className=" flex  items-center justify-center gap-3 rounded-md bg-[#BED6FF] p-2 px-5 font-semibold duration-300 hover:bg-[#91B2EB] md:gap-5">
                  <span className="text-3xl md:text-base">
                    <FiPlusCircle />
                  </span>
                  <p>แนบหนังสือแสดงความเป็นเจ้าของผลงานวิจัยและนวัตกรรม</p>
                </Button>
              </FileTrigger>
            </div>

            <Radio
              className="flex items-center "
              value="ยังไม่มีการยื่น
"
            >
              {({ isSelected }) => (
                <div className=" flex gap-2">
                  <div className=" text-2xl">
                    {isSelected ? (
                      <MdOutlineRadioButtonChecked />
                    ) : (
                      <MdOutlineRadioButtonUnchecked />
                    )}
                  </div>
                  <span className="font-semibold">ยังไม่มีการยื่น</span>
                </div>
              )}
            </Radio>
          </div>
          <FieldError className="text-xs text-red-700" />
        </RadioGroup>

        {/* ข้อ 7*/}
        <RadioGroup
          isRequired
          className="flex flex-col items-start justify-center gap-2 md:gap-5 "
        >
          <section className="flex items-center gap-3">
            <Number number={7} />
            <Label className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              ส่วนใดส่วนหนึ่งของการวิจัยที่นำมาซึ่งการประดิษฐ์นี้
              ได้มีการลงนามหรืออยู่ภายใต้ข้อตกลงหรือสัญญาใด ๆ
              กับหน่วยงานอื่นหรือไม่ (ให้ระบุ)
            </Label>
          </section>

          <div
            className="flex w-full flex-col flex-wrap gap-3 pl-5 
          text-[0.8rem] md:flex-col md:gap-5 md:pl-0 md:text-base "
          >
            <div className="flex">
              <Radio className="flex" value="อนุสิทธิบัตร">
                {({ isSelected }) => (
                  <div className=" flex items-center gap-2">
                    <div className=" text-2xl">
                      {isSelected ? (
                        <MdOutlineRadioButtonChecked />
                      ) : (
                        <MdOutlineRadioButtonUnchecked />
                      )}
                    </div>
                    <p className="text-[0.8rem] font-medium md:text-base">
                      สัญญาถ่ายโอนวัสดุชีวภาพ (ระบุชื่อหน่วยงาน ปีที่ได้ลงนาม)
                    </p>
                  </div>
                )}
              </Radio>
              <TextField className={"ml-3"}>
                <Input
                  aria-label="ระบุชื่อหน่วยงาน ปีที่ได้ลงนาม"
                  type="text"
                  className="h-8 w-60 rounded-md  bg-slate-300 p-1 pl-3 text-[0.8rem] md:h-10 md:p-2  md:pl-4 md:text-base"
                  placeholder=""
                />
              </TextField>
            </div>

            <div className="flex">
              <Radio className="flex" value="อื่นๆ">
                {({ isSelected }) => (
                  <div className=" flex items-center gap-2">
                    <div className=" text-2xl">
                      {isSelected ? (
                        <MdOutlineRadioButtonChecked />
                      ) : (
                        <MdOutlineRadioButtonUnchecked />
                      )}
                    </div>
                    <p className="text-[0.8rem] font-medium md:text-base">
                      อื่นๆ (โปรดระบุ)
                    </p>
                  </div>
                )}
              </Radio>
              <TextField aria-label="" className={"ml-3"}>
                <Input
                  aria-label="ชื่อหน่วยงาน"
                  type="text"
                  className="h-8 w-60 rounded-md  bg-slate-300 p-1 pl-3 text-[0.8rem] md:h-10 md:p-2  md:pl-4 md:text-base"
                  placeholder=""
                />
              </TextField>
            </div>

            <Radio className="flex" value="ไม่มี">
              {({ isSelected }) => (
                <div className=" flex items-center gap-2">
                  <div className=" text-2xl">
                    {isSelected ? (
                      <MdOutlineRadioButtonChecked />
                    ) : (
                      <MdOutlineRadioButtonUnchecked />
                    )}
                  </div>
                  <p className="text-[0.8rem] font-medium md:text-base">
                    ไม่มี
                  </p>
                </div>
              )}
            </Radio>
          </div>
          <FieldError className="text-xs text-red-700" />
        </RadioGroup>

        {/* ข้อ 8*/}
        <RadioGroup
          isRequired
          className="flex flex-col items-start justify-center gap-2 md:gap-5 "
        >
          <section className="flex items-center gap-3">
            <Number number={8} />
            <Label className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              ผลการวิจัย ผลการทดสอบ หรือผลการทดลอง
            </Label>
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem] md:flex-row md:gap-5 md:pl-0 md:text-base">
            <section className="flex w-full flex-col gap-2 px-5 md:flex-row md:px-0">
              <Radio className="flex" value="มี">
                {({ isSelected }) => (
                  <div className=" flex items-center gap-2">
                    <div className=" text-2xl">
                      {isSelected ? (
                        <MdOutlineRadioButtonChecked />
                      ) : (
                        <MdOutlineRadioButtonUnchecked />
                      )}
                    </div>
                    <p className="text-[0.8rem] font-medium md:text-base">มี</p>
                  </div>
                )}
              </Radio>
              <div className="w-80 rounded-lg bg-slate-300 p-1">
                <Dropdown
                  optionLabel="title"
                  options={researchTypes}
                  placeholder="เลือกประเภทแหล่งทุน"
                  className="md:w-14rem w-full"
                />
              </div>
              <FileTrigger>
                <Button className=" flex  items-center justify-center gap-3 rounded-md bg-[#BED6FF] p-2 px-5 font-semibold duration-300 hover:bg-[#91B2EB] md:gap-5">
                  <span className="text-3xl md:text-base">
                    <FiPlusCircle />
                  </span>

                  <p>
                    แนบรายละเอียดผลการทดสอบหรือผลการทดลองในรายละเอียดคำขอ
                    (ถ้ามี)
                  </p>
                </Button>
              </FileTrigger>
            </section>
            <Radio className="flex" value="อื่นๆ">
              {({ isSelected }) => (
                <div className=" flex items-center gap-2">
                  <div className=" text-2xl">
                    {isSelected ? (
                      <MdOutlineRadioButtonChecked />
                    ) : (
                      <MdOutlineRadioButtonUnchecked />
                    )}
                  </div>
                  <p className="text-[0.8rem] font-medium md:text-base">
                    ไม่มี
                  </p>
                </div>
              )}
            </Radio>
          </div>
          <FieldError className="text-xs text-red-700" />
        </RadioGroup>

        {/* ข้อ 9*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={9} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              ข้อมูลประกอบการสืบค้นสิทธิบัตรเบื้องต้น
            </p>
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem] md:flex-row md:gap-5 md:pl-0 md:text-base">
            <section className="flex w-full items-center gap-3 md:pl-10">
              <p className="font-semibold md:min-w-52">
                9.1 Keyword ที่ใช้ในการสืบค้น
              </p>
              <TextField className={"w-full md:px-8"}>
                <Input
                  required
                  type="text"
                  className="h-8 w-auto rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem] md:h-10 md:p-2   md:text-base"
                  placeholder="โปรดระบุ Keyword"
                />
                <FieldError className="text-xs text-red-700" />
              </TextField>
            </section>
            <RadioGroup
              isRequired
              className="flex w-full flex-col  gap-3 md:pl-10"
            >
              <Label className="font-semibold md:min-w-52">
                9.2 เว็บไซต์/ฐานข้อมูลที่ใช้ในการสืบค้น
              </Label>
              <div className="grid w-full grid-cols-1 gap-1.5 px-5 text-[0.8rem] md:grid-cols-2 md:gap-3 md:pl-0 md:text-base">
                {websites.map((menu, index) => {
                  return (
                    <Radio
                      key={index}
                      className={({ isPressed, isSelected }) =>
                        isSelected ? "" : ""
                      }
                      value={menu.title}
                    >
                      {({ isSelected }) => (
                        <div className="flex items-center justify-start gap-2 ">
                          <div className=" text-3xl">
                            {isSelected ? (
                              <MdOutlineRadioButtonChecked />
                            ) : (
                              <MdOutlineRadioButtonUnchecked />
                            )}
                          </div>
                          <span className="font-medium">{menu.title}</span>
                        </div>
                      )}
                    </Radio>
                  );
                })}
                <TextField className={"flex items-center justify-center gap-2"}>
                  <Label className="font-semibold">อื่นๆ</Label>
                  <Input
                    type="text"
                    className="h-8 w-full rounded-md  bg-slate-300 p-1 pl-3 text-[0.8rem] md:h-10 md:p-2  md:pl-4 md:text-base"
                    placeholder="โปรดระบุ"
                  />
                </TextField>
              </div>
              <FieldError className="text-xs text-red-700" />
            </RadioGroup>
            <section className="flex w-full items-center gap-3 md:pl-10">
              <p className="font-semibold md:min-w-52">
                9.3 ผลของการสืบค้นพบว่า
              </p>
              <div className="w-80 rounded-lg bg-slate-300 p-1">
                <Dropdown
                  required
                  optionLabel="title"
                  options={searchResults}
                  placeholder="เลือกประเภทแหล่งทุน"
                  className="md:w-14rem w-full"
                />
              </div>
              <FieldError className="text-xs text-red-700" />
            </section>
            <SearchWorkInvention />
          </div>
        </section>

        {/* ข้อ 10*/}
        <RadioGroup
          isRequired
          className="flex flex-col items-start justify-center gap-2 md:gap-5 "
        >
          <section className="flex items-center gap-3">
            <Number number={10} />
            <Label className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              การประดิษฐ์นี้เคยนำไปยื่นขอรับสิทธิบัตรหรืออนุสิทธิบัตรหรือไม่
            </Label>
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem] md:flex-row md:gap-5 md:pl-0 md:text-base">
            <section className="flex w-full flex-col gap-2 px-5 md:flex-row md:px-0">
              <Radio className="flex" value="เคย">
                {({ isSelected }) => (
                  <div className=" flex items-center gap-2">
                    <div className=" text-2xl">
                      {isSelected ? (
                        <MdOutlineRadioButtonChecked />
                      ) : (
                        <MdOutlineRadioButtonUnchecked />
                      )}
                    </div>
                    <p className="text-[0.8rem] font-medium md:text-base">
                      เคย
                    </p>
                  </div>
                )}
              </Radio>

              <TextField className={"ml-3 flex items-center"}>
                <Label className="min-w-28  text-[var(--primary-blue)] md:min-w-24">
                  เลขที่คำขอ :
                </Label>
                <Input
                  type="text"
                  className="h-8 w-full rounded-md  bg-slate-300 p-1 pl-3 text-[0.8rem] md:h-10 md:p-2  md:pl-4 md:text-base"
                  placeholder=""
                />
              </TextField>
              <TextField className={"ml-3 flex items-center"}>
                <Label className="min-w-28  text-[var(--primary-blue)] md:min-w-24">
                  ยื่นเมื่อวันที่ :
                </Label>
                <div className="w-40 rounded-lg bg-slate-300 p-1">
                  <Calendar
                    required
                    locale="th"
                    dateFormat="dd/mm/yy"
                    placeholder="dd/mm/yyyy"
                  />
                </div>
              </TextField>
              <TextField className={"ml-3 flex items-center"}>
                <Label className="min-w-28  text-[var(--primary-blue)] md:min-w-24">
                  ประเทศที่ยื่น :
                </Label>
                <Input
                  type="text"
                  className="h-8 w-full rounded-md  bg-slate-300 p-1 pl-3 text-[0.8rem] md:h-10 md:p-2  md:pl-4 md:text-base"
                  placeholder=""
                />
              </TextField>
            </section>
            <Radio className="flex" value="ไม่เคย">
              {({ isSelected }) => (
                <div className=" flex items-center gap-2">
                  <div className=" text-2xl">
                    {isSelected ? (
                      <MdOutlineRadioButtonChecked />
                    ) : (
                      <MdOutlineRadioButtonUnchecked />
                    )}
                  </div>
                  <p className="text-[0.8rem] font-medium md:text-base">
                    ไม่เคย
                  </p>
                </div>
              )}
            </Radio>
          </div>
          <FieldError className="text-xs text-red-700" />
        </RadioGroup>

        {/* ข้อ 11*/}
        <RadioGroup
          isRequired
          className="flex flex-col items-start justify-center gap-2 md:gap-5 "
        >
          <section className="flex items-center gap-3">
            <Number number={11} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              การเปิดเผยสาระสำคัญของการประดิษฐ์/การเผยแพร่ผลงาน
            </p>
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem] md:flex-col md:gap-5 md:pl-0 md:text-base">
            <section className=" flex  w-full gap-5">
              <Radio className="flex" value="มีการเปิดเผยการประดิษฐ์">
                {({ isSelected }) => (
                  <div className=" flex items-center gap-2">
                    <div className=" text-2xl">
                      {isSelected ? (
                        <MdOutlineRadioButtonChecked />
                      ) : (
                        <MdOutlineRadioButtonUnchecked />
                      )}
                    </div>
                    <p className="text-[0.8rem] font-medium md:text-base">
                      มีการเปิดเผยการประดิษฐ์
                    </p>
                  </div>
                )}
              </Radio>
              <div className=" h-12 rounded-lg bg-slate-300 p-1">
                <Dropdown
                  optionLabel="title"
                  options={releaseType}
                  placeholder="การเผยแพร่ผลงานแล้วในรูปแบบ"
                  className="md:w-14rem h-10 w-full"
                />
              </div>

              <FileTrigger>
                <Button className=" flex items-center  justify-center gap-3 rounded-md bg-[#BED6FF] p-2 px-5 font-semibold duration-300 hover:bg-[#91B2EB] md:ml-11 md:gap-5">
                  <span className="text-3xl md:text-base">
                    <FiPlusCircle />
                  </span>

                  <p>แนบรายละเอียดหรือเอกสารประกอบการเผยแพร่ (ถ้ามี)</p>
                </Button>
              </FileTrigger>
            </section>
            <Radio
              className="flex"
              value="ยังไม่เปิดเผยการประดิษฐ์/เผยแพร่ผลงาน"
            >
              {({ isSelected }) => (
                <div className=" flex items-center gap-2">
                  <div className=" text-2xl">
                    {isSelected ? (
                      <MdOutlineRadioButtonChecked />
                    ) : (
                      <MdOutlineRadioButtonUnchecked />
                    )}
                  </div>
                  <p className="text-[0.8rem] font-medium md:text-base">
                    ยังไม่เปิดเผยการประดิษฐ์/เผยแพร่ผลงาน
                  </p>
                </div>
              )}
            </Radio>
          </div>
          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem] md:flex-row md:gap-5 md:pl-0 md:text-base">
            <p className={"w-full md:px-8"}>
              กรุณาระบุรายละเอียดของการเผยแพร่ผลงาน ได้แก่ ชื่อผลงาน
              วัน/เดือน/ปีที่เผยแพร่ สถานที่ หรือผู้จัดงาน
              และ/หรือแนบหนังสือรับรองจากผู้จัดงาน หรือแนบ เอกสารประกอบ
            </p>
            <TextField className={"w-full md:px-8"}>
              <TextArea
                required
                className="no-re min-h-52   w-full	 resize-none
                 rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem] md:h-10 md:p-2  md:pl-4 md:text-base"
                placeholder="กรอกข้อมูล"
              />
              <FieldError className="text-xs text-red-700" />
            </TextField>
          </div>
          <FieldError className="text-xs text-red-700" />
        </RadioGroup>

        {/* ข้อ 12*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={12} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              ข้อดีและลักษณะเฉพาะของการประดิษฐ์/งานวิจัยนี้/การเผยแพร่ผลงาน
            </p>
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem] md:flex-row md:gap-5 md:pl-0 md:text-base">
            <p className={"w-full md:px-8"}>
              โปรดระบุถึงลักษณะเด่นและอธิบายในรายละเอียดของความใหม่ของผลงาน
              โดยเฉพาะในส่วนที่ได้พัฒนาให้ดีขึ้นกว่าเดิมได้
              โดยเน้นให้เห็นถึงความแตกต่างจากการประดิษฐ์หรืองานเดิม
            </p>
            <TextField className={"w-full md:px-8"}>
              <TextArea
                required
                className="no-re min-h-52   w-full	 resize-none
                 rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem] md:h-10 md:p-2  md:pl-4 md:text-base"
                placeholder="กรอกข้อมูล"
              />
              <FieldError className="text-xs text-red-700" />
            </TextField>
          </div>
        </section>
        {/* ข้อ 13*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={13} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              ข้อด้อยหรือข้อจำกัดของการประดิษฐ์/งานวิจัยนี้
            </p>
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem] md:flex-row md:gap-5 md:pl-0 md:text-base">
            <TextField className={"w-full md:px-8"}>
              <TextArea
                required
                className="no-re min-h-52   w-full	 resize-none
                 rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem] md:h-10 md:p-2  md:pl-4 md:text-base"
                placeholder="กรอกข้อมูล"
              />
              <FieldError className="text-xs text-red-700" />
            </TextField>
          </div>
        </section>
        {/* ข้อ 14*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={14} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              ผลิตภัณฑ์/การประดิษฐ์/ผลงานที่ใกล้เคียงที่มีอยู่แล้วในตลาด
            </p>
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem] md:flex-row md:gap-5 md:pl-0 md:text-base">
            <TextField className={"w-full md:px-8"}>
              <TextArea
                required
                className="no-re min-h-52   w-full	 resize-none
                 rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem] md:h-10 md:p-2  md:pl-4 md:text-base"
                placeholder="กรอกข้อมูล"
              />
              <FieldError className="text-xs text-red-700" />
            </TextField>
          </div>
        </section>
        {/* ข้อ 15*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={15} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              แผนการพัฒนาวิจัย/ต่อยอดการประดิษฐ์นี้ (ถ้ามี)
            </p>
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem] md:flex-row md:gap-5 md:pl-0 md:text-base">
            <TextField className={"w-full md:px-8"}>
              <TextArea
                required
                className="no-re min-h-52   w-full	 resize-none
                 rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem] md:h-10 md:p-2  md:pl-4 md:text-base"
                placeholder="กรอกข้อมูล"
              />
              <FieldError className="text-xs text-red-700" />
            </TextField>
          </div>
        </section>
        {snackBarData.open && snackBarData.action}
      </Form>
    </div>
  );
};

export default InventionSection2;
