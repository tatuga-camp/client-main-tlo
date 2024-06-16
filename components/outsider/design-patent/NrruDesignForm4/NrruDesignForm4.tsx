import Number from "@/components/Number";
import { UseQueryResult } from "@tanstack/react-query";
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
import { IoTrashOutline } from "react-icons/io5";
import { ResponseGetDesignPatentService } from "../../../../services/design-patent/design-patent";
import SnackbarLoading from "../../../Snackbars/SnackBarLoading";
import {
  GetSignURLService,
  UploadSignURLService,
} from "../../../../services/google-storage";
import {
  CreateFileDesignPatentService,
  DeleteFileDesignPatentService,
} from "../../../../services/design-patent/file-design";
import { DocumentType, ErrorMessages } from "../../../../models";
import SnackbarNoSaveData from "../../../Snackbars/SnackBarNoSaveData";
import SnackbarSaveData from "../../../Snackbars/SnackbarSaveData";
import Swal from "sweetalert2";
import FileOnDesign from "./FileOnDesign";

type NrruDesignForm4Props = {
  design: UseQueryResult<ResponseGetDesignPatentService, Error>;
};
const NrruDesignForm4 = ({ design }: NrruDesignForm4Props) => {
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
    if (design.data) {
      setFiles(() => {
        return design.data.fileOnDesignPatents.map((file) => {
          return {
            id: file.id,
            url: file.url,
            documentType: file.documentType,
            type: file.type,
          };
        });
      });
    }
  }, [design.data]);

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

          await CreateFileDesignPatentService({
            type: file.file?.type as string,
            url: getSignURL.originalURL,
            documentType: file.documentType as DocumentType,
            size: file.file?.size as number,
            designPatentId: design.data?.id as string,
          });
        }
      }

      await design.refetch();

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
    fileOnDesignId,
  }: {
    url: string;
    fileOnDesignId?: string;
  }) => {
    try {
      setSnackBarData(() => {
        return {
          open: true,
          action: <SnackbarLoading />,
        };
      });
      if (fileOnDesignId) {
        await DeleteFileDesignPatentService({
          fileDesignPatentId: fileOnDesignId,
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
              สำเนาบัตรประจำตัวประชาชนของผู้ประดิษฐ์ทุกราย
              (พร้อมรับรองสำเนาถูกต้อง)
            </p>
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem]  md:gap-4 md:pl-10 md:text-base">
            <p className="-mt-2 font-semibold text-purple-500 md:-mt-4">
              1. กรณีผู้ขอรับสิทธิบัตร เป็นบุคคลธรรมดา
              แนบสำเนาบัตรประจำตัวประชาชนของผู้ขอรับสิทธิบัตร
              พร้อมรับรองสำเนาถูกต้อง โดยระบุข้อความ
              “ใช้ประกอบการยื่นคำขอด้านทรัพย์สินทางปัญญาเท่านั้น”
              ไม่ต้องระบุวันที่
            </p>
            <p className="-mt-2 font-semibold text-purple-500 md:-mt-4">
              2. กรณีผู้ขอรับสิทธิบัตร เป็นนิติบุคคลหรือหน่วยงานรัฐหรือมูลนิธิ
              แนบสำเนาบัตรประจำตัวประชาชนของผู้ขอรับสิทธิบัตร หรือ
              ผู้มีอำนาจในการลงนาม
              และสำเนาหนังสือรับรองนิติบุคคลที่ออกให้ไม่เกิน 6 เดือน
              หรือหนังสือแสดงการจัดตั้งหน่วยงาน โดยรับรองสำเนาถูกต้อง
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
                <Button
                  type="button"
                  className="rounded-md bg-[var(--secondary-yellow)] px-3 py-3 font-semibold shadow-md"
                >
                  อัพโหลดไฟล์ .pdf/.jpg
                </Button>
              </FileTrigger>
            </section>
          </div>
          <section className="ml-5 grid grid-cols-1 gap-2  md:grid-cols-2 lg:ml-0  xl:grid-cols-3 2xl:grid-cols-4">
            {...files
              ?.filter((file) => file.documentType === "IDCARD")
              .map((file) => {
                return (
                  <FileOnDesign
                    file={file}
                    key={file.url}
                    handleDeleteFile={handleDeleteFile}
                  />
                );
              })}
          </section>
        </section>

        {/* ข้อ 2*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={2} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              ภาพวาดหรือภาพถ่ายของผลิตภัณฑ์ จำนวน 7 ภาพ
            </p>
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem]  md:gap-4 md:pl-10 md:text-base">
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
                        { file: file, url: url, documentType: "PRODUCT" },
                      ];
                    });

                    reader.readAsDataURL(file);
                  });
                }}
              >
                <Button
                  type="button"
                  className="rounded-md bg-[var(--secondary-yellow)] px-3 py-3 font-semibold shadow-md"
                >
                  อัพโหลดไฟล์ .pdf/.jpg
                </Button>
              </FileTrigger>

              <button className="rounded-md bg-[#BED6FF] p-3 font-semibold duration-300 hover:bg-[#91B2EB]">
                ตัวอย่างการแสดงภาพของผลิตภัณฑ์ (คลิก)
              </button>
            </section>
          </div>
          <section className="ml-5 grid grid-cols-1 gap-2 md:grid-cols-2 lg:ml-0 xl:grid-cols-3 2xl:grid-cols-4">
            {...files
              ?.filter((file) => file.documentType === "PRODUCT")
              .map((file) => {
                return (
                  <FileOnDesign
                    file={file}
                    key={file.url}
                    handleDeleteFile={handleDeleteFile}
                  />
                );
              })}
          </section>
        </section>

        {/* ข้อ 3*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={3} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              เอกสารแนบอื่นๆ (ถ้ามี)
            </p>
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem]  md:gap-4 md:pl-10 md:text-base">
            <p className="-mt-2 font-medium md:-mt-4">
              เช่น หนังสือรับรองการเผยแพร่ผลงาน
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
                        { file: file, url: url, documentType: "OTHERS" },
                      ];
                    });

                    reader.readAsDataURL(file);
                  });
                }}
              >
                <Button
                  type="button"
                  className="rounded-md bg-[var(--secondary-yellow)] px-3 py-3 font-semibold shadow-md"
                >
                  อัพโหลดไฟล์ .pdf/.jpg
                </Button>
              </FileTrigger>
            </section>
          </div>
          <section className="ml-5 grid grid-cols-1 gap-2  md:grid-cols-2 lg:ml-0  xl:grid-cols-3 2xl:grid-cols-4">
            {...files
              ?.filter((file) => file.documentType === "OTHERS")
              .map((file) => {
                return (
                  <FileOnDesign
                    file={file}
                    key={file.url}
                    handleDeleteFile={handleDeleteFile}
                  />
                );
              })}
          </section>
        </section>
        {snackBarData.open && snackBarData.action}
      </Form>
    </div>
  );
};

export default NrruDesignForm4;
