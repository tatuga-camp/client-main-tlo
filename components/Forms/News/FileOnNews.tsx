import React from "react";
import { BsFileEarmarkCode } from "react-icons/bs";
import { GrFormView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";

type FileOnNewsProps = {
  file: {
    id?: string | undefined;
    url: string;
    type?: string | undefined;
    file?: File | undefined;
  };
  handleDeleteFile?: ({
    url,
    fileOnWorkId,
  }: {
    url: string;
    fileOnWorkId?: string;
  }) => Promise<void>;
};
function FileOnNews({ file, handleDeleteFile }: FileOnNewsProps) {
  const fileName = file?.url?.split("/").pop();

  return (
    <div
      key={file.url}
      className="flex w-full items-center justify-between rounded-md border-[1px] border-solid border-[#cbdbf9] bg-white p-2 "
    >
      <div className="flex justify-center gap-1">
        <div className="flex items-center justify-center text-black">
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
        {handleDeleteFile && (
          <button
            type="button"
            onClick={() =>
              handleDeleteFile({ url: file.url, fileOnWorkId: file.id })
            }
            className=" z-10 flex cursor-pointer 
   items-center justify-center gap-2 rounded-md bg-red-500 p-1  text-xl text-white"
          >
            <MdDelete />
          </button>
        )}
      </div>
    </div>
  );
}

export default FileOnNews;
