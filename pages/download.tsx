import React, { useEffect, useState } from "react";
import HomeLayout from "../layouts/homepageLayout";
import Head from "next/head";
import { LiaClipboardListSolid } from "react-icons/lia";
import { GrFormView, GrGroup } from "react-icons/gr";
import { GoGoal, GoHistory } from "react-icons/go";
import Image from "next/image";
import { PiUserCircleFill } from "react-icons/pi";
import { FaDownLong, FaRegCircleCheck, FaUpLong } from "react-icons/fa6";
import { FiDelete, FiSave, FiUploadCloud } from "react-icons/fi";
import { Button, FileTrigger } from "react-aria-components";
import { ErrorMessages, FileType, User } from "../models";
import Swal from "sweetalert2";
import {
  CreateFileService,
  DeleteFileService,
  GetFileService,
} from "../services/files";
import { useQuery } from "@tanstack/react-query";
import {
  GetSignURLService,
  UploadSignURLService,
} from "../services/google-storage";
import { BsFileEarmarkCode, BsPeople } from "react-icons/bs";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { GetUserService } from "../services/user";
import { MdDelete } from "react-icons/md";
import CreateDownload from "../components/Forms/createDownload";

function Index({ user }: { user: User | null }) {
  const [triggerCreateDownload, setTriggerCreateDownload] = useState(false);
  const filesDocuments = useQuery({
    queryKey: ["files-document"],
    queryFn: () =>
      GetFileService({
        fileType: "DOCUMENT",
      }).then((res) => {
        return Object.entries(
          Object.groupBy(res, (item) => item?.title ?? "no-title"),
        ).map(([title, items]) => ({
          title,
          description: items?.[0].description,
          items,
        }));
      }),
  });

  const handleDeleteFile = async ({
    fileId,
  }: {
    url: string;
    fileId: string;
  }) => {
    const replacedText = "ยืนยันการลบข้อมูล";
    let content = document.createElement("div");
    content.innerHTML =
      "<div>กรุณาพิมพ์คำด้านล่าง </div> <strong>" +
      replacedText +
      "</strong> <div>เพื่อเป็นการยืนยันในการลบข้อมูล</div>";
    const { value } = await Swal.fire({
      title: "ยืนยันการลบข้อมูล",
      input: "text",
      footer: "ไฟล์ภาพจะถูกลบออกและไม่สามารถกู้คืนได้",
      html: content,
      showCancelButton: true,
      inputValidator: (value) => {
        if (value !== replacedText) {
          return "คำที่พิมพ์ไม่ตรงกับคำที่ต้องการลบ กรุณาลองใหม่อีกครั้ง";
        }
      },
    });
    if (value) {
      try {
        Swal.fire({
          title: "กำลังดำเนินการลบข้อมูล",
          html: "กรุณารอสักครู่",
          allowEscapeKey: false,
          allowOutsideClick: false,
          didClose: () => {
            Swal.showLoading();
          },
        });

        await DeleteFileService({
          fileId: fileId,
        });
        await filesDocuments.refetch();
        Swal.fire({
          title: "ลบข้อมูลสำเร็จ",
          icon: "success",
          timer: 1500,
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
    }
  };

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
          content="งานทรัพย์สินทางปัญญา  กองกิจการพิเศษ สำนักงานอธิการบดี
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
          content="ดาวโหลดเอกสาร | งานทรัพย์สินทางปัญญา กองกิจการพิเศษ สำนักงานอธิการบดี"
        />
        <title>
          ดาวโหลดเอกสาร | งานทรัพย์สินทางปัญญา กองกิจการพิเศษ สำนักงานอธิการบดี
        </title>
      </Head>
      <HomeLayout>
        {triggerCreateDownload && (
          <CreateDownload
            filesDocuments={filesDocuments}
            setTrigger={setTriggerCreateDownload}
          />
        )}
        {/* Header */}
        <header
          className=" flex   w-full flex-col items-center justify-center 
    gap-5 bg-[url('/picture/HomeHeader.png')] bg-cover bg-center text-white md:h-[27rem] lg:h-[34.5rem]"
        >
          <div className="flex w-8/12 flex-col gap-5 text-center">
            <h1 className=" uppercase  text-[var(--secondary-yellow)]  md:text-2xl lg:text-4xl">
              ดาวโหลดเอกสาร
            </h1>
            <h2 className="text-lg">
              ดาวโหลดเอกสารที่เกี่ยวข้องกับงานทรัพย์สินทางปัญญา
            </h2>
          </div>
        </header>
        <main className="font-Anuphan text-[var(--primary-blue)]">
          <div
            className="flex w-full flex-col items-center justify-center gap-8 bg-[var(--primary-blue)] py-12
          md:items-start md:bg-[#F4F8FF] md:py-12"
          >
            <div
              className="z-10 flex w-full items-center  justify-center gap-5 bg-[var(--secondary-yellow)] 
              px-4 py-2 text-center font-semibold hover:drop-shadow-md 
         md:w-[85%] md:justify-between md:pl-32 md:text-start md:text-xl"
            >
              <div className="flex items-center gap-2">
                <FaDownLong />
                ดาวโหลดเอกสาร
              </div>
            </div>
            <section className=" flex h-full w-full flex-col items-center justify-center gap-3">
              {user?.role === "ADMIN" && (
                <Button
                  onPress={() => {
                    setTriggerCreateDownload(true);
                    document.body.style.overflow = "hidden";
                  }}
                  className="btn-download"
                >
                  <FiUploadCloud /> อัพโหลด ไฟล์
                </Button>
              )}
              <section className="grid w-80 gap-5 p-2 md:w-10/12">
                {filesDocuments?.data?.map((file) => {
                  return (
                    <div className="flex w-full flex-col items-start gap-2">
                      <span className="w-max max-w-80 truncate text-base font-bold text-white md:w-full md:text-main-color ">
                        {file.title}
                      </span>
                      <span className="w-full text-sm text-white  md:text-main-color ">
                        {file.description}
                      </span>

                      <div className="grid w-full gap-2 border border-gray-200 bg-gray-200  p-2">
                        {file.items?.map((item) => {
                          const fileName = item?.url?.split("/").pop();
                          return (
                            <div
                              key={item?.url}
                              className="flex h-10 w-full items-center justify-between gap-5 rounded-md 
                          border-[1px] border-solid border-[#cbdbf9] bg-white p-2 "
                            >
                              <div className="flex justify-center gap-1">
                                <div className="flex items-center justify-center text-black">
                                  <BsFileEarmarkCode />
                                </div>
                                <span className="w-48 truncate text-sm md:w-full ">
                                  {fileName}
                                </span>
                              </div>
                              <div className="flex gap-2">
                                <div
                                  onClick={() =>
                                    window.open(item?.url, "_blank")
                                  }
                                  className=" z-10 flex cursor-pointer items-center justify-center
                               gap-2 rounded-md bg-green-500 p-1  text-xl text-white"
                                >
                                  <GrFormView />
                                </div>
                                {user?.role === "ADMIN" && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleDeleteFile({
                                        url: item?.url,
                                        fileId: item?.id,
                                      })
                                    }
                                    className=" z-10 flex cursor-pointer 
     items-center justify-center gap-2 rounded-md bg-red-500 p-1  text-xl text-white"
                                  >
                                    <MdDelete />
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </section>
            </section>
          </div>
        </main>
      </HomeLayout>
      ;
    </>
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
      props: {
        user: null,
      },
    };
  }
};
