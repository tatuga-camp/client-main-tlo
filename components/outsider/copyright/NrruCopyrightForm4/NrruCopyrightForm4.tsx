import Number from "@/components/Number";
import React, { forwardRef, useEffect, useState } from "react";
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
import { ResponseGetCopyrightService } from "../../../../services/copyright/copyright";
import SnackbarLoading from "../../../Snackbars/SnackBarLoading";
import {
  GetSignURLService,
  UploadSignURLService,
} from "../../../../services/google-storage";
import {
  CreateFileCopyrightService,
  DeleteFileCopyrightService,
} from "../../../../services/copyright/file-copyright";
import { DocumentType, ErrorMessages } from "../../../../models";
import SnackbarNoSaveData from "../../../Snackbars/SnackBarNoSaveData";
import Swal from "sweetalert2";
import FileOnCopyright from "./FileOnCopyright";

type NrruCopyrightFormProps = {
  copyright: UseQueryResult<ResponseGetCopyrightService, Error>;
};
const NrruCopyrightForm4 = forwardRef(function CopyrightForm(
  { copyright }: NrruCopyrightFormProps,
  ref,
) {
  const formRef = React.useRef<HTMLFormElement>(null);

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
    if (copyright.data) {
      setFiles(() => {
        return copyright.data.fileOnCopyrights.map((file) => {
          return {
            id: file.id,
            url: file.url,
            documentType: file.documentType,
            type: file.type,
          };
        });
      });
    }
  }, [copyright.data]);

  const saveData = async () => {
    try {
      formRef.current?.addEventListener("submit", (e) => {
        e.preventDefault();
      });
      if (!formRef.current?.checkValidity()) {
        const invalidElement = formRef.current?.querySelector(":invalid");
        if (invalidElement) {
          invalidElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          (invalidElement as HTMLElement).focus();
        }
        return;
      }
      formRef.current?.requestSubmit();
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

          await CreateFileCopyrightService({
            type: file.file?.type as string,
            url: getSignURL.originalURL,
            documentType: file.documentType as DocumentType,
            size: file.file?.size as number,
            copyrightId: copyright.data?.id as string,
          });
        }
      }

      await copyright.refetch();

      setSnackBarData(() => {
        return {
          open: true,
          action: <SnackbarNoSaveData />,
        };
      });
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

  const handleDeleteFile = async ({
    url,
    fileOnCopyrightId,
  }: {
    url: string;
    fileOnCopyrightId?: string;
  }) => {
    try {
      setSnackBarData(() => {
        return {
          open: true,
          action: <SnackbarLoading />,
        };
      });
      if (fileOnCopyrightId) {
        await DeleteFileCopyrightService({
          fileCopyrightId: fileOnCopyrightId,
        });
        setFiles((prev) => {
          return [...prev?.filter((file) => file.url !== url)];
        });
        await copyright.refetch();
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

  React.useImperativeHandle(ref, () => ({
    saveData,
  }));
  return (
    <div className=" w-full rounded-md  border-[1px] border-solid border-[#BED6FF] bg-white p-5 py-10 font-Anuphan md:p-10">
      <Form
        ref={formRef}
        className="mx-0 my-5 flex flex-col gap-5 md:mx-5 md:my-10 "
      >
        {/* ข้อ 1*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-2 ">
          <section className="flex items-center gap-3">
            <Number number={1} />
            <p className=" w-full text-[0.8rem] font-semibold md:text-base">
              สำเนาบัตรประจำตัวประชาชนหรือสำเนานิติบุคคลของผู้ขอรับสิทธิบัตร/อนุสิทธิบัตร
            </p>
          </section>
          {copyright.data?.personStatus === "บุคคลธรรมดา" && (
            <section className="flex flex-col gap-2 rounded-md  p-2">
              <h3 className="text-base font-semibold">
                กรณีผู้ขอรับสิทธิบัตร/อนุสิทธิบัตร เป็นบุคคลธรรมดา
              </h3>
              <p className=" font-semibold text-purple-500">
                แนบสำเนาบัตรประจำตัวประชาชนของผู้ขอรับสิทธิบัตร/อนุสิทธิบัตร
                โดยรับรองสำเนาถูกต้อง ระบุข้อความ
                “ใช้ประกอบการยื่นคำขอด้านทรัพย์สินทางปัญญาเท่านั้น”
                ไม่ต้องระบุวันที่
              </p>

              <section className="flex flex-col gap-2 md:flex-row md:items-start">
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
                          { file: file, url: url, documentType: "PERSON" },
                        ];
                      });

                      reader.readAsDataURL(file);
                    });
                  }}
                >
                  <Button type="button" className="btn-download">
                    <span className="text-3xl lg:text-base">
                      <FiPlusCircle />
                    </span>
                    สำเนาบัตรประจำตัวประชาชน ของผู้ขอรับสิทธิบัตร (ไฟล์
                    .pdf/.jpg)
                  </Button>
                </FileTrigger>
              </section>
              <section
                className="ml-5 grid grid-cols-1 gap-2 border 
border-gray-200 bg-gray-200 p-2 lg:ml-0  xl:grid-cols-3 2xl:grid-cols-4"
              >
                {...files
                  ?.filter((file) => file.documentType === "PERSON")
                  .map((file) => {
                    return (
                      <FileOnCopyright
                        file={file}
                        key={file.url}
                        handleDeleteFile={handleDeleteFile}
                      />
                    );
                  })}
              </section>
            </section>
          )}

          {copyright.data?.personStatus !== "บุคคลธรรมดา" && (
            <section className="flex flex-col gap-2 rounded-md  p-2">
              <h3 className="text-base font-semibold">
                กรณีผู้ขอรับสิทธิบัตร/อนุสิทธิบัตร
                เป็นนิติบุคคลหรือหน่วยงานรัฐหรือมูลนิธิ
              </h3>
              <p className=" font-semibold text-purple-500">
                แนบสำเนาบัตรประจำตัวประชาชนของผู้ขอรับสิทธิบัตร/อนุสิทธิบัตร
                หรือผู้มีอำนาจในการลงนาม และสำเนาหนังสือรับรองนิติบุคคล
                ที่ออกให้ไม่เกิน 6 เดือนหรือสำเนาหนังสือแสดงการจัดตั้งหน่วยงาน
                โดยรับรองสำเนาถูกต้อง ระบุข้อความ
                “ใช้ประกอบการยื่นคำขอด้านทรัพย์สินทางปัญญาเท่านั้น”
                ไม่ต้องระบุวันที่
              </p>

              <section className="flex flex-col gap-2 md:flex-row md:items-start">
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
                          { file: file, url: url, documentType: "PERSON" },
                        ];
                      });

                      reader.readAsDataURL(file);
                    });
                  }}
                >
                  <Button type="button" className="btn-download">
                    <span className="text-3xl lg:text-base">
                      <FiPlusCircle />
                    </span>
                    สำเนาบัตรประจำตัวประชาชน ของผู้ขอรับสิทธิบัตร (ไฟล์
                    .pdf/.jpg)
                  </Button>
                </FileTrigger>
              </section>
              <section className="ml-5 grid grid-cols-1 gap-2 border border-gray-200 bg-gray-200 p-2 lg:ml-0  xl:grid-cols-3 2xl:grid-cols-4">
                {...files
                  ?.filter((file) => file.documentType === "PERSON")
                  .map((file) => {
                    return (
                      <FileOnCopyright
                        file={file}
                        key={file.url}
                        handleDeleteFile={handleDeleteFile}
                      />
                    );
                  })}
              </section>

              <section className="flex flex-col gap-2 md:flex-row md:items-start">
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
                          { file: file, url: url, documentType: "COPORATE" },
                        ];
                      });

                      reader.readAsDataURL(file);
                    });
                  }}
                >
                  <Button type="button" className="btn-download">
                    <span className="text-3xl lg:text-base">
                      <FiPlusCircle />
                    </span>
                    สำเนาหนังสือรับรองนิติบุคคลหรือสำเนาหนังสือ
                    แสดงการจัดตั้งหน่วยงาน (ไฟล์ .pdf/.jpg)
                  </Button>
                </FileTrigger>
              </section>
              <section className="ml-5 grid grid-cols-1 gap-2 border border-gray-200 bg-gray-200 p-2 lg:ml-0  xl:grid-cols-3 2xl:grid-cols-4">
                {...files
                  ?.filter((file) => file.documentType === "COPORATE")
                  .map((file) => {
                    return (
                      <FileOnCopyright
                        file={file}
                        key={file.url}
                        handleDeleteFile={handleDeleteFile}
                      />
                    );
                  })}
              </section>
            </section>
          )}
        </section>

        {/* ข้อ 2*/}

        <section className="flex  flex-col items-start justify-center gap-2 md:gap-2 ">
          <section className="flex items-center gap-3">
            <Number number={2} />
            <p className=" w-full text-[0.8rem] font-semibold md:text-base">
              สำเนาบัตรประจำตัวประชาชนของผู้ประดิษฐ์ทุกราย{" "}
            </p>
          </section>

          <section className="flex w-full flex-col gap-2  rounded-md p-2">
            <p className="font-normal text-purple-500 underline">
              โปรดอัพโหลดสำเนาบัตรประจำตัวประชาชนของผู้ประดิษฐ์ทุกราย
              ตามรายชื่อด้านล่าง
            </p>
            {copyright.data?.partnerInfoOnCopyrights.map((partner, index) => {
              return (
                <div key={partner.id} className="flex gap-2">
                  <p className="font-semibold">
                    1.{index + 1} ) ชื่อ: {partner.title} {partner.firstName}{" "}
                    {partner.lastName}
                  </p>
                  <p className="font-semibold">
                    เลขบัตรประจำตัวประชาชน: {partner.idCard}
                  </p>
                </div>
              );
            })}

            <section className="flex flex-col gap-2 md:flex-row md:items-start">
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
                        { file: file, url: url, documentType: "IDCARD" },
                      ];
                    });

                    reader.readAsDataURL(file);
                  });
                }}
              >
                <Button type="button" className="btn-download">
                  <span className="text-3xl lg:text-base">
                    <FiPlusCircle />
                  </span>
                  สำเนาบัตรประจำตัวประชาชน ของผู้ขอรับสิทธิบัตร (ไฟล์ .pdf/.jpg)
                </Button>
              </FileTrigger>
            </section>
            <section
              className="ml-5 grid grid-cols-1 gap-2 border 
