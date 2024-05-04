import LogoFile from "@/components/LogoFile";
import HomeLayout from "@/layouts/homepageLayout";
import Head from "next/head";
import { PiCertificate } from "react-icons/pi";
import { BsEnvelopePaper } from "react-icons/bs";
import { GiBrain } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { IoBulbOutline } from "react-icons/io5";
import Image from "next/image";
import CardInformation from "@/components/CardInformation";
import { Pagination as PaginationMUI } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { LuSearch } from "react-icons/lu";
import Select from "react-select";
import fakeInformations from "@/data/fakeInformation";
import fakeOptions from "@/data/fakeOptions";
import fakeSearchResult from "@/data/fakeSearchResult";
import { PiUserCircleFill } from "react-icons/pi";
import { GoGoal } from "react-icons/go";
import { LiaClipboardListSolid } from "react-icons/lia";
import { GrGroup } from "react-icons/gr";
import { FaRegCircleCheck } from "react-icons/fa6";
import LinkNextJS from "next/link";
import {
  Link,
  Button,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
} from "react-scroll";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { GetInventionPatentsService } from "../services/invention-patent/invention-patent";
import { GetDesignPatentsService } from "../services/design-patent/design-patent";
import { GetCopyrightsService } from "../services/copyright/copyright";
import { GetTrademarksService } from "../services/trademark/trademark";
import {
  Copyright,
  DesignPatent,
  InventionPatent,
  Trademark,
  User,
} from "../models";
import moment from "moment";

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
] as const;

