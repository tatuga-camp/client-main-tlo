import { Pagination } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaPaintbrush, FaTrademark } from "react-icons/fa6";
import { MdLightbulbCircle } from "react-icons/md";
import { PiCertificateBold } from "react-icons/pi";
import Select from "react-select";
import HomeLayout from "../../layouts/homepageLayout";
import {
  Copyright,
  DesignPatent,
  InventionPatent,
  Trademark,
  User,
  WorkInfoOnCopyright,
  WorkInfoOnDesignPatent,
  WorkInfoOnInventionPatent,
} from "../../models";
import { GetCopyrightsByUserIdService } from "../../services/copyright/copyright";
import { GetDesignPatentsByUserIdService } from "../../services/design-patent/design-patent";
import { GetInventionPatentsByUserIdService } from "../../services/invention-patent/invention-patent";
import { GetTrademarksByUserIdService } from "../../services/trademark/trademark";
import { GetUserService } from "../../services/user";
import { LuSearch } from "react-icons/lu";
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
const menuRegister = [
  {
    title: "สิทธิบัตรการประดิษฐ์และอนุสิทธิบัตร",
    icon: PiCertificateBold,
    slut: "invention-patent",
  },
  {
    title: "สิทธิบัตรการออกแบบผลิตภัณฑ์",
    icon: FaPaintbrush,
    slut: "design-patent",
  },
  { title: "ลิขสิทธิ์", icon: MdLightbulbCircle, slut: "copyright" },
  { title: "เครื่องหมายการค้า", icon: FaTrademark, slut: "trademark" },
] as const;
function Index({ user }: { user: User }) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [filterType, setFilterType] = useState<
    "invention-patent" | "all" | "design-patent" | "copyright" | "trademark"
  >("all");
  const [searchField, setSearchField] = useState({
    delay: "",
    actual: "",
  });
  const [requests, setRequests] = useState<{
    inventions:
      | (InventionPatent & { type: "invention-patent" } & {
          work: WorkInfoOnInventionPatent;
        })[]
      | [];
    designs:
      | (DesignPatent & { type: "design-patent" } & {
          work: WorkInfoOnDesignPatent;
        })[]
      | [];
    copyrights:
      | (Copyright & { type: "copyright" } & {
          work: WorkInfoOnCopyright;
        })[]
      | [];
    trademarks:
      | (Trademark & { type: "trademark" } & {
          work: { titleTrademark: string };
        })[]
      | [];
  }>({
    inventions: [],
    designs: [],
    copyrights: [],
    trademarks: [],
  });
  const inventions = useQuery({
    queryKey: ["inventions", { page: page, searchField: searchField.actual }],
    queryFn: () =>
      GetInventionPatentsByUserIdService({
        page: page,
        limit: 10,
        searchField: searchField.actual,
      }),
  });
  const designs = useQuery({
    queryKey: ["designs", { page: page, searchField: searchField.actual }],
    queryFn: () =>
      GetDesignPatentsByUserIdService({
        page: page,
        limit: 10,
        searchField: searchField.actual,
      }),
  });

  const trademarks = useQuery({
    queryKey: ["trademarks", { page: page, searchField: searchField.actual }],
    queryFn: () =>
      GetTrademarksByUserIdService({
        page: page,
        limit: 10,
        searchField: searchField.actual,
      }),
  });

  const copyrights = useQuery({
    queryKey: ["copyrights", { page: page, searchField: searchField.actual }],
    queryFn: () =>
      GetCopyrightsByUserIdService({
        page: page,
        limit: 10,
        searchField: searchField.actual,
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
      const highestPage = Math.max(...pages);
      setTotalPage(() => highestPage);
      setRequests(() => {
        const inventionsState = inventions.data.data.map((invention) => {
          return {
            ...invention,
            type: "invention-patent",
          };
        }) as (InventionPatent & {
          type: "invention-patent";
          work: WorkInfoOnInventionPatent;
        })[];

        const designsState = designs.data.data.map((design) => {
          return {
            ...design,
            type: "design-patent",
          };
        }) as (DesignPatent & {
          type: "design-patent";
          work: WorkInfoOnDesignPatent;
        })[];

        const copyrightsState = copyrights.data.data.map((copyright) => {
          return {
            ...copyright,
            type: "copyright",
          };
        }) as (Copyright & {
          type: "copyright";
          work: WorkInfoOnCopyright;
        })[];

        const trademarksState = trademarks.data.data.map((trademark) => {
          return {
            ...trademark,
            type: "trademark",
          };
        }) as (Trademark & {
          type: "trademark";
          work: { titleTrademark: string };
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
    <HomeLayout>
      <Head>
        <title>หน้าหลัก</title>
      </Head>
      <div className="flex min-h-screen  flex-col items-center bg-background-color pb-5 font-Anuphan">
        <header className="mt-5 flex w-11/12 items-center justify-center gap-1 pb-5 lg:w-10/12">
          <section className="flex w-full flex-col gap-2">
            <h1 className=" break-words text-xl font-semibold text-main-color lg:text-5xl">
              ระบบการจดทะเบียน
              <br />
              ทรัพย์สินทางปัญญาทางอิเล็กทรอนิกส์
            </h1>
            <div
              className="flex w-11/12 justify-between bg-second-color  
              px-2 py-1 text-base font-semibold text-main-color drop-shadow-md lg:w-10/12
           lg:text-2xl"
            >
              เลือกประเภทการจดทะเบียน
            </div>
          </section>

          <div className="relative hidden h-80 w-80 md:block">
            <Image
              alt="dashboard TLO"
              src="/picture/authBlob.png"
              fill
              className="object-contain"
            />
          </div>
        </header>
        <ul className="grid w-11/12 grid-cols-2 gap-5 md:h-40 md:w-10/12 md:grid-cols-4">
          {menuRegister.map((menu) => (
            <Link
              href={`${user.type === "INTERNAL" ? "nrru" : "outsider"}/${menu.slut}/create`}
              key={menu.title}
              className="flex  h-40 flex-col items-center justify-center gap-2
                bg-main-color text-white transition duration-100 hover:bg-second-color
                 hover:text-black active:scale-105"
            >
              <menu.icon className="text-3xl md:text-6xl" />
              <span className="w-8/12 break-words text-center text-sm font-semibold md:text-lg">
                {menu.title}
              </span>
            </Link>
          ))}
        </ul>
        <main className="mt-20 flex w-11/12 flex-col gap-5 md:w-10/12">
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
                    defaultValue={menuTypes.find(
                      (type) => type.value === "all",
                    )}
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
          <div
            className="w-fulljustify-between flex bg-second-color px-2 py-1 text-2xl font-semibold text-main-color
           drop-shadow-md"
          >
            รายงานผลการยื่นคำขอจดทะเบียน
          </div>

          <div className="relative max-h-[40rem] w-full overflow-auto">
            <table
              className="w-max min-w-full  border-separate border-spacing-1 rounded-md border
             border-gray-400 bg-white p-1 text-center text-[0.7rem] 
              md:border-spacing-2 md:p-4 md:text-base"
            >
              <thead className="">
                <tr className="sticky top-2 bg-white">
                  <th className=" rounded-md bg-[#BED6FF] p-2 ">
                    ลำดับหมายเลข
                  </th>
                  <th className=" rounded-md bg-[#BED6FF] p-2 ">วันยื่นคำขอ</th>
                  <th className=" rounded-md bg-[#BED6FF] p-2 ">ชื่อผลงาน</th>
                  <th className=" rounded-md bg-[#BED6FF] p-2 ">ประเภทคำขอ</th>
                  <th className=" rounded-md bg-[#BED6FF] p-2 ">สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(requests)
                  .flat()
                  .sort((a, b) => b.order - a.order)
                  .map((item) => {
                    let title:
                      | "สิทธิบัตรการประดิษฐ์"
                      | "อนุสิทธิบัตร"
                      | "สิทธิบัตรการออกแบบผลิตภัณฑ์"
                      | "ลิขสิทธิ์"
                      | "เครื่องหมายการค้า" = "สิทธิบัตรการประดิษฐ์";
                    let workName: string = "ไม่พบชื่อผลงาน";
                    switch (item.type) {
                      case "copyright":
                        title = "ลิขสิทธิ์";
                        workName = item.work?.name ?? "ไม่พบชื่อผลงาน";
                        break;
                      case "invention-patent":
                        workName = item.work?.thaiName ?? "ไม่พบชื่อผลงาน";
                        if (item.work?.type === "INVENTION") {
                          title = "สิทธิบัตรการประดิษฐ์";
                        } else if (item.work?.type === "PETTY") {
                          title = "อนุสิทธิบัตร";
                        }
                        break;
                      case "design-patent":
                        workName = item.work?.thaiName ?? "ไม่พบชื่อผลงาน";
                        title = "สิทธิบัตรการออกแบบผลิตภัณฑ์";
                        break;
                      case "trademark":
                        workName = item?.titleTrademark ?? "ไม่พบชื่อผลงาน";
                        title = "เครื่องหมายการค้า";
                        break;
                    }

                    return (
                      <tr key={item.id} className="hover:bg-gray-200">
                        <td className="rounded-md border-[1px] border-solid border-[#BED6FF] p-2">
                          {item.order}
                        </td>
                        <td className="rounded-md border-[1px] border-solid border-[#BED6FF] p-2">
                          {item.requestDate
                            ? moment(item.requestDate).format("DD/MM/YYYY")
                            : "ไม่มีพบวันยื่นคำขอ"}
                        </td>
                        <td className="">
                          <div
                            className="min-w-full max-w-96 truncate rounded-md border-[1px]
                           border-solid border-[#BED6FF] p-2 hover:max-w-none"
                          >
                            {workName}
                          </div>
                        </td>
                        <td className="rounded-md border-[1px] border-solid border-[#BED6FF] p-2">
                          {title}
                        </td>
                        <td>
                          {item.isComplete === true ? (
                            <Link
                              className={`rounded-md border-[1px] border-solid border-[#BED6FF] ${
                                item.isComplete === true
                                  ? "bg-white"
                                  : "bg-red-500 text-white"
                              }  p-2 hover:bg-main-color hover:text-white`}
                              href={`${user.type === "INTERNAL" ? "nrru" : "outsider"}/${item.type}/${item.id}`}
                            >
                              ตรวจสอบ
                            </Link>
                          ) : (
                            <Link
                              className={`rounded-md border-[1px] border-solid border-[#BED6FF] ${
                                item.isComplete === false
                                  ? "bg-red-500 text-white"
                                  : "bg-white"
                              }  p-2 hover:bg-main-color hover:text-white`}
                              href={`${user.type === "INTERNAL" ? "nrru" : "outsider"}/${item.type}/${item.id}`}
                            >
                              ไม่สมบูรณ์ กรอกข้อมูลไม่ครบ
                            </Link>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className=" flex w-full justify-center">
            <Pagination
              onChange={(e, page) => setPage(page)}
              count={totalPage}
              color="primary"
            />
          </div>
        </main>
      </div>
    </HomeLayout>
  );
}

export default Index;
export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext,
) => {
  try {
    const user = await GetUserService({
      type: "SERVER-SIDE",
      context: ctx,
    });
    return {
      props: {
        user,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        destination: "/auth/sign-in",
        permanent: false,
      },
    };
  }
};