border-gray-200 bg-gray-200 p-2 lg:ml-0  xl:grid-cols-3 2xl:grid-cols-4"
            >
              {...files
                ?.filter((file) => file.documentType === "IDCARD")
                .map((file) => {
                  return (
                    <FileOnCopyright
                      file={file}
                      key={file.url}
                      handleDeleteFile={handleDeleteFile}
                    />
                  );
                })}
            </section>
          </section>
        </section>

        {/* ข้อ 3*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-2 ">
          <section className="flex items-center gap-3">
            <Number number={3} />
            <p className=" w-full text-[0.8rem] font-semibold md:text-base">
              เอกสาร/ผลงานประกอบคำขอ
            </p>
          </section>

          <section className="flex w-full flex-col gap-2  rounded-md p-2">
            <section className="flex flex-col gap-2 md:flex-row md:items-start">
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
                        { file: file, url: url, documentType: "REQUEST" },
                      ];
                    });

                    reader.readAsDataURL(file);
                  });
                }}
              >
                <Button type="button" className="btn-download">
                  <span className="text-3xl lg:text-base">
                    <FiPlusCircle />
                  </span>
                  อัพโหลดไฟล์ (ไฟล์ .pdf/.jpg)
                </Button>
              </FileTrigger>
            </section>
            <section
              className="ml-5 grid grid-cols-1 gap-2 border 
border-gray-200 bg-gray-200 p-2 lg:ml-0  xl:grid-cols-3 2xl:grid-cols-4"
            >
              {...files
                ?.filter((file) => file.documentType === "REQUEST")
                .map((file) => {
                  return (
                    <FileOnCopyright
                      file={file}
                      key={file.url}
                      handleDeleteFile={handleDeleteFile}
                    />
                  );
                })}
            </section>
          </section>
        </section>

        <section className="flex flex-col items-start justify-center gap-2 md:gap-2 ">
          <section className="flex items-center gap-3">
            <Number number={4} />
            <p className=" w-full text-[0.8rem] font-semibold md:text-base">
              เอกสารแนบอื่น ๆ ถ้ามี
            </p>
          </section>

          <p className=" font-semibold text-purple-500">
            เช่น สัญญาหรือข้อตกลงการรับทุนวิจัย ผลการทดสอบหรือผลการทดลอง
            หนังสือรับรองการเผยแพร่ผลงาน เป็นต้น
          </p>

          <section className="flex w-full flex-col gap-2  rounded-md p-2">
            <section className="flex flex-col gap-2 md:flex-row md:items-start">
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
                        { file: file, url: url, documentType: "OTHERS" },
                      ];
                    });

                    reader.readAsDataURL(file);
                  });
                }}
              >
                <Button type="button" className="btn-download">
                  <span className="text-3xl lg:text-base">
                    <FiPlusCircle />
                  </span>
                  อัพโหลดไฟล์ (ไฟล์ .pdf/.jpg)
                </Button>
              </FileTrigger>
            </section>
            <section
              className="ml-5 grid grid-cols-1 gap-2 border 
border-gray-200 bg-gray-200 p-2 lg:ml-0  xl:grid-cols-3 2xl:grid-cols-4"
            >
              {...files
                ?.filter((file) => file.documentType === "OTHERS")
                .map((file) => {
                  return (
                    <FileOnCopyright
                      file={file}
                      key={file.url}
                      handleDeleteFile={handleDeleteFile}
                    />
                  );
                })}
            </section>
          </section>
        </section>
        {snackBarData.open && snackBarData.action}
      </Form>
    </div>
  );
});

export default NrruCopyrightForm4;
