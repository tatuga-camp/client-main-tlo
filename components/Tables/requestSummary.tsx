import { Pagination as PaginationMUI } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import LinkNextJS from "next/link";
import { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { Element } from "react-scroll";
import Select from "react-select";
import {
  Copyright,
  DesignPatent,
  InventionPatent,
  PartnerInfoOnCopyright,
  PartnerInfoOnDesignPatent,
  PartnerInfoOnInventionPatent,
  PartnerInfoOnTrademark,
  Trademark,
  User,
  WorkInfoOnCopyright,
  WorkInfoOnDesignPatent,
  WorkInfoOnInventionPatent,
} from "../../models";
import { GetCopyrightsService } from "../../services/copyright/copyright";
import { GetDesignPatentsService } from "../../services/design-patent/design-patent";
import { GetInventionPatentsService } from "../../services/invention-patent/invention-patent";
import { GetTrademarksService } from "../../services/trademark/trademark";

const menuTypes = [
  {
    value: "all",
    label: "ทั้งหมด",
  },
  {
    value: "invention-patent",
    label: "สิทธิบัตรการประดิษฐ์/อนุสิทธิบัตร",
  },
  { value: "design-patent", label: "สิทธิบัตรการออกแบบผลิตภัณฑ์" },
  { value: "copyright", label: "จดแจ้งข้อมูลลิขสิทธ์" },
  { value: "trademark", label: "จดทะเบียนเครื่องหมายการค้า" },
];
function RequestSummary({ user }: { user?: User }) {
  const [totalPage, setTotalPage] = useState(1);
  const [totalRequestForm, setTotalRequestForm] = useState(0);
  const [requests, setRequests] = useState<{
    inventions:
      | (InventionPatent & {
          type: "invention-patent";
          user: User;
          work: WorkInfoOnInventionPatent;
          owners: PartnerInfoOnInventionPatent[];
        })[]
      | [];
    designs:
      | (DesignPatent & {
          type: "design-patent";
          user: User;
          work: WorkInfoOnDesignPatent;
          owners: PartnerInfoOnDesignPatent[];
        })[]
      | [];
    copyrights:
      | (Copyright & {
          type: "copyright";
          user: User;
          work: WorkInfoOnCopyright;
          owners: PartnerInfoOnCopyright[];
        })[]
      | [];
    trademarks:
      | (Trademark & {
          type: "trademark";
          user: User;
          work: { titleTrademark: string };
          owners: PartnerInfoOnTrademark[];
        })[]
      | [];
  }>({
    inventions: [],
    designs: [],
    copyrights: [],
    trademarks: [],
  });
  const [searchField, setSearchField] = useState({
    delay: "",
    actual: "",
  });
  const [page, setPage] = useState(1);
  const [filterType, setFilterType] = useState<
    "invention-patent" | "all" | "design-patent" | "copyright" | "trademark"
  >("all");

  const inventions = useQuery({
    queryKey: ["public-invention", { page: page, search: searchField.actual }],
    queryFn: () =>
      GetInventionPatentsService({
        page: page,
        searchField: searchField.actual,
        limit: 20,
      }),
  });

  const designs = useQuery({
    queryKey: ["public-design", { page: page, search: searchField.actual }],
    queryFn: () =>
      GetDesignPatentsService({
        page: page,
        searchField: searchField.actual,
        limit: 20,
      }),
  });

  const copyrights = useQuery({
    queryKey: ["public-copyright", { page: page, search: searchField.actual }],
    queryFn: () =>
      GetCopyrightsService({
        page: page,
        searchField: searchField.actual,
        limit: 20,
      }),
  });

  const trademarks = useQuery({
    queryKey: ["public-trademark", { page: page, search: searchField.actual }],
    queryFn: () =>
      GetTrademarksService({
        page: page,
        searchField: searchField.actual,
        limit: 20,
      }),
  });

  useEffect(() => {
    inventions.refetch();
    copyrights.refetch();
    designs.refetch();
    trademarks.refetch();
  }, []);

  useEffect(() => {
    if (inventions.data && designs.data && trademarks.data && copyrights.data) {
      const pages = [
        inventions.data.meta.total,
        designs.data.meta.total,
        trademarks.data.meta.total,
        copyrights.data.meta.total,
      ];

      const totalCount = [
        inventions.data.meta.totalCount ?? 0,
        designs.data.meta.totalCount ?? 0,
        trademarks.data.meta.totalCount ?? 0,
        copyrights.data.meta.totalCount ?? 0,
      ];
      console.log(totalCount);

      setTotalRequestForm(() => totalCount.reduce((a, b) => a + b, 0));

      const highestPage = Math.max(...pages);

      setRequests(() => {
        const inventionsState = inventions.data.data.map((invention) => {
          return {
            ...invention,
            type: "invention-patent",
          };
        }) as (InventionPatent & {
          type: "invention-patent";
          user: User;
          work: WorkInfoOnInventionPatent;
          owners: PartnerInfoOnInventionPatent[];
        })[];

        const designsState = designs.data.data.map((design) => {
          return {
            ...design,
            type: "design-patent",
          };
        }) as (DesignPatent & {
          type: "design-patent";
          user: User;
          work: WorkInfoOnDesignPatent;
          owners: PartnerInfoOnDesignPatent[];
        })[];

        const copyrightsState = copyrights.data.data.map((copyright) => {
          return {
            ...copyright,
            type: "copyright",
          };
        }) as (Copyright & {
          type: "copyright";
          user: User;
          work: WorkInfoOnCopyright;
          owners: PartnerInfoOnCopyright[];
        })[];

        const trademarksState = trademarks.data.data.map((trademark) => {
          return {
            ...trademark,
            type: "trademark",
          };
        }) as (Trademark & {
          type: "trademark";
          user: User;
          work: { titleTrademark: string };
          owners: PartnerInfoOnTrademark[];
        })[];

        switch (filterType) {
          case "all":
            setTotalPage(() => highestPage);
            return {
              inventions: inventionsState,
              designs: designsState,
              copyrights: copyrightsState,
              trademarks: trademarksState,
            };

            break;

          case "copyright":
            setTotalPage(() => copyrights.data.meta.total);
            return {
              copyrights: copyrightsState,
              inventions: [],
              designs: [],
              trademarks: [],
            };
            break;

          case "design-patent":
            setTotalPage(() => designs.data.meta.total);
            return {
              copyrights: [],
              inventions: [],
              designs: designsState,
              trademarks: [],
            };
            break;

          case "trademark":
            setTotalPage(() => trademarks.data.meta.total);
            return {
              copyrights: [],
              inventions: [],
              designs: [],
              trademarks: trademarksState,
            };
            break;

          case "invention-patent":
            setTotalPage(() => inventions.data.meta.total);
            return {
              copyrights: [],
              inventions: inventionsState,
              designs: [],
              trademarks: [],
            };
            break;

          default:
            return {
              inventions: [],
              designs: [],
              trademarks: [],
              copyrights: [],
            };
        }
      });
    }
  }, [
    inventions.data,
    designs.data,
    trademarks.data,
    copyrights.data,
    filterType,
  ]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      setSearchField((prev) => {
        return {
          ...prev,
          actual: prev.delay,
        };
      });
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchField]);
  return (
    <>
      <Element
        name="request"
        className="flex w-11/12 justify-center font-Anuphan md:w-7/12"
      >
        <div className="mt-12 flex w-full flex-col items-center gap-8">
          <h1 className="w-full  bg-[var(--secondary-yellow)] px-4 py-2 text-center font-semibold hover:drop-shadow-md md:text-xl">
            ตรวจสอบสถานะคำขอ
          </h1>
          <section
            className="flex w-full flex-col items-center justify-center gap-4 rounded-md 
                border-[1.5px] border-solid border-[#BED6FF] bg-white p-4 text-xs md:gap-8 md:p-12 md:text-base "
          >
            {/* Select */}
            <div className="flex w-full flex-col gap-3 md:flex-row md:gap-10 ">
              <div className="flex w-full items-center  gap-3  md:gap-5 ">
                <label className=" w-20 font-semibold">ประเภท</label>
                <Select
                  defaultValue={menuTypes.find((type) => type.value === "all")}
                  onChange={(e) => {
                    if (e) {
                      setPage(1);
                      setFilterType(
                        () =>
                          e.value as
                            | "invention-patent"
                            | "all"
                            | "design-patent"
                            | "copyright"
                            | "trademark",
                      );
                    }
                  }}
                  options={menuTypes}
                  className="z-20 w-full"
                  placeholder={<div>เลือกประเภท</div>}
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      border: "1.5px solid #BED6FF",
                      padding: "0.25rem 0.3rem",
                      borderRadius: "5px",
                      color: "blue",
                      zIndex: 10,
                    }),
                    singleValue: (provided: any) => ({
                      ...provided,
                      color: "#2166DD",
                      fontWeight: "500",
                    }),
                    placeholder: (defaultStyles) => {
                      return {
                        ...defaultStyles,
                        color: "#2166DD",
                        fontWeight: "500",
                      };
                    },
                  }}
                />
              </div>
            </div>
            {/* Search */}
            <div className="flex w-full items-center justify-center gap-2 md:gap-5">
              <div className="w-20 text-base md:text-xl">
                <LuSearch />
              </div>

              <input
                type="text"
                onChange={(e) => {
                  setSearchField((prev) => {
                    return {
                      ...prev,
                      delay: e.target.value,
                    };
                  });
                  setPage(() => 1);
                }}
                value={searchField.delay}
                placeholder="กรอกชื่อสิ่งประดิษฐ์ เลขที่คำขอ หรือชื่อผู้ประดิษฐ์ผลงาน"
                className="w-full rounded-md border-[1.5px] border-solid border-[#BED6FF] p-3 pl-2 placeholder:font-medium placeholder:text-[#2166DD] 
                  md:p-2 md:pl-10"
              />
            </div>
          </section>
        </div>
      </Element>

      <div className="mt-12 flex w-full flex-col items-center gap-8">
        <div className="flex w-full flex-col items-center justify-center gap-2 bg-white py-5">
          <span>
            จำนวนคำขอทั้งหมด: {totalRequestForm.toLocaleString()} คำขอ
          </span>
          <div className="relative max-h-96 w-11/12 overflow-auto md:w-10/12">
            <table
              className="w-max min-w-full border-separate border-spacing-1 
          rounded-md bg-white  text-center text-[0.7rem]  md:p-4 md:text-base"
            >
              <thead className="">
                <tr className="sticky top-0 z-10 bg-white  p-5 ">
                  <th className=" rounded-md bg-[#BED6FF] p-2">ชื่อผลงาน</th>
                  <th className=" rounded-md bg-[#BED6FF] p-2 ">ประเภทคำขอ</th>
                  <th className=" rounded-md bg-[#BED6FF] p-2">
                    ผู้สร้างสรรค์
                  </th>
                  <th className=" rounded-md bg-[#BED6FF] p-2 ">
                    วันที่ยื่นคำขอ
                  </th>
                  <th className=" rounded-md bg-[#BED6FF] p-2 ">เลขที่คำขอ</th>
                  <th className=" rounded-md bg-[#BED6FF] p-2 ">สถานะคำขอ</th>
                </tr>
              </thead>

              <tbody className="relative">
                {inventions.isLoading ||
                designs.isLoading ||
                trademarks.isLoading ||
                copyrights.isLoading
                  ? [...Array(5)].map((_, index) => (
                      <tr key={index} className="animate-pulse">
                        <td className="h-10 rounded-md border-[1px] border-solid border-[#BED6FF] bg-gray-200 p-2"></td>
                        <td className="h-10 rounded-md border-[1px] border-solid border-[#BED6FF] bg-gray-50 p-2"></td>
                        <td className="h-10 rounded-md border-[1px] border-solid border-[#BED6FF] bg-gray-500 p-2"></td>
                        <td className="h-10 rounded-md border-[1px] border-solid border-[#BED6FF] bg-slate-300 p-2"></td>
                        <td className="h-10 rounded-md border-[1px] border-solid border-[#BED6FF] bg-gray-100 p-2"></td>
                      </tr>
                    ))
                  : Object.values(requests)
                      .flat()
                      .sort((a, b) => b.order - a.order)
                      .map((item) => {
                        let title:
                          | "สิทธิบัตรการประดิษฐ์"
                          | "อนุสิทธิบัตร"
                          | "สิทธิบัตรการออกแบบผลิตภัณฑ์"
                          | "ลิขสิทธิ์"
                          | "เครื่องหมายการค้า" = "สิทธิบัตรการประดิษฐ์";

                        let workTitle = "";
                        switch (item.type) {
                          case "copyright":
                            title = "ลิขสิทธิ์";
                            workTitle = item.work.name ?? "";
                            break;
                          case "invention-patent":
                            if (item.work.type === "INVENTION") {
                              title = "สิทธิบัตรการประดิษฐ์";
                            } else if (item.work.type === "PETTY") {
                              title = "อนุสิทธิบัตร";
                            }
                            workTitle = item.work.thaiName;
                            break;
                          case "design-patent":
                            title = "สิทธิบัตรการออกแบบผลิตภัณฑ์";
                            workTitle = item.work.thaiName;
                            break;
                          case "trademark":
                            title = "เครื่องหมายการค้า";
                            workTitle = item.work.titleTrademark;
                            break;
                        }
                        let url = `/status/${item.type}/${item.id}`;
                        if (user?.role === "ADMIN") {
                          url = `/${item.userType === "INTERNAL" ? "nrru" : "outsider"}/${item.type}/${item.id}`;
                        }

                        return (
                          <tr key={item.id} className="hover:bg-gray-200">
                            <td className="h-10 max-w-96 truncate rounded-md border-[1px] border-solid border-[#BED6FF] p-2 hover:max-w-none">
                              {workTitle}
                            </td>
                            <td className="h-10 rounded-md border-[1px] border-solid border-[#BED6FF] p-2">
                              {title}
                            </td>
                            <td className="h-10 rounded-md border-[1px] border-solid border-[#BED6FF] p-2">
                              <ul className="flex flex-col gap-1">
                                {item.owners.map((owner) => {
                                  return (
                                    <li
                                      key={owner.id}
                                      className="w-full text-left"
                                    >
                                      {owner?.title} {owner?.firstName}{" "}
                                      {owner?.lastName}
                                    </li>
                                  );
                                })}
                              </ul>
                            </td>
                            <td className="h-10 rounded-md border-[1px] border-solid border-[#BED6FF] p-2">
                              {item.requestDate ? (
                                <span>
                                  {new Date(
                                    item.requestDate,
                                  ).toLocaleDateString("th-TH", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  })}
                                </span>
                              ) : (
                                <span className="text-red-600">
                                  ไม่มีพบวันยื่นคำขอ
                                </span>
                              )}
                            </td>
                            <td className="h-10 rounded-md border-[1px] border-solid border-[#BED6FF] p-2">
                              {item.numberRequest ?? (
                                <span className="text-red-600">
                                  ไม่มีหมายเลขคำขอ
                                </span>
                              )}
                            </td>
                            <td>
                              <LinkNextJS
                                className="h-10 rounded-md border-[1px] border-solid border-[#BED6FF] p-2 hover:bg-main-color hover:text-white"
                                href={url}
                              >
                                ตรวจสอบ
                              </LinkNextJS>
                            </td>
                          </tr>
                        );
                      })}
              </tbody>
            </table>
          </div>
        </div>
        <PaginationMUI
          page={page}
          onChange={(e, page) => setPage(page)}
          count={totalPage}
          color="primary"
        />
      </div>
    </>
  );
}

export default RequestSummary;
