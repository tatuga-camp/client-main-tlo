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
import { HiOutlinePhotograph } from "react-icons/hi";

const TrademarkForm4 = () => {
  return (
    <div className=" min-w-[58rem] rounded-md  border-[1px] border-solid border-[#BED6FF] bg-white p-5 py-10 md:w-full md:p-10">
      <div className="flex w-full flex-col gap-3">
        <div className="max-w-60 bg-[#BED6FF] px-2 py-3 text-center font-bold md:ml-8">
          ข้อมูลเจ้าของ
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
              <h1 className="font-semibold">สถานะ:</h1>{" "}
              <p className="text-[#97B8F3]">บุคลากรสายวิชาการ</p>
            </span>
          </div>
          <div className="flex  w-[70%] items-center gap-5">
            <span className="flex gap-3">
              <h1 className="font-semibold">สังกัด :</h1>{" "}
              <p className="text-[#97B8F3]">ภาษาอังกฤษ</p>
            </span>
            <span className="flex gap-3">
              <h1 className="font-semibold">คณะ:</h1>{" "}
              <p className="text-[#97B8F3]">มนุษยศาสตร์และสังคมศาสตร์</p>
            </span>
            <span className="flex gap-3">
              <h1 className="font-semibold">โทรศัพท์ :</h1>{" "}
              <p className="text-[#97B8F3]">0955378892</p>
            </span>
          </div>
          <div className="flex  w-[70%] items-center gap-5">
            <span className="flex gap-3">
              <h1 className="font-semibold">สัญชาติ:</h1>{" "}
              <p className="text-[#97B8F3]">ไทย</p>
            </span>
            <span className="flex gap-3">
              <h1 className="font-semibold">E-mail:</h1>{" "}
              <p className="text-[#97B8F3]">ploytitiworda.123@gmail.com</p>
            </span>
          </div>
        </section>

        <div className="max-w-60 bg-[#BED6FF] px-2 py-3 text-center font-bold md:ml-8">
          รายละเอียดของเครื่องหมาย
        </div>
        <section className="my-5 flex w-full flex-col items-center gap-3 text-[]">
          <div className="flex  w-[70%] items-center gap-5">
            <span className="flex gap-3">
              <h1 className="font-semibold">ชื่อเครื่องหมาย:</h1>{" "}
              <p className="text-[#97B8F3]">ชื่อผลงานภาษาไทย</p>
            </span>
            <span className="flex gap-3">
              <h1 className="font-semibold">ประเภทของเครื่องหมายการค้า:</h1>{" "}
              <p className="text-[#97B8F3]">ประเภทของครื่องหมายการค้า</p>
            </span>
          </div>
          <div className="flex  w-[70%] items-center gap-5">
            <span className="flex gap-3">
              <h1 className="font-semibold">ภาพเครื่องหมาย :</h1> {/* Pics */}
              <div className="flex h-32 w-32 items-center justify-center rounded-md border-2 border-solid border-[#BED6FF] text-4xl">
                <HiOutlinePhotograph />
              </div>
              <div className="flex h-32 w-32 items-center justify-center rounded-md border-2 border-solid border-[#BED6FF] text-4xl">
                <HiOutlinePhotograph />
              </div>
              <div className="flex h-32 w-32 items-center justify-center rounded-md border-2 border-solid border-[#BED6FF] text-4xl">
                <HiOutlinePhotograph />
              </div>
              <div className="flex h-32 w-32 items-center justify-center rounded-md border-2 border-solid border-[#BED6FF] text-4xl">
                <HiOutlinePhotograph />
              </div>
            </span>
          </div>
          <div className="flex  w-[70%] items-center gap-5">
            <span className="flex gap-3">
              <h1 className="font-semibold">คำอ่าน:</h1>{" "}
              <p className="text-[#97B8F3]">คำอ่าน</p>
            </span>
            <span className="flex gap-3">
              <h1 className="font-semibold">คำแปล:</h1>{" "}
              <p className="text-[#97B8F3]">คำแปลภาษาไทย</p>
            </span>
          </div>
          <div className="flex  w-[70%] items-center gap-5">
            <span className="flex gap-3">
              <h1 className="font-semibold">ผู้ประกอบการ OTOP:</h1>{" "}
            </span>
          </div>
          <div className="flex  w-[70%] items-center gap-5">
            <span className="flex gap-3">
              <h1 className="font-semibold">เลขทะเบียน OTOP:</h1>{" "}
              <p className="text-[#97B8F3]">SMEs</p>
            </span>
            <span className="flex gap-3">
              <h1 className="font-semibold">ประเภทของเครื่องหมายการค้า:</h1>{" "}
              <p className="text-[#97B8F3]"> เลขทะเบียน OTOP</p>
            </span>
          </div>
          <div className="flex  w-[70%] items-center gap-5">
            <span className="flex gap-3">
              <h1 className="font-semibold">
                การขอจดทะเบียนเครื่องหมายที่มีลักษณะเป็นกลุ่มของสี:
              </h1>{" "}
              <p className="text-[#97B8F3]">ไม่ขอรับความคุ้มครอง</p>
            </span>
          </div>
          <div className="flex  w-[70%] items-center gap-5">
            <span className="flex gap-3">
              <h1 className="font-semibold">
                การขอจดทะเบียนเครื่องหมายที่มีลักษณะเป็นรูปร่างหรือรูปทรงของวัตถุ:
              </h1>{" "}
              <p className="text-[#97B8F3]">ไม่ขอรับความคุ้มครอง</p>
            </span>
          </div>
          <div className="flex  w-[70%] items-center gap-5">
            <span className="flex gap-3">
              <h1 className="font-semibold">
                การใช้เครื่องหมายโดยการจำหน่าย เผยแพร่ หรือโฆษณาก่อนยื่นคำขอนี้:
              </h1>{" "}
              <p className="text-[#97B8F3]">ไม่เคยใช้หรืออนุญาตให้ใช้</p>
            </span>
          </div>
          <div className="flex  w-[70%] items-center gap-5">
            <span className="flex flex-col gap-3">
              <h1 className="font-semibold">
                การขอใหถือวาวันที่ยื่นคําขอนอกราชอาณาจักรครั้งแรกเป็นวันยื่นคําขอในราชอาณาจักร/การขอใหถือวาวันที่นําสินค้าที่ใชเครื่องหมายการคาออกแสดงในงานแสดงสินคา
                ระหว่างประเทศ:
              </h1>{" "}
              <p className="text-[#97B8F3]">ไม่ขอรับความคุมครอง</p>
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TrademarkForm4;
