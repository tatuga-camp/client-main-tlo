import Number from "@/components/Number";
import React, { FormEvent, useEffect, useState } from "react";
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
import { Calendar } from "primereact/calendar";
import { FiPlusCircle } from "react-icons/fi";
import {
  MdCheckBoxOutlineBlank,
  MdDelete,
  MdOutlineRadioButtonChecked,
  MdOutlineRadioButtonUnchecked,
} from "react-icons/md";
import Link from "next/link";
import { IoIosCheckbox } from "react-icons/io";
import {
  AgreementTitle,
  FundingLists,
  PublicType,
  ResearchOwnershipSubmission,
  ResearchType,
  Websites,
  agreementTitles,
  fundingLists,
  menuBenefits,
  publicType,
  researchOwnershipSubmissionList,
  researchTypes,
  searchResults,
  websites,
} from "../../../../data/invention";
import { ErrorMessages, FileWorkType, WorkType } from "../../../../models";
import { Dropdown } from "primereact/dropdown";
import SearchWorkInvention from "./SearchWorkInvention";
import SnackbarSaveData from "../../../Snackbars/SnackbarSaveData";
import { BsFileEarmarkCode } from "react-icons/bs";
import { GrFormView } from "react-icons/gr";
import FileOnWorkInvention from "./FileOnWorkInvention";
import { ResponseGetInventionPatentService } from "../../../../services/invention-patent/invention-patent";
import { UseQueryResult } from "@tanstack/react-query";
import Swal from "sweetalert2";
import SnackbarLoading from "../../../Snackbars/SnackBarLoading";
import { UpdateWorkInventionPatentService } from "../../../../services/invention-patent/work-invention/work-invention";
import SnackbarNoSaveData from "../../../Snackbars/SnackBarNoSaveData";
import {
  GetSignURLService,
  UploadSignURLService,
} from "../../../../services/google-storage";
import {
  CreateFileWorkInventionPatentService,
  DeleteFileWorkInventionPatentService,
} from "../../../../services/invention-patent/work-invention/file-work-invention";

type InventSection2Props = {
  invention: UseQueryResult<ResponseGetInventionPatentService, Error>;
};

