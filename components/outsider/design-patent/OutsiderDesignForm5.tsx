import Number from "@/components/Number";
import React from "react";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "react-aria-components";
import { InputMask, InputMaskChangeEvent } from "primereact/inputmask";
import { FiPlusCircle } from "react-icons/fi";
import Checkbox from "@mui/material/Checkbox";
import { IoTrashOutline } from "react-icons/io5";

const OutsiderDesignForm5 = () => {
  return (
    <div className=" min-w-[58rem] rounded-md  border-[1px] border-solid border-[#BED6FF] bg-white p-5 py-10 md:w-full md:p-10">
      <div className="flex w-full flex-col gap-3">
        <div className="max-w-60 bg-[#BED6FF] px-2 py-3 text-center font-bold md:ml-8">
          ข้อมูลทั่วไปของผู้ออกแบบ
        </div>

        <section className="my-5 flex w-full flex-col items-center gap-3">
          <div className="flex  w-[70%] items-center gap-5">
            <span className="flex gap-3">
              <h1 className="font-semibold">ชื่อ-สกุล:</h1>{" "}
              <p className="text-[#97B8F3]">ผศ.ดร.ฐิติวรดา หาญแท้</p>
            </span>
            <span className="flex gap-3">
              <h1 className="font-semibold">เลขบัตรประจำตัวประชาชน:</h1>{" "}
              <p className="text-[#97B8F3]">1360401295708</p>
            </span>
          </div>
          <div className="flex  w-[70%] items-center gap-5">
            <span className="flex gap-3">
              <h1 className="font-semibold">ที่อยู่ :</h1>{" "}
              <p className="text-[#97B8F3]">
                325 หมู่ 5 ต.บ้านยาง อ.เกษตรสมบูรณ์ จ.ชัยภูมิ 36120
              </p>
            </span>
            <span className="flex gap-3">
              <h1 className="font-semibold">สัญชาติ:</h1>{" "}
              <p className="text-[#97B8F3]">ไทย</p>
            </span>
          </div>
          <div className="flex  w-[70%] items-center gap-5">
            <span className="flex gap-3">
              <h1 className="font-semibold">โทรศัพท์ :</h1>{" "}
              <p className="text-[#97B8F3]">0984501234</p>
            </span>
            <span className="flex gap-3">
              <h1 className="font-semibold">Email :</h1>{" "}
              <p className="text-[#97B8F3]">ploytitiworda.123@gmail.com</p>
            </span>
          </div>
        </section>

        <div className="max-w-60 bg-[#BED6FF] px-2 py-3 text-center font-bold md:ml-8">
          ข้อมูลของผลงานการประดิษฐ์
        </div>

        <section className="my-5 flex w-full flex-col items-center gap-3 text-[]">
          <div className="flex  w-[70%] items-center gap-5">
            <span className="flex gap-3">
              <h1 className="font-semibold">
                ชื่อที่แสดงถึงการออกแบบผลิตภัณฑ์ :
              </h1>{" "}
              <p className="text-[#97B8F3]">ชื่อผลงานภาษาไทย</p>
            </span>
            <span className="flex gap-3">
              <h1 className="font-semibold">ปีที่ทำการประดิษฐ์ :</h1>{" "}
              <p className="text-[#97B8F3]">2565-2567</p>
            </span>
          </div>
          <div className="flex  w-[70%] items-center gap-5">
            <span className="flex gap-3">
              <h1 className="font-semibold">สิ่งที่ได้:</h1>{" "}
              <p className="text-[#97B8F3]">
                ระบบการทำงาน, สื่อการสอน, องค์ความรู้
              </p>
            </span>
            <span className="flex gap-3">
              <h1 className="font-semibold">ข้อตกลงหรือสัญญา :</h1>{" "}
              <p className="text-[#97B8F3]">ไม่มี</p>
            </span>
          </div>
          <div className="flex  w-[70%] items-center gap-5">
            <span className="flex gap-3">
              <h1 className="font-semibold">Keyword ในการค้นหา:</h1>{" "}
              <p className="text-[#97B8F3]">
                Gamification, English Learning, TESOL, EFL
              </p>
            </span>
          </div>
          <div className="flex  w-[70%] items-center gap-5">
            <span className="flex gap-3">
              <h1 className="font-semibold">ฐานข้อมูลในการสืบค้น:</h1>{" "}
              <p className="text-[#97B8F3]">www.ipthailand.go.th </p>
            </span>
          </div>
          <div className="flex  w-[70%] items-center gap-5">
            <span className="flex gap-3">
              <h1 className="font-semibold">ผลของการสืบค้น:</h1>{" "}
              <p className="text-[#97B8F3]">
                เหมือนหรือคล้ายกับงานที่ปรากฏอยู่ก่อนแล้ว
              </p>
            </span>
          </div>
          <div className="flex  w-[70%] items-center gap-5">
            <span className="flex gap-3">
              <h1 className="min-w-[15rem] font-semibold">
                สิทธิบัตรหรืออนุสิทธิบัตรที่เกี่ยวข้อง:
              </h1>{" "}
              <p className="text-start text-[#97B8F3]">
                (วารสารวิชาการ) ชื่อที่แสดงถึงการประดิษฐ์, ชื่อวารสาร,
                วันที่เผยแพร่ / ( สิทธิบัตรหรืออนุสิทธิบัตร)
                ชื่อที่แสดงถึงการประดิษฐ์, เลขที่คำขอ/เลขที่สิทธิบัตร, ประเทศ
              </p>
            </span>
          </div>

          <div className="flex  w-[70%] items-center gap-5">
            <span className="flex gap-3">
              <h1 className="font-semibold">
                การประดิษฐ์นี้เคยนำไปยื่นขอรับสิทธิบัตรหรืออนุสิทธิบัตรหรือไม:
              </h1>{" "}
              <p className="text-[#97B8F3]">ไม่เคย</p>
            </span>
          </div>
          <div className="flex  w-[70%] items-center gap-5">
            <span className="flex gap-3">
              <h1 className="font-semibold">
                การเปิดเผยสาระสำคัญของการประดิษฐ์/การเผยแพร่ผลงาน:
              </h1>{" "}
              <p className="text-[#97B8F3]">
                ยังไม่เปิดเผยการประดิษฐ์/เผยแพร่ผลงาน
              </p>
            </span>
          </div>
          <div className="flex  w-[70%] items-center gap-5">
            <span className="flex gap-3">
              <h1 className="font-semibold">
                ข้อดีและลักษณะเฉพาะของการประดิษฐ์/งานวิจัยนี้:
              </h1>{" "}
              <p className="text-[#97B8F3]">
                ......................................
              </p>
            </span>
          </div>
          <div className="flex  w-[70%] items-center gap-5">
            <span className="flex gap-3">
              <h1 className="font-semibold">
                ข้อด้อยหรือข้อจำกัดของการประดิษฐ์/งานวิจัยนี้:
              </h1>{" "}
              <p className="text-[#97B8F3]">
                ......................................
              </p>
            </span>
          </div>
          <div className="flex  w-[70%] items-center gap-5">
            <span className="flex gap-3">
              <h1 className="font-semibold">
                ผลิตภัณฑ์/การประดิษฐ์/ผลงานที่ใกล้เคียงที่มีอยู่แล้วในตลาด:
              </h1>{" "}
              <p className="text-[#97B8F3]">
                ......................................
              </p>
            </span>
          </div>
          <div className="flex  w-[70%] items-center gap-5">
            <span className="flex gap-3">
              <h1 className="font-semibold">
                แผนการพัฒนาวิจัย/ต่อยอดการประดิษฐ์นี้ (ถ้ามี):
              </h1>{" "}
              <p className="text-[#97B8F3]">-</p>
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OutsiderDesignForm5;
