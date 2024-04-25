import HomepageSidebar from "@/components/HomepageSidebar";
import LogoFile from "@/components/LogoFile";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { useState } from "react";
import { PiUserCircleDuotone } from "react-icons/pi";
import { PiUserCircleGearDuotone } from "react-icons/pi";
import Navbar from "../../../components/Navbar";

const Index = () => {
  const [isHidden, setIsHidden] = useState(false);
  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };
  return (
    <div className=" flex min-h-screen font-Anuphan  md:bg-[#F4F8FF]">
      <Head>
        <title>ลงทะเบียน</title>
      </Head>
      <Navbar />
      {/* Left */}
      <HomepageSidebar />

      {/* Right */}
      <div className="flex  w-full flex-col items-center  md:justify-center ">
        <div className="my-8 flex w-full flex-col items-center justify-center">
          {/* Sign-up */}
          <div className="flex w-full flex-col  items-center gap-3 pt-16">
            <h2 className="text-3xl font-bold text-[var(--primary-blue)]">
              ลงทะเบียน
            </h2>
            <p className="font-semibold text-[#2166DD99]">
              โปรดเลือกประเภทผู้จดทะเบียน
            </p>
            <section className="flex items-center justify-center gap-3">
              <button className="group mt-5 flex h-40 w-40 flex-col items-center justify-center gap-3 bg-[#BED6FF] text-center text-xs text-[var(--primary-blue)] drop-shadow-md duration-300 hover:bg-[#A7C1ED] md:h-52  md:w-52 md:gap-4 md:text-base">
                <div className="text-[4rem] duration-300 group-hover:scale-110 group-hover:text-[var(--primary-blue)] md:text-[5rem]">
                  <PiUserCircleDuotone />
                </div>
                <p className="text-[1.1rem] font-semibold duration-300 group-hover:text-[0.95rem] md:group-hover:text-base">
                  บุคคลภายนอก
                </p>
              </button>
              <button className="group mt-5 flex h-40 w-40 flex-col items-center justify-center gap-3 bg-[#FFE867] text-center text-xs text-[var(--primary-blue)] drop-shadow-md duration-300 hover:bg-[#EBD662] md:h-52  md:w-52 md:gap-4 md:text-base">
                <div className="text-[4rem] duration-300 group-hover:scale-110 group-hover:text-[var(--primary-blue)] md:text-[5rem]">
                  <PiUserCircleGearDuotone />
                </div>
                <p className="text-[1.1rem] font-semibold duration-300 group-hover:text-[0.95rem] md:group-hover:text-base">
                  บุคคลากร NRRU
                </p>
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
