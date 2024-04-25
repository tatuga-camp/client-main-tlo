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
          {/* md: Page before sign up/sign in  */}
          {/* <button onClick={toggleVisibility} className='absolute top-0 z-30'>XXX</button>
            {!isHidden && (
                <div className='z-20 bg-white absolute top-0 w-full h-full lg:hidden flex flex-col items-center justify-center'>
                <div className='mt flex flex-col items-start font-semibold'>
                    <div className='w-[10rem] h-[5rem] relative'>
                        <Image alt="pictor of logo" fill className="object-cover" src={"/picture/logo.png"}/>
                    </div>
                    <h1 className='text-[0.9rem] md:text-xl text-[#2166DD99] mt-2'>ระบบจดทะเบียนทรัพย์สินทางปัญญา</h1>
                    <h2 className='text-2xl md:text-3xl text-[#10316B]'>งานทรัพย์สินทางปัญญา</h2>
                    <p className='text-[#2166DD99] text-[0.9rem] font-semibold'>กองพัฒนาพิเศษ สำนักงานอธิการบดี</p>
                </div>
                
                
                <div className='mt-6 w-[17rem] h-[16rem]  relative '>
                    <Image alt="pictor of authBlob" fill className="object-cover" src={"/picture/authBlob.png"}/>
                </div>

                <button className='px-3 py-1 mt-4 border-2 border-solid border-[#10316B] hover:text-blue-600 hover:border-blue-600 duration-300 text-[#10316B] rounded-md'>
                   <Link href={'/auth/sign-in'}> เข้าสู่ระบบ</Link>
                   
                </button>
                <button 
                onClick={toggleVisibility}
                className='px-3 py-1 mt-4 border-2 border-solid border-[#10316B] hover:text-blue-600  hover:border-blue-600 duration-300text-[#10316B] rounded-md'>
                    ลงทะเบียน
                </button>
            </div>
            )} */}

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
