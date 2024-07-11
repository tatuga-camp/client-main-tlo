import Number from "@/components/Number";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
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
import { UseQueryResult } from "@tanstack/react-query";
import { ResponseGetDesignPatentService } from "../../../../services/design-patent/design-patent";
import SnackbarLoading from "../../../Snackbars/SnackBarLoading";
import { UpdateSupportDesignPatentService } from "../../../../services/design-patent/support-design/support-design";
import SnackbarNoSaveData from "../../../Snackbars/SnackBarNoSaveData";
import { ErrorMessages } from "../../../../models";
import Swal from "sweetalert2";
import CompanyInterest from "./CompanyInterest";
import Link from "next/link";
import { supportBenefits } from "../../../../data/invention";
import { InputNumber } from "primereact/inputnumber";

type NrruDesignForm3Props = {
  design: UseQueryResult<ResponseGetDesignPatentService, Error>;
};
const NrruDesignForm3 = forwardRef(function FormDesign(
  { design }: NrruDesignForm3Props,
  ref,
) {
  const [snackBarData, setSnackBarData] = useState<{
    open: boolean;
    action: React.ReactNode;
  }>({
    open: false,
    action: <></>,
  });
  const formRef = useRef<HTMLFormElement>(null);
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
      durationYear: design.data?.supportingDataOnDesignPatent.durationYear,
      durationMonth: design.data?.supportingDataOnDesignPatent.durationMonth,
      cost: design.data?.supportingDataOnDesignPatent.cost,
      benefit: design.data?.supportingDataOnDesignPatent.benefit,
      allowPublic: design.data?.supportingDataOnDesignPatent.allowPublic,
      reasonPublic: design.data?.supportingDataOnDesignPatent.reasonPublic,
      otherBenefit: design.data?.supportingDataOnDesignPatent.otherBenefit,
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
      setSnackBarData(() => {
        return {
          open: true,
          action: <SnackbarLoading />,
        };
      });
      await UpdateSupportDesignPatentService({
        query: {
          supportDesignId: design.data?.supportingDataOnDesignPatent
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

      await design.refetch();
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
    <div className=" w-full  rounded-md border-[1px] border-solid border-[#BED6FF] bg-white p-5 py-10 lg:p-10">
      <Form
        ref={formRef}
        className="mx-0 my-5 flex flex-col gap-5 lg:mx-5 lg:my-10 "
      >
        {/* ข้อ 1 */}
        <section className="flex flex-col items-start justify-center gap-3 lg:flex-row  lg:gap-5">
          <section className="flex items-center gap-3">
            <Number number={1} />
            <p className="my-2 text-[0.8rem] font-semibold lg:min-w-64 lg:text-base">
              ระยะเวลาในการประดิษฐ์/การวิจัย :
            </p>
          </section>
          <div className="flex w-full flex-col gap-3 pl-7 text-[0.8rem] lg:flex-row lg:gap-5 lg:pl-0 lg:text-base">
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
                  className="h-8 w-28 rounded-md bg-slate-300 p-1 pl-3 lg:h-10  lg:pl-4 "
                  placeholder="จำนวนปี"
                />
                <FieldError className="text-xs text-red-700" />
              </div>
              <Label className=" text-[var(--primary-blue) w-8 font-medium lg:min-w-16">
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
                  className="h-8 w-28 rounded-md bg-slate-300 p-1 pl-3 lg:h-10   lg:pl-4 "
                  placeholder="จำนวนเดือน"
                />
                <FieldError className="text-xs text-red-700" />
              </div>
              <Label className=" text-[var(--primary-blue) w-8 font-medium lg:min-w-24">
                เดือน
              </Label>
            </TextField>
          </div>
        </section>
        {/* ข้อ 2 */}
        <section className="flex flex-col items-start justify-center gap-3 lg:flex-row  lg:gap-5">
          <section className="flex items-center gap-3">
            <Number number={2} />
            <p className="my-2 text-[0.8rem] font-semibold lg:min-w-96 lg:text-base">
              ค่าใช้จ่ายที่ใช้ในการออกแบบผลิตภัณฑ์/ดำเนินการวิจัย :
            </p>
          </section>
          <div className="flex w-full flex-col gap-3 pl-7 text-[0.8rem] lg:flex-row lg:gap-5 lg:pl-0 lg:text-base">
            <TextField isRequired className={" flex w-44 items-center gap-3 "}>
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
                  className="h-8 w-44 rounded-md bg-slate-300 p-1 text-[0.8rem] lg:h-10  lg:w-60   lg:text-base"
                  minFractionDigits={2}
                  maxFractionDigits={5}
                />
                <FieldError className="text-xs text-red-700" />
              </div>
              <Label className=" text-[var(--primary-blue) min-w-24 font-medium lg:min-w-24">
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
          className="flex flex-col items-start justify-center gap-2 lg:gap-5 "
        >
          <section className="flex items-center gap-3">
            <Number number={3} />
            <Label className="my-2 w-60 text-[0.8rem] font-semibold lg:w-96 lg:text-base">
              ผลงานนี้สามารถนำไปใช้ประโยชน์ในรูปแบบหรือลักษณะใด (ตอบได้มากกว่า 1
              ข้อ)
            </Label>
            <FieldError className="w-max text-xs text-red-700" />
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem] lg:flex-row lg:gap-5 lg:pl-0 lg:text-base">
            <section className="flex w-full flex-col  gap-3 lg:pl-10">
              <div className="grid grid-cols-1 gap-1.5 px-5 text-[0.8rem] lg:w-[80%] lg:grid-cols-2 lg:gap-3 lg:pl-0 lg:text-[0.9rem]">
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
              <section className="flex w-full flex-col gap-2 px-5 lg:flex-row lg:px-0">
                <TextField className={"ml-3"}>
                  <Label className="font-medium lg:text-[0.9rem]">
                    การใช้ประโยชน์ด้านอื่นๆ (โปรดระบุ)
                  </Label>
                  <Input
                    name="otherBenefit"
                    onChange={handleChange}
                    value={supportData?.otherBenefit}
                    type="text"
                    className="h-8 w-full rounded-md  bg-slate-300 p-1 pl-3 text-[0.8rem] lg:h-10 lg:p-2  lg:pl-4 lg:text-base"
                    placeholder=""
                  />
                </TextField>
              </section>
              <Link
                target="_blank"
                href="/"
                className=" flex w-full items-center justify-center gap-3  rounded-md bg-[#BED6FF] p-2 px-5 font-semibold duration-300 hover:bg-[#91B2EB]   lg:w-72 lg:gap-5"
              >
                <p>รูปแบบการใช้ประโยชน์ (คลิก)</p>
              </Link>
            </section>
          </div>
        </CheckboxGroup>

        {/* ข้อ 4*/}
        <CompanyInterest design={design} />

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
          className="flex flex-col items-start justify-center gap-2 lg:gap-5 "
        >
          <section className="flex items-center gap-3">
            <Number number={5} />
            <Label className="my-2 w-60 text-[0.8rem] font-semibold lg:w-96 lg:text-base">
              การประชาสัมพันธ์ผลงานการประดิษฐ์นี้โดยมหาวิทยาลัย
            </Label>
            <FieldError className="w-max text-xs text-red-700" />
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem] lg:flex-row lg:gap-5 lg:pl-10 lg:text-base">
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
            <section className="flex w-full flex-col gap-2 px-5 lg:flex-row lg:px-0">
              <TextField className={"w-full lg:px-8"}>
                <TextArea
                  disabled={
                    supportData?.allowPublic === "ยินยอม" ? true : false
                  }
                  value={supportData?.reasonPublic}
                  onChange={handleChange}
                  name="reasonPublic"
                  required={supportData?.allowPublic === "ไม่ยินยอม"}
                  className="no-re min-h-52   w-full	 resize-none
               rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem] lg:h-10 lg:p-2  lg:pl-4 lg:text-base"
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

export default NrruDesignForm3;
