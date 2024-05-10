import React, { useState } from "react";
import { Input, Label, TextField } from "react-aria-components";
import { FiPlusCircle } from "react-icons/fi";

function SearchWorkInvention() {
  const [activeContent, setActiveContent] = useState(1);
  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
    contentNumber: number,
  ) => {
    e.preventDefault();
    setActiveContent(contentNumber);
  };
  return (
    <section className="flex w-full flex-col gap-3 md:pl-10">
      <p className="font-semibold md:min-w-52">
        9.4 สิทธิบัตรหรืออนุสิทธิบัตรที่เกี่ยวข้องที่ได้จากการสืบค้น
        หรืองานที่ปรากฏอยู่ก่อน
      </p>
      <div className="flex flex-col items-center justify-center md:w-full">
        <div className="flex w-[80%] flex-col items-center justify-center md:w-[60%]">
          <section className="flex w-full flex-col gap-2 md:flex-row">
            <button
              onClick={(e) => handleClick(e, 1)}
              className={`w-full border-[1px]  border-solid border-[#BED6FF] px-5 py-2 font-medium md:min-w-52 ${
                activeContent === 1
                  ? "bg-[#BED6FF] text-[var(--primary-blue)]"
                  : "bg-white text-[#78A9FF] "
              }`}
            >
              สิทธิบัตรหรืออนุสิทธิบัตร
            </button>
            <button
              onClick={(e) => handleClick(e, 2)}
              className={`w-full border-[1px] border-solid border-[#BED6FF] px-5 py-2 font-medium md:min-w-52 ${
                activeContent === 2
                  ? "bg-[#BED6FF] text-[var(--primary-blue)]"
                  : "bg-white text-[#78A9FF] "
              }`}
            >
              วารสารวิชาการ
            </button>
            <button
              onClick={(e) => handleClick(e, 3)}
              className={`w-full border-[1px] border-solid border-[#BED6FF] px-5 py-2 font-medium md:min-w-52 ${
                activeContent === 3
                  ? "bg-[#BED6FF] text-[var(--primary-blue)]"
                  : "bg-white text-[#78A9FF] "
              }`}
            >
              อื่น ๆ
            </button>
          </section>
          <div className="mt-4 w-full items-center justify-center border-[1px] border-solid border-[#BED6FF] p-5 font-medium">
            {activeContent === 1 && (
              <section className="flex flex-col items-center gap-2">
                <TextField
                  className={
                    "ml-3 flex flex-col items-center gap-3 md:flex-row"
                  }
                >
                  <Label className="min-w-28  text-[var(--primary-blue)] md:min-w-44">
                    ชื่อที่แสดงถึงการประดิษฐ์ :
                  </Label>
                  <Input
                    name=""
                    type="text"
                    className="h-8 rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem] md:h-10 md:w-72 md:p-2  md:pl-4 md:text-base"
                    placeholder=""
                  />
                </TextField>
                <TextField
                  className={
                    "ml-3 flex flex-col items-center gap-3 md:flex-row"
                  }
                >
                  <Label className="min-w-28  text-[var(--primary-blue)] md:min-w-44">
                    เลขที่คำขอ/เลขที่สิทธิบัตร :
                  </Label>
                  <Input
                    name=""
                    type="text"
                    className="h-8 rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem] md:h-10 md:w-72 md:p-2  md:pl-4 md:text-base"
                    placeholder=""
                  />
                </TextField>
                <TextField
                  className={
                    "ml-3 flex flex-col items-center gap-3 md:flex-row"
                  }
                >
                  <Label className="min-w-28  text-[var(--primary-blue)] md:min-w-44">
                    ประเทศ :
                  </Label>
                  <Input
                    name=""
                    type="text"
                    className="h-8 rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem] md:h-10 md:w-72 md:p-2  md:pl-4 md:text-base"
                    placeholder=""
                  />
                </TextField>
                <button className="my-3 flex w-48 items-center justify-center gap-3 rounded-md bg-[#9747FF] p-2 text-xs font-semibold text-white duration-300 hover:bg-purple-700 md:px-3 md:py-2 md:text-base ">
                  <FiPlusCircle /> <p>เพิ่มข้อมูล</p>
                </button>
              </section>
            )}
            {activeContent === 2 && (
              <section className="flex flex-col items-center gap-2">
                <TextField
                  className={
                    "ml-3 flex flex-col items-center gap-3 md:flex-row"
                  }
                >
                  <Label className="min-w-28  text-[var(--primary-blue)] md:min-w-44">
                    ชื่อที่แสดงถึงการประดิษฐ์ :
                  </Label>
                  <Input
                    name=""
                    type="text"
                    className="h-8 rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem] md:h-10 md:w-72 md:p-2  md:pl-4 md:text-base"
                    placeholder=""
                  />
                </TextField>
                <TextField
                  className={
                    "ml-3 flex flex-col items-center gap-3 md:flex-row"
                  }
                >
                  <Label className="min-w-28  text-[var(--primary-blue)] md:min-w-44">
                    ชื่อวารสาร :
                  </Label>
                  <Input
                    name=""
                    type="text"
                    className="h-8 rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem] md:h-10 md:w-72 md:p-2  md:pl-4 md:text-base"
                    placeholder=""
                  />
                </TextField>
                <TextField
                  className={
                    "ml-3 flex flex-col items-center gap-3 md:flex-row"
                  }
                >
                  <Label className="min-w-28  text-[var(--primary-blue)] md:min-w-44">
                    วันที่เผยแพร่ :
                  </Label>
                  <Input
                    name=""
                    type="text"
                    className="h-8 rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem] md:h-10 md:w-72 md:p-2  md:pl-4 md:text-base"
                    placeholder=""
                  />
                </TextField>
                <button className="my-3 flex w-48 items-center justify-center gap-3 rounded-md bg-[#9747FF] p-2 text-xs font-semibold text-white duration-300 hover:bg-purple-700 md:px-3 md:py-2 md:text-base ">
                  <FiPlusCircle /> <p>เพิ่มข้อมูล</p>
                </button>
              </section>
            )}
            {activeContent === 3 && (
              <section className="flex flex-col items-center gap-2">
                <TextField
                  className={
                    "ml-3 flex flex-col items-center gap-3 md:flex-row"
                  }
                >
                  <Label className="min-w-28  text-[var(--primary-blue)] md:min-w-44">
                    ชื่อที่แสดงถึงการประดิษฐ์ :
                  </Label>
                  <Input
                    name=""
                    type="text"
                    className="h-8 rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem] md:h-10 md:w-72 md:p-2  md:pl-4 md:text-base"
                    placeholder=""
                  />
                </TextField>
                <TextField
                  className={
                    "ml-3 flex flex-col items-center gap-3 md:flex-row"
                  }
                >
                  <Label className="min-w-28  text-[var(--primary-blue)] md:min-w-44">
                    ชื่อแหล่งข้อมูล :
                  </Label>
                  <Input
                    name=""
                    type="text"
                    className="h-8 rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem] md:h-10 md:w-72 md:p-2  md:pl-4 md:text-base"
                    placeholder=""
                  />
                </TextField>
                <TextField
                  className={
                    "ml-3 flex flex-col items-center gap-3 md:flex-row"
                  }
                >
                  <Label className="min-w-28  text-[var(--primary-blue)] md:min-w-44">
                    วันที่เผยแพร่ :
                  </Label>
                  <Input
                    name=""
                    type="text"
                    className="h-8 rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem] md:h-10 md:w-72 md:p-2  md:pl-4 md:text-base"
                    placeholder=""
                  />
                </TextField>
                <button className="my-3 flex w-48 items-center justify-center gap-3 rounded-md bg-[#9747FF] p-2 text-xs font-semibold text-white duration-300 hover:bg-purple-700 md:px-3 md:py-2 md:text-base ">
                  <FiPlusCircle /> <p>เพิ่มข้อมูล</p>
                </button>
              </section>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SearchWorkInvention;
