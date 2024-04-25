import React from 'react'
import LogoFile from './LogoFile'
import Image from 'next/image'

const HomepageSidebar = () => {
  return (
    <div className="sticky top-0 hidden h-screen  lg:block lg:w-[70rem] lg:bg-white">
        <div className='flex flex-col items-start justify-center ml-20 mt-9 gap-2 font-bold'>
            <div className='w-[8rem]'>
                <LogoFile/>
            </div>
            <h1 className='text-xl text-[#2166DD99] mt-2 '>ระบบจดทะเบียนทรัพย์สินทางปัญญา</h1>
            <h2 className='text-3xl text-[#10316B]'>งานทรัพย์สินทางปัญญา</h2>
            <p className='text-[#2166DD99] text-[0.9rem] font-semibold'>กองพัฒนาพิเศษ สำนักงานอธิการบดี</p>
            
            <div className='mt-3 w-[20rem] h-[19rem]  relative '>
                 <Image alt="pictor of authBlob" fill className="object-cover" src={"/authBlob.png"}/>
            </div>
            
        </div>
     
    </div>
  )
}

export default HomepageSidebar
