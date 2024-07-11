import React, { useState } from "react";
import Number from "../../../Number";
import { FiPlusCircle } from "react-icons/fi";
import { FieldError, Input, Label, TextField } from "react-aria-components";
import { InputMask, InputMaskChangeEvent } from "primereact/inputmask";
import Swal from "sweetalert2";
import { ErrorMessages } from "../../../../models";
import { UseQueryResult, useQueryClient } from "@tanstack/react-query";
import { MdDelete } from "react-icons/md";

import { ResponseGetCopyrightService } from "../../../../services/copyright/copyright";
import {
  CreateCompanyCopyrightService,
  DeleteCompanyCopyrightService,
} from "../../../../services/copyright/support-copyright/company-interested-copyright";

type CompanyInterestProps = {
  copyright: UseQueryResult<ResponseGetCopyrightService, Error>;
};
function CompanyInterest({ copyright }: CompanyInterestProps) {
  const queryClient = useQueryClient();
  const [companyInterestCreate, setCompanyInterestCreate] = useState<{
    name?: string;
    coordinator?: string;
    phone?: string;
  }>();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | InputMaskChangeEvent,
  ) => {
    const { name, value } = e.target;
    setCompanyInterestCreate((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCompanyInterest = async () => {
    try {
      if (!copyright.data) {
        throw new Error("โปรดลองใหม่อีกครั้ง");
      }
      Swal.fire({
        title: "กำลังสร้างข้อมูล",
        willOpen: () => {
          Swal.showLoading();
        },
      });
      if (
        !companyInterestCreate?.name ||
        !companyInterestCreate?.coordinator ||
        !companyInterestCreate?.phone
      ) {
        throw new Error("กรุณากรอกข้อมูลให้ครบ");
      }
      const create = await CreateCompanyCopyrightService({
        name: companyInterestCreate?.name,
        coordinator: companyInterestCreate?.coordinator,
        phone: companyInterestCreate?.phone.replace(/-/g, ""),
        copyrightId: copyright.data?.id as string,
        supportingDataOnCopyrightId: copyright.data?.supportingDataOnCopyright
          .id as string,
      });

      const updateCopyright: ResponseGetCopyrightService = {
        ...copyright.data,
        supportingDataOnCopyright: {
          ...copyright.data.supportingDataOnCopyright,
          companyInterestedOnSupportingDataCopyrights: [
            ...(copyright.data.supportingDataOnCopyright
              .companyInterestedOnSupportingDataCopyrights ?? []),
            create,
          ],
        },
      };

      queryClient.setQueryData(
        ["copyright", { copyrightId: copyright.data?.id }],
        {
          ...updateCopyright,
        },
      );
      setCompanyInterestCreate(() => {
        return {
          name: "",
          coordinator: "",
          phone: "",
        };
      });
      Swal.fire({
        title: "สร้างข้อมูลสำเร็จ",
        text: "สร้างข้อมูลสำเร็จ",
        icon: "success",
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

  const handleDeleteCompanyInterest = async (id: string) => {
    try {
      if (!copyright.data) {
        throw new Error("โปรดลองใหม่อีกครั้ง");
      }
      Swal.fire({
        title: "กำลังลบข้อมูล",
        willOpen: () => {
          Swal.showLoading();
        },
      });
      await DeleteCompanyCopyrightService({
        companyInterestedId: id,
      });
      const unDelete =
        copyright.data?.supportingDataOnCopyright.companyInterestedOnSupportingDataCopyrights.filter(
          (company) => company.id !== id,
        );

      const updateCopyright: ResponseGetCopyrightService = {
        ...copyright.data,
        supportingDataOnCopyright: {
          ...copyright.data.supportingDataOnCopyright,
          companyInterestedOnSupportingDataCopyrights: [...(unDelete ?? [])],
        },
      };
      queryClient.setQueryData(
        ["copyright", { copyrightId: copyright.data?.id }],
        {
          ...updateCopyright,
        },
      );
      Swal.fire({
        title: "ลบข้อมูลสำเร็จ",
        text: "ลบข้อมูลสำเร็จ",
        icon: "success",
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
  return (
    <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
      <section className="flex items-center gap-3">
        <Number number={4} />
        <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
          หน่วยงาน/บริษัทที่สนใจ หรือคาดว่าจะสนใจ
          หรือเกี่ยวข้องกับการประดิษฐ์/ผลงานนี้
        </p>
      </section>

      <div className="=text-[0.8rem] flex w-full flex-col flex-wrap gap-3 md:flex-row md:gap-5 md:text-base">
        <section className="flex w-11/12 flex-col justify-between md:flex-row md:items-center ">
          <p>
            (กรุณาระบุชื่อบริษัท ชื่อผู้ประสานงาน
            เบอร์โทรศัพท์ของหน่วยงาน/ผู้ที่สนใจ)
          </p>
          <button
            onClick={handleAddCompanyInterest}
            type="button"
            className="my-3 flex w-48 items-center justify-center gap-3 rounded-md bg-[#9747FF] p-2 text-xs font-semibold text-white duration-300 hover:bg-purple-700 md:px-3 md:py-2 md:text-base "
          >
            <FiPlusCircle /> <p>เพิ่มข้อมูล</p>
          </button>
        </section>
        <section className="flex w-11/12 items-center justify-between rounded-md border-[1px] border-solid border-[#BED6FF] p-2 ">
          <div className="flex w-full flex-col gap-3 pl-0 text-[0.75rem] md:gap-2 md:pl-0 md:text-[0.85rem] lg:flex-row">
            <TextField className={"flex  items-center gap-2 "}>
              <Label className=" text-[var(--primary-blue) min-w-20 font-medium md:min-w-44">
                1) ชื่อหน่วยงาน/บริษัทที่สนใจ :
              </Label>
              <Input
                name="name"
                value={companyInterestCreate?.name}
                onChange={handleChange}
                type="text"
                className="h-8 w-auto rounded-md bg-slate-300 p-1 pl-3 md:h-10  md:pl-4 "
                placeholder="กรอกข้อมูล"
              />
            </TextField>
            <TextField className={"flex   items-center gap-2 "}>
              <Label className=" text-[var(--primary-blue) min-w-20 font-medium md:min-w-14">
                ชื่อผู้ประสาน :
              </Label>
              <Input
                name="coordinator"
                value={companyInterestCreate?.coordinator}
                onChange={handleChange}
                type="text"
                className="h-8 w-auto rounded-md bg-slate-300 p-1 pl-3 md:h-10  md:pl-4 "
                placeholder="กรอกข้อมูล"
              />
            </TextField>
            <TextField className={"flex  items-center gap-2 "}>
              <Label className=" text-[var(--primary-blue) min-w-20 font-medium md:min-w-14">
                เบอร์ติดต่อ :
              </Label>
              <div className="flex flex-col gap-1">
                <InputMask
                  name="phone"
                  onChange={handleChange}
                  value={companyInterestCreate?.phone}
                  className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                  placeholder="กรอกหมายเลขโทรศัพท์"
                  maxLength={10}
                  inputMode="numeric"
                  type="text"
                  mask="999-999-9999"
                />
                <FieldError className="text-xs text-red-700" />
              </div>
            </TextField>
          </div>
        </section>
      </div>
      <ul className="flex w-full flex-col gap-2">
        {copyright.data?.supportingDataOnCopyright.companyInterestedOnSupportingDataCopyrights.map(
          (company, index) => {
            return (
              <li
                key={index}
                className="flex w-11/12 items-center justify-between rounded-md
             border-[1px] border-solid border-[#BED6FF] bg-[#BED6FF] p-2 "
              >
                <div className="flex w-full flex-col gap-3 pl-0 text-[0.75rem] md:gap-2 md:pl-0 md:text-[0.85rem] lg:flex-row">
                  <TextField className={"flex  items-center gap-2 "}>
                    <Label className=" text-[var(--primary-blue) min-w-20 font-medium md:min-w-44">
                      ชื่อหน่วยงาน/บริษัทที่สนใจ :
                    </Label>
                    <Input
                      disabled
                      value={company.name}
                      type="text"
                      className="h-8 w-auto rounded-md bg-white p-1 pl-3 md:h-10  md:pl-4 "
                      placeholder="กรอกข้อมูล"
                    />
                  </TextField>
                  <TextField className={"flex   items-center gap-2 "}>
                    <Label className=" text-[var(--primary-blue) min-w-20 font-medium md:min-w-14">
                      ชื่อผู้ประสาน :
                    </Label>
                    <Input
                      disabled
                      value={company.coordinator}
                      type="text"
                      className="h-8 w-auto rounded-md bg-white p-1 pl-3 md:h-10  md:pl-4 "
                      placeholder="กรอกข้อมูล"
                    />
                  </TextField>
                  <TextField className={"flex items-center  gap-2 "}>
                    <Label className=" text-[var(--primary-blue) min-w-20 font-medium md:min-w-14">
                      เบอร์ติดต่อ :
                    </Label>
                    <div className="flex flex-col gap-1">
                      <InputMask
                        disabled
                        value={company.phone}
                        className="h-8 w-full rounded-md bg-white p-1 pl-3 md:h-10 md:pl-4 "
                        placeholder="กรอกหมายเลขโทรศัพท์"
                        maxLength={10}
                        inputMode="numeric"
                        type="text"
                        mask="999-999-9999"
                      />
                      <FieldError className="text-xs text-red-700" />
                    </div>
                  </TextField>
                  <button
                    onClick={() => handleDeleteCompanyInterest(company.id)}
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-md
                   bg-red-600 px-4 text-white transition duration-100 hover:bg-red-700 active:scale-105"
                  >
                    <MdDelete />
                    ลบ
                  </button>
                </div>
              </li>
            );
          },
        )}
      </ul>
    </section>
  );
}

export default CompanyInterest;
