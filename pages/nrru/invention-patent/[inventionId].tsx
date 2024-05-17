import HomeLayout from "@/layouts/homepageLayout";
import Head from "next/head";
import React, { useCallback, useState } from "react";
import { nrruInventionSection } from "../../../data/PatentSection";
import NrruInventionForm1 from "../../../components/nrru/invention-patent/NrruInventionForm1";
import NrruInventionForm2 from "../../../components/nrru/invention-patent/NrruInventionForm2";
import NrruInventionForm3 from "../../../components/nrru/invention-patent/NrruInventionForm3";
import NrruInventionForm4 from "../../../components/nrru/invention-patent/NrruInventionForm4";
import NrruInventionForm5 from "../../../components/nrru/invention-patent/NrruInventionForm5";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { GetUserService } from "../../../services/user";
import { ErrorMessages, User } from "../../../models";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { GetInventionPatentService } from "../../../services/invention-patent/invention-patent";
import Swal from "sweetalert2";
import NrruInventionForm6ver1 from "@/components/nrru/invention-patent/NrruInventionForm6ver1";
import NrruInventionForm6ver2 from "@/components/nrru/invention-patent/NrruInventionForm6ver2";

const Index = ({ user }: { user: User }) => {
  const router = useRouter();

  const [currentSection, setCurrentSection] = useState(0);

  const invention = useQuery({
    queryKey: ["invention", { inventionId: router.query.inventionId }],
    queryFn: () =>
      GetInventionPatentService({
        inventionPatentId: router.query.inventionId as string,
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
      if (currentSection < nrruInventionSection.length - 1) {
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
    let message: string;
    if (
      number === 1 &&
      invention.data?.partnerInfoOnInventionPatents.length === 0
    ) {
      throw new Error("กรุณากรอกข้อมูลทั่วไปของผู้ประดิษฐ์ ให้ครบถ้วน");
    } else if (
      number === 2 &&
      (!invention.data?.workInfoOnInventionPatent.id ||
        invention.data?.partnerInfoOnInventionPatents.length === 0)
    ) {
      throw new Error("กรุณากรอกข้อมูลของผลงานการประดิษฐ์ ให้ครบถ้วน");
    } else if (
      number === 3 &&
      (!invention.data?.workInfoOnInventionPatent.id ||
        invention.data?.partnerInfoOnInventionPatents.length === 0 ||
        !invention.data?.supportingDataOnInventionPatent.id)
    ) {
      throw new Error("กรุณาข้อมูลประกอบการนำไปใช้ประโยชน์ ให้ครบถ้วน");
    } else if (
      number === 4 &&
      (invention.data?.fileOnInventionPatents.length === 0 ||
        !invention.data?.supportingDataOnInventionPatent.id ||
        !invention.data?.workInfoOnInventionPatent.id ||
        invention.data?.partnerInfoOnInventionPatents.length === 0)
    ) {
      throw new Error("ไม่สามารถไปต่อได้ ให้ครบถ้วน");
    }
  };

  const [patentType, setPatentType] = useState("สิทธิบัตรการประดิษฐ์");
  const handlePatentTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPatentType(e.target.value);
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <title>แบบฟอร์มประกอบคำขอรับสิทธิบัตรการประดิษฐ์/อนุสิทธิบัตร</title>
      </Head>
      <HomeLayout>
        <div className="flex h-full w-full flex-col items-center bg-[#F4F8FF] pb-10 font-Anuphan text-[var(--primary-blue)] lg:justify-center">
          <header className="mt-10 flex w-[90%] flex-col items-center gap-5 md:mt-5 md:w-full">
            <h2 className="text-center text-2xl font-bold md:text-3xl">
              แบบฟอร์มประกอบคำขอรับสิทธิบัตรการประดิษฐ์/อนุสิทธิบัตร
            </h2>
            <section className="max-w-[32rem] bg-[var(--secondary-yellow)] p-3 text-center text-base font-bold shadow-md md:text-xl">
              <p>สำหรับบุคลากรมหาวิทยาลัยราชภัฏนครราชสีมา</p>
            </section>

            <section className="flex w-full flex-wrap items-center justify-center gap-3 md:w-[70%]">
              {nrruInventionSection.map((item, index) => (
                <div
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
                  key={index}
                  className={`flex h-24 w-40 flex-col items-center justify-center p-5 text-center shadow-md md:h-28 md:w-52 md:gap-2 ${currentSection === index ? "bg-[var(--primary-blue)] text-white" : "bg-white text-[#83AAED]"}`}
                >
                  <h2 className={`text-base font-semibold md:text-lg`}>
                    {item.section}
                  </h2>
                  <p className={`text-xs md:text-[0.9rem]`}>{item.title}</p>
                </div>
              ))}
            </section>
            <section className="my-4 w-full md:pl-16">
              <div className="max-w-[28rem] bg-[var(--secondary-yellow)] p-2 text-center  font-bold shadow-md">
                <p>{nrruInventionSection[currentSection].title} </p>
              </div>
            </section>
          </header>
          <main className="mt-5 flex w-full flex-col items-center">
            <label>
              ประเภทสิทธิบัตร:
              <select value={patentType} onChange={handlePatentTypeChange}>
                <option value="สิทธิบัตรการประดิษฐ์">
                  สิทธิบัตรการประดิษฐ์
                </option>
                <option value="อนุสิทธิบัตร">อนุสิทธิบัตร</option>
              </select>
            </label>
            <section className="w-[87%]">
              {currentSection == 0 && (
                <div>
                  <NrruInventionForm1 invention={invention} user={user} />
                </div>
              )}
              {currentSection == 1 && (
                <div>
                  <NrruInventionForm2 />
                </div>
              )}
              {currentSection == 2 && (
                <div>
                  <NrruInventionForm3 />
                </div>
              )}
              {currentSection == 3 && (
                <div>
                  <NrruInventionForm4 />
                </div>
              )}
              {currentSection == 4 && (
                <div>
                  <p className="my-5 w-full items-center text-center  font-bold">
                    {" "}
                    กรุณาตรวจสอบความถูกต้องและครบถ้วนของข้อมูลก่อนยื่นคำขอ
                  </p>

                  <NrruInventionForm5 />
                </div>
              )}
              {currentSection === 5 && (
                <div>
                  {patentType === "สิทธิบัตรการประดิษฐ์" && (
                    <NrruInventionForm6ver1 />
                  )}
                  {patentType === "อนุสิทธิบัตร" && <NrruInventionForm6ver2 />}
                </div>
              )}
            </section>
            {currentSection === nrruInventionSection.length - 1 && (
              <button className="mt-5 w-44 rounded-md bg-[#10316B] px-3 py-2 font-semibold text-white">
                ส่งคำขอ
              </button>
            )}
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
                disabled={currentSection === nrruInventionSection.length - 1}
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
