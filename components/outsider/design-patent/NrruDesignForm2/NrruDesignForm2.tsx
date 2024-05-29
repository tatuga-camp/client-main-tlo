import Number from "@/components/Number";
import React, { useState } from "react";
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
import { IoIosCheckbox } from "react-icons/io";
import {
  MdCheckBoxOutlineBlank,
  MdOutlineRadioButtonChecked,
  MdOutlineRadioButtonUnchecked,
} from "react-icons/md";
import { UseQueryResult } from "@tanstack/react-query";
import { ResponseGetDesignPatentService } from "../../../../services/design-patent/design-patent";
import SearchWorkDesign from "./SearchWorkDesign";
import { ErrorMessages, FileWorkType } from "../../../../models";
import {
  AgreementTitle,
  FundingLists,
  PublicType,
  ResearchOwnershipSubmission,
  ResearchType,
  Websites,
  agreementTitles,
  fundingLists,
  publicType,
  researchOwnershipSubmissionList,
  searchResults,
  websites,
} from "../../../../data/invention";
import SnackbarLoading from "../../../Snackbars/SnackBarLoading";
import {
  GetSignURLService,
  UploadSignURLService,
} from "../../../../services/google-storage";
import {
  CreateFileWorkDesignPatentService,
  DeleteFileWorkDesignPatentService,
} from "../../../../services/design-patent/work-design/file-work-design";
import { UpdateWorkDesignPatentService } from "../../../../services/design-patent/work-design/work-design";
import SnackbarNoSaveData from "../../../Snackbars/SnackBarNoSaveData";
import SnackbarSaveData from "../../../Snackbars/SnackbarSaveData";
import Swal from "sweetalert2";
import { DeleteFileWorkInventionPatentService } from "../../../../services/invention-patent/work-invention/file-work-invention";
import { Dropdown } from "primereact/dropdown";
import FileOnWorkDesign from "./FileOnWorkDesign";
import { menuDesignForm2 } from "../../../../data/menu";