export default function Home() {
  const [totalPage, setTotalPage] = useState(1);
  const [requests, setRequests] = useState<{
    inventions:
      | (InventionPatent & { type: "invention-patent"; user: User })[]
      | [];
    designs: (DesignPatent & { type: "design-patent"; user: User })[] | [];
    copyrights: (Copyright & { type: "copyright"; user: User })[] | [];
    trademarks: (Trademark & { type: "trademark"; user: User })[] | [];
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
        limit: 3,
      }),
  });

  const designs = useQuery({
    queryKey: ["public-design", { page: page, search: searchField.actual }],
    queryFn: () =>
      GetDesignPatentsService({
        page: page,
        searchField: searchField.actual,
        limit: 3,
      }),
  });

  const copyrights = useQuery({
    queryKey: ["public-copyright", { page: page, search: searchField.actual }],
    queryFn: () =>
      GetCopyrightsService({
        page: page,
        searchField: searchField.actual,
        limit: 3,
      }),
  });

  const trademarks = useQuery({
    queryKey: ["public-trademark", { page: page, search: searchField.actual }],
    queryFn: () =>
      GetTrademarksService({
        page: page,
        searchField: searchField.actual,
        limit: 3,
      }),
  });

  useEffect(() => {
    if (inventions.data && designs.data && trademarks.data && copyrights.data) {
      const pages = [
        inventions.data.meta.total,
        designs.data.meta.total,
        trademarks.data.meta.total,
        copyrights.data.meta.total,
      ];
      const highestPage = Math.max(...pages);

      setRequests(() => {
        const inventionsState = inventions.data.data.map((invention) => {
          return {
            ...invention,
            type: "invention-patent",
          };
        }) as (InventionPatent & { type: "invention-patent"; user: User })[];

        const designsState = designs.data.data.map((design) => {
          return {
            ...design,
            type: "design-patent",
          };
        }) as (DesignPatent & { type: "design-patent"; user: User })[];

        const copyrightsState = copyrights.data.data.map((copyright) => {
          return {
            ...copyright,
            type: "copyright",
          };
        }) as (Copyright & { type: "copyright"; user: User })[];

        const trademarksState = trademarks.data.data.map((trademark) => {
          return {
            ...trademark,
            type: "trademark",
          };
        }) as (Trademark & { type: "trademark"; user: User })[];

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
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <title>หน้าหลัก</title>
      </Head>
      <HomeLayout>
        <div className="flex h-full w-full flex-col items-center bg-[#F4F8FF] pb-10 font-Anuphan text-[var(--primary-blue)] lg:justify-center ">
          {/* Header */}
          <header className="mb-10  flex w-full flex-col items-center justify-start gap-5 bg-[url('/picture/HomeHeader.png')] pt-10 md:h-[27rem] md:pt-20 lg:h-[34.5rem]">
            <section className=" flex w-[80%] flex-col items-start justify-between font-semibold md:w-[75%] md:flex-row-reverse md:items-center ">
              <div className="w-[10rem] md:w-[15rem] lg:w-[20rem]">
                <LogoFile />
              </div>
              <div className="text-white ">
                <h1 className="mt-6 uppercase text-[var(--secondary-yellow)] md:mt-0 md:text-2xl">
                  welcome to
                </h1>
                <h2 className="mt-3 text-2xl md:mt-6 md:text-4xl lg:text-6xl">
                  งานทรัพย์สินทางปัญญา
                </h2>
                <h1 className="mt-3 md:text-2xl">
                  กองพัฒนาพิเศษ สำนักงานอธิการบดี
                </h1>
              </div>
            </section>

            <section className="mb-8 flex w-[80%] items-start md:mt-10 md:w-[75%]">
              <LinkNextJS
                href="/dashboard"
                className=" bg-[var(--secondary-yellow)] px-3 py-1 text-base font-semibold text-[var(--primary-blue)] duration-300 hover:scale-110 hover:bg-yellow-500 hover:drop-shadow-md md:px-4 md:py-2 md:text-xl"
              >
                สำรวจ
              </LinkNextJS>
            </section>
          </header>

          <main className="">
            <section className=" flex flex-col items-center justify-center gap-3">
              <h2 className="text-2xl font-bold md:text-3xl">
                งานทรัพย์สินทางปัญญา
              </h2>
              <h1 className="bg-[var(--secondary-yellow)] px-4 py-2 font-semibold hover:drop-shadow-md md:text-xl">
                มหาวิทยาลัยราชภัฏนครราชสีมา
              </h1>
            </section>

            <section className="mt-8 grid grid-cols-2 items-center justify-center gap-4 font-semibold lg:grid-cols-4 lg:grid-rows-1 lg:gap-3">
              <button className="">
                <Link
                  to="request"
                  smooth={true}
                  offset={10}
                  duration={300}
                  className="group flex h-40 w-40 flex-col items-center gap-3 bg-white pt-6 text-center text-xs duration-300 hover:bg-[var(--primary-blue)] hover:drop-shadow-md md:h-52 md:w-52 md:gap-4 md:text-base"
                >
                  <div className="rounded-full bg-[var(--primary-blue)] p-4 text-[2.5rem] text-white duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-[var(--primary-blue)] md:p-3 md:text-[5rem]">
                    <PiCertificate />
                  </div>
                  <p className="text-[0.85rem] duration-300 group-hover:text-[0.95rem] group-hover:text-white md:text-[1.1rem] md:group-hover:text-base">
                    จดทะเบียน <br></br>ทรัพย์สินทางปัญญา
                  </p>
                </Link>
              </button>

              <button className="group flex h-40 w-40 flex-col items-center gap-3 bg-white pt-0 text-center text-xs duration-300 hover:bg-[var(--primary-blue)] hover:drop-shadow-md md:h-52 md:w-52 md:gap-4 md:text-base">
                <Link
                  to="information"
                  smooth={true}
                  offset={-100}
                  duration={300}
                  className="group flex h-40 w-40 flex-col items-center gap-3 bg-white pt-6 text-center text-xs duration-300 hover:bg-[var(--primary-blue)] hover:drop-shadow-md md:h-52 md:w-52 md:gap-4 md:text-base"
                >
                  <div className="rounded-full bg-[var(--primary-blue)] p-4 text-[2.5rem] text-white duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-[var(--primary-blue)] md:text-[4.6rem]">
                    <BsEnvelopePaper />
                  </div>
                  <p className="text-[0.85rem] duration-300 group-hover:text-[0.95rem] group-hover:text-white md:text-[1.1rem] md:group-hover:text-base">
                    ข่าวประชาสัมพันธ์
                  </p>
                </Link>
              </button>

              <button className="group flex h-40 w-40 flex-col items-center gap-3 bg-white pt-0 text-center text-xs duration-300 hover:bg-[var(--primary-blue)] hover:drop-shadow-md md:h-52 md:w-52 md:gap-4 md:text-base">
                <Link
                  to="knowledge"
                  smooth={true}
                  offset={-100}
                  duration={300}
                  className="group flex h-40 w-40 flex-col items-center gap-3 bg-white pt-6 text-center text-xs duration-300 hover:bg-[var(--primary-blue)] hover:drop-shadow-md md:h-52 md:w-52 md:gap-4 md:text-base"
                >
                  <div className="rounded-full bg-[var(--primary-blue)] p-4 text-[2.5rem] text-white  duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-[var(--primary-blue)] md:p-3 md:text-[5rem]">
                    <GiBrain />
                  </div>
                  <p className="text-[0.85rem] duration-300 group-hover:text-[0.95rem] group-hover:text-white md:text-[1.1rem] md:group-hover:text-base">
                    ความรู้เกี่ยวกับ <br></br>ทรัพย์สินทางปัญญา
                  </p>
                </Link>
              </button>
              <button className="group flex h-40 w-40 flex-col items-center gap-3 bg-white pt-0 text-center text-xs duration-300 hover:bg-[var(--primary-blue)] hover:drop-shadow-md md:h-52 md:w-52 md:gap-4 md:text-base">
                <Link
                  to="aboutUs"
                  smooth={true}
                  offset={-100}
                  duration={300}
                  className="group flex h-40 w-40 flex-col items-center gap-3 bg-white pt-6 text-center text-xs duration-300 hover:bg-[var(--primary-blue)] hover:drop-shadow-md md:h-52 md:w-52 md:gap-4 md:text-base"
                >
                  <div className="rounded-full bg-[var(--primary-blue)] p-4 text-[2.5rem] text-white duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-[var(--primary-blue)] md:text-[4.6rem]">
                    <FaUserCircle />
                  </div>
                  <p className="text-[0.85rem] duration-300 group-hover:text-[0.95rem] group-hover:text-white md:text-[1.1rem] md:group-hover:text-base">
                    เกี่ยวกับเรา
                  </p>
                </Link>
              </button>
            </section>
          </main>
          {/* ตรวจสอบสถานะคำขอ */}
          <Element name="request">
            <div className="mt-12 flex w-full flex-col items-center gap-8">
              <h1 className="w-full  bg-[var(--secondary-yellow)] px-4 py-2 text-center font-semibold hover:drop-shadow-md md:text-xl">
                ตรวจสอบสถานะคำขอ
              </h1>
              <section
                className="flex w-full flex-col items-center justify-center gap-4 rounded-md 
                border-[1.5px] border-solid border-[#BED6FF] bg-white p-4 text-xs md:gap-8 md:p-12 md:text-base "
              >
                {/* Select */}
                <div className="flex w-[90%] flex-col gap-3 md:w-[80%] md:flex-row md:gap-10 ">
                  <div className="flex w-full items-center  gap-3 md:w-[50%] md:gap-5 ">
                    <label className="font-semibold">ประเภท</label>
                    <Select
                      defaultValue={menuTypes.find(
                        (type) => type.value === "all",
                      )}
                      onChange={(e) => {
                        if (e) {
                          setPage(1);
                          setFilterType(() => e.value);
                        }
                      }}
                      options={menuTypes}
                      className="w-72"
                      placeholder={<div>เลือกประเภท</div>}
                      styles={{
                        control: (base, state) => ({
                          ...base,
                          border: "1.5px solid #BED6FF",
                          padding: "0.25rem 0.3rem",
                          borderRadius: "5px",
                          color: "blue",
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
                  <div className="flex w-full items-center gap-5 md:w-[50%]">
                    <label className="font-semibold">ปีงบประมาณ</label>
                    <Select
                      options={fakeOptions}
                      className="w-[15rem]"
                      placeholder={<div>ทั้งหมด</div>}
                      styles={{
                        control: (base, state) => ({
                          ...base,
                          border: "1.5px solid #BED6FF",
                          padding: "0.25rem 0.3rem",
                          borderRadius: "5px",
                          color: "blue",
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
                <div className="flex w-[90%] items-center justify-center gap-2 md:w-[80%] md:gap-5">
                  <div className="text-base md:text-xl">
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
          {/* ข้อมูลการค้นหา */}
          <div className="mt-12 flex w-full flex-col items-center gap-8">
            <div className="max-h-96 w-10/12 overflow-auto">
              <table className="w-max min-w-full border-separate border-spacing-1 rounded-md bg-white p-1 text-center text-[0.7rem] md:border-spacing-2 md:p-4 md:text-base">
                <thead className="">
                  <tr className="sticky top-2">
                    <th className=" rounded-md bg-[#BED6FF] p-2 ">
                      รายชื่อผู้ยื่น
                    </th>
                    <th className=" rounded-md bg-[#BED6FF] p-2 ">
                      วันที่ส่งขอ
                    </th>
                    <th className=" rounded-md bg-[#BED6FF] p-2 ">
                      หมายเลขคำขอ
                    </th>
                    <th className=" rounded-md bg-[#BED6FF] p-2 ">
                      ประเภทคำขอ
                    </th>
                    <th className=" rounded-md bg-[#BED6FF] p-2 ">สถานะคำขอ</th>
                  </tr>
                </thead>

                <tbody>
                  {inventions.isFetching ||
                  designs.isFetching ||
                  trademarks.isFetching ||
                  copyrights.isFetching
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
                        .map((item) => {
                          let title:
                            | "สิทธิบัตรการประดิษฐ์และอนุสิทธิบัตร"
                            | "สิทธิบัตรการออกแบบผลิตภัณฑ์"
                            | "ลิขสิทธิ์"
                            | "เครื่องหมายการค้า";

                          switch (item.type) {
                            case "copyright":
                              title = "ลิขสิทธิ์";
                              break;
                            case "invention-patent":
                              title = "สิทธิบัตรการประดิษฐ์และอนุสิทธิบัตร";
                              break;
                            case "design-patent":
                              title = "สิทธิบัตรการออกแบบผลิตภัณฑ์";
                              break;
                            case "trademark":
                              title = "เครื่องหมายการค้า";
                              break;
                          }

                          return (
                            <tr key={item.id} className="hover:bg-gray-200">
                              <td className="h-10 rounded-md border-[1px] border-solid border-[#BED6FF] p-2">
                                {item.user.title} {item.user.firstName}{" "}
                                {item.user.lastName}
                              </td>
                              <td className="h-10 rounded-md border-[1px] border-solid border-[#BED6FF] p-2">
                                {moment(item.createAt).format(
                                  "DD/MM/YYYY - HH:MM:SS",
                                ) ?? "ไม่มีวันที่ส่งขอ"}
                              </td>
                              <td className="h-10 rounded-md border-[1px] border-solid border-[#BED6FF] p-2">
                                {item.numberRequest ?? "ไม่มีหมายเลขคำขอ"}
                              </td>
                              <td className="h-10 rounded-md border-[1px] border-solid border-[#BED6FF] p-2">
                                {title}
                              </td>
                              <td className="h-10 rounded-md border-[1px] border-solid border-[#BED6FF] p-2 hover:bg-main-color hover:text-white">
                                <LinkNextJS href={`/${item.type}/${item.id}`}>
                                  ตรวจสอบ
                                </LinkNextJS>
                              </td>
                            </tr>
                          );
                        })}
                </tbody>
              </table>
            </div>
            <PaginationMUI
              page={page}
              onChange={(e, page) => setPage(page)}
              count={totalPage}
              color="primary"
            />
          </div>
          {/* ข่าวประชาสัมพันธ์ */}
          <div className="w-full">
            <Element
              name="information"
              className="mt-12 flex w-full flex-col items-center gap-8 md:items-start "
            >
              <h1 className="z-10 flex w-[85%] items-center justify-center gap-5 bg-[var(--secondary-yellow)] px-4 py-2 text-center font-semibold hover:drop-shadow-md md:justify-start md:pl-32 md:text-start md:text-xl">
                <BsEnvelopePaper />
                ข่าวประชาสัมพันธ์
              </h1>

              {/* Desktop */}
              <div className="-mt-10 hidden w-full md:flex md:flex-col">
                {fakeInformations.map((information, index) => (
                  <CardInformation
                    key={index}
                    title={information.title}
                    date={information.date}
                    info={information.info}
                    image={information.image[0]}
                    index={index}
                    slugId={information.slugId}
                  />
                ))}
              </div>
              {/* mobile (swiper) */}
              <div className="w-full bg-[var(--primary-blue)] md:hidden ">
                <Swiper
                  slidesPerView={1}
                  pagination={true}
                  modules={[Pagination]}
                  spaceBetween={30}
                >
                  {fakeInformations.map((information, index) => (
                    <SwiperSlide key={index}>
                      <CardInformation
                        title={information.title}
                        date={information.date}
                        info={information.info}
                        image={information.image[0]}
                        index={index}
                        slugId={information.slugId}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </Element>
          </div>
          {/* ความรู้เกี่ยวกับงานทรัพย์สินทางปัญญา */}
          <div className="flex w-full justify-center gap-4 ">
            <Element
              name="knowledge"
              className="mt-12 flex w-[100%] justify-center gap-4 md:w-[85%] "
            >
              <div className="relative hidden md:flex md:w-96">
                <Image
                  alt="pictor of Knowledge"
                  fill
                  className="object-cover"
                  src={"/picture/knowledge.png"}
                />
              </div>

              <section className="flex w-full flex-col items-center gap-10 font-semibold md:w-[600px]">
                <h2 className="flex w-[85%] items-center justify-center gap-2 bg-[var(--secondary-yellow)] px-4 py-3 text-center font-semibold hover:drop-shadow-md md:w-full md:gap-4 md:text-xl">
                  <IoBulbOutline />
                  ความรู้เกี่ยวกับงานทรัพย์สินทางปัญญา
                </h2>
                <div className="flex  w-full justify-center bg-[url('/knowledge.png')] py-10 md:bg-none md:py-0">
                  <div className="flex h-full w-[85%] flex-col gap-2 text-[0.8rem]  md:w-full md:text-base">
                    <button className="h-full w-full  bg-[#10316B] bg-opacity-70 p-5 text-white duration-300 hover:bg-opacity-100">
                      กฏหมายทรัพย์สินทางปัญญา
                    </button>
                    <button className="h-full w-full  bg-[#10316B] bg-opacity-70 p-5 text-white duration-300 hover:bg-opacity-100">
                      ขั้นตอนการขอความคุ้มครองด้านทรัย์สินทางปัญญา
                    </button>
                    <button className="h-full w-full  bg-[#10316B] bg-opacity-70 p-5 text-white duration-300 hover:bg-opacity-100">
                      ค่าธรรมเนียม
                    </button>
                    <button className="h-full w-full  bg-[#10316B] bg-opacity-70 p-5 text-white duration-300 hover:bg-opacity-100">
                      จำนวนทรัพย์สินทางปัญญา
                    </button>
                  </div>
                </div>
              </section>
            </Element>
          </div>
          {/* เกี่ยวกับเรา */}
          <div className="mt-12 flex w-full flex-col items-center gap-8 bg-[var(--primary-blue)] py-5 md:items-start md:bg-[#F4F8FF] md:py-0">
            <Element
              name="aboutUs"
              className="z-10 flex w-[85%] items-center justify-center gap-5 bg-[var(--secondary-yellow)] px-4 py-2 text-center font-semibold 
         hover:drop-shadow-md md:justify-start md:pl-32 md:text-start md:text-xl"
            >
              <PiUserCircleFill />
              เกี่ยวกับเรา
            </Element>

            {/* Desktop */}
            <div className="-mt-12 hidden min-h-[50rem] w-full bg-[var(--primary-blue)] text-[white] md:flex">
              <div className="relative min-h-full w-[35%] bg-slate-400">
                <Image
                  alt="pictor of aboutUs"
                  fill
                  className="object-cover"
                  src={"/picture/aboutUs.png"}
                />
              </div>
              <section className="z-10 my-16 flex flex-col gap-9">
                {/* วิสัยทัศน์ */}
                <div className="-ml-9 flex items-center gap-5">
                  <div className="flex h-32 w-32 items-center justify-center rounded-full border-[0.5rem] border-solid border-[var(--primary-blue)] bg-[#DDE9FF] text-7xl text-[var(--primary-blue)]">
                    <GoGoal />
                  </div>
                  <div className="flex w-[70%] flex-col justify-center gap-3">
                    <h1 className="text-2xl font-semibold">วิสัยทัศน์</h1>
                    <p>
                      การบริหารจัดการทรัพย์สินทางปัญญา
                      ให้เกิดการจัดการองค์ความรู้
                      และประโยชน์ที่ได้รับจากการจัดการทรัพย์สินทางปัญญา
                    </p>
                  </div>
                </div>

                {/* พันธกิจ */}
                <div className="-ml-9 flex items-center gap-5">
                  <div className="flex h-32 w-32 items-center justify-center rounded-full border-[0.5rem] border-solid border-[var(--primary-blue)] bg-[#ACC9FF] text-7xl text-[var(--primary-blue)]">
                    <LiaClipboardListSolid />
                  </div>
                  <div className="flex w-[70%] flex-col justify-center gap-3">
                    <h1 className="text-2xl font-semibold">พันธกิจ</h1>
                    <ol>
                      <li>1. บริการฝึกอบรมความรู้ทางด้านทรัพย์สินทางปัญญา</li>
                      <li>
                        2. บริการให้คำปรึกษาทางด้านทรัพย์สินทางปัญญา
                        แก่ผู้เข้าร่วมโครงการและชุมชนท้องถิ่น
                      </li>
                      <li>
                        3. บริการให้ความช่วยเหลือด้านทรัพย์สินทางปัญญา
                        ในการดำเนินการต่างๆ ที่เกี่ยวข้องกับงานทรัพย์สินทางปัญญา
                      </li>
                      <li>
                        4.
                        สร้างและพัฒนาเครือข่ายความร่วมมือทางด้านทรัพย์สินทางปัญญา
                      </li>
                      <li>
                        5.
                        สนับสนุนวิจัยเพื่อพัฒนาและต่อยอดงานทรัพย์สินทางปัญญาและจดทะเบียนทรัพย์สินทางปัญญา
                      </li>
                    </ol>
                  </div>
                </div>

                {/* กลุ่มเป้าหมาย */}
                <div className="-ml-9 flex items-center gap-5">
                  <div className="flex h-32 w-32 items-center justify-center rounded-full border-[0.5rem] border-solid border-[var(--primary-blue)] bg-[#82ADFF] text-7xl text-[var(--primary-blue)]">
                    <GrGroup />
                  </div>
                  <div className="flex w-[70%] flex-col justify-center gap-3">
                    <h1 className="text-2xl font-semibold">กลุ่มเป้าหมาย</h1>
                    <ol>
                      <li>1. นักศึกษามหาวิทยาลัยราชภัฏนครราชสีมา</li>
                      <li>
                        2. คณาจารย์/นักวิชาการ ที่มีผลงานวิจัย
                        สามารถนำมาพัฒนาต่อยอดได้
                      </li>
                      <li>3. บัณฑิตของมหาวิทยาลัย</li>
                      <li>
                        4. ผู้ประกอบการในพื้นที่การให้บริการของมหาวิทยาลัย
                      </li>
                    </ol>
                  </div>
                </div>

                {/* บริการของเรา */}
                <div className="-ml-9 flex items-center gap-5">
                  <div className="flex h-32 w-32 items-center justify-center rounded-full border-[0.5rem] border-solid border-[var(--primary-blue)] bg-[#5D95FF] text-7xl text-[var(--primary-blue)]">
                    <FaRegCircleCheck />
                  </div>
                  <div className="flex w-[70%] flex-col justify-center gap-3">
                    <h1 className="text-2xl font-semibold">บริการของเรา</h1>
                    <ol>
                      <li>
                        1.
                        บริการให้คำปรึกษาแนะนำความรู้เกี่ยวกับทรัพย์สินทางปัญญาแก่นักศึกษา
                        คณาจารย์ เจ้าหน้าที่ภายในมหาวิทยาลัยและผู้สนใจทั่วไป
                      </li>
                      <li>
                        2. ช่วยเหลือในการร่างคำขอ
                        ยื่นคำขอและติดตามผลการจดทะเบียนทรัพย์สินทางปัญญา
                      </li>
                      <li>
                        3.
                        ให้ข่าวสารประชาสัมพันธ์และจัดอบรมสัมมนาความรู้เกี่ยวกับทรัพย์สินทางปัญญา
                      </li>
                      <li>
                        4.
                        ส่งเสริมการนำผลงานวิจัยภายในมหาวิทยาลัยไปใช้เชิงพาณิชย์
                        หรือพัฒนาเป็นผลิตภัณฑ์ผ่านการถ่ายทอดเทคโนโลยี
                      </li>
                      <li>5. ประเมินมูลค่าทรัพย์สินทางปัญญา</li>
                      <li>
                        6. ค้นหาธุรกิจใหม่ที่ใช้องค์ความรู้ด้านทรัพย์สินทางปัญญา
                      </li>
                    </ol>
                  </div>
                </div>
              </section>
            </div>

            {/* mobile (swiper) */}
            <div className="min-h-[15rem] w-[85%] bg-[var(--primary-blue)] md:hidden ">
              <Swiper slidesPerView={2} spaceBetween={10} freeMode={true}>
                <SwiperSlide className="">
                  <div className="mr-5 flex h-48 w-36 flex-col items-center justify-center gap-3 bg-white drop-shadow-sm">
                    <h1 className="text-xl font-semibold">วิสัยทัศน์</h1>
                    <div className="text-5xl">
                      <GoGoal />
                    </div>
                    <button className="mt-2 bg-[var(--secondary-yellow)] px-2 py-1 font-semibold">
                      เพิ่มเติม
                    </button>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="">
                  <div className="mr-5 flex h-48 w-36 flex-col items-center justify-center gap-3 bg-white drop-shadow-sm">
                    <h1 className="text-xl font-semibold">พันธกิจ</h1>
                    <div className="text-5xl">
                      <LiaClipboardListSolid />
                    </div>
                    <button className="mt-2 bg-[var(--secondary-yellow)] px-2 py-1 font-semibold">
                      เพิ่มเติม
                    </button>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="">
                  <div className="mr-5 flex h-48 w-36 flex-col items-center justify-center gap-3 bg-white drop-shadow-sm">
                    <h1 className="text-xl font-semibold">กลุ่มเป้าหมาย</h1>
                    <div className="text-5xl">
                      <GrGroup />
                    </div>
                    <button className="mt-2 bg-[var(--secondary-yellow)] px-2 py-1 font-semibold">
                      เพิ่มเติม
                    </button>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="">
                  <div className="mr-5 flex h-48 w-36 flex-col items-center justify-center gap-3 bg-white drop-shadow-sm">
                    <h1 className="text-xl font-semibold">บริการ</h1>
                    <div className="text-5xl">
                      <FaRegCircleCheck />
                    </div>
                    <button className="mt-2 bg-[var(--secondary-yellow)] px-2 py-1 font-semibold">
                      เพิ่มเติม
                    </button>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </HomeLayout>
      ;
    </>
  );
}
