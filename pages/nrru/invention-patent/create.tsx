import HomeLayout from "@/layouts/homepageLayout";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { ErrorMessages, User } from "../../../models";
import Swal from "sweetalert2";
import { CreateInventionPatentService } from "../../../services/invention-patent/invention-patent";
import { useRouter } from "next-nprogress-bar";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { GetUserService } from "../../../services/user";

const Index = ({ user }: { user: User }) => {
  const router = useRouter();
  const handleCreateInvention = async () => {
    try {
      Swal.fire({
        title: "กำลังดำเนินการ",
        text: "กรุณารอสักครู่",
        icon: "info",
        showConfirmButton: false,
        allowOutsideClick: false,
      });
      const create = await CreateInventionPatentService({});
      router.push(
        `/${user.type === "INTERNAL" ? "nrru" : "outsider"}/invention-patent/${create.id}`,
      );
      Swal.fire({
        title: "กำลังเปลี่ยนเส้นทาง",
        text: "กรุณารอสักครู่",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
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
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <title>แบบฟอร์มประกอบคำขอรับสิทธิบัตรการประดิษฐ์/อนุสิทธิบัตร</title>
      </Head>
      <HomeLayout>
        <div className="flex h-full min-h-screen w-full flex-col items-center bg-[#F4F8FF] pb-10 font-Anuphan text-[var(--primary-blue)] lg:justify-center">
          <header className="mt-10 flex w-[90%] flex-col items-center gap-5 md:mt-5 md:w-full">
            <h2 className="text-center text-2xl font-bold md:text-3xl">
              แบบฟอร์มประกอบคำขอรับสิทธิบัตรการประดิษฐ์/อนุสิทธิบัตร
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
                 px-3 py-2 font-semibold drop-shadow-md transition duration-100 hover:bg-main-color hover:text-white active:scale-105
                 "
              >
                ย้อนกลับ
              </Link>

              <button
                onClick={handleCreateInvention}
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
