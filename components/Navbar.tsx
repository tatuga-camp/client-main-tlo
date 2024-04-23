import React from 'react'
import LogoFile from './LogoFile'
import Link from 'next/link'
import { PiUserCirclePlus } from "react-icons/pi";
import { PiUserCircleFill } from "react-icons/pi";


const Navbar = () => {
  return (
    <div className='w-full h-full '>
      <div className="flex h-13 p-2 w-full items-center justify-between bg-white drop-shadow-md font-Anuphan ">
        {/* Logo */}
        <div className='w-[5rem] md:w-[6.25rem] ml-3 md:ml-10'>
            <LogoFile/>
        </div>

       

        {/* Links */}
        <div className='mr-3 md:mr-10 text-[var(--primary-blue)] flex gap-4 md:gap-6 font-semibold text-base md:text-xl'>
            <Link href={''} className='flex gap-1 md:gap-2 items-center hover:text-[#2166DD] duration-300 '>  <PiUserCircleFill /><p className='text-[0.8rem] md:text-base'>เข้าสู่ระบบ</p></Link >
            <Link href={''} className='flex gap-1 md:gap-2 items-center hover:text-[#2166DD] duration-300'> <PiUserCirclePlus /> <p className='text-[0.8rem] md:text-base'>ลงทะเบียน</p></Link >
            <Link href={''} className='flex gap-1 md:gap-2 items-center hover:text-[#2166DD] duration-300'> <p className='text-[0.8rem] md:text-base'>ติดต่อเรา</p></Link>
        </div>
            
           
      </div>
    </div>
  )
}

export default Navbar
