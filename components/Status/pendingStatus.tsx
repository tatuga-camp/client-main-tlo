import React from "react";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { StatusInventionPatent } from "../../models";

function PendingStatus({
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
    <div className="relative flex h-60 flex-col items-center gap-3  lg:w-52">
      <span className="relative z-10 rounded-full bg-white text-[3rem]  text-slate-300 ">
        <RiCheckboxBlankCircleLine />
      </span>
      <section className="flex max-w-40 flex-col items-center gap-1">
        <h1 className="text-center text-[0.7rem] font-bold text-slate-400 lg:text-[0.9rem]">
          {status.title}
        </h1>
        <p className="text-xs text-slate-400">รอการดำเนินการ</p>
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

export default PendingStatus;
