import Number from "@/components/Number";
import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  FieldError,
  Form,
  Input,
  Label,
  Radio,
  RadioGroup,
  TextArea,
  TextField,
} from "react-aria-components";
import { InputMask, InputMaskChangeEvent } from "primereact/inputmask";
import { FiPlusCircle } from "react-icons/fi";
import CompanyInterest from "./CompanyInterest";
import SnackbarSaveData from "../../../Snackbars/SnackbarSaveData";
import { ErrorMessages } from "../../../../models";
import Swal from "sweetalert2";
import SnackbarLoading from "../../../Snackbars/SnackBarLoading";
import SnackbarNoSaveData from "../../../Snackbars/SnackBarNoSaveData";
import { InputNumber } from "primereact/inputnumber";
import { supportBenefits } from "../../../../data/invention";
import {
  MdCheckBoxOutlineBlank,
  MdOutlineRadioButtonChecked,
  MdOutlineRadioButtonUnchecked,
} from "react-icons/md";
import { IoIosCheckbox } from "react-icons/io";
import Link from "next/link";
import { UpdateSupportInventionPatentService } from "../../../../services/invention-patent/support-invention/support-invention";
import { UseQueryResult } from "@tanstack/react-query";
import { ResponseGetInventionPatentService } from "../../../../services/invention-patent/invention-patent";

type NrruInventionForm3Props = {
  invention: UseQueryResult<ResponseGetInventionPatentService, Error>;
};

