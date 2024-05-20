import React from "react";
import { TbCircleFilled } from "react-icons/tb";
import { SelectStatus, StatusInventionPatent, User } from "../../../models";
import moment from "moment";

function InprogressStatus({
  status,
  setSelectStatus,
  setTriggerUpdateStatus,
  user,
}: {
  user?: User;
  status: SelectStatus;
  setSelectStatus: React.Dispatch<
    React.SetStateAction<SelectStatus | undefined>
  >;
  setTriggerUpdateStatus: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="relative flex h-60 flex-col items-center gap-3  lg:w-52">
      <span className="relative z-10 rounded-full border-[0.3rem] border-solid border-[#2166DD] bg-white text-[2.2rem] text-[#2166DD] ">
        <TbCircleFilled />
      </span>
      <section className="flex flex-col items-center gap-1">
        <p className="text-[0.65rem] font-semibold  text-green-500 lg:text-[0.85rem]">
          กำลังดำเนินการ
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
      {user?.role === "ADMIN" ? (
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
      ) : (
        <button
          onClick={() => {
            setTriggerUpdateStatus(true);
            setSelectStatus(status);
          }}
          className="absolute bottom-0 w-full rounded-md bg-[var(--secondary-yellow)] px-3 py-2 text-[0.65rem] font-semibold duration-200 hover:bg-yellow-400 lg:text-[0.85rem]"
        >
          ตรวจสอบ
        </button>
      )}
    </div>
  );
}

export default InprogressStatus;
