import React from "react";
import { IoIosSave } from "react-icons/io";

function SnackbarSaveData() {
  return (
    <button
      type="submit"
      className="fixed bottom-2 left-2 flex w-60  cursor-pointer items-center justify-center gap-1 rounded-md  bg-main-color p-2 font-Anuphan text-white ring-gray-400 
      drop-shadow-md  transition duration-100 hover:animate-none hover:ring-2 active:scale-110"
    >
      <div className="flex items-center justify-center gap-2 text-base">
        โปรดบันทึกข้อมูล
        <IoIosSave />
      </div>
    </button>
  );
}

export default SnackbarSaveData;
