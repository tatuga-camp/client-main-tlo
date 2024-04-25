import HomepageSidebar from '@/components/HomepageSidebar'
import LogoFile from '@/components/LogoFile'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { useState } from 'react';
import { PiUserCircleDuotone } from "react-icons/pi";
import { PiUserCircleGearDuotone } from "react-icons/pi";

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

      {/* Left */}
      <HomepageSidebar/>

      {/* Right */}
      <div className="flex h-full w-full flex-col items-center md:mt-6 md:justify-center ">
        <div className="my-8 flex w-full flex-col items-center justify-center">
            {/* md: Page before sign up/sign in  */}
                    {/* <button onClick={toggleVisibility} className='absolute top-0 z-30'>XXX</button>
            {!isHidden && (
                <div className='z-20 bg-white absolute top-0 w-full h-full lg:hidden flex flex-col items-center justify-center'>
                <div className='mt flex flex-col items-start font-semibold'>
                    <div className='w-[10rem] h-[5rem] relative'>
                        <Image alt="pictor of logo" fill className="object-cover" src={"/logo.png"}/>
                    </div>
                    <h1 className='text-[0.9rem] md:text-xl text-[#2166DD99] mt-2'>ระบบจดทะเบียนทรัพย์สินทางปัญญา</h1>
                    <h2 className='text-2xl md:text-3xl text-[#10316B]'>งานทรัพย์สินทางปัญญา</h2>
                    <p className='text-[#2166DD99] text-[0.9rem] font-semibold'>กองพัฒนาพิเศษ สำนักงานอธิการบดี</p>
                </div>
                
                
                <div className='mt-6 w-[17rem] h-[16rem]  relative '>
                    <Image alt="pictor of authBlob" fill className="object-cover" src={"/authBlob.png"}/>
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
            <div className='w-full flex flex-col  items-center gap-3 pt-16'>
                <h2 className='text-3xl font-bold text-[var(--primary-blue)]'>ลงทะเบียน</h2>
                <p className='font-semibold text-[#2166DD99]'>โปรดเลือกประเภทผู้จดทะเบียน</p>
                <section className='flex items-center justify-center gap-3'>
                    <button className="mt-5 group gap-3 md:gap-4 bg-[#BED6FF] drop-shadow-md w-40 h-40 text-xs md:text-base md:w-52 md:h-52 flex flex-col text-center items-center justify-center  hover:bg-[#A7C1ED] duration-300 text-[var(--primary-blue)]">
                        <div className="text-[4rem] md:text-[5rem] group-hover:text-[var(--primary-blue)] duration-300 group-hover:scale-110">
                            <PiUserCircleDuotone/>
                        </div>
                        <p className="font-semibold text-[1.1rem] group-hover:text-[0.95rem] md:group-hover:text-base duration-300">บุคคลภายนอก</p>
                    </button>
                    <button className="mt-5 group gap-3 md:gap-4 bg-[#FFE867] drop-shadow-md w-40 h-40 text-xs md:text-base md:w-52 md:h-52 flex flex-col text-center items-center justify-center  hover:bg-[#EBD662] duration-300 text-[var(--primary-blue)]">
                        <div className="text-[4rem] md:text-[5rem] group-hover:text-[var(--primary-blue)] duration-300 group-hover:scale-110">
                            <PiUserCircleGearDuotone/>
                        </div>
                        <p className="font-semibold text-[1.1rem] group-hover:text-[0.95rem] md:group-hover:text-base duration-300">บุคคลากร NRRU</p>
                    </button>
              
                </section>
            </div>
            
        </div>
      </div>
    </div>
  )
}

export default Index
