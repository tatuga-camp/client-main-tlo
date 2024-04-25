import React from "react";
import LogoFile from "./LogoFile";
import Link from "next/link";
import { PiUserCirclePlus } from "react-icons/pi";
import { PiUserCircleFill } from "react-icons/pi";

const Navbar = () => {
  return (
    <div className="h-13 fixed top-0 z-30 flex w-full items-center justify-between bg-white p-2 font-Anuphan drop-shadow-md">
      {/* Logo */}
      <Link href="/" className="ml-3 w-[5rem] md:ml-10 md:w-[6.25rem]">
        <LogoFile />
      </Link>

      {/* Links */}
      <div className="mr-3 flex gap-4 text-base font-semibold text-[var(--primary-blue)] md:mr-10 md:gap-6 md:text-xl">
        <Link
          href={"/auth/sign-in"}
          className="flex items-center gap-1 duration-300 hover:text-[#2166DD] md:gap-2 "
        >
          {" "}
          <PiUserCircleFill />
          <p className="text-[0.8rem] md:text-base">เข้าสู่ระบบ</p>
        </Link>
        <Link
          href={"/auth/sign-up"}
          className="flex items-center gap-1 duration-300 hover:text-[#2166DD] md:gap-2"
        >
          {" "}
          <PiUserCirclePlus />{" "}
          <p className="text-[0.8rem] md:text-base">ลงทะเบียน</p>
        </Link>
        <Link
          href={""}
          className="flex items-center gap-1 duration-300 hover:text-[#2166DD] md:gap-2"
        >
          {" "}
          <p className="text-[0.8rem] md:text-base">ติดต่อเรา</p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