const NrruInventionForm2 = ({ invention }: InventSection2Props) => {
  const [snackBarData, setSnackBarData] = useState<{
    open: boolean;
    action: React.ReactNode;
  }>({
    open: false,
    action: <></>,
  });
  const [workData, setWorkData] = useState<{
    thaiName?: string;
    englishName?: string;
    type?: WorkType;
    files?: {
      id?: string;
      url: string;
      name?: FileWorkType;
      type?: string;
      file?: File;
    }[];
    beginWorkAt?: string;
    finishWorkAt?: string;
    benefit?: string[];
    otherBenefit?: string;

    agreementTitle?: string;
    agreementInstitution?: string;
    agreementYear?: string;
    otherAgreement?: string;
    researchResult?: ResearchType;
    keywords?: string;
    website?: Websites;
    searchResult?: string;
    isRequest?: string;
    requestNumber?: string;
    requestDate?: string;
    requestCountry?: string;
    publicType?: PublicType;
    otherPublicType?: string;
    publicDetail?: string;
    outstandingDetail?: string;
    limitationDetail?: string;
    marketDetail?: string;
  }>(() => {
    return {
      thaiName: invention.data?.workInfoOnInventionPatent.thaiName,
      englishName: invention.data?.workInfoOnInventionPatent.englishName,
      type: invention.data?.workInfoOnInventionPatent.type,
      files: [
        ...(invention.data?.workInfoOnInventionPatent.fileOnWorkInventionPatents.map(
          (file) => {
            return {
              id: file.id,
              url: file.url,
              name: file.name,
              type: file.type,
            };
          },
        ) ?? []),
      ],
      beginWorkAt: invention.data?.workInfoOnInventionPatent.beginWorkAt,
      finishWorkAt: invention.data?.workInfoOnInventionPatent.finishWorkAt,
      benefit: invention.data?.workInfoOnInventionPatent.benefit,
      otherBenefit: invention.data?.workInfoOnInventionPatent.otherBenefit,

      agreementTitle: invention.data?.workInfoOnInventionPatent.agreementTitle,
      agreementInstitution:
        invention.data?.workInfoOnInventionPatent.agreementInstitution,
      agreementYear: invention.data?.workInfoOnInventionPatent.agreementYear,
      otherAgreement: invention.data?.workInfoOnInventionPatent.otherAgreement,
      researchResult: invention.data?.workInfoOnInventionPatent.researchResult,
      keywords: invention.data?.workInfoOnInventionPatent.keywords,
      website: invention.data?.workInfoOnInventionPatent.website,
      searchResult: invention.data?.workInfoOnInventionPatent.searchResult,
      isRequest: invention.data?.workInfoOnInventionPatent.requestNumber
        ? "เคย"
        : "ไม่เคย",
      requestNumber: invention.data?.workInfoOnInventionPatent.requestNumber,
      requestDate: invention.data?.workInfoOnInventionPatent.requestDate,
      requestCountry: invention.data?.workInfoOnInventionPatent.requestCountry,
      publicType: invention.data?.workInfoOnInventionPatent.publicType,
      otherPublicType:
        invention.data?.workInfoOnInventionPatent.otherPublicType,
      publicDetail: invention.data?.workInfoOnInventionPatent.publicDetail,
      outstandingDetail:
        invention.data?.workInfoOnInventionPatent.outstandingDetail,
      limitationDetail:
        invention.data?.workInfoOnInventionPatent.limitationDetail,
      marketDetail: invention.data?.workInfoOnInventionPatent.marketDetail,
    };
  });

  const handleUpdateWorkInvention = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setSnackBarData(() => {
        return {
          open: true,
          action: <SnackbarLoading />,
        };
      });
      const filterFiles = workData.files?.filter((file) => !file.id);
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

          await CreateFileWorkInventionPatentService({
            type: file.file?.type as string,
            url: getSignURL.originalURL,
            name: file.name as FileWorkType,
            size: file.file?.size as number,
            workInfoOnInventionPatentId: invention.data
              ?.workInfoOnInventionPatent.id as string,
            inventionPatentId: invention.data?.id as string,
          });
        }
      }
      await UpdateWorkInventionPatentService({
        query: {
          workOnInventionPatentId: invention.data?.workInfoOnInventionPatent
            .id as string,
        },
        body: {
          thaiName: workData?.thaiName,
          englishName: workData?.englishName,
          type: workData?.type,
          beginWorkAt: workData?.beginWorkAt,
          finishWorkAt: workData?.finishWorkAt,
          benefit: workData?.benefit,
          otherBenefit: workData?.otherBenefit,

          agreementTitle: workData?.agreementTitle,
          agreementInstitution: workData?.agreementInstitution,
          agreementYear: workData?.agreementYear,
          researchResult: workData?.researchResult,
          website: workData?.website,
          keywords: workData?.keywords,
          searchResult: workData?.searchResult,
          requestNumber: workData?.requestNumber,
          requestDate: workData?.requestDate,
          requestCountry: workData?.requestCountry,
          publicType: workData?.publicType,
          otherPublicType: workData?.otherPublicType,
          publicDetail: workData?.publicDetail,
          outstandingDetail: workData?.outstandingDetail,
          limitationDetail: workData?.limitationDetail,
          marketDetail: workData?.marketDetail,
          isComplete: true,
        },
      });
      await invention.refetch();
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

  const handleChangeWorkData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSnackBarData(() => {
      return {
        open: true,
        action: <SnackbarSaveData />,
      };
    });
    const { name, value } = e.target;
    setWorkData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeRaio = ({ e, name }: { e: string; name: string }) => {
    setSnackBarData(() => {
      return {
        open: true,
        action: <SnackbarSaveData />,
      };
    });
    setWorkData((prev) => {
      return {
        ...prev,
        [name]: e,
      };
    });
  };

  const handleDeleteFile = async ({
    url,
    fileOnWorkId,
  }: {
    url: string;
    fileOnWorkId?: string;
  }) => {
    try {
      setSnackBarData(() => {
        return {
          open: true,
          action: <SnackbarLoading />,
        };
      });
      if (fileOnWorkId) {
        await DeleteFileWorkInventionPatentService({
          fileWorkInventionId: fileOnWorkId,
        });
        setWorkData((prev) => {
          return {
            ...prev,
            files: prev?.files?.filter((file) => file.url !== url),
          };
        });
      } else {
        setWorkData((prev) => {
          return {
            ...prev,
            files: prev?.files?.filter((file) => file.url !== url),
          };
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

  const handleChangeCheckbox = ({ e, name }: { e: string[]; name: string }) => {
    setSnackBarData(() => {
      return {
        open: true,
        action: <SnackbarSaveData />,
      };
    });
    setWorkData((prev) => {
      return {
        ...prev,
        [name]: e,
      };
    });
  };

  const handleChangeCalendar = ({
    value,
    name,
  }: {
    value: Date;
    name: string;
  }) => {
    if (value instanceof Date) {
      setSnackBarData(() => {
        return {
          open: true,
          action: <SnackbarSaveData />,
        };
      });
      setWorkData((prev) => {
        return {
          ...prev,
          [name]: value.toISOString(),
        };
      });
    }
  };

  return (
    <div className=" w-full  rounded-md border-[1px] border-solid border-[#BED6FF] bg-white p-5 py-10 md:p-10">
      <Form
        aria-label="form"
        onSubmit={handleUpdateWorkInvention}
        className="mx-0 my-5 flex flex-col gap-8 md:mx-5 md:my-10 "
      >
        {/* ข้อ 1*/}
        <section className="flex flex-col items-start justify-center gap-3 md:gap-5  lg:flex-row">
          <section className="flex items-center gap-3">
            <Number number={1} />
            <p className="my-2 text-[0.8rem] font-semibold md:min-w-64 md:text-base">
              ชื่อที่แสดงถึงการประดิษฐ์
            </p>
          </section>
          <div className="flex w-full flex-col flex-wrap gap-3 pl-7 text-[0.8rem] md:flex-row md:gap-5 md:pl-0 md:text-base">
            <TextField className={"flex w-full min-w-60 items-center gap-3 "}>
              <Label className=" text-[var(--primary-blue) min-w-24 font-medium md:min-w-40">
                ชื่อภาษาไทย
              </Label>
              <div className="flex flex-col gap-1">
                <Input
                  value={workData?.thaiName}
                  required
                  name="thaiName"
                  onChange={handleChangeWorkData}
                  type="text"
                  className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:min-w-80 md:pl-4 "
                  placeholder="กรอกชื่อภาษาไทย"
                />
                <FieldError className="text-xs text-red-700" />
              </div>
            </TextField>
            <TextField className={"flex w-full min-w-60 items-center gap-3 "}>
              <Label className=" text-[var(--primary-blue) min-w-24 font-medium md:min-w-40">
                ชื่อภาษาอังกฤษ
              </Label>
              <div className="flex flex-col gap-1">
                <Input
                  required
                  value={workData?.englishName}
                  name="englishName"
                  onChange={handleChangeWorkData}
                  type="text"
                  className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:min-w-80 md:pl-4 "
                  placeholder="กรอกชื่อภาษาอังกฤษ"
                />
                <FieldError className="text-xs text-red-700" />
              </div>
            </TextField>
          </div>
        </section>
        {/* ข้อ 2*/}
        <RadioGroup
          value={workData?.type}
          onChange={(e) => handleChangeRaio({ e, name: "type" })}
          isRequired
          className="flex flex-col items-start justify-center gap-2 md:gap-5  lg:flex-row"
        >
          <div className="flex flex-col gap-1">
            <section className="flex items-center gap-3">
              <Number number={2} />

              <Label className="my-2 text-[0.8rem] font-semibold md:min-w-64 md:text-base">
                ประเภทสิทธิบัตรที่จะขอรับการคุ้มครอง
              </Label>
            </section>
            <FieldError className="text-xs text-red-700" />
          </div>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem] md:flex-row md:gap-5 md:pl-0 md:text-base">
            <Radio className="flex items-center " value="INVENTION">
              {({ isSelected }) => (
                <div className=" flex items-center justify-center gap-2">
                  <div className=" text-2xl">
                    {isSelected ? (
                      <MdOutlineRadioButtonChecked />
                    ) : (
                      <MdOutlineRadioButtonUnchecked />
                    )}
                  </div>
                  <span className=" font-semibold">สิทธิบัตรการประดิษฐ์</span>
                </div>
              )}
            </Radio>

            <Radio className="flex items-center " value="PETTY">
              {({ isSelected }) => (
                <div className=" flex gap-2">
                  <div className=" text-2xl">
                    {isSelected ? (
                      <MdOutlineRadioButtonChecked />
                    ) : (
                      <MdOutlineRadioButtonUnchecked />
                    )}
                  </div>
                  <span className="font-semibold">อนุสิทธิบัตร</span>
                </div>
              )}
            </Radio>

            <Link
              target="_blank"
              href={"/"}
              className="rounded-md bg-[#BED6FF] p-2 font-semibold duration-300 hover:bg-[#91B2EB]"
            >
              เงื่อนไขการขอรับสิทธิบัตร (คลิก)
            </Link>
          </div>
        </RadioGroup>

        {/* ข้อ 3*/}
        <section className="flex items-start justify-center gap-3 md:items-center md:gap-5">
          <Number number={3} />
          <div className="flex w-full flex-col gap-3 text-[0.8rem] md:flex-row md:gap-5 md:text-base">
            <TextField className={"flex items-center gap-3 "}>
              <Label className=" text-[var(--primary-blue) min-w-28 font-semibold md:min-w-32">
                ปีที่เริ่มการประดิษฐ์
              </Label>
              <div className="w-40 rounded-lg bg-slate-300 p-1">
                <Calendar
                  value={
                    workData?.beginWorkAt
                      ? new Date(workData.beginWorkAt)
                      : null
                  }
                  onChange={(e) => {
                    handleChangeCalendar({
                      value: e.value as Date,
                      name: "beginWorkAt",
                    });
                  }}
                  required
                  locale="th"
                  view="year"
                  placeholder="ปี 2024"
                  dateFormat="yy"
                />
              </div>
              <FieldError className="text-xs text-red-700" />
            </TextField>
            <TextField className={"flex w-full items-center gap-3 "}>
              <Label className="min-w-28 font-semibold text-[var(--primary-blue)] md:min-w-32">
                ปีที่ผลงานแล้วเสร็จ
              </Label>
              <div className="w-40 rounded-lg bg-slate-300 p-1">
                <Calendar
                  value={
                    workData?.finishWorkAt
                      ? new Date(workData.finishWorkAt)
                      : null
                  }
                  onChange={(e) => {
                    handleChangeCalendar({
                      value: e.value as Date,
                      name: "finishWorkAt",
                    });
                  }}
                  required
                  locale="th"
                  view="year"
                  placeholder="ปี 2024"
                  dateFormat="yy"
                />
              </div>
              <FieldError className="text-xs text-red-700" />
            </TextField>
          </div>
        </section>

        {/* ข้อ 4*/}
        <CheckboxGroup
          isRequired
          value={workData?.benefit}
          onChange={(e) => handleChangeCheckbox({ e, name: "benefit" })}
          className="flex flex-col items-start justify-center gap-2 md:gap-5 "
        >
          <div className="flex flex-col gap-1">
            <section className="flex items-center gap-3">
              <Number number={4} />
              <Label className="my-2 text-[0.8rem] font-semibold md:min-w-64 md:text-base">
                สิ่งที่ได้จากการประดิษฐ์/งานวิจัย/ข้อค้นพบ (ตอบได้มากกว่า 1 ข้อ)
              </Label>
            </section>
            <FieldError className="text-xs text-red-700" />
          </div>

          <div className="grid w-full grid-cols-1 gap-1.5 px-5 text-[0.8rem] md:gap-3 md:pl-0 md:text-base md:xl:grid-cols-3 2xl:grid-cols-4">
            {/* row1 */}
            {menuBenefits.map((menu, index) => {
              return (
                <Checkbox
                  key={index}
                  className={({ isPressed, isSelected }) =>
                    isSelected ? "" : ""
                  }
                  value={menu.title}
                >
                  {({ isSelected }) => (
                    <div className="flex items-center justify-start gap-2 ">
                      <div className=" text-3xl">
                        {isSelected ? (
                          <IoIosCheckbox />
                        ) : (
                          <MdCheckBoxOutlineBlank />
                        )}
                      </div>
                      <span className="font-medium">{menu.title}</span>
                    </div>
                  )}
                </Checkbox>
              );
            })}
          </div>
          <section className="flex w-full flex-col gap-2 px-5 md:flex-row md:px-0">
            <TextField className={"ml-3"}>
              <Label className="text-[0.8rem] font-medium md:text-base">
                อื่นๆ (โปรดระบุ)
              </Label>
              <Input
                value={workData?.otherBenefit}
                onChange={(e) => {
                  setWorkData((prev) => {
                    return {
                      ...prev,
                      otherBenefit: e.target.value,
                    };
                  });
                }}
                type="text"
                className="h-8 w-full rounded-md  bg-slate-300 p-1 pl-3 text-[0.8rem] md:h-10 md:p-2  md:pl-4 md:text-base"
              />
            </TextField>
          </section>
        </CheckboxGroup>

        {/* ข้อ 7*/}
        <RadioGroup
          value={workData?.agreementTitle}
          onChange={(e) => {
            const event: AgreementTitle = e as AgreementTitle;
            if (event === "ไม่มี") {
              setWorkData((prev) => {
                delete prev?.agreementYear;
                return {
                  ...prev,
                  agreementTitle: event,
                  agreementInstitution: "",
                };
              });
            }
            handleChangeRaio({ e, name: "agreementTitle" });
          }}
          isRequired
          className="flex flex-col items-start justify-center gap-2 md:gap-5 "
        >
          <div className="flex flex-col gap-1">
            <section className="flex items-center gap-3">
              <Number number={5} />
              <Label className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
                ส่วนใดส่วนหนึ่งของการวิจัยที่นำมาซึ่งการประดิษฐ์นี้
                ได้มีการลงนามหรืออยู่ภายใต้ข้อตกลงหรือสัญญาใด ๆ
                กับหน่วยงานอื่นหรือไม่ (ให้ระบุ)
              </Label>
            </section>
            <FieldError className="text-xs text-red-700" />
          </div>
          <div
            className="flex w-full flex-col flex-wrap gap-3 pl-5 
          text-[0.8rem] md:flex-col md:gap-5 md:pl-0 md:text-base "
          >
            {agreementTitles.map((item, index) => {
              return (
                <div key={index} className="flex">
                  <Radio className="flex" value={item}>
                    {({ isSelected }) => (
                      <div className=" flex items-center gap-2">
                        <div className=" text-2xl">
                          {isSelected ? (
                            <MdOutlineRadioButtonChecked />
                          ) : (
                            <MdOutlineRadioButtonUnchecked />
                          )}
                        </div>
                        <p className="text-[0.8rem] font-medium md:text-base">
                          {item}
                        </p>
                      </div>
                    )}
                  </Radio>
                </div>
              );
            })}
          </div>
          <div>
            <TextField className={`ml-3 flex  gap-5`}>
              <Input
                disabled={workData?.agreementTitle === "ไม่มี"}
                aria-label="ระบุชื่อหน่วยงาน"
                type="text"
                name="agreementInstitution"
                value={workData?.agreementInstitution}
                onChange={handleChangeWorkData}
                className=" w-60 rounded-md  bg-slate-300 p-1 pl-3 text-[0.8rem]  md:p-2  md:pl-4 md:text-base"
                placeholder="ระบุชื่อหน่วยงาน"
              />
              <div className=" w-40 rounded-lg bg-slate-300 p-1">
                <Calendar
                  disabled={workData?.agreementTitle === "ไม่มี"}
                  value={
                    workData?.agreementYear
                      ? new Date(workData.agreementYear)
                      : null
                  }
                  onChange={(e) => {
                    handleChangeCalendar({
                      value: e.value as Date,
                      name: "agreementYear",
                    });
                  }}
                  required
                  locale="th"
                  view="year"
                  placeholder="ปีที่ได้ลงนาม"
                  dateFormat="yy"
                />
              </div>
            </TextField>
          </div>
        </RadioGroup>

        {/* ข้อ 8*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <div className="flex flex-col gap-1">
            <section className="flex items-center gap-3">
              <Number number={6} />
              <Label className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
                ผลการวิจัย ผลการทดสอบ หรือผลการทดลอง
              </Label>
            </section>
            {!workData.researchResult && (
              <span className="text-xs text-red-700">
                please fill out this field.
              </span>
            )}
          </div>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem] md:flex-row md:gap-5 md:pl-0 md:text-base">
            <section className="flex w-full flex-col gap-2 px-5 md:flex-row md:px-0">
              <div className="w-80 rounded-lg bg-slate-300 p-1">
                <Dropdown
                  value={workData?.researchResult}
                  onChange={(e) => {
                    setSnackBarData(() => {
                      return {
                        open: true,
                        action: <SnackbarSaveData />,
                      };
                    });
                    setWorkData((prev) => {
                      return {
                        ...prev,
                        researchResult: e.value,
                      };
                    });
                  }}
                  options={researchTypes}
                  placeholder="เลือกประเภทแหล่งทุน"
                  className="md:w-14rem w-full"
                />
              </div>
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

                    setWorkData((prev) => {
                      if (!prev?.files)
                        return {
                          ...prev,
                          files: [
                            { file: file, url: url, name: "RESEARCHRESULT" },
                          ],
                        };
                      return {
                        ...prev,
                        files: [
                          ...prev?.files,
                          { file: file, url: url, name: "RESEARCHRESULT" },
                        ],
                      };
                    });

                    reader.readAsDataURL(file);
                  });
                }}
              >
                <Button
                  isDisabled={
                    workData?.researchResult === "ไม่มี" ? true : false
                  }
                  className={` flex  items-center justify-center gap-3 rounded-md 
                  p-2 px-5
                   ${workData?.researchResult === "ไม่มี" ? "bg-gray-400 text-black" : "bg-[#BED6FF] hover:bg-[#91B2EB] "} 
                   font-semibold duration-300  md:gap-5`}
                >
                  <span className="text-3xl md:text-base">
                    <FiPlusCircle />
                  </span>

                  <p>
                    แนบรายละเอียดผลการทดสอบหรือผลการทดลองในรายละเอียดคำขอ
                    (ถ้ามี)
                  </p>
                </Button>
              </FileTrigger>
            </section>
            <div className="grid w-full gap-2 xl:grid-cols-3 2xl:grid-cols-4">
              {workData?.files
                ?.filter((file) => file.name === "RESEARCHRESULT")
                .map((file, index) => {
                  return (
                    <FileOnWorkInvention
                      key={index}
                      file={file}
                      handleDeleteFile={handleDeleteFile}
                    />
                  );
                })}
            </div>
          </div>
          <FieldError className="text-xs text-red-700" />
        </section>

        {/* ข้อ 7*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={7} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              ข้อมูลประกอบการสืบค้นสิทธิบัตรเบื้องต้น
            </p>
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem] md:flex-row md:gap-5 md:pl-0 md:text-base">
            <section className="flex w-full items-center gap-3 md:pl-10">
              <p className="font-semibold md:min-w-52">
                7.1 Keyword ที่ใช้ในการสืบค้น
              </p>
              <TextField className={"flex w-full flex-col gap-1 "}>
                <Input
                  value={workData?.keywords}
                  onChange={handleChangeWorkData}
                  name="keywords"
                  required
                  type="text"
                  className="h-8 w-96 rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem] md:h-10 md:p-2   md:text-base"
                  placeholder="โปรดระบุ Keyword"
                />
                <FieldError className="text-xs text-red-700" />
              </TextField>
            </section>
            <RadioGroup
              value={workData?.website}
              onChange={(e) => handleChangeRaio({ e, name: "website" })}
              isRequired
              className="flex w-full flex-col  gap-3 md:pl-10"
            >
              <Label className="flex items-center  gap-2 font-semibold md:min-w-52">
                7.2 เว็บไซต์/ฐานข้อมูลที่ใช้ในการสืบค้น
                <FieldError className="text-xs font-normal text-red-700" />
              </Label>
              <div className="grid w-full grid-cols-1 gap-1.5 px-5 text-[0.8rem] md:grid-cols-2 md:gap-3 md:pl-0 md:text-base">
                {websites.map((menu, index) => {
                  return (
                    <Radio
                      key={index}
                      className={({ isPressed, isSelected }) =>
                        isSelected ? "" : ""
                      }
                      value={menu.title}
                    >
                      {({ isSelected }) => (
                        <div className="flex items-center justify-start gap-2 ">
                          <div className=" text-3xl">
                            {isSelected ? (
                              <MdOutlineRadioButtonChecked />
                            ) : (
                              <MdOutlineRadioButtonUnchecked />
                            )}
                          </div>
                          <span className="font-medium">{menu.title}</span>
                        </div>
                      )}
                    </Radio>
                  );
                })}
                <TextField className={"flex items-center justify-center gap-2"}>
                  <Label className="font-semibold">อื่นๆ</Label>
                  <Input
                    value={workData?.website}
                    onChange={handleChangeWorkData}
                    name="website"
                    type="text"
                    className="h-8 w-full rounded-md  bg-slate-300 p-1 pl-3 text-[0.8rem] md:h-10 md:p-2  md:pl-4 md:text-base"
                    placeholder="โปรดระบุ"
                  />
                </TextField>
              </div>
            </RadioGroup>
            <section className="flex w-full items-center gap-3 md:pl-10">
              <p className="font-semibold md:min-w-52">
                7.3 ผลของการสืบค้นพบว่า
              </p>
              <div className="flex flex-col gap-1">
                <div className="w-80 rounded-lg bg-slate-300 p-1">
                  <Dropdown
                    value={workData?.searchResult}
                    onChange={(e) => {
                      setSnackBarData(() => {
                        return {
                          open: true,
                          action: <SnackbarSaveData />,
                        };
                      });
                      setWorkData((prev) => {
                        return {
                          ...prev,
                          searchResult: e.value,
                        };
                      });
                    }}
                    required
                    options={searchResults}
                    placeholder="เลือกประเภทแหล่งทุน"
                    className="md:w-14rem w-full"
                  />
                </div>
                {!workData.searchResult && (
                  <span className="text-xs text-red-700">
                    Please fill out this field.
                  </span>
                )}
              </div>
            </section>
            <SearchWorkInvention number={7} invention={invention} />
          </div>
        </section>

        {/* ข้อ 8*/}
        <RadioGroup
          value={workData?.isRequest}
          onChange={(e) => {
            if (e === "เคย") {
              handleChangeRaio({ e, name: "isRequest" });
            } else {
              setWorkData((prev) => {
                delete prev?.requestDate;
                return {
                  ...prev,
                  isRequest: e,
                  requestNumber: "",
                  requestCountry: "",
                };
              });
            }
          }}
          isRequired
          className="flex flex-col items-start justify-center gap-2 md:gap-5 "
        >
          <div className="flex flex-col gap-1">
            <section className="flex items-center gap-3">
              <Number number={8} />
              <Label className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
                การประดิษฐ์นี้เคยนำไปยื่นขอรับสิทธิบัตรหรืออนุสิทธิบัตรหรือไม่
              </Label>
            </section>
            <FieldError className="text-xs text-red-700" />
          </div>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem] md:flex-row md:gap-5 md:pl-0 md:text-base">
            <section className="flex w-full flex-col gap-2 px-5 md:flex-row md:px-0">
              <Radio className="flex" value="เคย">
                {({ isSelected }) => (
                  <div className=" flex items-center gap-2">
                    <div className=" text-2xl">
                      {isSelected ? (
                        <MdOutlineRadioButtonChecked />
                      ) : (
                        <MdOutlineRadioButtonUnchecked />
                      )}
                    </div>
                    <p className="text-[0.8rem] font-medium md:text-base">
                      เคย
                    </p>
                  </div>
                )}
              </Radio>

              <TextField className={"ml-3 flex items-center"}>
                <Label className="min-w-28  text-[var(--primary-blue)] md:min-w-24">
                  เลขที่คำขอ :
                </Label>
                <Input
                  disabled={workData?.isRequest === "ไม่เคย"}
                  value={workData?.requestNumber}
                  onChange={handleChangeWorkData}
                  name="requestNumber"
                  type="text"
                  className="h-8 w-full rounded-md  bg-slate-300 p-1 pl-3 text-[0.8rem] md:h-10 md:p-2  md:pl-4 md:text-base"
                  placeholder="เลขที่คำขอ"
                />
              </TextField>
              <TextField className={"ml-3 flex items-center"}>
                <Label className="min-w-28  text-[var(--primary-blue)] md:min-w-24">
                  ยื่นเมื่อวันที่ :
                </Label>
                <div className="w-40 rounded-lg bg-slate-300 p-1">
                  <Calendar
                    disabled={workData?.isRequest === "ไม่เคย"}
                    value={
                      workData?.requestDate
                        ? new Date(workData.requestDate)
                        : null
                    }
                    onChange={(e) => {
                      handleChangeCalendar({
                        value: e.value as Date,
                        name: "requestDate",
                      });
                    }}
                    required
                    locale="th"
                    dateFormat="dd/mm/yy"
                    placeholder="dd/mm/yyyy"
                  />
                </div>
              </TextField>
              <TextField className={"ml-3 flex items-center"}>
                <Label className="min-w-28  text-[var(--primary-blue)] md:min-w-24">
                  ประเทศที่ยื่น :
                </Label>
                <Input
                  disabled={workData?.isRequest === "ไม่เคย"}
                  value={workData?.requestCountry}
                  onChange={handleChangeWorkData}
                  name="requestCountry"
                  type="text"
                  className="h-8 w-full rounded-md  bg-slate-300 p-1 pl-3 text-[0.8rem] md:h-10 md:p-2  md:pl-4 md:text-base"
                  placeholder=""
                />
              </TextField>
            </section>
            <Radio className="flex" value="ไม่เคย">
              {({ isSelected }) => (
                <div className=" flex items-center gap-2">
                  <div className=" text-2xl">
                    {isSelected ? (
                      <MdOutlineRadioButtonChecked />
                    ) : (
                      <MdOutlineRadioButtonUnchecked />
                    )}
                  </div>
                  <p className="text-[0.8rem] font-medium md:text-base">
                    ไม่เคย
                  </p>
                </div>
              )}
            </Radio>
          </div>
        </RadioGroup>

        {/* ข้อ 9*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={9} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              การเปิดเผยสาระสำคัญของการประดิษฐ์/การเผยแพร่ผลงาน
            </p>
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem] md:flex-col md:gap-5 md:pl-0 md:text-base">
            <section className=" flex w-96 flex-col gap-5">
              <label>เลือกรูปแบบการเผยแพร่</label>
              <div className="flex flex-col gap-1">
                <div className=" h-12 rounded-lg bg-slate-300 p-1">
                  <Dropdown
                    value={workData?.publicType}
                    options={publicType}
                    onChange={(e) => {
                      setSnackBarData(() => {
                        return {
                          open: true,
                          action: <SnackbarSaveData />,
                        };
                      });
                      setWorkData((prev) => {
                        return {
                          ...prev,
                          publicType: e.value,
                        };
                      });
                    }}
                    required
                    placeholder="การเผยแพร่ผลงานแล้วในรูปแบบ"
                    className="md:w-14rem h-10 w-full"
                  />
                </div>
                {!workData.publicType && (
                  <span className="text-xs text-red-700">
                    Please fill out this field.
                  </span>
                )}
              </div>
            </section>
            {workData?.publicType === "อื่น ๆ (โปรดระบุ)" && (
              <TextField className={"ml-3 flex items-center"}>
                <Label className="min-w-28  text-[var(--primary-blue)] md:min-w-24">
                  ระบุุอื่นๆ :
                </Label>
                <Input
                  value={workData?.otherPublicType}
                  onChange={handleChangeWorkData}
                  name="otherPublicType"
                  type="text"
                  className="h-8 w-full rounded-md  bg-slate-300 p-1 pl-3 text-[0.8rem] md:h-10 md:p-2  md:pl-4 md:text-base"
                  placeholder="ระบุุอื่นๆ"
                />
              </TextField>
            )}
          </div>
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

                setWorkData((prev) => {
                  if (!prev?.files)
                    return {
                      ...prev,
                      files: [{ file: file, url: url, name: "PUBLIC" }],
                    };
                  return {
                    ...prev,
                    files: [
                      ...prev?.files,
                      { file: file, url: url, name: "PUBLIC" },
                    ],
                  };
                });

                reader.readAsDataURL(file);
              });
            }}
          >
            <Button
              isDisabled={workData?.publicType === "ไม่เผยแพร่ผลงาน"}
              className={`flex items-center  justify-center gap-3 rounded-md 
             p-2 px-5 font-semibold duration-300  md:gap-5
             ${workData?.publicType === "ไม่เผยแพร่ผลงาน" ? "bg-gray-400 text-black" : "bg-[#BED6FF] hover:bg-[#91B2EB] "}
             `}
            >
              <span className="text-3xl md:text-base">
                <FiPlusCircle />
              </span>

              <p>แนบรายละเอียดหรือเอกสารประกอบการเผยแพร่ (ถ้ามี)</p>
            </Button>
          </FileTrigger>
          <div className="grid w-full gap-2 xl:grid-cols-3 2xl:grid-cols-4">
            {workData?.files
              ?.filter((file) => file.name === "PUBLIC")
              .map((file, index) => {
                return (
                  <FileOnWorkInvention
                    key={index}
                    file={file}
                    handleDeleteFile={handleDeleteFile}
                  />
                );
              })}
          </div>
          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem] md:flex-row md:gap-5 md:pl-0 md:text-base">
            <p className={"w-full md:px-8"}>
              กรุณาระบุรายละเอียดของการเผยแพร่ผลงาน ได้แก่ ชื่อผลงาน
              วัน/เดือน/ปีที่เผยแพร่ สถานที่ หรือผู้จัดงาน
              และ/หรือแนบหนังสือรับรองจากผู้จัดงาน หรือแนบ เอกสารประกอบ
            </p>
            <TextField className={"w-full md:px-8"}>
              <TextArea
                required={workData?.publicType !== "ไม่เผยแพร่ผลงาน"}
                disabled={workData?.publicType === "ไม่เผยแพร่ผลงาน"}
                value={workData?.publicDetail}
                onChange={handleChangeWorkData}
                name="publicDetail"
                className="no-re min-h-52   w-full	 resize-none
                 rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem] md:h-10 md:p-2  md:pl-4 md:text-base"
                placeholder="กรอกข้อมูล"
              />
              <FieldError className="text-xs text-red-700" />
            </TextField>
          </div>
          <FieldError className="text-xs text-red-700" />
        </section>

        {/* ข้อ 10*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={10} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              ข้อดีและลักษณะเฉพาะของการประดิษฐ์/งานวิจัยนี้/การเผยแพร่ผลงาน
            </p>
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem] md:flex-row md:gap-5 md:pl-0 md:text-base">
            <p className={"w-full md:px-8"}>
              โปรดระบุถึงลักษณะเด่นและอธิบายในรายละเอียดของความใหม่ของผลงาน
              โดยเฉพาะในส่วนที่ได้พัฒนาให้ดีขึ้นกว่าเดิมได้
              โดยเน้นให้เห็นถึงความแตกต่างจากการประดิษฐ์หรืองานเดิม
            </p>
            <TextField className={"w-full md:px-8"}>
              <TextArea
                value={workData?.outstandingDetail}
                onChange={handleChangeWorkData}
                name="outstandingDetail"
                required
                className="no-re min-h-52   w-full	 resize-none
                 rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem] md:h-10 md:p-2  md:pl-4 md:text-base"
                placeholder="กรอกข้อมูล"
              />
              <FieldError className="text-xs text-red-700" />
            </TextField>
          </div>
        </section>
        {/* ข้อ 11*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={11} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              ข้อด้อยหรือข้อจำกัดของการประดิษฐ์/งานวิจัยนี้
            </p>
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem] md:flex-row md:gap-5 md:pl-0 md:text-base">
            <TextField className={"w-full md:px-8"}>
              <TextArea
                required
                value={workData?.limitationDetail}
                onChange={handleChangeWorkData}
                name="limitationDetail"
                className="no-re min-h-52   w-full	 resize-none
                 rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem] md:h-10 md:p-2  md:pl-4 md:text-base"
                placeholder="กรอกข้อมูล"
              />
              <FieldError className="text-xs text-red-700" />
            </TextField>
          </div>
        </section>
        {/* ข้อ 12*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={12} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              ผลิตภัณฑ์/การประดิษฐ์/ผลงานที่ใกล้เคียงที่มีอยู่แล้วในตลาด
            </p>
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem] md:flex-row md:gap-5 md:pl-0 md:text-base">
            <TextField className={"w-full md:px-8"}>
              <TextArea
                value={workData?.marketDetail}
                onChange={handleChangeWorkData}
                name="marketDetail"
                required
                className="no-re min-h-52   w-full	 resize-none
                 rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem] md:h-10 md:p-2  md:pl-4 md:text-base"
                placeholder="กรอกข้อมูล"
              />
              <FieldError className="text-xs text-red-700" />
            </TextField>
          </div>
        </section>

        {snackBarData.open && snackBarData.action}
      </Form>
    </div>
  );
};

export default NrruInventionForm2;
