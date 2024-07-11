import Number from "@/components/Number";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  FieldError,
  FileTrigger,
  Form,
  Input,
  Label,
  Radio,
  RadioGroup,
  TextArea,
  TextField,
} from "react-aria-components";

import {
  MdCheckBoxOutlineBlank,
  MdOutlineRadioButtonChecked,
  MdOutlineRadioButtonUnchecked,
} from "react-icons/md";
import { HiOutlinePhotograph } from "react-icons/hi";
import {
  AllowColorProtectionOptions,
  allowColorProtectionOptions,
  allowMarketingOptions,
  allowPublicOptions,
  allowShapeProtectionOptions,
  menuTrademark2,
  OTOPOptions,
} from "../../../data/trademark";
import {
  ResponseGetTrademarkService,
  UpdateTrademarkervice,
} from "../../../services/trademark/trademark";
import { UseQueryResult } from "@tanstack/react-query";
import { DocumentType, ErrorMessages } from "../../../models";
import FileOnTrademark from "./FileOnTrademark";
import SnackbarLoading from "../../Snackbars/SnackBarLoading";
import {
  CreateFileTrademarkervice,
  DeleteFileTrademarkervice,
} from "../../../services/trademark/file-trademark";
import SnackbarNoSaveData from "../../Snackbars/SnackBarNoSaveData";
import Swal from "sweetalert2";
import {
  GetSignURLService,
  UploadSignURLService,
} from "../../../services/google-storage";
import { Dropdown } from "primereact/dropdown";

