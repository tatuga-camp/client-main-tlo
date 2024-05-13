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

const NrruCopyrightForm5 = () => {
  return (
    <div className=" min-w-[58rem] rounded-md  border-[1px] border-solid border-[#BED6FF] bg-white p-5 py-10 md:w-full md:p-10">
      <div className="flex w-full flex-col gap-3">
        <div className="max-w-60 bg-[#BED6FF] px-2 py-3 text-center font-bold md:ml-8">
          ข้อมูลทั่วไปของผู้ประดิษฐ์
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
              <h1 className="font-semibold">E-mail:</h1>{" "}
              <p className="text-[#97B8F3]">ploytitiworda.123@gmail.com</p>
            </span>
            <span className="flex gap-3">
              <h1 className="font-semibold">%ส่วนร่วม:</h1>{" "}
              <p className="text-[#97B8F3]">50</p>
            </span>
          </div>
        </section>

        <section className="my-5 flex w-full flex-col items-center gap-3">
          <div className="flex  w-[70%] items-center gap-5">
            <span className="flex gap-3">
              <h1 className="font-semibold">ชื่อ-สกุล:</h1>{" "}
              <p className="text-[#97B8F3]">ผศ.ดร.เฉลิมศรี จอกทอง</p>
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
              <h1 className="font-semibold">E-mail:</h1>{" "}
              <p className="text-[#97B8F3]">chl.123@nrru.ac.th </p>
            </span>
            <span className="flex gap-3">
              <h1 className="font-semibold">%ส่วนร่วม:</h1>{" "}
              <p className="text-[#97B8F3]">50</p>
            </span>
          </div>
        </section>

        <div className="max-w-60 bg-[#BED6FF] px-2 py-3 text-center font-bold md:ml-8">
          ข้อมูลของผลงานการประดิษฐ์
        </div>

        <section className="my-5 flex w-full flex-col items-center gap-3 text-[]">
          <div className="flex  w-[70%] items-center gap-5">
            <span className="flex gap-3">
              <h1 className="font-semibold">ชื่อผลงาน :</h1>{" "}
              <p className="text-[#97B8F3]">ชื่อผลงานภาษาไทย</p>
            </span>
            <span className="flex gap-3">
              <h1 className="font-semibold">ปีที่ทำการประดิษฐ์ :</h1>{" "}
              <p className="text-[#97B8F3]">2565-2567</p>
            </span>
          </div>
          <div className="flex  w-[70%] items-center gap-5">
            <span className="flex gap-3">
              <h1 className="font-semibold">ประเภทของงานอันมีลิขสิทธิ์:</h1>{" "}
              <p className="text-[#97B8F3]">ประเภทของงานอันมีลิขสิทธิ์</p>
            </span>
          </div>
          <div className="flex  w-[70%] items-center gap-5">
            <span className="flex gap-3">
              <h1 className="font-semibold">สิ่งที่ได้:</h1>{" "}
              <p className="text-[#97B8F3]">
                ระบบการทำงาน, สื่อการสอน, องค์ความร
              </p>
            </span>
          </div>
          <div className="flex  w-[70%] items-center gap-5">
            <span className="flex gap-3">
              <h1 className="font-semibold">ลักษณะการสร้างสรรค์:</h1>{" "}
              <p className="text-[#97B8F3]">ข้อมูลลักษณะการสร้างสรรค์ </p>
            </span>
          </div>
          <div className="flex  w-[70%] items-center gap-5">
            <span className="flex gap-3">
              <h1 className="font-semibold">สิ่งที่ได้จากการสร้างสรรค์:</h1>{" "}
              <p className="text-[#97B8F3]">ตัวผลิตภัณฑ์ โปรแกรมคอมพิวเตอร์</p>
            </span>
          </div>
          <div className="flex  w-[70%] items-center gap-5">
            <span className="flex gap-3">
              <h1 className="font-semibold">ทุนอุดหนุน:</h1>{" "}
              <p className="text-[#97B8F3]">
                ทุนอุดหนุนงบประมาณแผ่นดิน มหาวิทยาลัยราชภัฏนครราชสีมา
              </p>
            </span>
          </div>
          <div className="flex  w-[70%] items-center gap-5">
            <span className="flex gap-3">
              <h1 className="font-semibold">
                การยื่นขอความเป็นเจ้าของผลงานวิจัยและนวัตกรรมกับแหล่งให้ทุน:
              </h1>{" "}
              <p className="text-[#97B8F3]">-</p>
            </span>
          </div>
          <div className="flex  w-[70%] items-center gap-5">
            <span className="flex gap-3">
              <h1 className="font-semibold">การจัดทำสื่อสำหรับคนพิการ:</h1>{" "}
              <p className="text-[#97B8F3]">ไม่มี</p>
            </span>
          </div>
          <div className="flex  w-[70%] items-center gap-5">
            <span className="flex gap-3">
              <h1 className="font-semibold">
                การแจ้ง/จดทะเบียนลิขสิทธิ์ในต่างประเทศ:
              </h1>{" "}
              <p className="text-[#97B8F3]">ไม่เคย</p>
            </span>
          </div>
          <div className="flex  w-[70%] items-center gap-5">
            <span className="flex gap-3">
              <h1 className="font-semibold">การโฆษณางาน:</h1>{" "}
              <p className="text-[#97B8F3]">ยังไม่ได้โฆษณา</p>
            </span>
          </div>
          <div className="flex  w-[70%] items-center gap-5">
            <span className="flex gap-3">
              <h1 className="font-semibold">
                การอนุญาตให้ใช้สิทธิ์/โอนลิขสิทธิ:
              </h1>{" "}
              <p className="text-[#97B8F3]">
                ไม่เคยอนุญาตให้ใช้สิทธิ์/โอนลิขสิทธ์
              </p>
            </span>
          </div>
          <div className="flex  w-[70%] items-center gap-5">
            <span className="flex gap-3">
              <h1 className="font-semibold">รายละเอียดผลงานโดยย่อ:</h1>{" "}
              <p className="text-[#97B8F3]">
                .......................................................................................................
              </p>
            </span>
          </div>
        </section>

        <div className="max-w-60 bg-[#BED6FF] px-2 py-3 text-center font-bold md:ml-8">
          ข้อมูลประกอบการนำไปใช้
        </div>
        <section className="my-5 flex w-full flex-col items-center gap-3 text-[]">
          <div className="flex  w-[70%] items-center gap-5">
            <span className="flex gap-3">
              <h1 className="font-semibold">ระยะเวลาในการออกแบบ/การวิจัย:</h1>{" "}
              <p className="text-[#97B8F3]">2 ปี 4 เดือน</p>
            </span>
          </div>
          <div className="flex  w-[70%] items-center gap-5">
            <span className="flex gap-3">
              <h1 className="font-semibold">
                ค่าใช้จ่ายที่ใช้ในการประดิษฐ์ผลงาน/ดำเนินการวิจัย :
              </h1>{" "}
              <p className="text-[#97B8F3]">400,000 บาท</p>
            </span>
          </div>
          <div className="flex  w-[70%] items-center gap-5">
            <span className="flex gap-3">
              <h1 className="font-semibold">
                ผลงานนี้สามารถนำไปใช้ประโยชน์ในรูปแบบหรือลักษณะ:
              </h1>{" "}
              <p className="text-[#97B8F3]">
                การใช้ประโยชน์เชิงวิชาการ/ การใช้ประโยชน์เชิงสาธารณะ
              </p>
            </span>
          </div>
          <div className="flex  w-[70%] items-center gap-5">
            <span className="flex gap-3">
              <h1 className="font-semibold">
                หน่วยงาน/บริษัทที่สนใจ หรือคาดว่าจะสนใจ
                หรือเกี่ยวข้องกับการออกแบบผลิตภัณฑ์:
              </h1>{" "}
              <p className="text-[#97B8F3]">
                ชื่อบริษัท, ชื่อผู้ประสานงาน, เบอร์โทร
              </p>
            </span>
          </div>
          <div className="flex  w-[70%] items-center gap-5">
            <span className="flex gap-3">
              <h1 className="font-semibold">
                การประชาสัมพันธ์ผลงานการประดิษฐ์นี้โดยมหาวิทยาลัย:
              </h1>{" "}
              <p className="text-[#97B8F3]">ยินยอม</p>
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NrruCopyrightForm5;
