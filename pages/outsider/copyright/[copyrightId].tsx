import HomeLayout from "@/layouts/homepageLayout";
import Head from "next/head";
import React, { useState } from "react";
import { outsiderCopyrightSection } from "../../../data/PatentSection";
import NrruCopyrightForm2 from "@/components/outsider/copyright/NrruCopyrightForm2/NrruCopyrightForm2";
import NrruCopyrightForm3 from "@/components/outsider/copyright/NrruCopyrightForm3/NrruCopyrightForm3";
import NrruCopyrightForm4 from "@/components/outsider/copyright/NrruCopyrightForm4/NrruCopyrightForm4";
import NrruCopyrightForm5 from "@/components/outsider/copyright/NrruCopyrightForm5";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { GetUserService } from "../../../services/user";
import { ErrorMessages, User } from "../../../models";
import { useRouter as NextuseRouter } from "next/router";
import { useRouter } from "next-nprogress-bar";
import { useQuery } from "@tanstack/react-query";
import {
  DeleteCopyrightService,
  GetCopyrightService,
  MigrantCopyrightService,
} from "../../../services/copyright/copyright";
import Swal from "sweetalert2";
import { MdDelete, MdOutlineDriveFileMove } from "react-icons/md";
import CopyrightStatus from "../../../components/Status/copyrightStatus";
import NrruCopyrightForm1 from "../../../components/outsider/copyright/NrruCopyrightForm1/NrruCopyrightForm1";
import MigrantForm from "../../../components/Forms/migrantForm";
const Index = ({ user }: { user: User }) => {
  const router = NextuseRouter();
  const naviateRouter = useRouter();
  const [currentSection, setCurrentSection] = useState(0);
  const [triggerMigrationForm, setTriggerMigrationForm] = useState(false);

  const copyright = useQuery({
    queryKey: [
      "copyright",
      { copyrightId: router.query.copyrightId as string },
    ],
    queryFn: () =>
      GetCopyrightService({
        copyrightId: router.query.copyrightId as string,
      }),
  });

  const previousSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scroll(0, 0);
    }
  };
  const nextSection = () => {
    try {
      if (currentSection < outsiderCopyrightSection.length - 1) {
        handleValidateForm({ number: currentSection + 1 });
        setCurrentSection(currentSection + 1);
        window.scroll(0, 0);
      }
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

  const handleValidateForm = ({ number }: { number: number }) => {
    if (number === 1 && copyright.data?.partnerInfoOnCopyrights.length === 0) {
      throw new Error("กรุณากรอกข้อมูลทั่วไปของผู้ประดิษฐ์ ให้ครบถ้วน");
    } else if (
      number === 2 &&
      (copyright.data?.workInfoOnCopyright.isComplete === false ||
        copyright.data?.partnerInfoOnCopyrights.length === 0)
    ) {
      throw new Error("กรุณากรอกข้อมูลผลงานที่สร้างสรรค์ ให้ครบถ้วน");
    } else if (
      number === 3 &&
      (!copyright.data?.workInfoOnCopyright.id ||
        copyright.data?.partnerInfoOnCopyrights.length === 0 ||
        copyright.data?.fileOnCopyrights.length === 0)
    ) {
      throw new Error("กรุณาข้อมูลเอกสารแนบคำขอ ให้ครบถ้วน");
    } else if (
      number === 4 &&
      (copyright.data?.fileOnCopyrights.length === 0 ||
        copyright.data?.isComplete === false ||
        copyright.data?.workInfoOnCopyright.isComplete === false ||
        copyright.data?.partnerInfoOnCopyrights.length === 0)
    ) {
      throw new Error("ไม่สามารถไปต่อได้ กรุณายืนยันในการส่งคำขอ ในส่วนที่ 4");
    }
  };

  const handleDeleteDesign = async ({
    copyrightId,
  }: {
    copyrightId: string;
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
      footer:
        "ข้อมูลทั้งหมดที่เกี่ยวข้องกับข้อมูลนี้จะถูกลบออกทั้งหมด และไม่สามารถกู้คืนได้อีก",
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
          didOpen: () => {
            Swal.showLoading();
          },
        });

        await DeleteCopyrightService({
          copyrightId: copyrightId,
        });
        naviateRouter.push("/");
        Swal.fire({
          title: "ลบข้อมูลสำเร็จ",
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
    }
  };
  const handleMigrationForm = async ({
    userId,
    email,
    formId,
  }: {
    userId: string;
    email: string;
    formId: string;
  }) => {
    const replacedText = "ยืนยันการย้ายข้อมูล";
    let content = document.createElement("div");
    content.innerHTML =
      "<div>กรุณาพิมพ์คำด้านล่าง </div> <strong>" +
      replacedText +
      `</strong> <div>เพื่อเป็นการยืนยันในการย้ายข้อมูลไปยัง ผู้ใช้งาน email ${email} </div>`;
    const { value } = await Swal.fire({
      title: "ยืนยันการย้ายข้อมูล",
      input: "text",
      footer:
        "ข้อมูลทั้งหมดที่เกี่ยวข้องกับข้อมูลนี้จะถูกย้ายออกทั้งหมด และไม่สามารถกู้คืนได้อีก",
      html: content,
      showCancelButton: true,
      inputValidator: (value) => {
        if (value !== replacedText) {
          return "คำที่พิมพ์ไม่ตรงกับคำที่ต้องการย้าย กรุณาลองใหม่อีกครั้ง";
        }
      },
    });
    if (value) {
      try {
        Swal.fire({
          title: "กำลังดำเนินการย้ายข้อมูล",
          html: "กรุณารอสักครู่",
          allowEscapeKey: false,
          allowOutsideClick: false,
          allowEnterKey: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        await MigrantCopyrightService({
          copyrightId: formId,
          targetUserId: userId,
        });
        await copyright.refetch();
        naviateRouter.push("/admin");
        Swal.fire({
          title: "ย้ายข้อมูลสำเร็จ",
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
    }
  };
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <title>คำขอจดแจ้งข้อมูลลิขสิทธ์</title>
      </Head>
      {triggerMigrationForm && router.query.copyrightId && (
        <MigrantForm
          setTrigger={setTriggerMigrationForm}
          handleMigrationForm={handleMigrationForm}
          formId={router.query.copyrightId as string}
        />
      )}
      <HomeLayout>
        <div className="flex h-full w-full flex-col items-center bg-[#F4F8FF] pb-10 font-Anuphan text-[var(--primary-blue)] lg:justify-center">
          <header className="mt-10 flex w-[90%] flex-col items-center gap-5 md:mt-5 md:w-full">
            <h2 className="text-center text-2xl font-bold md:text-3xl">
              คำขอจดแจ้งข้อมูลลิขสิทธ์
            </h2>
            <section className="max-w-[32rem] bg-[var(--secondary-yellow)] p-3 text-center text-base font-bold shadow-md md:text-xl">
              <p>สำหรับบุคคลภายนอก</p>
            </section>
            <section className="flex w-full justify-center gap-4">
              <button
                onClick={() =>
                  handleDeleteDesign({
                    copyrightId: router.query.copyrightId as string,
                  })
                }
                className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-10 py-2
             text-white drop-shadow-md transition hover:bg-red-700 active:scale-105"
              >
                ลบคำขอ
                <MdDelete />
              </button>
              {user.role === "ADMIN" && (
                <button
                  onClick={() => setTriggerMigrationForm(true)}
                  className="flex items-center justify-center gap-2 rounded-lg bg-green-600 px-10 py-2
             text-white drop-shadow-md transition hover:bg-green-700 active:scale-105"
                >
                  ย้ายคำขอ
                  <MdOutlineDriveFileMove />
                </button>
              )}
            </section>
            <section className="flex w-full flex-wrap items-center justify-center gap-3 md:w-[70%]">
              {outsiderCopyrightSection.map((item, index) => (
                <button
                  key={index}
                  className={`flex h-24 w-40 flex-col items-center justify-center p-5 text-center shadow-md duration-200 hover:text-blue-500 md:h-28 md:w-52 md:gap-2 ${currentSection === index ? "bg-[var(--primary-blue)] text-white" : "bg-white text-[#83AAED]"}`}
                  onClick={() => {
                    try {
                      handleValidateForm({ number: index });
                      setCurrentSection(index);
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
                  }}
                >
                  <h2 className={`text-base font-semibold md:text-lg`}>
                    {item.section}
                  </h2>
                  <p className={`text-xs md:text-[0.9rem]`}>{item.title}</p>
                </button>
              ))}
            </section>
            <section className="my-4 w-full md:pl-16">
              <div className="max-w-[28rem] bg-[var(--secondary-yellow)] p-2 text-center  font-bold shadow-md">
                <p>{outsiderCopyrightSection[currentSection].title} </p>
              </div>
            </section>
          </header>
          <main className="mt-5 flex w-full flex-col items-center">
            <section className="w-[87%]">
              {currentSection === 0 && (
                <div>
                  <NrruCopyrightForm1 user={user} copyright={copyright} />
                </div>
              )}
              {currentSection === 1 && (
                <div>
                  <NrruCopyrightForm2 copyright={copyright} />
                </div>
              )}

              {currentSection === 2 && (
                <div>
                  <NrruCopyrightForm4 copyright={copyright} />
                </div>
              )}
              {currentSection === 3 && (
                <div>
                  <p className="my-5 w-full items-center text-center  font-bold">
                    กรุณาตรวจสอบความถูกต้องและครบถ้วนของข้อมูลก่อนยื่นคำขอ
                  </p>
                  <NrruCopyrightForm5 user={user} copyright={copyright} />
                </div>
              )}
              {currentSection === 4 && copyright.data && (
                <div>
                  <CopyrightStatus
                    user={user}
                    copyrightId={copyright.data.id}
                  />
                </div>
              )}
            </section>

            <section className=" my-5 flex items-center justify-center gap-3">
              <button
                className="w-24 rounded-md border-2 border-solid border-[var(--primary-blue)] px-3 py-2 font-semibold disabled:border-slate-300 disabled:text-slate-300"
                onClick={previousSection}
                disabled={currentSection === 0}
              >
                ย้อนกลับ
              </button>

              <button
                className="w-24 rounded-md border-2 border-solid border-[var(--primary-blue)] px-3 py-2 font-semibold disabled:border-slate-300 disabled:text-slate-300"
                onClick={nextSection}
                disabled={
                  currentSection === outsiderCopyrightSection.length - 1
                }
              >
                ถัดไป
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