type TrademarkForm2Props = {
  trademark: UseQueryResult<ResponseGetTrademarkService, Error>;
};
const TrademarkForm2 = forwardRef(function FormTrademark(
  { trademark }: TrademarkForm2Props,
  ref,
) {
  const [snackBarData, setSnackBarData] = useState<{
    open: boolean;
    action: React.ReactNode;
  }>({
    open: false,
    action: <></>,
  });
  const formRef = useRef<HTMLFormElement>(null);
  const fileTriggerRef = useRef<HTMLDivElement>(null);

  const [trademarkData, setTrademarkData] = useState<{
    titleTrademark?: string;
    trademarkType?: string;
    pronunciation?: string;
    meaning?: string;
    productDetail?: string;
    otopType?: string;
    otopNumber?: string;
    allowColorProtection?: AllowColorProtectionOptions;
    colorProtectionDetail?: string;
    allowShapeProtection?: string;
    allowMarketing?: string;
    allowPublic?: string;
  }>(() => {
    return {
      titleTrademark: trademark.data?.titleTrademark,
      trademarkType: trademark.data?.trademarkType,
      pronunciation: trademark.data?.pronunciation,
      meaning: trademark.data?.meaning,
      productDetail: trademark.data?.productDetail,
      otopType: trademark.data?.otopType,
      otopNumber: trademark.data?.otopNumber,
      allowColorProtection: trademark.data
        ?.allowColorProtection as AllowColorProtectionOptions,
      colorProtectionDetail: trademark.data?.colorProtectionDetail,
      allowShapeProtection: trademark.data?.allowShapeProtection,
      allowMarketing: trademark.data?.allowMarketing,
      allowPublic: trademark.data?.allowPublic,
    };
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
    setFiles(() => {
      return (
        trademark.data?.fileOnTrademarks?.map((file) => {
          return {
            id: file.id,
            url: file.url,
            documentType: file.documentType,
            type: file.type,
          };
        }) ?? []
      );
    });
  }, [trademark.data]);

  const handleChangeWorkData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setTrademarkData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeRaio = ({ e, name }: { e: string; name: string }) => {
    setTrademarkData((prev) => {
      return {
        ...prev,
        [name]: e,
      };
    });
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
        await trademark.refetch();
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

      if (files.length === 0) {
        fileTriggerRef.current?.scrollIntoView();
        throw new Error("กรุณาอัพโหลดไฟล์เครื่องหมายการค้า");
      }
      if (!trademark.data?.id) {
        throw new Error("ไม่พบข้อมูลการจดทะเบียน");
      }
      setSnackBarData(() => {
        return {
          open: true,
          action: <SnackbarLoading />,
        };
      });
      const filterFiles = files?.filter((file) => !file.id);
      if (filterFiles && filterFiles?.length > 0) {
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
            documentType: file.documentType,
            size: file.file?.size as number,
            trademarkId: trademark.data?.id as string,
          });
        }
      }
      await UpdateTrademarkervice({
        query: {
          trademarkId: trademark.data.id as string,
        },
        body: {
          ...trademarkData,
        },
      });
      await trademark.refetch();
      setSnackBarData(() => {
        return {
          open: true,
          action: <SnackbarNoSaveData />,
        };
      });
    } catch (error) {
      console.error(error);

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
  useImperativeHandle(ref, () => ({
    saveData,
  }));
  return (
    <div className=" w-full  rounded-md border-[1px] border-solid border-[#BED6FF] bg-white p-5 py-10 md:p-10">
      <Form
        ref={formRef}
        className="mx-0 my-5 flex flex-col gap-5 md:mx-5 md:my-10 "
      >
        {/* ข้อ 1*/}
        <section className="flex flex-col items-start justify-center gap-3 md:gap-5  lg:flex-row">
          <section className="flex items-center gap-3">
            <Number number={1} />
            <p className="my-2 text-[0.8rem] font-semibold md:min-w-32 md:text-base">
              กรอกชื่อเครื่องหมายการค้า
            </p>
          </section>
          <div className="flex w-full flex-col flex-wrap gap-3 pl-7 text-[0.8rem] md:flex-row md:gap-5 md:pl-0 md:text-base">
            <TextField
              isRequired
              className={"flex w-full min-w-60 items-center gap-3 "}
            >
              <section className="flex flex-col">
                <Input
                  value={trademarkData?.titleTrademark}
                  name="titleTrademark"
                  onChange={handleChangeWorkData}
                  type="text"
                  className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:min-w-80 md:pl-4 "
                  placeholder="กรอกชื่อภาษาไทย"
                />

                <FieldError className="text-xs text-red-700" />
              </section>
            </TextField>
          </div>
        </section>

        {/* ข้อ 2*/}
        <RadioGroup
          isRequired
          value={trademarkData?.trademarkType}
          onChange={(e) => handleChangeRaio({ e: e, name: "trademarkType" })}
          className="flex flex-col items-start justify-center gap-2 md:gap-5 "
        >
          <div className="flex flex-col gap-1">
            <section className="flex items-center gap-3">
              <Number number={2} />
              <Label className="my-2 text-[0.8rem] font-semibold md:min-w-64 md:text-base">
                ประเภทของเครื่องหมายการค้า{" "}
              </Label>
            </section>
            <FieldError className="text-xs text-red-700" />
          </div>
          <Button className=" ml-5 flex items-center justify-center  gap-3 rounded-md bg-[#BED6FF] p-2 px-5 text-[0.8rem] font-semibold duration-300 hover:bg-[#91B2EB] md:ml-10 md:gap-5 md:text-base">
            <p>การเลือกประเภทเครื่องหมายการค้า (คลิก)</p>
          </Button>
          <div className="grid w-full grid-cols-1 gap-1.5 px-5 text-[0.8rem] md:grid-cols-3 md:gap-3 md:pl-10 md:text-base">
            {menuTrademark2.map((item, index) => {
              return (
                <Radio
                  key={index}
                  className={({ isPressed, isSelected }) =>
                    isSelected ? "" : ""
                  }
                  value={item.title}
                >
                  {({ isSelected }) => (
                    <div className="flex items-center justify-start gap-2 ">
                      <div className=" text-2xl">
                        {isSelected ? (
                          <MdOutlineRadioButtonChecked />
                        ) : (
                          <MdOutlineRadioButtonUnchecked />
                        )}
                      </div>
                      <span className="font-medium">{item.title}</span>
                    </div>
                  )}
                </Radio>
              );
            })}
          </div>
        </RadioGroup>

        {/* ข้อ 3*/}
        <section className=" flex items-start justify-center gap-3  md:gap-5">
          <div className="mt-2 md:mt-0">
            <Number number={3} />
          </div>

          <div
            ref={fileTriggerRef}
            className="flex w-full flex-col gap-3 text-[0.8rem]  md:gap-5 md:text-base"
          >
            <TextField isRequired className={"flex w-full items-center gap-3 "}>
              <Label className="min-w-28 font-semibold text-[var(--primary-blue)] md:min-w-32">
                ภาพเครื่องหมาย (จำเป็นต้องมี)
              </Label>
            </TextField>
            <section className="flex flex-col gap-3">
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
                        { file: file, url: url, documentType: "TRADEMARK" },
                      ];
                    });

                    reader.readAsDataURL(file);
                  });
                }}
              >
                <Button className="w-44 rounded-md bg-[var(--secondary-yellow)] px-3 py-3 font-semibold shadow-md md:w-52">
                  อัพโหลดไฟล์ .pdf/.jpg
                </Button>
              </FileTrigger>
            </section>
            <section className=" grid grid-cols-1 gap-2 lg:ml-0  lg:grid-cols-3 2xl:grid-cols-4">
              {...files
                ?.filter((file) => file.documentType === "TRADEMARK")
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

        {/* ข้อ 4*/}
        <section className="flex flex-col items-start justify-center gap-3 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={4} />
            <p className="my-2 text-[0.8rem] font-semibold  md:text-base">
              คำอ่านและคำแปลเป็นภาษาไทย
              (กรณีที่ยื่นเครื่องหมายเป็นอักษรต่างประเทศ)
            </p>
          </section>
          <div className="flex w-full flex-col flex-wrap gap-3 pl-7 text-[0.8rem] md:ml-10 md:flex-row md:gap-5 md:pl-0 md:text-base">
            <TextField
              isRequired
              className={"flex w-full min-w-60 items-center gap-3 "}
            >
              <Label className="my-2 text-[0.8rem] font-semibold md:text-base">
                คำอ่าน
              </Label>
              <section className="flex flex-col">
                <Input
                  required
                  value={trademarkData?.pronunciation}
                  name="pronunciation"
                  onChange={handleChangeWorkData}
                  type="text"
                  className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:min-w-80 md:pl-4 "
                  placeholder="โปรดระบุ"
                />

                <FieldError className="text-xs text-red-700" />
              </section>
            </TextField>
            <TextField
              isRequired
              className={"flex w-full min-w-60 items-center gap-3 "}
            >
              <Label className="my-2 text-[0.8rem] font-semibold md:text-base">
                คำแปล
              </Label>
              <section className="flex flex-col">
                <Input
                  value={trademarkData?.meaning}
                  name="meaning"
                  onChange={handleChangeWorkData}
                  required
                  type="text"
                  className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:min-w-80 md:pl-4 "
                  placeholder="โปรดระบุ"
                />

                <FieldError className="text-xs text-red-700" />
              </section>
            </TextField>
          </div>
        </section>

        {/* ข้อ 5*/}
        <section className="flex flex-col items-start justify-center gap-3 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={5} />
            <p className="my-2 text-[0.8rem] font-semibold  md:text-base">
              รายการสินค้าหรือบริการ
            </p>
          </section>
          <p className="text-[0.8rem] md:-mt-5 md:ml-10 md:text-base">
            ให้ระบุรายการสินค้าที่จำหน่าย เช่น เนื้อหมู ขนมปัง กระเป๋า
            ครีมบำรุงผิว บริการร้านอาหารและเครื่องดื่ม เป็นต้น
          </p>
          <div className="flex w-full flex-col flex-wrap gap-3 pl-7 text-[0.8rem] md:ml-10 md:flex-row md:gap-5 md:pl-0 md:text-base">
            <TextField
              isRequired
              className={"flex w-full min-w-60 items-center gap-3 "}
            >
              <section className="flex flex-col">
                <Input
                  value={trademarkData?.productDetail}
                  name="productDetail"
                  onChange={handleChangeWorkData}
                  type="text"
                  className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:min-w-80 md:pl-4 "
                  placeholder="โปรดระบุ"
                />

                <FieldError className="text-xs text-red-700" />
              </section>
            </TextField>
          </div>
        </section>

        {/* ข้อ 6*/}
        <section className="flex flex-col items-start justify-center gap-3 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={6} />
            <p className="my-2 text-[0.8rem] font-semibold  md:text-base">
              ผู้ประกอบการ OTOP (ตอบเฉพาะผู้ประกอบการ OTOP)
            </p>
          </section>
          <div className="flex w-full flex-col flex-wrap gap-3 pl-7 text-[0.8rem] md:ml-10 md:flex-row md:gap-5 md:pl-0 md:text-base">
            <Label className="my-2 min-w-44 text-[0.8rem] font-semibold md:text-base">
              6.1 ประเภทผู้ประกอบการ
            </Label>

            <div className="flex flex-col gap-1">
              <div className="w-44 rounded-lg bg-slate-300 p-1 lg:w-80">
                <Dropdown
                  value={trademarkData?.otopType}
                  onChange={(e) =>
                    setTrademarkData((prev) => {
                      return {
                        ...prev,
                        otopType: e.value,
                      };
                    })
                  }
                  options={OTOPOptions}
                  placeholder="เลือกประเภทผู้ประกอบการ"
                  className="lg:w-14rem w-full "
                />
              </div>
            </div>

            <TextField className={"flex w-full min-w-60 items-center gap-3 "}>
              <Label className="my-2 min-w-44 text-[0.8rem] font-semibold md:text-base">
                6.2 เลขทะเบียน OTOP
              </Label>
              <section className="flex flex-col">
                <Input
                  value={trademarkData?.otopNumber}
                  name="otopNumber"
                  onChange={handleChangeWorkData}
                  type="text"
                  className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:min-w-80 md:pl-4 "
                />
              </section>
            </TextField>
          </div>
        </section>

        {/* ข้อ 7*/}
        <RadioGroup
          value={trademarkData?.allowColorProtection}
          isRequired
          onChange={(e) =>
            handleChangeRaio({ e, name: "allowColorProtection" })
          }
          className="flex flex-col items-start justify-center gap-2 md:gap-5 "
        >
          <div className="flex flex-col gap-1">
            <section className="flex items-center gap-3">
              <Number number={7} />
              <Label className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
                การขอจดทะเบียนเครื่องหมายที่มีลักษณะเป็นกลุ่มของสี
              </Label>
            </section>
            <FieldError className="text-xs text-red-700" />
          </div>

          <p className="text-[0.8rem] md:-mt-5 md:ml-10 md:text-base">
            กลุ่มของสี หมายถึง การรวมกันของสีตั้งแต่ 2 สี ขึ้นไป
            และแสดงโดยลักษณะพิเศษ เช่น ภาพลวดลายที่เป็นสีต่าง ๆ
          </p>

          <div className="flex w-full flex-col  gap-1.5 px-5 text-[0.8rem] md:gap-3 md:pl-10 md:text-base">
            {allowColorProtectionOptions.map((item, index) => {
              return (
                <Radio
                  key={index}
                  value={item}
                  className="flex w-full items-center"
                >
                  {({ isSelected }) => (
                    <div className="flex items-center justify-center gap-2">
                      <div className="text-2xl">
                        {isSelected ? (
                          <MdOutlineRadioButtonChecked />
                        ) : (
                          <MdOutlineRadioButtonUnchecked />
                        )}
                      </div>
                      <span className="font-medium md:min-w-[25rem]">
                        {item}
                      </span>
                    </div>
                  )}
                </Radio>
              );
            })}

            <TextField
              isRequired={
                trademarkData?.allowColorProtection ===
                "ขอรับความคุ้มครอง (ให้บรรยายลักษณะกลุ่มของสีและระบุสีให้ชัดเจน )"
              }
              isDisabled={
                trademarkData?.allowColorProtection !==
                "ขอรับความคุ้มครอง (ให้บรรยายลักษณะกลุ่มของสีและระบุสีให้ชัดเจน )"
              }
              className={"flex w-full items-center gap-3 md:ml-8 md:w-[70%]"}
            >
              <section className="flex w-full flex-col">
                <Input
                  value={trademarkData?.colorProtectionDetail}
                  name="colorProtectionDetail"
                  onChange={handleChangeWorkData}
                  type="text"
                  className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                  placeholder="ไม่มีหนังสือตกลงฯ"
                />
                <FieldError className="text-xs text-red-700" />
              </section>
            </TextField>
          </div>
        </RadioGroup>

        {/* ข้อ 8*/}
        <RadioGroup
          isRequired
          value={trademarkData?.allowShapeProtection}
          onChange={(e) =>
            handleChangeRaio({ e, name: "allowShapeProtection" })
          }
          className="flex flex-col items-start justify-center gap-2 md:gap-5 "
        >
          <div className="flex flex-col gap-1">
            <section className="flex items-center gap-3">
              <Number number={8} />
              <Label className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
                การขอจดทะเบียนเครื่องหมายที่มีลักษณะเป็นรูปร่างหรือรูปทรงของวัตถุ
              </Label>
            </section>
            <FieldError className="text-xs text-red-700" />
          </div>

          <p className="text-[0.8rem] md:-mt-5 md:ml-10 md:text-base">
            รูปร่างหรือรูปทรงของวัตถุ หมายถึง เครื่องหมายที่แสดงด้านกว้าง
            ด้านยาว ด้านลึก หรือสามมิติ
          </p>

          <div className="flex w-full flex-col  gap-1.5 px-5 text-[0.8rem] md:gap-3 md:pl-10 md:text-base">
            {allowShapeProtectionOptions.map((item, index) => {
              return (
                <Radio
                  key={index}
                  value={item}
                  className="flex w-full items-center"
                >
                  {({ isSelected }) => (
                    <div className="flex items-center justify-center gap-2">
                      <div className="text-2xl">
                        {isSelected ? (
                          <MdOutlineRadioButtonChecked />
                        ) : (
                          <MdOutlineRadioButtonUnchecked />
                        )}
                      </div>
                      <span className="font-medium md:min-w-[25rem]">
                        {item}
                      </span>
                    </div>
                  )}
                </Radio>
              );
            })}
          </div>
        </RadioGroup>

        {/* ข้อ 9*/}
        <RadioGroup
          isRequired
          value={trademarkData?.allowMarketing}
          onChange={(e) => handleChangeRaio({ e, name: "allowMarketing" })}
          className="flex flex-col items-start justify-center gap-2 md:gap-5 "
        >
          <div className="flex flex-col gap-1">
            <section className="flex items-center gap-3">
              <Number number={9} />
              <Label className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
                การใช้เครื่องหมายโดยการจำหน่าย เผยแพร่ หรือโฆษณาก่อนยื่นคำขอนี้
              </Label>
            </section>
            <FieldError className="text-xs text-red-700" />
          </div>

          <div className="flex w-full flex-col  gap-1.5 px-5 text-[0.8rem] md:gap-3 md:pl-10 md:text-base">
            {allowMarketingOptions.map((item, index) => {
              return (
                <Radio
                  key={index}
                  value={item}
                  className="flex w-full items-center"
                >
                  {({ isSelected }) => (
                    <div className="flex items-center justify-center gap-2">
                      <div className="text-2xl">
                        {isSelected ? (
                          <MdOutlineRadioButtonChecked />
                        ) : (
                          <MdOutlineRadioButtonUnchecked />
                        )}
                      </div>
                      <span className="font-medium md:min-w-[25rem]">
                        {item}
                      </span>
                    </div>
                  )}
                </Radio>
              );
            })}
          </div>
        </RadioGroup>

        {/* ข้อ 10*/}
        <RadioGroup
          isRequired
          value={trademarkData?.allowPublic}
          onChange={(e) => handleChangeRaio({ e, name: "allowPublic" })}
          className="flex flex-col items-start justify-center gap-2 md:gap-5 "
        >
          <div className="flex flex-col gap-1">
            <section className="flex items-center gap-3">
              <Number number={10} />
              <Label className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
                การขอให้ถือว่าวันที่ยื่นคําขอนอกราชอาณาจักรครั้งแรกเป็นวันยื่นคําขอในราชอาณาจักร/การขอใหถือวาวันที่นําสินคาที่ใชเครื่องหมายการคาออกแสดงในงานแสดงสินคา
                ระหว่างประเทศ
              </Label>
            </section>
            <FieldError className="text-xs text-red-700" />
          </div>

          <div className="flex w-full flex-col  gap-1.5 px-5 text-[0.8rem] md:gap-3 md:pl-10 md:text-base">
            {allowPublicOptions.map((item, index) => {
              return (
                <Radio
                  key={index}
                  value={item}
                  className="flex w-full items-center"
                >
                  {({ isSelected }) => (
                    <div className="flex items-center justify-center gap-2">
                      <div className="text-2xl">
                        {isSelected ? (
                          <MdOutlineRadioButtonChecked />
                        ) : (
                          <MdOutlineRadioButtonUnchecked />
                        )}
                      </div>
                      <span className="font-medium md:min-w-[25rem]">
                        {item}
                      </span>
                    </div>
                  )}
                </Radio>
              );
            })}
          </div>
        </RadioGroup>
        {snackBarData.open && snackBarData.action}
      </Form>
    </div>
  );
});
export default TrademarkForm2;
