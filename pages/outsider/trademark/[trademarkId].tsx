import HomeLayout from "@/layouts/homepageLayout";
import Head from "next/head";
import React, { useState } from "react";
import { trademark } from "../../../data/PatentSection";
import TrademarkForm1 from "@/components/nrru/trademark/TrademarkForm1";
import TrademarkForm2 from "@/components/nrru/trademark/TrademarkForm2";
import TrademarkForm3 from "@/components/nrru/trademark/TrademarkForm3";
import TrademarkForm4 from "@/components/nrru/trademark/TrademarkForm4";

const Index = () => {
  const [currentSection, setCurrentSection] = useState(0);

  const previousSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };
  const nextSection = () => {
    if (currentSection < trademark.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <title>License patent</title>
      </Head>
      <HomeLayout>
        <div className="flex h-full w-full flex-col items-center bg-[#F4F8FF] pb-10 font-Anuphan text-[var(--primary-blue)] lg:justify-center">
          <header className="mt-10 flex w-[90%] flex-col items-center gap-5 md:mt-5 md:w-full">
            <h2 className="text-center text-2xl font-bold md:text-3xl">
              แบบฟอร์มประกอบคำขอจดทะเบียนเครื่องหมายการค้า
            </h2>

            <section className="flex w-full flex-wrap items-center justify-center gap-3">
              {trademark.map((item, index) => (
                <button
                  key={index}
                  className={`flex h-24 w-40 flex-col items-center justify-center p-5 text-center shadow-md duration-200 hover:text-blue-500 md:h-28 md:w-52 md:gap-2 ${currentSection === index ? "bg-[var(--primary-blue)] text-white" : "bg-white text-[#83AAED]"}`}
                  onClick={() => setCurrentSection(index)}
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
                <p>{trademark[currentSection].title} </p>
              </div>
            </section>
          </header>
          <main className="mt-5 flex w-full flex-col items-center">
            <section className="w-[87%]">
              {currentSection == 0 && (
                <div>
                  <TrademarkForm1 />
                </div>
              )}
              {currentSection == 1 && (
                <div>
                  <TrademarkForm2 />
                </div>
              )}
              {currentSection == 2 && (
                <div>
                  <TrademarkForm3 />
                </div>
              )}
              {currentSection == 3 && (
                <div>
                  <TrademarkForm4 />
                </div>
              )}
            </section>
            {currentSection === trademark.length - 1 && (
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
                disabled={currentSection === trademark.length - 1}
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