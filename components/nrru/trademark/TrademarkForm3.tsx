import Number from "@/components/Number";
import React, { useEffect, useState } from "react";
import {
  Button,
  FieldError,
  FileTrigger,
  Form,
  Input,
  Label,
  TextField,
} from "react-aria-components";
import { InputMask, InputMaskChangeEvent } from "primereact/inputmask";
import { FiPlusCircle } from "react-icons/fi";
import Checkbox from "@mui/material/Checkbox";
import { IoTrashOutline } from "react-icons/io5";
import { UseQueryResult } from "@tanstack/react-query";
import { ResponseGetTrademarkService } from "../../../services/trademark/trademark";
import { DocumentType, ErrorMessages } from "../../../models";
import SnackbarLoading from "../../Snackbars/SnackBarLoading";
import {
  GetSignURLService,
  UploadSignURLService,
} from "../../../services/google-storage";
import {
  CreateFileTrademarkervice,
  DeleteFileTrademarkervice,
} from "../../../services/trademark/file-trademark";
import SnackbarNoSaveData from "../../Snackbars/SnackBarNoSaveData";
import SnackbarSaveData from "../../Snackbars/SnackbarSaveData";
import Swal from "sweetalert2";
import FileOnTrademark from "./FileOnTrademark";

type TrademarkForm3Props = {
  trademark: UseQueryResult<ResponseGetTrademarkService, Error>;
};
const TrademarkForm3 = ({ trademark }: TrademarkForm3Props) => {
  const [snackBarData, setSnackBarData] = useState<{
    open: boolean;
    action: React.ReactNode;
  }>({
    open: false,
    action: <></>,
  });
  const [files, setFiles] = useState<
    {
      id?: string;
      url: string;
      documentType: DocumentType;
      type?: string;
      file?: File;
    }[]
  >([]);

  useEffect(() => {
    if (trademark.data) {
      setFiles(() => {
        return trademark.data?.fileOnTrademarks.map((file) => {
          return {
            id: file.id,
            url: file.url,
            documentType: file.documentType,
            type: file.type,
          };
        });
      });
    }
  }, [trademark.data]);

  const handleUploadFile = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setSnackBarData(() => {
        return {
          open: true,
          action: <SnackbarLoading />,
        };
      });
      const filterFiles = files?.filter((file) => !file.id);
      if (filterFiles) {
        for (const file of filterFiles) {
          const getSignURL = await GetSignURLService({
            fileName: file.file?.name as string,
            fileType: file.file?.type as string,
          });

          await UploadSignURLService({
            contentType: file.file?.type as string,
            file: file.file as File,
            signURL: getSignURL.signURL,
          });

          await CreateFileTrademarkervice({
            type: file.file?.type as string,
            url: getSignURL.originalURL,
            documentType: file.documentType as DocumentType,
            size: file.file?.size as number,
            trademarkId: trademark.data?.id as string,
          });
        }
      }

      await trademark.refetch();

      setSnackBarData(() => {
        return {
          open: true,
          action: <SnackbarNoSaveData />,
        };
      });
    } catch (error) {
      setSnackBarData(() => {
        return {
          open: true,
          action: <SnackbarSaveData />,
        };
      });
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

  const handleDeleteFile = async ({
    url,
    fileOnTrademarkId,
  }: {
    url: string;
    fileOnTrademarkId?: string;
  }) => {
    try {
      setSnackBarData(() => {
        return {
          open: true,
          action: <SnackbarLoading />,
        };
      });
      if (fileOnTrademarkId) {
        await DeleteFileTrademarkervice({
          fileTrademarkId: fileOnTrademarkId,
        });
        setFiles((prev) => {
          return [...prev?.filter((file) => file.url !== url)];
        });
      } else {
        setFiles((prev) => {
          return [...prev?.filter((file) => file.url !== url)];
        });
      }
      setSnackBarData(() => {
        return {
          open: true,
          action: <SnackbarNoSaveData />,
        };
      });
    } catch (error) {
      setSnackBarData(() => {
        return {
          open: true,
          action: <SnackbarSaveData />,
        };
      });
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
    <div className=" w-full  rounded-md border-[1px] border-solid border-[#BED6FF] bg-white p-5 py-10 md:p-10">
      <Form
        onSubmit={handleUploadFile}
        className="mx-0 my-5 flex flex-col gap-5 md:mx-5 md:my-10 "
      >
        {/* ข้อ 1*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={1} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              กรณีเป็นบุคคลธรรมดา
            </p>
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem]  md:gap-4 md:pl-10 md:text-base">
            <p className="-mt-2 font-semibold text-purple-500 md:-mt-4">
              แนบสำเนาบัตรประจำตัวประชาชนของเจ้าของ โดยรับรองสำเนาถูกต้อง
              ระบุข้อความ “ใช้ประกอบการยื่นคำขอด้านทรัพย์สินทางปัญญาเท่านั้น”
              ไม่ต้องระบุวันที่
            </p>
            <section className="flex flex-col gap-2 md:flex-row md:items-start">
              <FileTrigger
                allowsMultiple
                onSelect={(e) => {
                  if (!e) return null;
                  setSnackBarData(() => {
                    return {
                      open: true,
                      action: <SnackbarSaveData />,
                    };
                  });
                  const files: FileList = e;
                  Array.from(files).forEach((file) => {
                    const url = URL.createObjectURL(file);
                    const reader = new FileReader();

                    setFiles((prev) => {
                      return [
                        ...prev,
                        { file: file, url: url, documentType: "IDCARD" },
                      ];
                    });

                    reader.readAsDataURL(file);
                  });
                }}
              >
                <Button className="rounded-md bg-[var(--secondary-yellow)] px-3 py-3 font-semibold shadow-md">
                  อัพโหลดไฟล์ .pdf/.jpg
                </Button>
              </FileTrigger>
            </section>
            <section className=" grid grid-cols-1 gap-2 lg:ml-0  lg:grid-cols-3 2xl:grid-cols-4">
              {...files
                ?.filter((file) => file.documentType === "IDCARD")
                .map((file) => {
                  return (
                    <FileOnTrademark
                      file={file}
                      key={file.url}
                      handleDeleteFile={handleDeleteFile}
                    />
                  );
                })}
            </section>
          </div>
        </section>

        {/* ข้อ 2*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={2} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              กรณีเป็นนิติบุคคลหรือส่วนราชการไทย
            </p>
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem]  md:gap-4 md:pl-10 md:text-base">
            <p className="-mt-2 font-semibold text-purple-500 md:-mt-4">
              แนบสำเนาบัตรประจำตัวประชาชนของเจ้าของหรือผู้มีอำนาจในการลงนาม
              และสำเนาหนังสือรับรองนิติบุคคลที่ออกให้ไม่เกิน 6 เดือน
              โดยรับรองสำเนาถูกต้อง ระบุข้อความ
              “ใช้ประกอบการยื่นคำขอด้านทรัพย์สินทางปัญญาเท่านั้น”
              ไม่ต้องระบุวันที่
            </p>
            <section className="flex flex-col gap-2 md:flex-row md:items-start">
              <FileTrigger
                allowsMultiple
                onSelect={(e) => {
                  if (!e) return null;
                  setSnackBarData(() => {
                    return {
                      open: true,
                      action: <SnackbarSaveData />,
                    };
                  });
                  const files: FileList = e;
                  Array.from(files).forEach((file) => {
                    const url = URL.createObjectURL(file);
                    const reader = new FileReader();

                    setFiles((prev) => {
                      return [
                        ...prev,
                        { file: file, url: url, documentType: "COPORATE" },
                      ];
                    });

                    reader.readAsDataURL(file);
                  });
                }}
              >
                <Button className="rounded-md bg-[var(--secondary-yellow)] px-3 py-3 font-semibold shadow-md">
                  อัพโหลดไฟล์ .pdf/.jpg
                </Button>
              </FileTrigger>
            </section>
            <section className=" grid grid-cols-1 gap-2 lg:ml-0  lg:grid-cols-3 2xl:grid-cols-4">
              {...files
                ?.filter((file) => file.documentType === "COPORATE")
                .map((file) => {
                  return (
                    <FileOnTrademark
                      file={file}
                      key={file.url}
                      handleDeleteFile={handleDeleteFile}
                    />
                  );
                })}
            </section>
          </div>
        </section>

        {/* ข้อ 3*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={3} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              กรณีเป็นกลุ่มวิสาหกิจชุมชนหรือกลุ่มผู้ประกอบการ OTOP
            </p>
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem]  md:gap-4 md:pl-10 md:text-base">
            <p className="-mt-2 font-semibold text-purple-500 md:-mt-4">
              แนบสำเนาบัตรประจำตัวประชาชนของหัวหน้ากลุ่มหรือผู้มีอำนาจในการลงนาม
              พร้อมสำเนาเอกสารแสดงการจัดตั้งกลุ่มวิสาหกิจหรือกลุ่ม OTOP
              และสรุปรายงานการประชุม ซึ่งมีมติการประชุม
              เกี่ยวกับผู้มีอำนาจในการลงนามเอกสารคำขอเครื่องหมายการค้า
            </p>
            <section className="flex flex-col gap-2 md:flex-row md:items-start">
              <FileTrigger
                allowsMultiple
                onSelect={(e) => {
                  if (!e) return null;
                  setSnackBarData(() => {
                    return {
                      open: true,
                      action: <SnackbarSaveData />,
                    };
                  });
                  const files: FileList = e;
                  Array.from(files).forEach((file) => {
                    const url = URL.createObjectURL(file);
                    const reader = new FileReader();

                    setFiles((prev) => {
                      return [
                        ...prev,
                        { file: file, url: url, documentType: "OTOP" },
                      ];
                    });

                    reader.readAsDataURL(file);
                  });
                }}
              >
                <Button className="rounded-md bg-[var(--secondary-yellow)] px-3 py-3 font-semibold shadow-md">
                  อัพโหลดไฟล์ .pdf/.jpg
                </Button>
              </FileTrigger>
            </section>
            <section className=" grid grid-cols-1 gap-2 lg:ml-0  lg:grid-cols-3 2xl:grid-cols-4">
              {...files
                ?.filter((file) => file.documentType === "OTOP")
                .map((file) => {
                  return (
                    <FileOnTrademark
                      file={file}
                      key={file.url}
                      handleDeleteFile={handleDeleteFile}
                    />
                  );
                })}
            </section>
          </div>
        </section>
        {snackBarData.open && snackBarData.action}
      </Form>
    </div>
  );
};

export default TrademarkForm3;
