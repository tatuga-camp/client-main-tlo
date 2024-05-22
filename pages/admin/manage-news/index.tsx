import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React, { useState } from "react";
import { GetUserService } from "../../../services/user";
import AdminLayout from "../../../layouts/adminLayout";
import Head from "next/head";
import { IoIosCloseCircle } from "react-icons/io";
import { Switch } from "@mui/material";
import { GoPencil } from "react-icons/go";
import fakeInformations from "@/data/fakeInformation";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const label = { inputProps: { "aria-label": "Switch demo" } };
function ManageNews() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <title>ข่าวประชาสัมพันธ์</title>
      </Head>
      <AdminLayout>
        <div className="flex h-full w-full flex-col items-center bg-[#F4F8FF] pb-10 font-Anuphan text-[var(--primary-blue)] lg:justify-center">
          <header className="flex w-full flex-col items-center gap-10">
            <div className="mt-16 w-[70%] bg-[var(--secondary-yellow)] p-2 text-center font-semibold ">
              ข่าวประชาสัมพันธ์
            </div>
            <button className="w-[50%] rounded-md bg-[#BED6FF] p-2 font-semibold drop-shadow-md ">
              สร้างโพสต์ใหม่
            </button>
          </header>
          <main className="mt-5 flex w-full flex-col items-center">
            <section className="mt-10 flex w-[70%] flex-col gap-2 ">
              <h1 className="mb-5 font-semibold">ฉบับร่าง</h1>
              <div className="flex items-center justify-between rounded-md border-[1px] border-solid bg-white p-6">
                <span className="text-xs font-semibold text-[#4680e399] underline md:text-base ">
                  โครงการอบรมเรื่องสิทธิ์ของผู้สร้างสรรค์ในงานอันมีลิขสิทธิ์...
                </span>
                <button className="text-2xl text-red-500">
                  <IoIosCloseCircle />
                </button>
              </div>
              <div className="flex items-center justify-between rounded-md border-[1px] border-solid bg-white p-6">
                <span className="text-xs font-semibold text-[#4680e399] underline md:text-base ">
                  การจัดทำคำขอสิ่งบ่งชี้ทางภูมิศาสตร์ สินค้าผ้าไหมปักธงชัย
                </span>
                <button className="text-2xl text-red-500">
                  <IoIosCloseCircle />
                </button>
              </div>
            </section>

            <section className="mt-10 flex w-[70%] flex-col gap-2  ">
              <h1 className="mb-5 font-semibold">ที่เผยแพร่แล้ว</h1>
              <div className="flex flex-col items-center justify-between rounded-md border-[1px] border-solid bg-white p-6 py-8">
                <section className="flex  w-[95%] flex-col justify-between md:flex-row md:items-center">
                  <div className="flex items-center gap-5">
                    {" "}
                    <Switch {...label} defaultChecked />
                    <label className="font-semibold">เผยแพร่</label>
                  </div>
                  <div className=" ml-2 mt-5 flex flex-col gap-2 font-semibold text-[#6e98e199] md:ml-0 md:mt-0 md:flex-row md:items-center md:gap-5">
                    <button className="flex items-center gap-2 duration-200 hover:text-[#5372a7]">
                      <div className="text-xl">
                        <GoPencil />
                      </div>
                      <p>แก้ไขโพสต์</p>
                    </button>
                    <button className="flex items-center gap-2 duration-200 hover:text-[#5372a7]">
                      <div className="text-xl">
                        <IoIosCloseCircle />
                      </div>

                      <p>ลบโพสต์</p>
                    </button>
                  </div>
                </section>
                <div className="flex w-[90%] flex-col gap-3 ">
                  <h1 className="mt-10 text-start font-bold md:text-xl ">
                    {fakeInformations[1].title}
                  </h1>
                  <p className="text-xs md:text-base">
                    {fakeInformations[1].date}
                  </p>
                  <p className="text-xs font-medium md:text-base">
                    By Thitiworada Hanthae{" "}
                  </p>
                </div>
                <div className="my-5 flex w-full justify-center md:my-10 ">
                  <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    modules={[Navigation]}
                    navigation={true}
                    className=" w-[90%]  md:w-[80%]"
                  >
                    {fakeInformations[1].image.map((image, index) => (
                      <SwiperSlide key={index}>
                        <div className=" flex h-[10rem] justify-center   md:h-[23rem] md:w-full">
                          <div className="relative h-full w-[35rem] ">
                            <Image
                              src={image}
                              fill
                              className="overflow-hidden object-cover"
                              alt={`Image ${index + 1}`}
                            />
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <p className="mb-10 w-[90%] text-xs md:text-base">
                  {fakeInformations[1].discription}
                </p>
              </div>
            </section>
          </main>
        </div>
      </AdminLayout>
    </>
  );
}

export default ManageNews;
export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext,
) => {
  try {
    const userServer = await GetUserService({
      type: "SERVER-SIDE",
      context: ctx,
    });
    if (userServer.role !== "ADMIN") {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    return {
      props: {
        userServer,
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
