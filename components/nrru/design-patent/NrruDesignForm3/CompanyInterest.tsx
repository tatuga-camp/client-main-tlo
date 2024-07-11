import React, { useState } from "react";
import Number from "../../../Number";
import { FiPlusCircle } from "react-icons/fi";
import { FieldError, Input, Label, TextField } from "react-aria-components";
import { InputMask, InputMaskChangeEvent } from "primereact/inputmask";
import Swal from "sweetalert2";
import { ErrorMessages } from "../../../../models";

import { UseQueryResult, useQueryClient } from "@tanstack/react-query";
import { MdDelete } from "react-icons/md";
import {
  CreateCompanyDesignPatentService,
  DeleteCompanyDesignPatentService,
} from "../../../../services/design-patent/support-design/company-interested-design";
import { ResponseGetDesignPatentService } from "../../../../services/design-patent/design-patent";

type CompanyInterestProps = {
  design: UseQueryResult<ResponseGetDesignPatentService, Error>;
};
function CompanyInterest({ design }: CompanyInterestProps) {
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
      if (!design.data) {
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
      const create = await CreateCompanyDesignPatentService({
        name: companyInterestCreate?.name,
        coordinator: companyInterestCreate?.coordinator,
        phone: companyInterestCreate?.phone.replace(/-/g, ""),
        designPatentId: design.data?.id as string,
        supportingDataOnDesignPatentId: design.data
          ?.supportingDataOnDesignPatent.id as string,
      });

      const updateDesign: ResponseGetDesignPatentService = {
        ...design.data,
        supportingDataOnDesignPatent: {
          ...design.data.supportingDataOnDesignPatent,
          companyInterestedOnSupportingDataDesignPatents: [
            ...(design.data.supportingDataOnDesignPatent
              .companyInterestedOnSupportingDataDesignPatents ?? []),
            create,
          ],
        },
      };

      queryClient.setQueryData(["design", { designId: design.data?.id }], {
        ...updateDesign,
      });
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
      if (!design.data) {
        throw new Error("โปรดลองใหม่อีกครั้ง");
      }
      Swal.fire({
        title: "กำลังลบข้อมูล",
        willOpen: () => {
          Swal.showLoading();
        },
      });
      await DeleteCompanyDesignPatentService({
        companyInterestedId: id,
      });
      const unDelete =
        design.data?.supportingDataOnDesignPatent.companyInterestedOnSupportingDataDesignPatents.filter(
          (company) => company.id !== id,
        );

      const updateDesign: ResponseGetDesignPatentService = {
        ...design.data,
        supportingDataOnDesignPatent: {
          ...design.data.supportingDataOnDesignPatent,
          companyInterestedOnSupportingDataDesignPatents: [...(unDelete ?? [])],
        },
      };
      queryClient.setQueryData(["design", { designId: design.data?.id }], {
        ...updateDesign,
      });
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
    <section className="flex flex-col items-start justify-center gap-2 lg:gap-5 ">
      <section className="flex items-center gap-3">
        <Number number={4} />
        <p className="my-2 w-full text-[0.8rem] font-semibold lg:text-base">
          หน่วยงาน/บริษัทที่สนใจ หรือคาดว่าจะสนใจ
          หรือเกี่ยวข้องกับการประดิษฐ์/ผลงานนี้
        </p>
      </section>

      <div className="=text-[0.8rem] flex w-full flex-col flex-wrap gap-3 lg:flex-row lg:gap-5 lg:text-base">
        <section className="flex w-11/12 flex-col justify-between lg:flex-row lg:items-center ">
          <p>
            (กรุณาระบุชื่อบริษัท ชื่อผู้ประสานงาน
            เบอร์โทรศัพท์ของหน่วยงาน/ผู้ที่สนใจ)
          </p>
          <button
            onClick={handleAddCompanyInterest}
            type="button"
            className="my-3 flex w-48 items-center justify-center gap-3 rounded-md bg-[#9747FF] p-2 text-xs font-semibold text-white duration-300 hover:bg-purple-700 lg:px-3 lg:py-2 lg:text-base "
          >
            <FiPlusCircle /> <p>เพิ่มข้อมูล</p>
          </button>
        </section>
        <section className="flex w-11/12 items-center justify-between rounded-md border-[1px] border-solid border-[#BED6FF] p-2 ">
          <div className="flex w-full flex-col gap-3 pl-0 text-[0.75rem] lg:flex-row lg:gap-2 lg:pl-0 lg:text-[0.85rem]">
            <TextField className={"flex  items-center gap-2 "}>
              <Label className=" text-[var(--primary-blue) min-w-20 font-medium ">
                1) ชื่อหน่วยงาน/บริษัทที่สนใจ :
              </Label>
              <Input
                name="name"
                value={companyInterestCreate?.name}
                onChange={handleChange}
                type="text"
                className="h-8 w-auto rounded-md bg-slate-300 p-1 pl-3 lg:h-10  lg:pl-4 "
                placeholder="กรอกข้อมูล"
              />
            </TextField>
            <TextField className={"flex   items-center gap-2 "}>
              <Label className=" text-[var(--primary-blue) min-w-20 font-medium lg:min-w-14">
                ชื่อผู้ประสาน :
              </Label>
              <Input
                name="coordinator"
                value={companyInterestCreate?.coordinator}
                onChange={handleChange}
                type="text"
                className="h-8 w-auto rounded-md bg-slate-300 p-1 pl-3 lg:h-10  lg:pl-4 "
                placeholder="กรอกข้อมูล"
              />
            </TextField>
            <TextField className={"flex  items-center gap-2 "}>
              <Label className=" text-[var(--primary-blue) min-w-20 font-medium lg:min-w-14">
                เบอร์ติดต่อ :
              </Label>
              <div className="flex flex-col gap-1">
                <InputMask
                  name="phone"
                  onChange={handleChange}
                  value={companyInterestCreate?.phone}
                  className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 lg:h-10 lg:pl-4 "
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
        {design.data?.supportingDataOnDesignPatent.companyInterestedOnSupportingDataDesignPatents.map(
          (company, index) => {
            return (
              <li
                key={index}
                className="flex w-11/12 items-center justify-between rounded-md
             border-[1px] border-solid border-[#BED6FF] bg-[#BED6FF] p-2 "
              >
                <div className="flex w-full flex-col gap-3 pl-0 text-[0.75rem] lg:flex-row lg:gap-2 lg:pl-0 lg:text-[0.85rem]">
                  <TextField className={"flex  items-center gap-2 "}>
                    <Label className=" text-[var(--primary-blue) min-w-20 font-medium lg:min-w-44">
                      ชื่อหน่วยงาน/บริษัทที่สนใจ :
                    </Label>
                    <Input
                      disabled
                      value={company.name}
                      type="text"
                      className="h-8 w-auto rounded-md bg-white p-1 pl-3 lg:h-10  lg:pl-4 "
                      placeholder="กรอกข้อมูล"
                    />
                  </TextField>
                  <TextField className={"flex   items-center gap-2 "}>
                    <Label className=" text-[var(--primary-blue) min-w-20 font-medium lg:min-w-14">
                      ชื่อผู้ประสาน :
                    </Label>
                    <Input
                      disabled
                      value={company.coordinator}
                      type="text"
                      className="h-8 w-auto rounded-md bg-white p-1 pl-3 lg:h-10  lg:pl-4 "
                      placeholder="กรอกข้อมูล"
                    />
                  </TextField>
                  <TextField className={"flex items-center  gap-2 "}>
                    <Label className=" text-[var(--primary-blue) min-w-20 font-medium lg:min-w-14">
                      เบอร์ติดต่อ :
                    </Label>
                    <div className="flex flex-col gap-1">
                      <InputMask
                        disabled
                        value={company.phone}
                        className="h-8 w-full rounded-md bg-white p-1 pl-3 lg:h-10 lg:pl-4 "
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
