import React, { useEffect, useState } from "react";
import HomeLayout from "../layouts/homepageLayout";
import Head from "next/head";
import { LiaClipboardListSolid } from "react-icons/lia";
import { GrGroup } from "react-icons/gr";
import { GoGoal, GoHistory } from "react-icons/go";
import Image from "next/image";
import { PiUserCircleFill } from "react-icons/pi";
import { FaRegCircleCheck, FaUpLong } from "react-icons/fa6";
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
import { BsPeople } from "react-icons/bs";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { GetUserService } from "../services/user";

function AboutUs({ user }: { user: User | null }) {
  const [files, setFiles] = useState<
    {
      id?: string;
      url: string;
      fileType: FileType;
      type?: string;
      file?: File;
    }[]
  >([]);

  const filesHistory = useQuery({
    queryKey: ["files-history"],
    queryFn: () =>
      GetFileService({
        fileType: "HISTORY",
      }),
  });

  const fileStaff = useQuery({
    queryKey: ["files-staff"],
    queryFn: () =>
      GetFileService({
        fileType: "STAFF",
      }),
  });

  useEffect(() => {
    if (filesHistory.data && fileStaff.data) {
      setFiles(() => [...filesHistory.data, ...fileStaff.data]);
    }
  }, [filesHistory.data, fileStaff.data]);

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
          await fileStaff.refetch();
          await filesHistory.refetch();
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
      await fileStaff.refetch();
      await filesHistory.refetch();
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
          content="เกี่ยวกับเรา | งานทรัพย์สินทางปัญญา กองกิจการพิเศษ สำนักงานอธิการบดี"
        />
        <title>
          เกี่ยวกับเรา | งานทรัพย์สินทางปัญญา กองกิจการพิเศษ สำนักงานอธิการบดี
        </title>
      </Head>
      <HomeLayout>
        {/* Header */}
        <header
          className=" flex   w-full flex-col items-center justify-center 
    gap-5 bg-[url('/picture/aboutUs.png')] bg-cover bg-center text-white md:h-[27rem] lg:h-[34.5rem]"
        >
          <div className="flex w-8/12 flex-col gap-5 text-center">
            <h1 className=" uppercase  text-[var(--secondary-yellow)]  md:text-2xl lg:text-4xl">
              เกี่ยวกับเรา
            </h1>
            <h2 className="text-lg">
              วิสัยทัศน์ พันธกิจ กลุ่มเป้าหมาย บริการของเรา และโครงสร้างบุคคลากร
              งานทรัพย์สินทางปัญญา มหาวิทยาลัยราชภัฏนครราชสีมา
            </h2>
          </div>
        </header>
        <main className="font-Anuphan text-[var(--primary-blue)]">
          <div
            className="mt-12 flex w-full flex-col items-center gap-8 bg-[var(--primary-blue)]
           py-5 md:items-start md:bg-[#F4F8FF] md:py-0"
          >
            <div
              className="z-10 flex w-full items-center  justify-center gap-5 bg-[var(--secondary-yellow)] 
              px-4 py-2 text-center font-semibold hover:drop-shadow-md 
         md:w-[85%] md:justify-between md:pl-32 md:text-start md:text-xl"
            >
              <div className="flex items-center gap-2">
                <GoHistory />
                ประวัติความเป็นมา
              </div>
              {user?.role === "ADMIN" && (
                <button onClick={handleUploadFile} className="btn-download">
                  <FiSave /> บันทึกข้อมูล
                </button>
              )}
            </div>
            <section className=" flex h-full w-full flex-col items-center justify-start gap-3">
              {user?.role === "ADMIN" && (
                <FileTrigger
                  acceptedFileTypes={["image/jpeg", "image/png"]}
                  allowsMultiple
                  onSelect={(e) => {
                    if (!e) return null;

                    const files: FileList = e;
                    Array.from(files).forEach((file) => {
                      const url = URL.createObjectURL(file);
                      const reader = new FileReader();

                      setFiles((prev) => {
                        return [
                          ...prev,
                          { file: file, url: url, fileType: "HISTORY" },
                        ];
                      });

                      reader.readAsDataURL(file);
                    });
                  }}
                >
                  <Button className="btn-download">
                    <FiUploadCloud /> อัพโหลด ไฟล์รูปภาพ
                  </Button>
                  <span>แนะนำ 1200 * 630 pixels</span>
                </FileTrigger>
              )}
              {...files
                ?.filter((file) => file.fileType === "HISTORY")
                .map((file) => {
                  return (
                    <div
                      key={file.url}
                      className="relative h-60 w-full md:h-80 lg:h-96 lg:w-10/12 xl:h-[39.375rem] xl:w-8/12"
                    >
                      {user?.role === "ADMIN" && (
                        <button
                          onClick={() =>
                            handleDeleteFile({ url: file.url, fileId: file.id })
                          }
                          className="absolute right-2 top-2 z-20 flex items-center justify-center gap-2 rounded-md bg-red-300 px-5
                       py-1 text-red-600 transition hover:bg-red-400 active:scale-110"
                        >
                          <FiDelete /> ลบไฟล์
                        </button>
                      )}
                      <Image
                        alt="pictor of aboutUs"
                        fill
                        className="object-contain"
                        src={file.url}
                      />
                    </div>
                  );
                })}
            </section>
          </div>
          <div
            className="mt-12 flex w-full flex-col items-center gap-8 bg-[var(--primary-blue)]
           py-5 md:items-start md:bg-[#F4F8FF] md:py-0"
          >
            <div
              className="z-10 flex w-full items-center  justify-center gap-5 bg-[var(--secondary-yellow)] 
              px-4 py-2 text-center font-semibold hover:drop-shadow-md 
         md:w-[85%] md:justify-start md:pl-32 md:text-start md:text-xl"
            >
              <PiUserCircleFill />
              เกี่ยวกับเรา
            </div>

            <div className="  flex min-h-[50rem] w-full bg-[var(--primary-blue)] py-10 text-[white] ">
              <div className="relative min-h-full w-[35%] bg-slate-400">
                <Image
                  alt="pictor of aboutUs"
                  fill
                  className="object-cover"
                  src={"/picture/aboutUs.png"}
                />
              </div>
              <section className="z-10  flex flex-col gap-10">
                {/* วิสัยทัศน์ */}
                <div className="-ml-9 flex items-center gap-5">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full border-[0.5rem] border-solid border-[var(--primary-blue)]
                   bg-[#DDE9FF] text-7xl text-[var(--primary-blue)] md:h-32 md:w-32"
                  >
                    <GoGoal />
                  </div>
                  <div className="flex w-10/12 flex-col justify-center gap-3">
                    <h1 className=" text-2xl font-semibold">วิสัยทัศน์</h1>
                    <p className="text-sm md:text-base">
                      การบริหารจัดการทรัพย์สินทางปัญญา
                      ให้เกิดการจัดการองค์ความรู้
                      และประโยชน์ที่ได้รับจากการจัดการทรัพย์สินทางปัญญา
                    </p>
                  </div>
                </div>

                {/* พันธกิจ */}
                <div className="-ml-9 flex items-center gap-5">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full border-[0.5rem] border-solid border-[var(--primary-blue)]
                   bg-[#DDE9FF] text-7xl text-[var(--primary-blue)] md:h-32 md:w-32"
                  >
                    <LiaClipboardListSolid />
                  </div>
                  <div className="flex w-[70%] flex-col justify-center gap-3">
                    <h1 className="text-2xl font-semibold">พันธกิจ</h1>
                    <ol className="text-sm md:text-base">
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
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full border-[0.5rem] border-solid border-[var(--primary-blue)]
                   bg-[#DDE9FF] text-7xl text-[var(--primary-blue)] md:h-32 md:w-32"
                  >
                    <GrGroup />
                  </div>
                  <div className="flex w-[70%] flex-col justify-center gap-3">
                    <h1 className="text-2xl font-semibold">กลุ่มเป้าหมาย</h1>
                    <ol className="text-sm md:text-base">
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
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full border-[0.5rem] border-solid border-[var(--primary-blue)]
                   bg-[#DDE9FF] text-7xl text-[var(--primary-blue)] md:h-32 md:w-32"
                  >
                    <FaRegCircleCheck />
                  </div>
                  <div className="flex w-[70%] flex-col justify-center gap-3">
                    <h1 className="text-2xl font-semibold">บริการของเรา</h1>
                    <ol className="text-sm md:text-base">
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
          </div>
          <div
            className="mt-12 flex w-full flex-col items-center gap-8 bg-[var(--primary-blue)]
           py-5 md:items-start md:bg-[#F4F8FF] md:py-0"
          >
            <div
              className="z-10 flex w-full items-center  justify-center gap-5 bg-[var(--secondary-yellow)] 
              px-4 py-2 text-center font-semibold hover:drop-shadow-md 
         md:w-[85%] md:justify-between md:pl-32 md:text-start md:text-xl"
            >
              <div className="flex items-center gap-2">
                <BsPeople />
                ผู้บริหารและบุคลากร
              </div>
              {user?.role === "ADMIN" && (
                <button onClick={handleUploadFile} className="btn-download">
                  <FiSave /> บันทึกข้อมูล
                </button>
              )}
            </div>
            <section className=" flex h-full w-full flex-col items-center justify-start gap-3">
              {user?.role === "ADMIN" && (
                <FileTrigger
                  acceptedFileTypes={["image/jpeg", "image/png"]}
                  allowsMultiple
                  onSelect={(e) => {
                    if (!e) return null;

                    const files: FileList = e;
                    Array.from(files).forEach((file) => {
                      const url = URL.createObjectURL(file);
                      const reader = new FileReader();

                      setFiles((prev) => {
                        return [
                          ...prev,
                          { file: file, url: url, fileType: "STAFF" },
                        ];
                      });

                      reader.readAsDataURL(file);
                    });
                  }}
                >
                  <Button className="btn-download">
                    <FiUploadCloud /> อัพโหลด ไฟล์รูปภาพ
                  </Button>
                  <span>แนะนำ 1200 * 630 pixels</span>
                </FileTrigger>
              )}

              {...files
                ?.filter((file) => file.fileType === "STAFF")
                .map((file) => {
                  return (
                    <div
                      key={file.url}
                      className="relative h-60 w-full md:h-80 lg:h-96 lg:w-10/12 xl:h-[39.375rem] xl:w-8/12"
                    >
                      {user?.role === "ADMIN" && (
                        <button
                          onClick={() =>
                            handleDeleteFile({ url: file.url, fileId: file.id })
                          }
                          className="absolute right-2 top-2 z-20 flex items-center justify-center gap-2 rounded-md bg-red-300 px-5
                       py-1 text-red-600 transition hover:bg-red-400 active:scale-110"
                        >
                          <FiDelete /> ลบไฟล์
                        </button>
                      )}
                      <Image
                        alt="pictor of aboutUs"
                        fill
                        className="object-contain"
                        src={file.url}
                      />
                    </div>
                  );
                })}
            </section>
          </div>
        </main>
      </HomeLayout>
      ;
    </>
  );
}

export default AboutUs;
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
