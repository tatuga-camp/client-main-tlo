import React from "react";
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleFill,
  RiCheckboxCircleLine,
} from "react-icons/ri";
import { TbCircleFilled } from "react-icons/tb";

const OutsiderDesignForm5 = () => {
  return (
    <div className="  w-full  rounded-md border-[1px] border-solid border-[#BED6FF] bg-white p-5 py-10 lg:p-10">
      <div className="flex w-full flex-col items-center gap-3">
        <h1 className="text-xl font-semibold lg:text-2xl ">
          เลขที่คำขอ: 13604015
        </h1>
        <h1 className="font-semibold lg:text-xl">
          ประเภท : สิทธิบัตรการออกแบบผลิตภัณฑ์
        </h1>
        <section className="mt-5 w-10/12 text-start text-xs lg:text-base">
          <p>
            <span className="font-semibold">ชื่อสิ่งประดิษฐ์/การออกแบบ : </span>{" "}
            ผลิตภัณฑ์เครื่องดื่มชาไทยเสริมพรีไบโอติ
          </p>
        </section>
        <section className="flex w-10/12 flex-col gap-2 text-xs md:flex-row md:justify-between lg:text-base">
          <p>
            <span className="font-semibold">ชื่อผู้สิ่งประดิษฐ์/ออกแบบ :</span>{" "}
            นางสาวไพลิน จิตขจี
          </p>
          <p>
            <span className="font-semibold">สังกัด : </span>{" "}
            คณะวิทยาศาสตร์และเทคโนโลยี
          </p>
        </section>
        <div className="relative my-8 flex w-[18rem] gap-16 overflow-x-auto py-5 md:w-[32rem] lg:w-[52rem] lg:gap-10">
          <div className="flex h-[12.5rem] min-w-[6rem] flex-col items-center gap-3 lg:min-w-[8rem]">
            <span className="relative z-10 rounded-full bg-white  text-[3rem] text-[#2166DD]  ">
              <RiCheckboxCircleFill />
              <div className="absolute left-[2.2rem] top-5 h-[0.3rem] w-[9rem] bg-[#2166DD]"></div>
            </span>
            <section className="flex flex-col items-center gap-1">
              <p className="text-[0.65rem] font-semibold text-green-500 lg:text-[0.85rem]">
                สำเร็จ
              </p>
              <h1 className="text-[0.7rem] font-bold text-[#2166DD]  lg:text-[0.9rem]">
                ส่งคำขอให้กับ TLO
              </h1>
              <p className="text-xs text-[#759de3]">29/3/67</p>
              <p className="text-xs text-[#759de3]">14.45 น.</p>
            </section>

            {/* <button className="absolute bottom-0 rounded-md bg-[var(--secondary-yellow)] px-3 py-2 lg:text-[0.85rem] text-[0.65rem] font-semibold">
              ตรวจสอบ
            </button> duration-200 hover:bg-yellow-400 */}
          </div>

          <div className="relative flex  h-[12.5rem] min-w-[6rem] flex-col items-center gap-3 lg:min-w-[8rem]">
            <span className="relative z-10 rounded-full border-[0.3rem] border-solid border-[#2166DD] bg-white text-[2.2rem] text-[#2166DD] ">
              <TbCircleFilled />
              {/* <div className="absolute left-[2.2rem] top-4 h-[0.3rem] w-[9rem] bg-[#2166DD]"></div> */}
            </span>
            <section className="flex flex-col items-center gap-1">
              <p className="text-[0.65rem] font-semibold  text-green-500 lg:text-[0.85rem]">
                กำลังดำเนินการ
              </p>
              <h1 className="text-[0.7rem] font-bold text-[#2166DD]  lg:text-[0.9rem]">
                ตรวจสอบเอกสาร
              </h1>
              <p className="text-center text-xs text-[#759de3]">
                เจ้าหน้าที่ TLO ตรวจสอบเอกสาร
              </p>
            </section>
            <button className="absolute bottom-0 rounded-md bg-[var(--secondary-yellow)] px-3 py-2 text-[0.65rem] font-semibold duration-200 hover:bg-yellow-400 lg:text-[0.85rem]">
              ตรวจสอบ
            </button>
          </div>

          <div className="relative flex  h-[12.5rem] min-w-[6rem] flex-col items-center gap-3 lg:min-w-[8rem]">
            <span className="relative z-10 rounded-full bg-white text-[3rem]  text-slate-300 ">
              <RiCheckboxBlankCircleLine />
              {/* <div className="absolute left-[2.2rem] top-5 h-[0.3rem] w-[9rem] bg-[#2166DD]"></div> */}
            </span>
            <section className="flex flex-col items-center gap-1">
              {/* <p className="lg:text-[0.85rem] text-[0.65rem] font-semibold text-green-500">
                สำเร็จ
              </p> */}
              <h1 className="text-[0.7rem] font-bold text-slate-400 lg:text-[0.9rem]">
                รับเอกสารคำขอ
              </h1>
              <p className="text-xs text-slate-400">กรมทรัพย์สินทางปัญญา</p>
              <p className="text-xs text-slate-400">ได้รับเอกสารคำขอ</p>
            </section>
            <button className="absolute bottom-0 rounded-md bg-[#BED6FF] px-3 py-2 text-[0.65rem] font-semibold duration-200 hover:bg-blue-300 lg:text-[0.85rem]">
              อัพเดทข้อมูล
            </button>
          </div>

          <div className="relative flex  h-[12.5rem] min-w-[6rem] flex-col items-center gap-3 lg:min-w-[8rem]">
            <span className="relative z-10 rounded-full bg-white text-[3rem]  text-slate-300 ">
              <RiCheckboxBlankCircleLine />
              {/* <div className="absolute left-[2.2rem] top-5 h-[0.3rem] w-[9rem] bg-[#2166DD]"></div> */}
            </span>
            <section className="flex flex-col items-center gap-1">
              {/* <p className="lg:text-[0.85rem] text-[0.65rem] font-semibold text-green-500">
                สำเร็จ
              </p> */}
              <h1 className="text-[0.7rem] font-bold text-slate-400 lg:text-[0.9rem]">
                ตรวจสอบเอกสาร
              </h1>
              <p className="text-xs text-slate-400">กรมทรัพย์สินทางปัญญา</p>
              <p className="text-xs text-slate-400">ตรวจสอบเอกสารคำขอ</p>
            </section>
            <button className="absolute bottom-0 rounded-md bg-[#BED6FF] px-3 py-2 text-[0.65rem] font-semibold duration-200 hover:bg-blue-300 lg:text-[0.85rem]">
              อัพเดทข้อมูล
            </button>
          </div>

          <div className="relative flex  h-[12.5rem] min-w-[6rem] flex-col items-center gap-3 lg:min-w-[8rem]">
            <span className="relative z-10 rounded-full bg-white text-[3rem]  text-slate-300 ">
              <RiCheckboxBlankCircleLine />
              {/* <div className="absolute left-[2.2rem] top-5 h-[0.3rem] w-[9rem] bg-[#2166DD]"></div> */}
            </span>
            <section className="flex flex-col items-center gap-1 text-center">
              {/* <p className="lg:text-[0.85rem] text-[0.65rem] font-semibold text-green-500">
                สำเร็จ
              </p> */}
              <h1 className="text-[0.7rem] font-bold text-slate-400 lg:text-[0.9rem]">
                ประกาศโฆษณาคำขอ
              </h1>
              <p className="text-xs text-slate-400"> กรมทรัพย์สินทางปัญญา</p>
              <p className="text-xs text-slate-400">
                ประกาศโฆษณาคำขอรับสิทธิบัตร
              </p>
            </section>
            <button className="absolute bottom-0 rounded-md bg-[#BED6FF] px-3 py-2 text-[0.65rem] font-semibold duration-200 hover:bg-blue-300 lg:text-[0.85rem]">
              อัพเดทข้อมูล
            </button>
          </div>

          <div className="relative flex  h-[12.5rem] min-w-[6rem] flex-col items-center gap-3 lg:min-w-[8rem]">
            <span className="relative z-10 rounded-full bg-white text-[3rem]  text-slate-300 ">
              <RiCheckboxBlankCircleLine />
              {/* <div className="absolute left-[2.2rem] top-5 h-[0.3rem] w-[9rem] bg-[#2166DD]"></div> */}
            </span>
            <section className="flex flex-col items-center gap-1 text-center">
              {/* <p className="lg:text-[0.85rem] text-[0.65rem] font-semibold text-green-500">
                สำเร็จ
              </p> */}
              <h1 className="text-[0.7rem] font-bold text-slate-400 lg:text-[0.9rem]">
                ตรวจสอบการออกแบบ
              </h1>
              <p className="text-xs text-slate-400">กรมทรัพย์สินทางปัญญา</p>
              <p className="text-xs text-slate-400">ตรวจสอบการออกแบบ</p>
            </section>
            <button className="absolute bottom-0 rounded-md bg-[#BED6FF] px-3 py-2 text-[0.65rem] font-semibold duration-200 hover:bg-blue-300 lg:text-[0.85rem]">
              อัพเดทข้อมูล
            </button>
          </div>

          <div className="relative flex  h-[12.5rem] min-w-[6rem] flex-col items-center gap-3 lg:min-w-[8rem]">
            <span className="relative z-10 rounded-full bg-white text-[3rem]  text-slate-300 ">
              <RiCheckboxBlankCircleLine />
              {/* <div className="absolute left-[2.2rem] top-5 h-[0.3rem] w-[9rem] bg-[#2166DD]"></div> */}
            </span>
            <section className="flex flex-col items-center gap-1 text-center">
              {/* <p className="lg:text-[0.85rem] text-[0.65rem] font-semibold text-green-500">
                สำเร็จ
              </p> */}
              <h1 className="text-[0.7rem] font-bold text-slate-400 lg:text-[0.9rem]">
                รับจดทะเบียน
              </h1>
              <p className="text-xs text-slate-400">กรมทรัพย์สินทางปัญญา</p>
              <p className="text-xs text-slate-400">
                {" "}
                รับจดทะเบียนและออกสิทธิบัตร
              </p>
            </section>
            <button className="absolute bottom-0 rounded-md bg-[#BED6FF] px-3 py-2 text-[0.65rem] font-semibold duration-200 hover:bg-blue-300 lg:text-[0.85rem]">
              อัพเดทข้อมูล
            </button>
          </div>

          {/* Last process*/}
          <div className="relative flex  h-[12.5rem] min-w-[6rem] flex-col items-center gap-3 lg:min-w-[8rem]">
            <span className="z-10 rounded-full bg-white text-[3rem]  text-slate-300 ">
              <RiCheckboxBlankCircleLine />
            </span>
            <section className="flex flex-col items-center gap-1 text-center">
              {/* <p className="lg:text-[0.85rem] text-[0.65rem] font-semibold text-green-500">
                สำเร็จ
              </p> */}
              <h1 className="text-[0.7rem] font-bold text-slate-400 lg:text-[0.9rem]">
                ขอชำระค่าธรรมเนียม
              </h1>
              <p className="text-xs text-slate-400">เจ้าหน้าที่ TLO </p>
              <p className="text-xs text-slate-400">
                ยื่นคำขอชำระค่าธรรมเนียมรายปี
              </p>
            </section>
            <button className="absolute bottom-0 rounded-md bg-[#BED6FF] px-3 py-2 text-[0.65rem] font-semibold duration-200 hover:bg-blue-300 lg:text-[0.85rem]">
              อัพเดทข้อมูล
            </button>
          </div>

          <div className="absolute left-10 top-10 h-[0.3rem] w-[70rem] bg-slate-300 lg:w-[75rem]"></div>
        </div>
      </div>
    </div>
  );
};

export default OutsiderDesignForm5;
