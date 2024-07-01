import React from "react";
import { IoIosSave } from "react-icons/io";

function SnackbarNoSaveData() {
  return (
    <div
      className=" fixed bottom-2 left-2 z-50  flex w-60 cursor-pointer items-center justify-center
       gap-1 rounded-md bg-green-600 p-2 font-Anuphan text-white 
      ring-green-600  drop-shadow-md transition duration-100 hover:ring-2 active:scale-110"
    >
      <div className="flex items-center justify-center gap-2 text-base">
        ข้อมูลถูกบันทึกแล้ว
      </div>
    </div>
  );
}

export default SnackbarNoSaveData;
