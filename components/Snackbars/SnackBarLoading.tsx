import React from "react";
import { IoIosSave } from "react-icons/io";

function SnackbarLoading() {
  return (
    <div
      className=" fixed bottom-2 left-2  flex w-60 animate-pulse cursor-pointer items-center
       justify-center gap-1 rounded-md bg-main-color p-2 font-Anuphan text-white 
       drop-shadow-md"
    >
      <div className="flex items-center justify-center gap-2 text-base">
        กำบันทึกข้อมูล..
      </div>
    </div>
  );
}

export default SnackbarLoading;
