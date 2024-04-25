import React from "react";
import LogoFile from "./LogoFile";

const Footer = () => {
  return (
    <div className="h-full w-full">
      <div className="h-13 flex w-full items-start justify-between bg-white p-5 font-Anuphan text-[var(--primary-blue)] md:items-center md:p-10 ">
        <p className="w-[65%] text-[0.7rem] md:w-[60%] md:text-base">
          งานทรัพย์สินทางปัญญา กองกิจการพิเศษ สำนักงานอธิการบดี
          มหาวิทยาลัยราชภัฏนครราชสีมา <br></br>
          340 ถ.สุรนารายณ์ ตำบลในเมือง อำเภอเมือง จังหวัดนครราชสีมา 30000{" "}
          <br></br>
          โทร 044-009-009 ต่อ 3310 โทรสาร(FAX) 044-251-106 Email: tlo@nrru.ac.th
        </p>

        <div className="w-[6rem] md:w-[9rem]">
          <LogoFile />
        </div>
      </div>
    </div>
  );
};

export default Footer;
