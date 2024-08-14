import React, { useState } from "react";
import {
  Button,
  FieldError,
  FileTrigger,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
} from "react-aria-components";
import { FiUploadCloud } from "react-icons/fi";
import { ErrorMessages, FileType } from "../../models";
import { BsFileEarmarkCode } from "react-icons/bs";
import { GrFormView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import {
  GetSignURLService,
  UploadSignURLService,
} from "../../services/google-storage";
import {
  CreateFileService,
  ResponseGetFileService,
} from "../../services/files";
import Swal from "sweetalert2";
import { UseQueryResult } from "@tanstack/react-query";
import { ConvertToImageJpeg } from "../../utilities/base64ToFile";
import { File as FileModel } from "../../models/files";

type CreateDownloadProps = {
  setTrigger: (value: boolean) => void;
  filesDocuments: UseQueryResult<
    {
      title: string;
      items: FileModel[] | undefined;
    }[],
    Error
  >;
};
function CreateDownload({ setTrigger, filesDocuments }: CreateDownloadProps) {
  const [files, setFiles] = useState<
    {
      id?: string;
      url: string;
      fileType: FileType;
      type?: string;
      file?: File;
    }[]
  >([]);
  const [fileMetadata, setFileMetadata] = useState<{
    title: string;
    description: string;
  }>({
    title: "",
    description: "",
  });
  const handleUploadFile = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      Swal.fire({
        title: "กำลังดำเนินการอัพโหลดไฟล์",
        html: "กรุณารอสักครู่",
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      if (files.length === 0) {
        throw new Error("กรุณาเลือกไฟล์ที่ต้องการอัพโหลด");
      }

      for (let file of files) {
        if (file.file?.type === "") {
          file.file = await ConvertToImageJpeg({ file: file.file });
        }
        const getSignURL = await GetSignURLService({
          fileName: file.file?.name as string,
          fileType: file.file?.type as string,
        });

        await UploadSignURLService({
          contentType: file.file?.type as string,
          file: file.file as File,
          signURL: getSignURL.signURL,
        });
        await CreateFileService({
          type: file.file?.type as string,
          url: getSignURL.originalURL,
          title: fileMetadata.title,
          description: fileMetadata.description,
          fileType: file.fileType,
          size: file.file?.size as number,
        });
      }

      await filesDocuments.refetch();
      Swal.fire({
        title: "อัพโหลดไฟล์สำเร็จ",
        icon: "success",
      });
      setTrigger(false);
      document.body.style.overflow = "auto";
    } catch (error) {
      let result = error as ErrorMessages;
      Swal.fire({
        title: result.error ? result.error : "เกิดข้อผิดพลาด",
        text: result.message.toString(),
        footer: result.statusCode
          ? "รหัสข้อผิดพลาด: " + result.statusCode?.toString()
          : "",
        icon: "error",
      });
    }
  };
  return (
    <div
      className="fixed bottom-0 left-0 right-0 top-0 z-50 m-auto 
  flex h-screen w-screen flex-col items-center justify-center"
    >
      <Form
        onSubmit={handleUploadFile}
        className="flex  h-max w-80 flex-col items-start gap-2 rounded-md bg-white p-3 ring-1 ring-main-color
        drop-shadow-xl md:w-96"
      >
        <TextField isRequired className="w-full text-base text-main-color">
          ชื่อไฟล์
          <Input
            onChange={(e) => {
              setFileMetadata((prev) => {
                return { ...prev, title: e.target.value };
              });
            }}
            value={fileMetadata.title}
            required
            type="text"
            maxLength={999}
            className="w-full rounded-md p-2 text-base font-normal ring-1 ring-black"
          />
          <FieldError className="text-sm text-red-700" />
        </TextField>

        <Label className="w-full text-base text-main-color">
          คำอธิบาย
          <TextArea
            onChange={(e) => {
              setFileMetadata((prev) => {
                return { ...prev, description: e.target.value };
              });
            }}
            value={fileMetadata.description}
            maxLength={1999}
            className="w-full resize-none rounded-md p-2 text-base font-normal ring-1 ring-black"
          />
          <FieldError className="text-sm text-red-700" />
        </Label>

        <FileTrigger
          allowsMultiple
          onSelect={(e) => {
            if (!e) return null;

            const files: FileList = e;
            Array.from(files).forEach((file) => {
              const url = URL.createObjectURL(file);
              const reader = new FileReader();

              setFiles((prev) => {
                return [
                  ...prev,
                  { file: file, url: url, fileType: "DOCUMENT" },
                ];
              });

              reader.readAsDataURL(file);
            });
          }}
        >
          <Button className="btn-download">
            <FiUploadCloud /> เลือก ไฟล์
          </Button>
        </FileTrigger>

        <div className=" grid max-h-40 w-full gap-2 overflow-y-auto">
          {files.map((file, index) => (
            <div
              key={file.url}
              className="flex h-10 w-full items-center justify-between gap-5 rounded-md
border-[1px] border-solid border-[#cbdbf9] bg-white p-2 "
            >
              <div className="flex justify-center gap-1">
                <div className="flex items-center justify-center text-black">
                  <BsFileEarmarkCode />
                </div>
                <span className="w-max max-w-48 truncate text-sm ">
                  {file.file?.name}
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
                  onClick={() =>
                    setFiles((prev) => {
                      return prev.filter((f, i) => f.url !== file.url);
                    })
                  }
                  className=" z-10 flex cursor-pointer 
items-center justify-center gap-2 rounded-md bg-red-500 p-1  text-xl text-white"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-2 flex w-full justify-center">
          <Button
            type="submit"
            className="w-40 rounded-md py-1 font-Anuphan ring-1 ring-main-color transition duration-150
           hover:bg-main-color hover:text-white active:scale-105"
          >
            ยืนยัน
          </Button>
        </div>
      </Form>
      <footer
        onClick={() => {
          setTrigger(false);
          document.body.style.overflow = "auto";
        }}
        className="fixed bottom-0 left-0 right-0 top-0  -z-10 m-auto
       h-screen w-screen bg-white/40 backdrop-blur-md"
      ></footer>
    </div>
  );
}

export default CreateDownload;
