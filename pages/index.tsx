import LogoFile from "@/components/LogoFile";
import HomeLayout from "@/layouts/homepageLayout";
import Head from "next/head";
import { PiCertificate } from "react-icons/pi";
import { BsEnvelopePaper } from "react-icons/bs";
import { GiBrain } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { IoBulbOutline } from "react-icons/io5";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination } from "swiper/modules";
import { PiUserCircleFill } from "react-icons/pi";
import { GoGoal } from "react-icons/go";
import { LiaClipboardListSolid } from "react-icons/lia";
import { GrGroup } from "react-icons/gr";
import { FaRegCircleCheck } from "react-icons/fa6";
import LinkNextJS from "next/link";
import { Pagination as PaginationMUI } from "@mui/material";

import {
  Link,
  Button,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
} from "react-scroll";
import moment from "moment";
import RequestSummary from "../components/Tables/requestSummary";
import { useQuery } from "@tanstack/react-query";
import { GetNewsByPageService } from "../services/news/news";
import { useState } from "react";
import NewsCard from "../components/Forms/News/newsCard";
import NewsList from "../components/Tables/newsList";

export default function Home() {
  const [page, setPage] = useState(1);
  const news = useQuery({
    queryKey: ["news", { page: page }],
    queryFn: () =>
      GetNewsByPageService({
        limit: 3,
        page: 1,
        searchField: "",
        type: "news",
      }),
  });
  const knowledges = useQuery({
    queryKey: ["knowledge", { page: page }],
    queryFn: () =>
      GetNewsByPageService({
        limit: 10,
        page: page,
        searchField: "",
        type: "knowledge",
      }),
  });
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <meta
          property="og:title"
          content="งานทรัพย์สินทางปัญญา กองกิจการพิเศษ สำนักงานอธิการบดี
          มหาวิทยาลัยราชภัฏนครราชสีมา NRRU TLO"
        />
        <meta
          property="og:description"
          content="งานทรัพย์สินทางปัญญา กองกิจการพิเศษ สำนักงานอธิการบดี
          มหาวิทยาลัยราชภัฏนครราชสีมา NRRU TLO"
        />
        <meta
          property="og:image"
          content="https://storage.googleapis.com/production-nrru-tlo/public/thumbnail-nrru-tlo-main.png"
        />
        <meta
          property="og:image:secure_url"
          content="https://storage.googleapis.com/production-nrru-tlo/public/thumbnail-nrru-tlo-main.png"
        />
        <meta
          name="twitter:image:src"
          content="https://storage.googleapis.com/production-nrru-tlo/public/thumbnail-nrru-tlo-main.png"
        />
        <meta
          name="description"
          content="งานทรัพย์สินทางปัญญา กองกิจการพิเศษ สำนักงานอธิการบดี
          มหาวิทยาลัยราชภัฏนครราชสีมา NRRU TLO"
        />
        <title>
          งานทรัพย์สินทางปัญญา กองกิจการพิเศษ สำนักงานอธิการบดี
          มหาวิทยาลัยราชภัฏนครราชสีมา
        </title>
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
                  กองกิจการพิเศษ สำนักงานอธิการบดี
                </h1>
              </div>
            </section>

            <section className="mb-8 flex w-[80%] items-start md:mt-10 md:w-[75%]">
              <LinkNextJS
                href="/dashboard"
                className=" bg-[var(--secondary-yellow)] px-3 py-1 text-base font-semibold text-[var(--primary-blue)] duration-300 hover:scale-110 hover:bg-yellow-500 hover:drop-shadow-md md:px-4 md:py-2 md:text-xl"
              >
                เข้าสู้หน้าหลักพื่อยื่นคำขอ
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
                <LinkNextJS
                  href={"/about-us"}
                  className="group flex h-40 w-40 flex-col items-center gap-3 bg-white pt-6 text-center text-xs duration-300 hover:bg-[var(--primary-blue)] hover:drop-shadow-md md:h-52 md:w-52 md:gap-4 md:text-base"
                >
                  <div className="rounded-full bg-[var(--primary-blue)] p-4 text-[2.5rem] text-white duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-[var(--primary-blue)] md:text-[4.6rem]">
                    <FaUserCircle />
                  </div>
                  <p className="text-[0.85rem] duration-300 group-hover:text-[0.95rem] group-hover:text-white md:text-[1.1rem] md:group-hover:text-base">
                    เกี่ยวกับเรา
                  </p>
                </LinkNextJS>
              </button>
            </section>
          </main>

          <RequestSummary />

          {/* ข่าวประชาสัมพันธ์ */}
          <div className="w-full">
            <Element
              name="information"
              className="mt-12 flex w-full flex-col items-center gap-8 md:items-start "
            >
              <h1
                className="z-10 flex w-[85%] items-center justify-center gap-5 bg-[var(--secondary-yellow)]
               px-4 py-2 text-center font-semibold hover:drop-shadow-md md:justify-start md:pl-32 md:text-start md:text-xl"
              >
                <BsEnvelopePaper />
                ข่าวประชาสัมพันธ์
              </h1>

              {/* mobile (swiper) */}
              <div className="w-full bg-[var(--primary-blue)]  ">
                <Swiper
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  slidesPerView={1}
                  pagination={true}
                  modules={[Pagination, Autoplay]}
                  spaceBetween={30}
                >
                  {news.data?.data.map((list, index) => (
                    <SwiperSlide key={index}>
                      <NewsCard news={list} index={index} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </Element>
            <NewsList />
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
                  <div className="flex h-full w-[85%] flex-col items-center justify-center gap-2 text-[0.8rem]   md:w-full md:text-base">
                    {knowledges.data?.data.map((knowledge, index) => {
                      return (
                        <LinkNextJS
                          href={`/news/${knowledge.id}`}
                          key={index}
                          className="h-full w-full  bg-[#10316B] bg-opacity-70 p-5 text-center text-white duration-300 hover:bg-opacity-100"
                        >
                          {knowledge.title}
                        </LinkNextJS>
                      );
                    })}
                    <PaginationMUI
                      className="mt-5"
                      page={page}
                      onChange={(e, page) => setPage(page)}
                      count={knowledges.data?.meta.total ?? 1}
                      color="primary"
                    />
                  </div>
                </div>
              </section>
            </Element>
          </div>
        </div>
      </HomeLayout>
    </>
  );
}
