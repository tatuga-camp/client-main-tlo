import React from "react";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { StatusInventionPatent } from "../../models";
import moment from "moment";

function SuccessfulStatus({
  status,
  setTriggerUpdateStatus,
  setSelectStatus,
}: {
  status: StatusInventionPatent;
  setSelectStatus: React.Dispatch<
    React.SetStateAction<StatusInventionPatent | undefined>
  >;
  setTriggerUpdateStatus: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="relative flex h-60  flex-col items-center gap-3  lg:w-52">
      <div className="absolute right-[2.2rem] top-5 z-10  h-[0.3rem] w-full bg-[#2166DD]"></div>
      <div className="absolute left-[2.2rem]  top-5 z-10 h-[0.3rem] w-full bg-[#2166DD]"></div>
      <span className=" relative z-10 rounded-full bg-white  text-[3rem] text-[#2166DD]  ">
        <RiCheckboxCircleFill />
      </span>
      <section className="flex flex-col items-center gap-1">
        <p className="text-[0.65rem] font-semibold text-green-500 lg:text-[0.85rem]">
          สำเร็จ
        </p>
        <h1 className="text-center text-[0.7rem] font-bold text-[#2166DD]  lg:text-[0.9rem]">
          {status.title}
        </h1>
        <p className="text-xs text-[#759de3]">
          {moment(status.updateAt).format("DD/MM/YYYY")}
        </p>
        <p className="text-xs text-[#759de3]">
          {moment(status.updateAt).format("HH:mm")}
        </p>
      </section>
      <button
        onClick={() => {
          setTriggerUpdateStatus(true);
          setSelectStatus(status);
        }}
        className="absolute bottom-0 w-full rounded-md bg-[#BED6FF] px-3 py-2 text-[0.65rem]
       font-semibold duration-200 hover:bg-blue-300 lg:text-[0.85rem]"
      >
        อัพเดทข้อมูล
      </button>
    </div>
  );
}

export default SuccessfulStatus;
