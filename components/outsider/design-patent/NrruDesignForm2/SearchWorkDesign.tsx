import { UseQueryResult, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Label, TextField } from "react-aria-components";
import { FiPlusCircle } from "react-icons/fi";
import { Calendar } from "primereact/calendar";
import { ErrorMessages, MenuSearchWorks } from "../../../../models";
import Swal from "sweetalert2";

import { MdDelete } from "react-icons/md";
import moment from "moment";
import { ResponseGetDesignPatentService } from "../../../../services/design-patent/design-patent";
import {
  CreateSearchDesignPatentService,
  DeleteSearchDesignPatentService,
} from "../../../../services/design-patent/work-design/search-design";

type SearchWorkDesignProps = {
  design: UseQueryResult<ResponseGetDesignPatentService, Error>;
};
const menuSearchWorks = [
  {
    type: "สิทธิบัตรหรืออนุสิทธิบัตร",
    inputOne: "name",
    inputTwo: "numberRequest",
    inputThree: "country",
  },
  {
    type: "วารสารวิชาการ",
    inputOne: "name",
    inputTwo: "nameJournal",
    inputThree: "releaseDate",
  },
  {
    type: "อื่น ๆ",
    inputOne: "name",
    inputTwo: "source",
    inputThree: "country",
  },
];
function SearchWorkDesign({ design }: SearchWorkDesignProps) {
  const queryClient = useQueryClient();

  const [activeContent, setActiveContent] = useState<MenuSearchWorks>(
    "สิทธิบัตรหรืออนุสิทธิบัตร",
  );

  const [searchWorkData, setSearchWorkData] = useState<{
    type?: MenuSearchWorks;
    name?: string;
    numberRequest?: string;
    nameJournal?: string;
    country?: string;
    releaseDate?: string;
    source?: string;
  }>({
    type: "สิทธิบัตรหรืออนุสิทธิบัตร",
  });
  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
    menu: MenuSearchWorks,
  ) => {
    e.preventDefault();
    setActiveContent(menu);
  };

  const handleChangeSearchWork = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWorkData({
      ...searchWorkData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateSearchWork = async () => {
    try {
      if (!design.data) {
        throw new Error("ข้อมูลไม่โหลดสมบูรณ์ กรุณาลองใหม่อีกครั้ง");
      }
      if (!searchWorkData) {
        throw new Error("กรุณากรอกข้อมูลให้ครบถ้วน");
      }
      Swal.fire({
        title: "กำลังสร้างข้อมูล",
        willOpen: () => {
          Swal.showLoading();
        },
      });
      const create = await CreateSearchDesignPatentService({
        type: searchWorkData?.type as MenuSearchWorks,
        nameInovation: searchWorkData?.name as string,
        numberRequest: searchWorkData?.numberRequest as string,
        nameJournal: searchWorkData?.nameJournal as string,
        country: searchWorkData?.country as string,
        releaseDate: searchWorkData?.releaseDate as string,
        source: searchWorkData?.source as string,
        workInfoOnDesignPatentId: design.data?.workInfoOnDesignPatent
          .id as string,
        designPatentId: design.data?.id as string,
      });

      let updateDesgin: ResponseGetDesignPatentService = {
        ...design.data,
        workInfoOnDesignPatent: {
          ...design.data?.workInfoOnDesignPatent,
          patentRelateToSearchResultOnDesignPatents: [
            ...(design.data?.workInfoOnDesignPatent
              .patentRelateToSearchResultOnDesignPatents ?? []),
            create,
          ],
        },
      };

      queryClient.setQueryData(["design", { designId: design.data.id }], {
        ...updateDesgin,
      });

      setSearchWorkData((prev) => {
        delete prev?.releaseDate;
        return {
          type: searchWorkData?.type,
          name: "",
          numberRequest: "",
          nameJournal: "",
          country: "",
          source: "",
        };
      });
      Swal.fire({
        title: "สร้างข้อมูลสำเร็จ",
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

  const handleDeleteSearchWork = async ({
    searchDesignId,
  }: {
    searchDesignId: string;
  }) => {
    try {
      if (!design.data) {
        throw new Error("ข้อมูลไม่โหลดสมบูรณ์ กรุณาลองใหม่อีกครั้ง");
      }
      Swal.fire({
        title: "กำลังลบข้อมูล",
        willOpen: () => {
          Swal.showLoading();
        },
      });
      await DeleteSearchDesignPatentService({
        searchDesignId: searchDesignId,
      });
      const unDelete =
        design.data?.workInfoOnDesignPatent.patentRelateToSearchResultOnDesignPatents?.filter(
          (search) => search.id !== searchDesignId,
        );
      let updateDesgin: ResponseGetDesignPatentService = {
        ...design.data,
        workInfoOnDesignPatent: {
          ...design.data?.workInfoOnDesignPatent,
          patentRelateToSearchResultOnDesignPatents: [...(unDelete ?? [])],
        },
      };

      queryClient.setQueryData(["design", { designId: design.data.id }], {
        ...updateDesgin,
      });

      Swal.fire({
        title: "ลบข้อมูลสำเร็จ",
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
    <Form
      onSubmit={handleCreateSearchWork}
      className="flex w-full flex-col gap-3 md:pl-10"
    >
      <Label className="font-semibold md:min-w-52">
        5.4 สิทธิบัตรหรืออนุสิทธิบัตรที่เกี่ยวข้องที่ได้จากการสืบค้น
        หรืองานที่ปรากฏอยู่ก่อน
      </Label>
      <div className="flex flex-col items-center justify-center md:w-full">
        <section className="flex w-full flex-col gap-2 md:flex-row">
          {menuSearchWorks.map((menu, index) => (
            <button
              key={index}
              onClick={(e) => {
                const type: MenuSearchWorks = menu.type as MenuSearchWorks;

                handleClick(e, menu.type as MenuSearchWorks);
                setSearchWorkData((prev) => {
                  delete prev?.releaseDate;
                  return {
                    type: type,
                    nameInovation: "",
                    numberRequest: "",
                    nameJournal: "",
                    country: "",
                    source: "",
                  };
                });
              }}
              className={`w-full border-[1px]  border-solid border-[#BED6FF] px-5 py-2 font-medium md:min-w-52 ${
                activeContent === menu.type
                  ? "bg-[#BED6FF] text-[var(--primary-blue)]"
                  : "bg-white text-[#78A9FF] "
              }`}
            >
              {menu.type}
            </button>
          ))}
        </section>
        <div className="mt-4 w-full items-center justify-center border-[1px] border-solid border-[#BED6FF] p-5 font-medium">
          {activeContent === "สิทธิบัตรหรืออนุสิทธิบัตร" && (
            <section className="flex flex-col items-center gap-2">
              <TextField
                className={"ml-3 flex flex-col items-center gap-3 md:flex-row"}
              >
                <Label className="min-w-28  text-[var(--primary-blue)] md:min-w-44">
                  ชื่อที่แสดงถึงการประดิษฐ์ :
                </Label>
                <Input
                  name="name"
                  value={searchWorkData?.name}
                  onChange={handleChangeSearchWork}
                  type="text"
                  className="h-8 rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem] md:h-10 md:w-72 md:p-2  md:pl-4 md:text-base"
                  placeholder=""
                />
              </TextField>
              <TextField
                className={"ml-3 flex flex-col items-center gap-3 md:flex-row"}
              >
                <Label className="min-w-28  text-[var(--primary-blue)] md:min-w-44">
                  เลขที่คำขอ/เลขที่สิทธิบัตร :
                </Label>
                <Input
                  name="numberRequest"
                  value={searchWorkData?.numberRequest}
                  onChange={handleChangeSearchWork}
                  type="text"
                  className="h-8 rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem] md:h-10 md:w-72 md:p-2  md:pl-4 md:text-base"
                  placeholder=""
                />
              </TextField>
              <TextField
                className={"ml-3 flex flex-col items-center gap-3 md:flex-row"}
              >
                <Label className="min-w-28  text-[var(--primary-blue)] md:min-w-44">
                  ประเทศ :
                </Label>
                <Input
                  name="country"
                  value={searchWorkData?.country}
                  onChange={handleChangeSearchWork}
                  type="text"
                  className="h-8 rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem] md:h-10 md:w-72 md:p-2  md:pl-4 md:text-base"
                  placeholder=""
                />
              </TextField>
            </section>
          )}
          {activeContent === "วารสารวิชาการ" && (
            <section className="flex flex-col items-center gap-2">
              <TextField
                className={"ml-3 flex flex-col items-center gap-3 md:flex-row"}
              >
                <Label className="min-w-28  text-[var(--primary-blue)] md:min-w-44">
                  ชื่อที่แสดงถึงการประดิษฐ์ :
                </Label>
                <Input
                  value={searchWorkData?.name}
                  onChange={handleChangeSearchWork}
                  name="name"
                  type="text"
                  className="h-8 rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem] md:h-10 md:w-72 md:p-2  md:pl-4 md:text-base"
                  placeholder=""
                />
              </TextField>
              <TextField
                className={"ml-3 flex flex-col items-center gap-3 md:flex-row"}
              >
                <Label className="min-w-28  text-[var(--primary-blue)] md:min-w-44">
                  ชื่อวารสาร :
                </Label>
                <Input
                  name="nameJournal"
                  value={searchWorkData?.nameJournal}
                  onChange={handleChangeSearchWork}
                  type="text"
                  className="h-8 rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem] md:h-10 md:w-72 md:p-2  md:pl-4 md:text-base"
                  placeholder=""
                />
              </TextField>
              <TextField
                className={
                  "w- ml-3 flex flex-col items-center gap-3  md:flex-row"
                }
              >
                <Label className="min-w-20  text-[var(--primary-blue)] md:min-w-44">
                  วันที่เผยแพร่ :
                </Label>
                <div className="w-full rounded-lg bg-slate-300 p-1">
                  <Calendar
                    className="w-72"
                    value={
                      searchWorkData?.releaseDate
                        ? new Date(searchWorkData.releaseDate)
                        : null
                    }
                    onChange={(e) => {
                      if (!e.value) return;
                      setSearchWorkData((prev) => {
                        return {
                          ...prev,
                          releaseDate: e.value?.toISOString(),
                        };
                      });
                    }}
                    required
                    locale="th"
                    dateFormat="dd/mm/yy"
                    placeholder="dd/mm/yyyy"
                  />
                </div>
              </TextField>
            </section>
          )}
          {activeContent === "อื่น ๆ" && (
            <section className="flex flex-col items-center gap-2">
              <TextField
                className={"ml-3 flex flex-col items-center gap-3 md:flex-row"}
              >
                <Label className="min-w-28  text-[var(--primary-blue)] md:min-w-44">
                  ชื่อที่แสดงถึงการประดิษฐ์ :
                </Label>
                <Input
                  name="name"
                  value={searchWorkData?.name}
                  onChange={handleChangeSearchWork}
                  type="text"
                  className="h-8 rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem] md:h-10 md:w-72 md:p-2  md:pl-4 md:text-base"
                  placeholder=""
                />
              </TextField>
              <TextField
                className={"ml-3 flex flex-col items-center gap-3 md:flex-row"}
              >
                <Label className="min-w-28  text-[var(--primary-blue)] md:min-w-44">
                  ชื่อแหล่งข้อมูล :
                </Label>
                <Input
                  name="source"
                  value={searchWorkData?.source}
                  onChange={handleChangeSearchWork}
                  type="text"
                  className="h-8 rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem] md:h-10 md:w-72 md:p-2  md:pl-4 md:text-base"
                  placeholder=""
                />
              </TextField>
              <TextField
                className={
                  "w- ml-3 flex flex-col items-center gap-3  md:flex-row"
                }
              >
                <Label className="min-w-20  text-[var(--primary-blue)] md:min-w-44">
                  วันที่เผยแพร่ :
                </Label>
                <div className="w-full rounded-lg bg-slate-300 p-1">
                  <Calendar
                    className="w-72"
                    value={
                      searchWorkData?.releaseDate
                        ? new Date(searchWorkData.releaseDate)
                        : null
                    }
                    onChange={(e) => {
                      if (!e.value) return;
                      setSearchWorkData((prev) => {
                        return {
                          ...prev,
                          releaseDate: e.value?.toISOString(),
                        };
                      });
                    }}
                    required
                    locale="th"
                    dateFormat="dd/mm/yy"
                    placeholder="dd/mm/yyyy"
                  />
                </div>
              </TextField>
            </section>
          )}
          <div className="flex w-full items-center justify-center">
            <Button
              onPress={handleCreateSearchWork}
              type="button"
              className="my-3 flex w-48 items-center justify-center gap-3 rounded-md bg-[#9747FF] p-2 text-xs font-semibold text-white duration-300 hover:bg-purple-700 md:px-3 md:py-2 md:text-base "
            >
              <FiPlusCircle /> <p>เพิ่มข้อมูล</p>
            </Button>
          </div>
        </div>
        <div className="mt-5 flex w-full flex-col items-center justify-center gap-3">
          <h3 className="font-semibold">ข้อมูลที่เพิ่มล่าสุด</h3>
          <div className="grid w-full grid-cols-3 gap-5">
            {design.data?.workInfoOnDesignPatent.patentRelateToSearchResultOnDesignPatents.map(
              (search, index) => (
                <div
                  key={index}
                  className="relative flex min-h-20 w-full items-start justify-start 
                   gap-2 rounded-md bg-[#D6E4FF] p-2 pl-5"
                >
                  <button
                    onClick={() =>
                      handleDeleteSearchWork({ searchDesignId: search.id })
                    }
                    type="button"
                    className="absolute right-2 top-2 flex items-center justify-center gap-2 rounded-md
                   bg-red-600 px-2 text-white transition duration-100 hover:bg-red-700 active:scale-105"
                  >
                    <MdDelete />
                    ลบ
                  </button>

                  {search.type === "สิทธิบัตรหรืออนุสิทธิบัตร" && (
                    <ul>
                      <div className="w-max rounded-lg  bg-main-color px-3 py-1 font-semibold text-white">
                        {search.type}
                      </div>
                      <li className="mt-5">
                        ชื่อที่แสดงถึงการประดิษฐ์ : {search.nameInovation}
                      </li>
                      <li>
                        เลขที่คำขอ/เลขที่สิทธิบัตร :{search.numberRequest}
                      </li>
                      <li>ประเทศ : {search.country}</li>
                    </ul>
                  )}
                  {search.type === "วารสารวิชาการ" && (
                    <ul>
                      <div className="w-max rounded-lg  bg-main-color px-3 py-1 font-semibold text-white">
                        {search.type}
                      </div>
                      <li className="mt-5">
                        ชื่อที่แสดงถึงการประดิษฐ์ : {search.nameInovation}{" "}
                      </li>
                      <li>ชื่อวารสาร :{search.nameJournal}</li>
                      <li>
                        วันที่เผยแพร่ :{" "}
                        {moment(search.releaseDate).format("DD/MM/YYYY")}
                      </li>
                    </ul>
                  )}
                  {search.type === "อื่น ๆ" && (
                    <ul>
                      <div className="w-max rounded-lg  bg-main-color px-3 py-1 font-semibold text-white">
                        {search.type}
                      </div>
                      <li className="mt-5">
                        ชื่อที่แสดงถึงการประดิษฐ์ : {search.nameInovation}{" "}
                      </li>
                      <li>ชื่อแหล่งข้อมูล :{search.source}</li>
                      <li>
                        วันที่เผยแพร่ :{" "}
                        {moment(search.releaseDate).format("DD/MM/YYYY")}
                      </li>
                    </ul>
                  )}
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </Form>
  );
}

export default SearchWorkDesign;