const NrruInventionForm3 = ({ invention }: NrruInventionForm3Props) => {
  const [snackBarData, setSnackBarData] = useState<{
    open: boolean;
    action: React.ReactNode;
  }>({
    open: false,
    action: <></>,
  });
  const [supportData, setSupportData] = useState<{
    durationYear?: string;
    durationMonth?: string;
    cost?: number;
    benefit?: string[];
    allowPublic?: string;
    reasonPublic?: string;
    otherBenefit?: string;
  }>(() => {
    return {
      durationYear:
        invention.data?.supportingDataOnInventionPatent.durationYear,
      durationMonth:
        invention.data?.supportingDataOnInventionPatent.durationMonth,
      cost: invention.data?.supportingDataOnInventionPatent.cost,
      benefit: invention.data?.supportingDataOnInventionPatent.benefit,
      allowPublic: invention.data?.supportingDataOnInventionPatent.allowPublic,
      reasonPublic:
        invention.data?.supportingDataOnInventionPatent.reasonPublic,
      otherBenefit:
        invention.data?.supportingDataOnInventionPatent.otherBenefit,
    };
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | InputMaskChangeEvent,
  ) => {
    setSnackBarData(() => {
      return {
        open: true,
        action: <SnackbarSaveData />,
      };
    });
    const { name, value } = e.target;
    setSupportData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateSupportData = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setSnackBarData(() => {
        return {
          open: true,
          action: <SnackbarLoading />,
        };
      });
      await UpdateSupportInventionPatentService({
        query: {
          supportInventionId: invention.data?.supportingDataOnInventionPatent
            .id as string,
        },
        body: {
          durationYear: supportData?.durationYear,
          durationMonth: supportData?.durationMonth,
          cost: supportData?.cost,
          benefit: supportData?.benefit,
          allowPublic: supportData?.allowPublic,
          reasonPublic: supportData?.reasonPublic,
          otherBenefit: supportData?.otherBenefit,
          isComplete: true,
        },
      });

      await invention.refetch();
      setSnackBarData(() => {
        return {
          open: true,
          action: <SnackbarNoSaveData />,
        };
      });
    } catch (error) {
      setSnackBarData(() => {
        return {
          open: true,
          action: <SnackbarSaveData />,
        };
      });
      let result = error as ErrorMessages;
      Swal.fire({
        title: result.error ? result.error : "เกิดข้อผิดพลาด",
        text: result.message.toString(),
        footer: result.statusCode
          ? "รหัสข้อผิดพลาด: " + result.statusCode?.toString()
          : "",
        icon: "error",
      });
    }
  };
  return (
    <div className=" w-full  rounded-md border-[1px] border-solid border-[#BED6FF] bg-white p-5 py-10 md:p-10">
      <Form
        onSubmit={handleUpdateSupportData}
        className="mx-0 my-5 flex flex-col gap-5 md:mx-5 md:my-10 "
      >
        {/* ข้อ 1 */}
        <section className="flex flex-col items-start justify-center gap-3 md:gap-5  lg:flex-row">
          <section className="flex items-center gap-3">
            <Number number={1} />
            <p className="my-2 text-[0.8rem] font-semibold md:min-w-64 md:text-base">
              ระยะเวลาในการประดิษฐ์/การวิจัย :
            </p>
          </section>
          <div className="flex w-full flex-col gap-3 pl-7 text-[0.8rem] md:flex-row md:gap-5 md:pl-0 md:text-base">
            <TextField className={"flex items-center gap-3 "}>
              <div className="flex flex-col gap-1">
                <Input
                  required
                  name="durationYear"
                  inputMode="numeric"
                  min={0}
                  onChange={handleChange}
                  value={supportData?.durationYear}
                  type="number"
                  className="h-8 w-44 rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:w-60  md:pl-4 "
                  placeholder="จำนวนปี"
                />
                <FieldError className="text-xs text-red-700" />
              </div>
              <Label className=" text-[var(--primary-blue) w-8 font-medium md:min-w-24">
                ปี
              </Label>
            </TextField>
            <TextField className={"flex items-center gap-3 "}>
              <div className="flex flex-col gap-1">
                <Input
                  required
                  type="number"
                  name="durationMonth"
                  inputMode="numeric"
                  min={0}
                  onChange={handleChange}
                  value={supportData?.durationMonth}
                  className="md:w-60rounded-md  h-8 w-44 bg-slate-300 p-1 pl-3 md:h-10  md:pl-4 "
                  placeholder="จำนวนเดือน"
                />
                <FieldError className="text-xs text-red-700" />
              </div>
              <Label className=" text-[var(--primary-blue) w-8 font-medium md:min-w-24">
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
            <TextField
              isRequired
              className={"flex w-full min-w-60 items-center gap-3 "}
            >
              <div className="fex-col flex gap-1">
                <InputNumber
                  required
                  value={supportData?.cost}
                  onValueChange={(e) => {
                    setSnackBarData(() => {
                      return {
                        open: true,
                        action: <SnackbarSaveData />,
                      };
                    });
                    setSupportData((prev) => {
                      return {
                        ...prev,
                        cost: e.value as number,
                      };
                    });
                  }}
                  className="h-8  w-44 rounded-md bg-slate-300 p-1 text-[0.8rem] md:h-10  md:w-60   md:text-base"
                  minFractionDigits={2}
                  maxFractionDigits={5}
                />
                <FieldError className="text-xs text-red-700" />
              </div>
              <Label className=" text-[var(--primary-blue) w-8 font-medium md:min-w-24">
                บาท
              </Label>
            </TextField>
          </div>
        </section>
        {/* ข้อ 3*/}
        <CheckboxGroup
          isRequired
          value={supportData?.benefit}
          onChange={(e) => {
            setSnackBarData(() => {
              return {
                open: true,
                action: <SnackbarSaveData />,
              };
            });
            setSupportData((prev) => {
              return {
                ...prev,
                benefit: e,
              };
            });
          }}
          className="flex flex-col items-start justify-center gap-2 md:gap-5 "
        >
          <section className="flex items-center gap-3">
            <Number number={3} />
            <Label className="my-2 w-72 text-[0.8rem] font-semibold md:w-96 md:text-base">
              ผลงานนี้สามารถนำไปใช้ประโยชน์ในรูปแบบหรือลักษณะใด (ตอบได้มากกว่า 1
              ข้อ)
            </Label>
            <FieldError className="w-max text-xs text-red-700" />
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem] md:flex-row md:gap-5 md:pl-0 md:text-base">
            <section className="flex w-full flex-col  gap-3 md:pl-10">
              <div className="grid grid-cols-1 gap-1.5 px-5 text-[0.8rem] md:w-[80%] md:grid-cols-2 md:gap-3 md:pl-0 md:text-[0.9rem]">
                {/* row1 */}
                {supportBenefits.map((benefit, index) => {
                  return (
                    <Checkbox
                      key={index}
                      className={({ isPressed, isSelected }) =>
                        isSelected ? "" : ""
                      }
                      value={benefit}
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
                          <span className="font-medium">{benefit}</span>
                        </div>
                      )}
                    </Checkbox>
                  );
                })}
              </div>
              <section className="flex w-full flex-col gap-2 px-5 md:flex-row md:px-0">
                <TextField className={"ml-3"}>
                  <Label className="font-medium md:text-[0.9rem]">
                    การใช้ประโยชน์ด้านอื่นๆ (โปรดระบุ)
                  </Label>
                  <Input
                    name="otherBenefit"
                    onChange={handleChange}
                    value={supportData?.otherBenefit}
                    type="text"
                    className="h-8 w-full rounded-md  bg-slate-300 p-1 pl-3 text-[0.8rem] md:h-10 md:p-2  md:pl-4 md:text-base"
                    placeholder=""
                  />
                </TextField>
              </section>
              <Link
                target="_blank"
                href="/"
                className=" flex w-full items-center justify-center gap-3  rounded-md bg-[#BED6FF] p-2 px-5 font-semibold duration-300 hover:bg-[#91B2EB]   md:w-72 md:gap-5"
              >
                <p>รูปแบบการใช้ประโยชน์ (คลิก)</p>
              </Link>
            </section>
          </div>
        </CheckboxGroup>

        {/* ข้อ 4*/}
        <CompanyInterest invention={invention} />

        {/* ข้อ 5*/}
        <RadioGroup
          isRequired
          value={supportData?.allowPublic}
          onChange={(e) => {
            setSnackBarData(() => {
              return {
                open: true,
                action: <SnackbarSaveData />,
              };
            });
            setSupportData((prev) => {
              return {
                ...prev,
                allowPublic: e,
              };
            });
          }}
          className="flex flex-col items-start justify-center gap-2 md:gap-5 "
        >
          <section className="flex items-center gap-3">
            <Number number={5} />
            <Label className="my-2 w-64 text-[0.8rem] font-semibold md:w-max md:text-base">
              การประชาสัมพันธ์ผลงานการประดิษฐ์นี้โดยมหาวิทยาลัย
            </Label>
            <FieldError className="w-max text-xs text-red-700" />
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem] md:flex-row md:gap-5 md:pl-10 md:text-base">
            <Radio className="flex items-center " value="ยินยอม">
              {({ isSelected }) => (
                <div className=" flex items-center justify-center gap-2">
                  <div className=" text-2xl">
                    {isSelected ? (
                      <MdOutlineRadioButtonChecked />
                    ) : (
                      <MdOutlineRadioButtonUnchecked />
                    )}
                  </div>
                  <span className=" font-semibold">ยินยอม</span>
                </div>
              )}
            </Radio>
            <Radio className="flex items-center " value="ไม่ยินยอม">
              {({ isSelected }) => (
                <div className=" flex items-center justify-center gap-2">
                  <div className=" text-2xl">
                    {isSelected ? (
                      <MdOutlineRadioButtonChecked />
                    ) : (
                      <MdOutlineRadioButtonUnchecked />
                    )}
                  </div>
                  <span className=" font-semibold">ไม่ยินยอม</span>
                </div>
              )}
            </Radio>
            <section className="flex w-full flex-col gap-2 px-5 md:flex-row md:px-0">
              <TextField className={"w-full md:px-8"}>
                <TextArea
                  disabled={
                    supportData?.allowPublic === "ยินยอม" ? true : false
                  }
                  value={supportData?.reasonPublic}
                  onChange={handleChange}
                  name="reasonPublic"
                  required={supportData?.allowPublic === "ไม่ยินยอม"}
                  className="no-re min-h-52   w-full	 resize-none
                 rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem] md:h-10 md:p-2  md:pl-4 md:text-base"
                  placeholder="กรุณาระบุเหตุผลที่ไม่ยินยอมประชาสัมพันธ์ผลงาน"
                />
                <FieldError className="text-xs text-red-700" />
              </TextField>
            </section>
          </div>
        </RadioGroup>
        {snackBarData.open && snackBarData.action}
      </Form>
    </div>
  );
};

export default NrruInventionForm3;
