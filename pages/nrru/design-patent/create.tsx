import HomeLayout from "@/layouts/homepageLayout";
import Head from "next/head";
import React, { useState } from "react";
import { nrruDesignnSection } from "../../../data/PatentSection";

import Link from "next/link";

const Index = () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <title>แบบฟอร์มประกอบคำขอรับสิทธิบัตรการออกแบบผลิตภัณฑ์</title>
      </Head>
      <HomeLayout>
        <div className="flex h-full min-h-screen w-full flex-col items-center bg-[#F4F8FF] pb-10 font-Anuphan text-[var(--primary-blue)] lg:justify-center">
          <header className="mt-10 flex w-[90%] flex-col items-center gap-5 md:mt-5 md:w-full">
            <h2 className="text-center text-2xl font-bold md:text-3xl">
              แบบฟอร์มประกอบคำขอรับสิทธิบัตรการออกแบบผลิตภัณฑ์
            </h2>
            <section className="max-w-[32rem] bg-[var(--secondary-yellow)] p-3 text-center text-base font-bold shadow-md md:text-xl">
              <p>สำหรับบุคลากรมหาวิทยาลัยราชภัฏนครราชสีมา</p>
            </section>
          </header>
          <main className="mt-5 flex w-full flex-col items-center">
            <section className=" my-5 flex items-center justify-center gap-3">
              <Link
                href="/dashboard"
                className="w-24 rounded-md border-2 border-solid border-[var(--primary-blue)]
                 px-3 py-2 text-center font-semibold drop-shadow-md transition duration-100 hover:bg-main-color hover:text-white active:scale-105
                 "
              >
                ย้อนกลับ
              </Link>

              <button
                className="w-max rounded-md border-2 border-solid border-[var(--primary-blue)]
                 px-3 py-2 font-semibold drop-shadow-md transition duration-100 hover:bg-main-color hover:text-white active:scale-105
                 "
              >
                ดำเนินการต่อ
              </button>
            </section>
          </main>
        </div>
      </HomeLayout>
    </>
  );
};

export default Index;
