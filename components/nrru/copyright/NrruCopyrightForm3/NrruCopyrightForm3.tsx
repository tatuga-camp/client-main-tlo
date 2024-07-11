import Number from "@/components/Number";
import React, { forwardRef, useImperativeHandle, useState } from "react";
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
  TextArea,
} from "react-aria-components";
import { InputMask, InputMaskChangeEvent } from "primereact/inputmask";
import { FiPlusCircle } from "react-icons/fi";
import { IoIosCheckbox } from "react-icons/io";
import {
  MdCheckBoxOutlineBlank,
  MdOutlineRadioButtonChecked,
  MdOutlineRadioButtonUnchecked,
} from "react-icons/md";
import { menuNrruDesign3 } from "@/data/menu";
import CompanyInterest from "./CompanyInterest";
import { UseQueryResult } from "@tanstack/react-query";
import { ResponseGetCopyrightService } from "../../../../services/copyright/copyright";
import SnackbarLoading from "../../../Snackbars/SnackBarLoading";
import { UpdateSupportCopyrightService } from "../../../../services/copyright/support-copyright/support-copyright";
import SnackbarNoSaveData from "../../../Snackbars/SnackBarNoSaveData";
import { ErrorMessages } from "../../../../models";
import Swal from "sweetalert2";
import Link from "next/link";
import { supportBenefits } from "../../../../data/invention";
import { InputNumber } from "primereact/inputnumber";

type NrruCopyrightForm3Props = {
  copyright: UseQueryResult<ResponseGetCopyrightService, Error>;
};
const NrruCopyrightForm3 = forwardRef(function FormCopyright(
  { copyright }: NrruCopyrightForm3Props,
  ref,
) {
  const [snackBarData, setSnackBarData] = useState<{
    open: boolean;
    action: React.ReactNode;
  }>({
    open: false,
    action: <></>,
  });
  const formRef = React.useRef<HTMLFormElement>(null);
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
      durationYear: copyright.data?.supportingDataOnCopyright.durationYear,
      durationMonth: copyright.data?.supportingDataOnCopyright.durationMonth,
      cost: copyright.data?.supportingDataOnCopyright.cost,
      benefit: copyright.data?.supportingDataOnCopyright.benefit,
      allowPublic: copyright.data?.supportingDataOnCopyright.allowPublic,
      reasonPublic: copyright.data?.supportingDataOnCopyright.reasonPublic,
      otherBenefit: copyright.data?.supportingDataOnCopyright.otherBenefit,
    };
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | InputMaskChangeEvent,
  ) => {
    const { name, value } = e.target;
    setSupportData((prev) => ({ ...prev, [name]: value }));
  };

  const saveData = async () => {
    try {
      formRef.current?.addEventListener("submit", (e) => {
        e.preventDefault();
      });
      if (!formRef.current?.checkValidity()) {
        const invalidElement = formRef.current?.querySelector(":invalid");
        if (invalidElement) {
          invalidElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          (invalidElement as HTMLElement).focus();
        }
        return;
      }
      formRef.current?.requestSubmit();
      setSnackBarData(() => {
        return {
          open: true,
          action: <SnackbarLoading />,
        };
      });
      await UpdateSupportCopyrightService({
        query: {
          supportCopyrightId: copyright.data?.supportingDataOnCopyright
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

      await copyright.refetch();
      setSnackBarData(() => {
        return {
          open: true,
          action: <SnackbarNoSaveData />,
        };
      });
    } catch (error) {
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

  useImperativeHandle(ref, () => ({
    saveData,
  }));
  return (
    <div className=" w-full  rounded-md border-[1px] border-solid border-[#BED6FF] bg-white p-5 py-10 md:p-10">
      <Form
        ref={formRef}
        className="mx-0 my-5 flex flex-col gap-5 md:mx-5 md:my-10 "
      >
        {/* ข้อ 1 */}
        <section className="flex flex-col items-start justify-center gap-3 md:gap-5  lg:flex-row">
          <section className="flex items-center gap-3">
            <Number number={1} />
            <p className="my-2 text-base font-semibold md:min-w-64 md:text-base">
              ระยะเวลาในการสร้างสรรค์ผลงาน :
            </p>
          </section>
          <div className="flex w-full flex-col gap-3 pl-7 text-base md:flex-row md:gap-5 md:pl-0 md:text-base">
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
              <Label className=" text-[var(--primary-blue) min-w-10 font-medium lg:min-w-24">
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
                  className="h-8 w-44 rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:w-60  md:pl-4 "
                  placeholder="จำนวนเดือน"
                />
                <FieldError className="text-xs text-red-700" />
              </div>
              <Label className=" text-[var(--primary-blue) min-w-24 font-medium md:min-w-24">
                เดือน
              </Label>
            </TextField>
          </div>
        </section>
        {/* ข้อ 2 */}
        <section className="flex w-full flex-col  justify-start gap-3 md:gap-5  lg:flex-row">
          <section className="flex items-center gap-3 ">
            <Number number={2} />
          </section>
          <Label className="my-2 text-base font-semibold   md:text-base">
            ค่าใช้จ่ายในการสร้างสรรค์ผลงาน :
          </Label>
          <div className="flex  flex-col gap-3 pl-7 text-base  md:flex-row md:gap-5 md:pl-0 md:text-base">
            <TextField
              isRequired
              className={"min-md:w-60 flex w-44 items-center gap-3 "}
            >
              <div className="fex-col flex gap-1">
                <InputNumber
                  required
                  value={supportData?.cost}
                  onValueChange={(e) => {
                    setSupportData((prev) => {
                      return {
                        ...prev,
                        cost: e.value as number,
                      };
                    });
                  }}
                  className="h-8 w-44 rounded-md bg-slate-300 p-1 text-base md:h-10  md:w-60   md:text-base"
                  minFractionDigits={2}
                  maxFractionDigits={5}
                />
                <FieldError className="text-xs text-red-700" />
              </div>
              <Label className=" text-[var(--primary-blue) min-w-24 font-medium md:min-w-24">
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
            <Label className="my-2 w-60 text-base font-semibold md:w-full md:text-base">
              ผลงานนี้สามารถนำไปใช้ประโยชน์ในรูปแบบหรือลักษณะใด (ตอบได้มากกว่า 1
              ข้อ)
            </Label>
            <FieldError className="w-max text-xs text-red-700" />
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-base md:flex-row md:gap-5 md:pl-0 md:text-base">
            <section className="flex w-full flex-col  gap-3 md:pl-10">
              <div className="grid grid-cols-1 gap-1.5 px-5 text-base md:w-[80%] md:grid-cols-2 md:gap-3 md:pl-0 md:text-[0.9rem]">
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
                    className="h-8 w-full rounded-md  bg-slate-300 p-1 pl-3 text-base md:h-10 md:p-2  md:pl-4 md:text-base"
                    placeholder="โปรดระบุอื่นๆ"
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

        <CompanyInterest copyright={copyright} />

        {/* ข้อ 5*/}
        <RadioGroup
          isRequired
          value={supportData?.allowPublic}
          onChange={(e) => {
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
            <Label className="my-2 w-60 text-base font-semibold md:w-full md:text-base">
              การประชาสัมพันธ์ผลงานการประดิษฐ์นี้โดยมหาวิทยาลัย
            </Label>
            <FieldError className="w-max text-xs text-red-700" />
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-base md:flex-row md:gap-5 md:pl-10 md:text-base">
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
               rounded-md bg-slate-300  p-1 pl-3 text-base md:h-10 md:p-2  md:pl-4 md:text-base"
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
});

export default NrruCopyrightForm3;
