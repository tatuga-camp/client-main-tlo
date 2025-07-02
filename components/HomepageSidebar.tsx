import React from "react";
import LogoFile from "./LogoFile";
import Image from "next/image";

const HomepageSidebar = () => {
  return (
    <div className="sticky top-0  hidden h-screen  lg:block lg:w-[70rem] lg:bg-white">
      <div className="ml-20 mt-9 flex flex-col items-start justify-center gap-2 font-bold">
        <div className="w-[8rem]">
          <LogoFile />
        </div>
        <h1 className="mt-2 text-xl text-[#2166DD99] ">
          ระบบจดทะเบียนทรัพย์สินทางปัญญา
        </h1>
        <h2 className="text-3xl text-[#10316B]">งานทรัพย์สินทางปัญญา</h2>
        <p className="text-[0.9rem] font-semibold text-[#2166DD99]">
          กองกิจการพิเศษ สำนักงานอธิการบดี
        </p>

        <div className="relative mt-3 h-[19rem]  w-[20rem] ">
          <Image
            alt="pictor of authBlob"
            fill
            className="object-cover"
            src={"/picture/authBlob.png"}
          />
        </div>
      </div>
    </div>
  );
};

export default HomepageSidebar;
