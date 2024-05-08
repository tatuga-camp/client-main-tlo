import React from "react";
import { FileWorkType } from "../../../../models";
import { BsFileEarmarkCode } from "react-icons/bs";
import { GrFormView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";

type FileOnWorkInventionProps = {
  file: {
    id?: string | undefined;
    url: string;
    name?: FileWorkType | undefined;
    type?: string | undefined;
    file?: File | undefined;
  };
  handleDeleteFile: (url: string) => void;
};
function FileOnWorkInvention({
  file,
  handleDeleteFile,
}: FileOnWorkInventionProps) {
  const fileName = file?.url?.split("/").pop();

  return (
    <div
      key={file.url}
      className="relative flex  h-10 w-full cursor-pointer select-none items-center
      justify-between gap-2  rounded-md bg-main-color px-5 text-white transition  
   duration-75 hover:drop-shadow-lg "
    >
      <div className="flex justify-center gap-1">
        <div className="flex items-center justify-center text-white">
          <BsFileEarmarkCode />
        </div>
        <span className="w-max max-w-[7rem] truncate text-sm md:max-w-40 ">
          {file?.id ? fileName : file.file?.name}
        </span>
      </div>
      <div className="flex gap-2">
        <div
          onClick={() => window.open(file.url, "_blank")}
          className=" z-10 flex
   cursor-pointer items-center justify-center gap-2 rounded-md bg-green-500 p-1  text-xl text-white"
        >
          <GrFormView />
        </div>
        <button
          type="button"
          onClick={() => handleDeleteFile(file.url)}
          className=" z-10 flex cursor-pointer 
   items-center justify-center gap-2 rounded-md bg-red-500 p-1  text-xl text-white"
        >
          <MdDelete />
        </button>
      </div>
    </div>
  );
}

export default FileOnWorkInvention;