type NrruDesignForm2Props = {
  design: UseQueryResult<ResponseGetDesignPatentService, Error>;
};
const NrruDesignForm2 = ({ design }: NrruDesignForm2Props) => {
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
    descriptionDetail?: string;
    futureDetail?: string;
  }>(() => {
    return {
      thaiName: design.data?.workInfoOnDesignPatent.thaiName,
      englishName: design.data?.workInfoOnDesignPatent.englishName,
      files: [
        ...(design.data?.workInfoOnDesignPatent.fileWorkDesigns.map((file) => {
          return {
            id: file.id,
            url: file.url,
            name: file.name,
            type: file.type,
          };
        }) ?? []),
      ],
      beginWorkAt: design.data?.workInfoOnDesignPatent.beginWorkAt,
      finishWorkAt: design.data?.workInfoOnDesignPatent.finishWorkAt,
      benefit: design.data?.workInfoOnDesignPatent.benefit,
      otherBenefit: design.data?.workInfoOnDesignPatent.otherBenefit,

      agreementTitle: design.data?.workInfoOnDesignPatent.agreementTitle,
      agreementInstitution:
        design.data?.workInfoOnDesignPatent.agreementInstitution,
      agreementYear: design.data?.workInfoOnDesignPatent.agreementYear,
      otherAgreement: design.data?.workInfoOnDesignPatent.otherAgreement,
      researchResult: design.data?.workInfoOnDesignPatent.researchResult,
      keywords: design.data?.workInfoOnDesignPatent.keywords,
      website: design.data?.workInfoOnDesignPatent.website,
      searchResult: design.data?.workInfoOnDesignPatent.searchResult,
      isRequest: design.data?.workInfoOnDesignPatent.requestNumber
        ? "เคย"
        : "ไม่เคย",
      requestNumber: design.data?.workInfoOnDesignPatent.requestNumber,
      requestDate: design.data?.workInfoOnDesignPatent.requestDate,
      requestCountry: design.data?.workInfoOnDesignPatent.requestCountry,
      publicType: design.data?.workInfoOnDesignPatent.publicType,
      otherPublicType: design.data?.workInfoOnDesignPatent.otherPublicType,
      publicDetail: design.data?.workInfoOnDesignPatent.publicDetail,
      outstandingDetail: design.data?.workInfoOnDesignPatent.outstandingDetail,
      futureDetail: design.data?.workInfoOnDesignPatent.futureDetail,
      descriptionDetail: design.data?.workInfoOnDesignPatent.descriptionDetail,
    };
  });

  const handleUpdateWorkDesign = async (e: React.FormEvent) => {
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

          await CreateFileWorkDesignPatentService({
            type: file.file?.type as string,
            url: getSignURL.originalURL,
            name: file.name as FileWorkType,
            size: file.file?.size as number,
            workInfoOnDesignPatentId: design.data?.workInfoOnDesignPatent
              .id as string,
            designPatentId: design.data?.id as string,
          });
        }
      }
      await UpdateWorkDesignPatentService({
        query: {
          workOnDesignPatentId: design.data?.workInfoOnDesignPatent
            .id as string,
        },
        body: {
          thaiName: workData?.thaiName,
          englishName: workData?.englishName,
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
          descriptionDetail: workData?.descriptionDetail,
          futureDetail: workData?.futureDetail,
          isComplete: true,
        },
      });
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
        await DeleteFileWorkDesignPatentService({
          fileWorkDesignId: fileOnWorkId,
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
        onSubmit={handleUpdateWorkDesign}
        className="mx-0 my-5 flex flex-col gap-8 md:mx-5 md:my-10 "
      >
        {/* ข้อ 1*/}
        <section className="flex flex-col items-start justify-center gap-3 md:gap-5  lg:flex-row">
          <section className="flex items-center gap-3">
            <Number number={1} />
            <p className="my-2 text-[0.8rem] font-semibold md:min-w-64 md:text-base">
              ชื่อที่แสดงถึงรออกแบบผลิตภัณฑ์
            </p>
          </section>
          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem] md:flex-row md:gap-5 md:pl-0 md:text-base">
            <TextField className={"flex w-full min-w-60 items-center gap-3 "}>
              <Label className=" text-[var(--primary-blue) md:min-md:w-40 w-28 min-w-24 font-medium">
                ชื่อภาษาไทย
              </Label>
              <div className="flex flex-col gap-1">
                <Input
                  value={workData?.thaiName}
                  required
                  name="thaiName"
                  onChange={handleChangeWorkData}
                  type="text"
                  className="md:min-md:w-80 w-56md:pl-4 h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 "
                  placeholder="กรอกชื่อภาษาไทย"
                />
                <FieldError className="text-xs text-red-700" />
              </div>
            </TextField>
          </div>
        </section>

        {/* ข้อ 2*/}
        <section className="flex items-start justify-center gap-3 md:items-center md:gap-5">
          <Number number={2} />
          <div className="flex w-full flex-col gap-3 text-[0.8rem] md:flex-row md:gap-5 md:text-base">
            <TextField
              isRequired
              className={"flex w-full items-center gap-3 md:w-[50%]"}
            >
              <Label className=" text-[var(--primary-blue) w-max font-semibold">
                ปีที่เริ่มการออกแบบผลิตภัณฑ์
              </Label>
              <div className="w-24 rounded-lg bg-slate-300 p-1 md:w-40">
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
              <Label className="min-w-24 font-semibold text-[var(--primary-blue)] md:min-w-32">
                ปีที่ผลงานแล้วเสร็จ
              </Label>
              <div className="w-24 rounded-lg bg-slate-300 p-1 md:w-40">
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

        {/* ข้อ 3*/}
        <CheckboxGroup
          isRequired
          value={workData?.benefit}
          onChange={(e) => handleChangeCheckbox({ e, name: "benefit" })}
          className="flex flex-col items-start justify-center gap-2 md:gap-5 "
        >
          <section className="flex items-center gap-3">
            <Number number={3} />
            <Label className="my-2 text-[0.8rem] font-semibold md:min-w-64 md:text-base">
              สิ่งที่ได้จากการประดิษฐ์/งานวิจัย/ข้อค้นพบ (ตอบได้มากกว่า 1 ข้อ)
            </Label>
          </section>

          <div className="grid w-full grid-cols-1 gap-1.5 px-5 text-[0.8rem] md:grid-cols-3 md:gap-3 md:pl-0 md:text-base">
            {/* row1 */}

            {menuDesignForm2.map((item, index) => {
              return (
                <Checkbox
                  key={index}
                  className={({ isPressed, isSelected }) =>
                    isSelected ? "" : ""
                  }
                  value={item.title}
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
                      <span className="font-medium">{item.title}</span>
                    </div>
                  )}
                </Checkbox>
              );
            })}
          </div>
          <section className="flex w-full flex-col gap-2 px-5 md:flex-row md:px-0">
            <div className="flex items-center gap-2">
              <p className="text-[0.8rem] font-medium md:text-base">
                อื่นๆ (โปรดระบุ)
              </p>
            </div>

            <TextField className={"ml-3"}>
              <Input
                value={workData?.otherBenefit}
                onChange={handleChangeWorkData}
                name="otherBenefit"
                type="text"
                className="h-8 w-full rounded-md  bg-slate-300 p-1 pl-3 text-[0.8rem] md:h-10 md:p-2  md:pl-4 md:text-base"
                placeholder="อื่นๆ (โปรดระบุ)"
              />
              <FieldError className="text-xs text-red-700" />
            </TextField>
          </section>
        </CheckboxGroup>

        {/* ข้อ 4*/}
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
              <Number number={4} />
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
            <TextField
              className={`ml-3 flex flex-col gap-5 md:flex-row  md:items-center`}
            >
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
              <div className=" w-28 rounded-lg bg-slate-300 p-1 md:w-40">
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

        {/* ข้อ 5*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={5} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              ข้อมูลประกอบการสืบค้นสิทธิบัตรเบื้องต้น
            </p>
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem] md:flex-row md:gap-5 md:pl-0 md:text-base">
            <section className="flex w-full items-center gap-3 md:pl-10">
              <p className="font-semibold md:min-w-52">
                5.1 Keyword ที่ใช้ในการสืบค้น
              </p>
              <TextField isRequired className={"w-full md:px-8"}>
                <Input
                  value={workData?.keywords}
                  onChange={handleChangeWorkData}
                  name="keywords"
                  type="text"
                  className="h-8 w-auto rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem] md:h-10 md:p-2   md:text-base"
                  placeholder="โปรดระบุ Keyword"
                />
                <FieldError className="text-xs text-red-700" />
              </TextField>
            </section>
            <section className="flex w-full flex-col  gap-3 md:pl-10">
              <p className="font-semibold md:min-w-52">
                5.2 เว็บไซต์/ฐานข้อมูลที่ใช้ในการสืบค้น
              </p>
              <RadioGroup
                value={workData?.website}
                onChange={(e) => handleChangeRaio({ e, name: "website" })}
                isRequired
                className="flex flex-col items-start justify-center gap-2 md:gap-5 "
              >
                <div className="grid w-full grid-cols-1 gap-1.5 px-5 text-[0.8rem] md:grid-cols-2 md:gap-3 md:pl-0 md:text-base">
                  {/* row1 */}

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
                </div>
                <section className="flex w-full flex-col gap-2 px-5 md:flex-row md:px-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[0.8rem] font-medium md:text-base">
                      อื่นๆ (วารสาร แหล่งข้อมูลอื่น)
                    </p>
                  </div>

                  <TextField className={"ml-3"}>
                    <Input
                      value={workData?.website}
                      onChange={handleChangeWorkData}
                      name="website"
                      type="text"
                      className="h-8 w-full rounded-md  bg-slate-300 p-1 pl-3 text-[0.8rem] md:h-10 md:p-2  md:pl-4 md:text-base"
                      placeholder="โปรดระบุ"
                    />
                    <FieldError className="text-xs text-red-700" />
                  </TextField>
                </section>
              </RadioGroup>
            </section>
            <section className="flex w-full flex-col gap-3 md:flex-row md:items-center md:pl-10">
              <p className="font-semibold md:min-w-52">
                5.3 ผลของการสืบค้นพบว่า
              </p>
              <div className="flex flex-col gap-1">
                <div className="w-56rounded-lg bg-slate-300 p-1 md:w-80">
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
            <SearchWorkDesign design={design} />
          </div>
        </section>

        {/* ข้อ 6*/}
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
          className="flex flex-col items-start justify-center gap-2 md:gap-4 "
        >
          <div className="flex flex-col gap-1">
            <section className="flex items-center gap-3">
              <Number number={6} />
              <Label className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
                การประดิษฐ์นี้เคยนำไปยื่นขอรับสิทธิบัตรการออกแบบผลิตภัณฑ์หรือไม่
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
                <div className="w-28 rounded-lg bg-slate-300 p-1 md:w-40">
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

        {/* ข้อ 7*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={7} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              การเปิดเผยสาระสำคัญของการประดิษฐ์/การเผยแพร่ผลงาน
            </p>
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem] md:flex-col md:gap-5 md:pl-0 md:text-base">
            <section className=" flex w-72 flex-col gap-5 lg:w-96">
              <label>เลือกรูปแบบการเผยแพร่</label>
              <div className="flex flex-col gap-1">
                <div className=" h-12 w-56 rounded-lg bg-slate-300 p-1 md:w-60">
                  <Dropdown
                    value={workData?.publicType}
                    options={publicType}
                    required
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
                  <FileOnWorkDesign
                    key={index}
                    file={file}
                    handleDeleteFile={handleDeleteFile}
                  />
                );
              })}
          </div>

          <FieldError className="text-xs text-red-700" />
        </section>

        {/* ข้อ 8*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={8} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              ความใหม่ของการออกแบบผลิตภัณฑ์
            </p>
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem] md:flex-row md:gap-5 md:pl-0 md:text-base">
            <p className={"w-full md:px-8"}>
              โปรดระบุถึงลักษณะเด่นและอธิบายในรายละเอียดของความใหม่
              โดยเฉพาะในส่วนที่ได้พัฒนาให้ดีขึ้นกว่าเดิมได้
              โดยเน้นให้เห็นถึงความ แตกต่างจากแบบผลิตภัณฑ์เดิม
            </p>
            <TextField isRequired className={"w-full md:px-8"}>
              <TextArea
                required
                name="outstandingDetail"
                value={workData.outstandingDetail}
                onChange={handleChangeWorkData}
                className="h-40 w-full resize-none rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem]  md:p-2  md:pl-4 md:text-base"
                placeholder="กรอกข้อมูล"
              />
              <FieldError className="text-xs text-red-700" />
            </TextField>
          </div>
        </section>
        {/* ข้อ 9*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={9} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              คำพรรณนาผลิตภัณฑ์ (ถ้ามี)
            </p>
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem] md:flex-row md:gap-5 md:pl-0 md:text-base">
            <TextField className={"w-full md:px-8"}>
              <TextArea
                name="descriptionDetail"
                value={workData.descriptionDetail}
                onChange={handleChangeWorkData}
                className="h-40 w-full resize-none rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem]  md:p-2  md:pl-4 md:text-base"
                placeholder="กรอกข้อมูล"
              />
            </TextField>
          </div>
        </section>

        {snackBarData.open && snackBarData.action}
      </Form>
    </div>
  );
};

export default NrruDesignForm2;
