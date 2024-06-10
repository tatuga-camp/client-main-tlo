import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React, { useRef, useState } from "react";
import { GetUserService } from "../../../services/user";
import AdminLayout from "../../../layouts/adminLayout";
import Head from "next/head";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import UpdateNews from "../../../components/Forms/News/updateNews";

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
          </header>
          <main className="mt-5 flex w-full flex-col items-center ">
            <UpdateNews />
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
