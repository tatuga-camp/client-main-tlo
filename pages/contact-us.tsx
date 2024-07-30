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
import LogoFile from "../components/LogoFile";

function Index({ user }: { user: User | null }) {
  const [files, setFiles] = useState<
    {
      id?: string;
      url: string;
      fileType: FileType;
      type?: string;
      file?: File;
    }[]
  >([]);

  const filesDocuments = useQuery({
    queryKey: ["files-document"],
    queryFn: () =>
      GetFileService({
        fileType: "DOCUMENT",
      }),
  });

  useEffect(() => {
    if (filesDocuments.data) {
      setFiles(() => [...filesDocuments.data]);
    }
  }, [filesDocuments.data]);

  const handleDeleteFile = async ({
    url,
    fileId,
  }: {
    url: string;
    fileId?: string;
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

        if (fileId) {
          await DeleteFileService({
            fileId: fileId,
          });
          setFiles((prev) => {
            return [...prev?.filter((file) => file.url !== url)];
          });
          await filesDocuments.refetch();
        } else {
          setFiles((prev) => {
            return [...prev?.filter((file) => file.url !== url)];
          });
        }
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

  const handleUploadFile = async () => {
    try {
      Swal.fire({
        title: "กำลังดำเนินการอัพโหลดไฟล์",
        html: "กรุณารอสักครู่",
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      const filterFiles = files?.filter((file) => !file.id);
      if (filterFiles) {
        for (const file of filterFiles) {
          const getSignURL = await GetSignURLService({
            fileName: file.file?.name as string,
            fileType: file.file?.type as string,
          });

          await UploadSignURLService({
            contentType: file.file?.type as string,
            file: file.file as File,
            signURL: getSignURL.signURL,
          });

          await CreateFileService({
            type: file.file?.type as string,
            url: getSignURL.originalURL,
            fileType: file.fileType,
            size: file.file?.size as number,
          });
        }
      }
      await filesDocuments.refetch();
      Swal.fire({
        title: "อัพโหลดไฟล์สำเร็จ",
        icon: "success",
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
        {/* Header */}
        <header
          className=" flex   w-full flex-col items-center justify-center 
    gap-5 bg-[url('/picture/HomeHeader.png')] bg-cover bg-center text-white md:h-[27rem] lg:h-[34.5rem]"
        >
          <div className="flex w-8/12 flex-col gap-5 text-center">
            <h1 className=" uppercase  text-[var(--secondary-yellow)]  md:text-2xl lg:text-4xl">
              ติดต่อเรา
            </h1>
            <h2 className="text-lg">
              ติดต่อ งานทรัพย์สินทางปัญญา กองกิจการพิเศษ สำนักงานอธิการบดี
              มหาวิทยาลัยราชภัฏนครราชสีมา
            </h2>
          </div>
        </header>
        <main className="flex items-center justify-center font-Anuphan text-[var(--primary-blue)]">
          <p className="w-11/12 p-5 text-center text-lg font-semibold md:w-8/12 ">
            งานทรัพย์สินทางปัญญา กองกิจการพิเศษ สำนักงานอธิการบดี
            มหาวิทยาลัยราชภัฏนครราชสีมา <br></br>
            340 ถ.สุรนารายณ์ ตำบลในเมือง อำเภอเมือง จังหวัดนครราชสีมา 30000{" "}
            <br></br>
            โทร 044-009-009 ต่อ 3310 โทรสาร(FAX) 044-251-106 Email:
            tlo@nrru.ac.th
          </p>
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
