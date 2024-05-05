import React, { useEffect, useState } from "react";
import HomeLayout from "../../layouts/homepageLayout";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { GetUserService } from "../../services/user";
import {
  Copyright,
  DesignPatent,
  InventionPatent,
  Trademark,
  User,
} from "../../models";
import Image from "next/image";
import Head from "next/head";
import { PiCertificateBold } from "react-icons/pi";
import { FaPaintbrush, FaTrademark } from "react-icons/fa6";
import { MdLightbulbCircle } from "react-icons/md";
import Link from "next/link";
import fakeSearchResult from "../../data/fakeSearchResult";
import { Input, SearchField } from "react-aria-components";
import { IoSearchCircleSharp } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { Pagination } from "@mui/material";
import { GetInventionPatentsByUserIdService } from "../../services/invention-patent/invention-patent";
import { GetDesignPatentsByUserIdService } from "../../services/design-patent/design-patent";
import { GetCopyrightsByUserIdService } from "../../services/copyright/copyright";
import { GetTrademarksByUserIdService } from "../../services/trademark/trademark";
import moment from "moment";

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
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [requests, setRequests] = useState<{
    inventions: (InventionPatent & { type: "invention-patent" })[] | [];
    designs: (DesignPatent & { type: "design-patent" })[] | [];
    copyrights: (Copyright & { type: "copyrights" })[] | [];
    trademarks: (Trademark & { type: "trademarks" })[] | [];
  }>({
    inventions: [],
    designs: [],
    copyrights: [],
    trademarks: [],
  });
  const inventions = useQuery({
    queryKey: ["inventions", { page: page }],
    queryFn: () =>
      GetInventionPatentsByUserIdService({
        page: page,
        limit: 5,
      }),
  });
  const designs = useQuery({
    queryKey: ["designs", { page: page }],
    queryFn: () =>
      GetDesignPatentsByUserIdService({
        page: page,
        limit: 5,
      }),
  });

  const trademarks = useQuery({
    queryKey: ["trademarks", { page: page }],
    queryFn: () =>
      GetTrademarksByUserIdService({
        page: page,
        limit: 5,
      }),
  });

  const copyrights = useQuery({
    queryKey: ["copyrights", { page: page }],
    queryFn: () =>
      GetCopyrightsByUserIdService({
        page: page,
        limit: 5,
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
      setTotalPage(() => highestPage);
      setRequests(() => {
        return {
          inventions: inventions.data.data.map((invention) => {
            return {
              ...invention,
              type: "invention-patent",
            };
          }) as (InventionPatent & { type: "invention-patent" })[],
          designs: designs.data.data.map((design) => {
            return {
              ...design,
              type: "design-patent",
            };
          }) as (DesignPatent & { type: "design-patent" })[],
          copyrights: copyrights.data.data.map((copyright) => {
            return {
              ...copyright,
              type: "copyrights",
            };
          }) as (Copyright & { type: "copyrights" })[],
          trademarks: trademarks.data.data.map((trademark) => {
            return {
              ...trademark,
              type: "trademarks",
            };
          }) as (Trademark & { type: "trademarks" })[],
        };
      });
    }
  }, [inventions.data, designs.data, trademarks.data, copyrights.data]);

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
          <div
            className="w-fulljustify-between flex bg-second-color px-2 py-1 text-2xl font-semibold text-main-color
           drop-shadow-md"
          >
            รายงานผลคำขอจดทะเบียน
          </div>

          <div className="relative max-h-96 w-full overflow-auto md:max-h-max">
            <table
              className="w-max   border-separate border-spacing-1 rounded-md border
             border-gray-400 bg-white p-1 text-center text-[0.7rem] md:w-full md:border-spacing-2 md:p-4 md:text-base"
            >
              <thead className="">
                <tr className="sticky top-2 bg-white">
                  <th className=" rounded-md bg-[#BED6FF] p-2 ">วันที่ส่งขอ</th>
                  <th className=" rounded-md bg-[#BED6FF] p-2 ">หมายเลขคำขอ</th>
                  <th className=" rounded-md bg-[#BED6FF] p-2 ">ประเภทคำขอ</th>
                  <th className=" rounded-md bg-[#BED6FF] p-2 ">สถานะคำขอ</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(requests)
                  .flat()
                  .map((item) => {
                    let title:
                      | "สิทธิบัตรการประดิษฐ์และอนุสิทธิบัตร"
                      | "สิทธิบัตรการออกแบบผลิตภัณฑ์"
                      | "ลิขสิทธิ์"
                      | "เครื่องหมายการค้า";

                    switch (item.type) {
                      case "copyrights":
                        title = "ลิขสิทธิ์";
                        break;
                      case "invention-patent":
                        title = "สิทธิบัตรการประดิษฐ์และอนุสิทธิบัตร";
                        break;
                      case "design-patent":
                        title = "สิทธิบัตรการออกแบบผลิตภัณฑ์";
                        break;
                      case "trademarks":
                        title = "เครื่องหมายการค้า";
                        break;
                    }

                    return (
                      <tr key={item.id} className="hover:bg-gray-200">
                        <td className="rounded-md border-[1px] border-solid border-[#BED6FF] p-2">
                          {moment(item.createAt).format(
                            "DD/MM/YYYY - HH:MM:SS",
                          ) ?? "ไม่มีวันที่ส่งขอ"}
                        </td>
                        <td className="rounded-md border-[1px] border-solid border-[#BED6FF] p-2">
                          {item.numberRequest ?? "ไม่มีหมายเลขคำขอ"}
                        </td>
                        <td className="rounded-md border-[1px] border-solid border-[#BED6FF] p-2">
                          {title}
                        </td>
                        <td className="rounded-md border-[1px] border-solid border-[#BED6FF] bg-white p-2 hover:bg-main-color hover:text-white">
                          <Link
                            href={`${user.type === "INTERNAL" ? "nrru" : "outsider"}/${item.type}/${item.id}`}
                          >
                            ตรวจสอบ
                          </Link>
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
