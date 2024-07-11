import Number from "@/components/Number";
import React, {
  forwardRef,
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
import { Calendar } from "primereact/calendar";
import { FiPlusCircle } from "react-icons/fi";
import { menuDesignForm2 } from "@/data/menu";
import { IoIosCheckbox } from "react-icons/io";
import {
  MdCheckBoxOutlineBlank,
  MdOutlineRadioButtonChecked,
  MdOutlineRadioButtonUnchecked,
} from "react-icons/md";
import {
  HireDetailOptions,
  IsMarketingLists,
  SignedDocumentDetailLists,
  TranferPermissionDurationOptions,
  TranferPermissionOptions,
  TranferPermissionQualityOptions,
  WorkQualityOptions,
  hireDetailOptions,
  isMarketingLists,
  menuNrruCopyright2,
  signedDocumentDetailLists,
  tranferPermissionDurationOptions,
  tranferPermissionOptions,
  tranferPermissionQualityOptions,
  workQualityOptions,
} from "../../../../data/copyright";
import { Dropdown } from "primereact/dropdown";
import {
  FundingLists,
  ResearchOwnershipSubmission,
  fundingLists,
  researchOwnershipSubmissionList,
} from "../../../../data/invention";
import FileOnWorkCopyright from "./FileOnWorkCopyright";
import { ErrorMessages, FileWorkType } from "../../../../models";
import SnackbarLoading from "../../../Snackbars/SnackBarLoading";
import {
  CreateFileWorkCopyrightService,
  DeleteFileWorkCopyrightService,
} from "../../../../services/copyright/work-copyright/file-work-copyright";
import SnackbarNoSaveData from "../../../Snackbars/SnackBarNoSaveData";
import Swal from "sweetalert2";
import {
  GetSignURLService,
  UploadSignURLService,
} from "../../../../services/google-storage";
import { CreateFileCopyrightService } from "../../../../services/copyright/file-copyright";
import { UseQueryResult } from "@tanstack/react-query";
import { ResponseGetCopyrightService } from "../../../../services/copyright/copyright";
import { UpdateWorkCopyrightService } from "../../../../services/copyright/work-copyright/work-copyright";
import {
  handleChangeToBuddhistYear,
  handleChangeToChristianYear,
} from "../../../../utilities/date";

type NrruCopyrightForm2Props = {
  copyright: UseQueryResult<ResponseGetCopyrightService, Error>;
};
const NrruCopyrightForm2 = forwardRef(function FormCopyright(
  { copyright }: NrruCopyrightForm2Props,
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
  const [workData, setWorkData] = useState<{
    name?: string;
    workType?: string;
    files?: {
      id?: string;
      url: string;
      name?: FileWorkType;
      type?: string;
      file?: File;
    }[];
    finishWorkAt?: string;
    workQuality?: WorkQualityOptions;
    workQualityPartDetail?: string;
    hireWork?: string;
    otherWorkQuality?: string;
    benefit?: string[];
    otherBenefit?: string;
    funding?: string;
    sourceFunding?: string;
    yearFunding?: string;
    researchOwnershipSubmission?: ResearchOwnershipSubmission;
    typeAccessibleMedia?: string;
    signedDocument?: SignedDocumentDetailLists;
    signedDocumentDetail?: string;
    isMarketing?: IsMarketingLists;
    marketingDate?: string;
    marketingCountry?: string;
    tranferPermission?: TranferPermissionOptions;
    tranferPermissionDetail?: string;
    tranferPermissionDate?: string;
    tranferPermissionQuality?: TranferPermissionQualityOptions;
    tranferPermissionQualityDetail?: string;
    tranferPermissionDuration?: TranferPermissionDurationOptions;
    tranferPermissionDurationDetail?: string;
    workDescription?: string;
  }>(() => {
    return {
      name: copyright.data?.workInfoOnCopyright.name,
      workType: copyright.data?.workInfoOnCopyright.workType,
      files: copyright.data?.workInfoOnCopyright.fileWorkInfoOnCopyrights?.map(
        (file) => {
          return {
            id: file.id,
            url: file.url,
            name: file.name as FileWorkType,
            type: file.type,
          };
        },
      ),
      finishWorkAt: handleChangeToBuddhistYear(
        new Date(copyright.data?.workInfoOnCopyright.finishWorkAt as string),
      ),
      workQuality: copyright.data?.workInfoOnCopyright.workQuality,
      workQualityPartDetail:
        copyright.data?.workInfoOnCopyright.workQualityPartDetail,
      hireWork: copyright.data?.workInfoOnCopyright.hireWork,
      otherWorkQuality: copyright.data?.workInfoOnCopyright.otherWorkQuality,
      benefit: copyright.data?.workInfoOnCopyright.benefit,
      otherBenefit: copyright.data?.workInfoOnCopyright.otherBenefit,
      funding: copyright.data?.workInfoOnCopyright.funding,
      sourceFunding: copyright.data?.workInfoOnCopyright.sourceFunding,
      yearFunding: handleChangeToBuddhistYear(
        new Date(copyright.data?.workInfoOnCopyright.yearFunding as string),
      ),
      researchOwnershipSubmission:
        copyright.data?.workInfoOnCopyright.researchOwnershipSubmission,
      typeAccessibleMedia:
        copyright.data?.workInfoOnCopyright.typeAccessibleMedia,
      signedDocument: copyright.data?.workInfoOnCopyright.signedDocument,
      signedDocumentDetail:
        copyright.data?.workInfoOnCopyright.signedDocumentDetail,
      isMarketing: copyright.data?.workInfoOnCopyright.isMarketing,
      marketingDate: copyright.data?.workInfoOnCopyright.marketingDate,
      marketingCountry: copyright.data?.workInfoOnCopyright.marketingCountry,
      tranferPermission: copyright.data?.workInfoOnCopyright.tranferPermission,
      tranferPermissionDetail:
        copyright.data?.workInfoOnCopyright.tranferPermissionDetail,
      tranferPermissionDate:
        copyright.data?.workInfoOnCopyright.tranferPermissionDate,
      tranferPermissionQuality:
        copyright.data?.workInfoOnCopyright.tranferPermissionQuality,
      tranferPermissionQualityDetail:
        copyright.data?.workInfoOnCopyright.tranferPermissionQualityDetail,
      tranferPermissionDuration:
        copyright.data?.workInfoOnCopyright.tranferPermissionDuration,
      tranferPermissionDurationDetail:
        copyright.data?.workInfoOnCopyright.tranferPermissionDurationDetail,
      workDescription: copyright.data?.workInfoOnCopyright.workDescription,
    };
  });

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
      const filterFiles = workData?.files?.filter((file) => !file.id);
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

          await CreateFileWorkCopyrightService({
            type: file.file?.type as string,
            url: getSignURL.originalURL,
            name: file.name as FileWorkType,
            size: file.file?.size as number,
            workInfoOnCopyrightId: copyright.data?.workInfoOnCopyright
              .id as string,
            copyrightId: copyright.data?.id as string,
          });
        }
      }
      await UpdateWorkCopyrightService({
        query: {
          workOnCopyrightId: copyright.data?.workInfoOnCopyright.id as string,
        },
        body: {
          name: workData?.name,
          workType: workData?.workType,
          finishWorkAt: handleChangeToChristianYear(
            new Date(workData?.finishWorkAt as string),
          ),
          workQuality: workData?.workQuality,
          workQualityPartDetail: workData?.workQualityPartDetail,
          hireWork: workData?.hireWork,
          otherWorkQuality: workData?.otherWorkQuality,
          benefit: workData?.benefit,
          otherBenefit: workData?.otherBenefit,
          funding: workData?.funding,
          sourceFunding: workData?.sourceFunding,
          yearFunding: handleChangeToChristianYear(
            new Date(workData?.yearFunding as string),
          ),
          researchOwnershipSubmission: workData?.researchOwnershipSubmission,
          typeAccessibleMedia: workData?.typeAccessibleMedia,
          signedDocument: workData?.signedDocument,
          signedDocumentDetail: workData?.signedDocumentDetail,
          isMarketing: workData?.isMarketing,
          marketingDate: workData?.marketingDate,
          marketingCountry: workData?.marketingCountry,
          tranferPermission: workData?.tranferPermission,
          tranferPermissionDetail: workData?.tranferPermissionDetail,
          tranferPermissionDate: workData?.tranferPermissionDate,
          tranferPermissionQuality: workData?.tranferPermissionQuality,
          tranferPermissionQualityDetail:
            workData?.tranferPermissionQualityDetail,
          tranferPermissionDuration: workData?.tranferPermissionDuration,
          tranferPermissionDurationDetail:
            workData?.tranferPermissionDurationDetail,
          workDescription: workData?.workDescription,
          isComplete: true,
        },
      });
      await copyright.refetch();
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

  const handleChangeWorkData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setWorkData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeCalendar = ({
    value,
    name,
  }: {
    value: Date;
    name: string;
  }) => {
    if (value instanceof Date) {
      setWorkData((prev) => {
        return {
          ...prev,
          [name]: value.toISOString(),
        };
      });
    }
  };

  const handleChangeCheckbox = ({ e, name }: { e: string[]; name: string }) => {
    setWorkData((prev) => {
      return {
        ...prev,
        [name]: e,
      };
    });
  };

  const handleChangeRaio = ({ e, name }: { e: string; name: string }) => {
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
        await DeleteFileWorkCopyrightService({
          fileWorkCopyrightId: fileOnWorkId,
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
            <p className="my-2 text-[0.8rem] font-semibold md:min-w-24 md:text-base">
              ชื่อผลงาน
            </p>
          </section>
          <div className="flex w-full flex-col flex-wrap gap-3 pl-7 text-[0.8rem] md:flex-row md:gap-5 md:pl-0 md:text-base">
            <TextField
              isRequired
              className={"flex w-full min-w-60 items-center gap-3 "}
            >
              <section className="flex flex-col">
                <Input
                  name="name"
                  value={workData?.name}
                  onChange={handleChangeWorkData}
                  type="text"
                  className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:min-w-80 md:pl-4 "
                  placeholder="กรอกชื่อผลงาน"
                />
                <FieldError className="text-xs text-red-700" />
              </section>
            </TextField>
          </div>
        </section>

        {/* ข้อ 2*/}
        <RadioGroup
          isRequired
          value={workData?.workType}
          onChange={(e) => {
            setWorkData((prev) => ({
              ...prev,
              workType: e,
            }));
          }}
          className="flex flex-col items-start justify-center gap-2 md:gap-5 "
        >
          <div className="gap+-1 flex flex-col">
            <section className="flex items-center gap-3">
              <Number number={2} />
              <Label className="my-2 text-[0.8rem] font-semibold md:min-w-64 md:text-base">
                ประเภทของงานอันมีลิขสิทธิ์
              </Label>
            </section>
            <FieldError className="text-xs text-red-700" />
          </div>
          <Button className=" ml-5 flex items-center justify-center  gap-3 rounded-md bg-[#BED6FF] p-2 px-5 text-[0.8rem] font-semibold duration-300 hover:bg-[#91B2EB] md:ml-10 md:gap-5 md:text-base">
            <p>การเลือกประเภทงานอันมีลิขสิทธิ์ (คลิก)</p>
          </Button>
          <div className="grid w-full grid-cols-1 gap-1.5 px-5 text-[0.8rem] md:grid-cols-3 md:gap-3 md:pl-10 md:text-base">
            {menuNrruCopyright2.map((item, index) => {
              return (
                <Radio
                  key={index}
                  className={({ isPressed, isSelected }) =>
                    isSelected ? "" : ""
                  }
                  value={item}
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
                      <span className="font-medium">{item}</span>
                    </div>
                  )}
                </Radio>
              );
            })}
          </div>
        </RadioGroup>

        {/* ข้อ 3*/}
        <section className=" flex items-start justify-center gap-3 md:items-center md:gap-5">
          <div className="mt-2 md:mt-0">
            <Number number={3} />
          </div>

          <div className="flex w-full flex-col gap-3 text-[0.8rem] md:flex-row md:gap-5 md:text-base">
            <TextField
              isRequired
              className={"flex w-full items-center gap-3 md:w-[50%]"}
            >
              <Label className="min-w-28 font-semibold text-[var(--primary-blue)] md:min-w-32">
                ปีที่สร้างสรรค์ผลงานแล้วเสร็จ
              </Label>
              <section className="flex flex-col">
                <div className="w-32 rounded-lg bg-slate-300 p-1 text-xs md:w-40 md:text-base">
                  <Calendar
                    yearRange="2560:2568"
                    onChange={(e) =>
                      handleChangeCalendar({
                        value: e.value as Date,
                        name: "finishWorkAt",
                      })
                    }
                    value={
                      workData?.finishWorkAt
                        ? new Date(workData.finishWorkAt)
                        : null
                    }
                    required
                    locale="th"
                    view="year"
                    placeholder="ระบุปี"
                    dateFormat="yy"
                  />
                </div>
                <FieldError className="text-xs text-red-700" />
              </section>
            </TextField>
          </div>
        </section>

        {/* ข้อ 4*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={4} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              ลักษณะการสร้างสรรค์
            </p>
          </section>

          <RadioGroup
            onChange={(e) => {
              const value = e as WorkQualityOptions;
              setWorkData((prev) => {
                return {
                  ...prev,
                  workQuality: value,
                  workQualityPartDetail:
                    value !== "สร้างสรรค์บางส่วน (ระบุ)"
                      ? ""
                      : prev?.workQualityPartDetail,
                  otherWorkQuality:
                    value !== "อื่น ๆ (ระบุ)"
                      ? ""
                      : prev?.workQualityPartDetail,
                  hireWork: value !== "จ้างทำของ" ? "" : prev?.hireWork,
                };
              });
            }}
            value={workData?.workQuality}
            className="my-3 flex flex-col items-start justify-center gap-2 md:gap-5  lg:flex-row"
          >
            <div className="flex w-full flex-col  gap-1.5 px-5 text-[0.8rem] md:gap-3 md:pl-10 md:text-base">
              {workQualityOptions.map((quality) => {
                return (
                  <section key={quality} className="flex flex-col gap-3 ">
                    <Radio value={quality} className="flex w-full items-center">
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
                            {quality}
                          </span>
                        </div>
                      )}
                    </Radio>
                    {quality === "จ้างทำของ" && (
                      <div className="flex w-full flex-col items-start gap-1 md:ml-8 md:w-[70%]">
                        <div className="w-56 rounded-lg bg-slate-300 p-1 md:w-80">
                          <Dropdown
                            value={workData?.hireWork}
                            onChange={(e) => {
                              setWorkData((prev) => {
                                return {
                                  ...prev,
                                  hireWork: e.value,
                                };
                              });
                            }}
                            disabled={workData?.workQuality !== "จ้างทำของ"}
                            aria-label=""
                            required={workData?.workQuality === "จ้างทำของ"}
                            options={hireDetailOptions}
                            placeholder="เลือกรายละเอียดการจ้างงาน"
                            className="md:w-14rem w-full"
                          />
                        </div>
                        {!workData?.hireWork &&
                          workData?.workQuality === "จ้างทำของ" && (
                            <span className="text-xs text-red-700">
                              Please fill out this field.
                            </span>
                          )}
                      </div>
                    )}

                    {quality === "สร้างสรรค์บางส่วน (ระบุ)" && (
                      <TextField
                        className={
                          "flex w-full items-center gap-3 md:ml-8 md:w-[70%]"
                        }
                      >
                        <section className="flex w-full flex-col">
                          <Input
                            required={
                              workData?.workQuality ===
                              "สร้างสรรค์บางส่วน (ระบุ)"
                            }
                            disabled={
                              workData?.workQuality !==
                              "สร้างสรรค์บางส่วน (ระบุ)"
                            }
                            value={workData?.workQualityPartDetail}
                            onChange={handleChangeWorkData}
                            name="workQualityPartDetail"
                            type="text"
                            className="h-8 w-56 rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:w-60 md:pl-4 "
                            placeholder="โปรดระบุ รายละเอียด"
                          />
                          <FieldError className="text-xs text-red-700" />
                        </section>
                      </TextField>
                    )}

                    {quality === "อื่น ๆ (ระบุ)" && (
                      <TextField
                        className={
                          "flex w-full items-center gap-3 md:ml-8 md:w-[70%]"
                        }
                      >
                        <section className="flex w-full flex-col">
                          <Input
                            required={workData?.workQuality === "อื่น ๆ (ระบุ)"}
                            disabled={workData?.workQuality !== "อื่น ๆ (ระบุ)"}
                            value={workData?.otherWorkQuality}
                            onChange={handleChangeWorkData}
                            name="otherWorkQuality"
                            type="text"
                            className="h-8 w-56 rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:w-60 md:pl-4 "
                            placeholder="โปรดระบุ รายละเอียด"
                          />
                          <FieldError className="text-xs text-red-700" />
                        </section>
                      </TextField>
                    )}
                  </section>
                );
              })}
            </div>
          </RadioGroup>
        </section>

        {/* ข้อ 5*/}
        <CheckboxGroup
          onChange={(e) => handleChangeCheckbox({ e: e, name: "benefit" })}
          value={workData?.benefit}
          isRequired
          className="flex flex-col items-start justify-center gap-2 md:gap-5 "
        >
          <div className="flex flex-col gap-1">
            <section className="flex items-center gap-3">
              <Number number={5} />
              <Label className="my-2 text-[0.8rem] font-semibold md:min-w-64 md:text-base">
                สิ่งที่ได้จากการประดิษฐ์/งานวิจัย/ข้อค้นพบ (ตอบได้มากกว่า 1 ข้อ)
              </Label>
            </section>
            <FieldError className="text-xs text-red-700" />
          </div>

          <div className="grid w-full grid-cols-1 gap-1.5 px-5 text-[0.8rem] md:ml-10 md:grid-cols-3 md:gap-3 md:pl-0 md:text-base">
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
        </CheckboxGroup>

        {/* ข้อ 6*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={6} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              ผลงานนี้ได้รับทุนอุดหนุนหรืออยู่ภายใต้ข้อตกลง หรือสัญญาใด ๆ
              กับหน่วยงานอื่น หรือไม่ (ให้ระบุ)
            </p>
          </section>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem] md:flex-row md:gap-5 md:pl-0 md:text-base">
            <div className="flex flex-col gap-1">
              <div className="w-56 rounded-lg bg-slate-300 p-1 md:w-80">
                <Dropdown
                  value={workData?.funding}
                  onChange={(e) => {
                    setWorkData((prev) => {
                      const value: FundingLists = e.value;
                      if (
                        value ===
                          "ทุนอุดหนุนงบประมาณแผ่นดิน มหาวิทยาลัยราชภัฏนครราชสีมา" ||
                        value ===
                          "ทุนอุดหนุนเงินรายได้/กองทุนวิจัย มหาวิทยาลัยราชภัฏนครราชสีมา"
                      ) {
                        return {
                          ...prev,
                          funding: value,
                          sourceFunding: "มหาวิทยาลัยราชภัฏนครราชสีมา",
                        };
                      } else {
                        return {
                          ...prev,
                          funding: value,
                          sourceFunding: "",
                          yearFunding: undefined,
                        };
                      }
                    });
                  }}
                  aria-label="เลือกประเภทแหล่งทุน"
                  required
                  options={fundingLists}
                  placeholder="เลือกประเภทแหล่งทุน"
                  className="md:w-14rem w-full"
                />
              </div>
              {!workData?.funding && (
                <span className="text-xs text-red-700">
                  Please fill out this field.
                </span>
              )}
            </div>

            <section className="flex flex-col gap-5 lg:flex-row">
              <TextField className={"flex w-full items-center gap-3 "}>
                <Label className=" text-[var(--primary-blue) min-w-16 font-semibold md:min-w-20">
                  แหล่งทุน
                </Label>
                <div className="flex flex-col gap-1">
                  <Input
                    disabled={workData?.funding === "ไม่ได้รับทุนอุดหนุนใดๆ"}
                    value={workData?.sourceFunding}
                    required={workData?.funding !== "ไม่ได้รับทุนอุดหนุนใดๆ"}
                    name="sourceFunding"
                    onChange={handleChangeWorkData}
                    type="text"
                    className="h-8 w-44 rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:w-80 md:pl-4 "
                    placeholder="แหล่งทุน"
                  />
                  <FieldError className="text-xs text-red-700" />
                </div>
              </TextField>

              <TextField className={"flex  items-center gap-3 "}>
                <Label className="min-w-20 font-semibold text-[var(--primary-blue)] md:min-w-24">
                  ปีงบประมาณ
                </Label>
                <div className="w-40 rounded-lg bg-slate-300 p-1">
                  <Calendar
                    yearRange="2560:2568"
                    value={
                      workData?.yearFunding
                        ? new Date(workData.yearFunding)
                        : null
                    }
                    onChange={(e) => {
                      handleChangeCalendar({
                        value: e.value as Date,
                        name: "yearFunding",
                      });
                    }}
                    disabled={workData?.funding === "ไม่ได้รับทุนอุดหนุนใดๆ"}
                    required={workData?.funding !== "ไม่ได้รับทุนอุดหนุนใดๆ"}
                    locale="th"
                    view="year"
                    placeholder="ระบุปี"
                    dateFormat="yy"
                  />
                </div>
                <FieldError className="text-xs text-red-700" />
              </TextField>
            </section>
          </div>
        </section>

        {/* ข้อ 7*/}
        <RadioGroup
          onChange={(e) =>
            handleChangeRaio({ e, name: "researchOwnershipSubmission" })
          }
          value={workData?.researchOwnershipSubmission}
          isRequired
          className="flex flex-col items-start justify-center gap-2 md:gap-5 "
        >
          <div className="flex flex-col gap-1">
            <section className="flex items-center gap-3">
              <Number number={7} />
              <Label className="my-2 text-[0.8rem] font-semibold md:min-w-64 md:text-base">
                การยื่นขอความเป็นเจ้าของผลงานวิจัยและนวัตกรรมกับแหล่งให้ทุน
                (กรณีรับทุนวิจัยจากแหล่งทุนภายนอก)
              </Label>
            </section>
            <FieldError className="text-xs text-red-700" />
          </div>

          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem] md:flex-col md:gap-5 md:pl-0 md:text-base">
            <div className="flex flex-col gap-5 md:flex-row">
              {researchOwnershipSubmissionList.map((item, index) => {
                return (
                  <Radio
                    key={index}
                    className="flex w-56 items-center md:w-full"
                    value={item}
                  >
                    {({ isSelected }) => (
                      <div className=" flex gap-2">
                        <div className=" text-2xl">
                          {isSelected ? (
                            <MdOutlineRadioButtonChecked />
                          ) : (
                            <MdOutlineRadioButtonUnchecked />
                          )}
                        </div>
                        <span className=" font-semibold">{item}</span>
                      </div>
                    )}
                  </Radio>
                );
              })}
            </div>
            <FileTrigger
              allowsMultiple
              onSelect={(e) => {
                if (!e) return null;

                const files: FileList = e;
                Array.from(files).forEach((file) => {
                  const url = URL.createObjectURL(file);
                  const reader = new FileReader();

                  setWorkData((prev) => {
                    if (!prev?.files)
                      return {
                        ...prev,
                        files: [{ file: file, url: url, name: "OWNERSHIP" }],
                      };
                    return {
                      ...prev,
                      files: [
                        ...prev?.files,
                        { file: file, url: url, name: "OWNERSHIP" },
                      ],
                    };
                  });

                  reader.readAsDataURL(file);
                });
              }}
            >
              <Button
                isDisabled={
                  workData?.researchOwnershipSubmission === "ยังไม่มีการยื่น"
                }
                className={`flex w-56 items-center  justify-center gap-3 rounded-md p-2 
               px-5 font-semibold duration-300 md:w-72 
               md:gap-5 ${workData?.researchOwnershipSubmission === "ยังไม่มีการยื่น" ? "bg-gray-400 text-black" : "bg-[#BED6FF] hover:bg-[#91B2EB] "} `}
              >
                <span className="text-3xl md:text-base">
                  <FiPlusCircle />
                </span>
                <p className="text-sm">
                  แนบหนังสือแสดงความเป็นเจ้าของผลงานวิจัยและนวัตกรรม
                </p>
              </Button>
            </FileTrigger>
            <div className="grid w-full gap-2 xl:grid-cols-3 2xl:grid-cols-4">
              {workData?.files
                ?.filter((file) => file.name === "OWNERSHIP")
                .map((file, index) => {
                  return (
                    <FileOnWorkCopyright
                      key={index}
                      file={file}
                      handleDeleteFile={handleDeleteFile}
                    />
                  );
                })}
            </div>
          </div>
        </RadioGroup>

        {/* ข้อ 8*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={8} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              การจัดทำสื่อสำหรับคนพิการ
            </p>
          </section>

          <RadioGroup
            value={workData?.typeAccessibleMedia}
            onChange={(e) =>
              handleChangeRaio({ e, name: "typeAccessibleMedia" })
            }
            className=" flex flex-col items-start justify-center gap-2 md:gap-5 "
          >
            <section className="flex items-center gap-3">
              <Label className="my-2 text-[0.8rem] font-semibold md:ml-5 md:min-w-64 md:text-base">
                ประเภทสื่อ
              </Label>
            </section>

            <div className="grid w-full grid-cols-1 gap-1.5 px-5 text-[0.8rem] md:grid-cols-4 md:gap-3 md:pl-10 md:text-base">
              {menuNrruCopyright2.map((item, index) => {
                return (
                  <Radio
                    key={index}
                    className={({ isPressed, isSelected }) =>
                      isSelected ? "" : ""
                    }
                    value={item}
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
                        <span className="font-medium">{item}</span>
                      </div>
                    )}
                  </Radio>
                );
              })}
            </div>
          </RadioGroup>
        </section>

        {/* ข้อ 9*/}
        <RadioGroup
          isRequired
          value={workData?.signedDocument}
          onChange={(e) => handleChangeRaio({ e: e, name: "signedDocument" })}
          className="flex flex-col items-start justify-center gap-2 md:gap-5 "
        >
          <div className="flex flex-col gap-1">
            <section className="flex items-center gap-3">
              <Number number={9} />
              <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
                การแจ้ง/จดทะเบียนลิขสิทธิ์ในต่างประเทศ
              </p>
            </section>
            <FieldError className="text-xs text-red-700" />
          </div>

          <div className="flex w-full flex-col  gap-1.5 px-5 text-[0.8rem] md:gap-3 md:pl-0 md:text-base">
            {signedDocumentDetailLists.map((item, index) => {
              return (
                <Radio key={index} value={item} className="flex items-center">
                  {({ isSelected }) => (
                    <div className="flex items-center justify-center gap-2">
                      <div className="text-2xl">
                        {isSelected ? (
                          <MdOutlineRadioButtonChecked />
                        ) : (
                          <MdOutlineRadioButtonUnchecked />
                        )}
                      </div>
                      <span className="font-medium md:min-w-[7rem]">
                        {item}
                      </span>
                    </div>
                  )}
                </Radio>
              );
            })}

            <TextField className={"flex w-full items-center gap-3"}>
              <section className="flex w-full flex-col">
                <Input
                  required={
                    workData?.signedDocument ===
                    "แจ้งหรือจดทะเบียนไว้ที่ประเทศ (ระบุ)"
                  }
                  disabled={
                    workData?.signedDocument !==
                    "แจ้งหรือจดทะเบียนไว้ที่ประเทศ (ระบุ)"
                  }
                  value={workData?.signedDocumentDetail}
                  onChange={handleChangeWorkData}
                  name="signedDocumentDetail"
                  type="text"
                  className="h-8 rounded-md bg-slate-300 p-1 pl-3 md:ml-8 md:h-10 md:w-72 "
                  placeholder=""
                />
                <FieldError className="text-xs text-red-700" />
              </section>
            </TextField>
          </div>
        </RadioGroup>

        {/* ข้อ 10*/}
        <RadioGroup
          isRequired
          onChange={(e) => {
            handleChangeRaio({ e: e, name: "isMarketing" });
          }}
          value={workData?.isMarketing}
          className="flex flex-col items-start justify-center gap-2 md:gap-5 "
        >
          <div className="flex flex-col gap-1">
            <section className="flex items-center gap-3">
              <Number number={10} />
              <Label className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
                การโฆษณางาน
                (การนำสำเนางานออกจำหน่ายโดยความยินยอมของผู้สร้างสรรค์
                โดยสำเนามีจำนวนมากพอสมควร)
              </Label>
            </section>
            <FieldError className="text-xs text-red-700" />
          </div>
          <p className="pl-5 text-[0.85rem] font-medium  md:-mt-5 md:ml-11 md:pl-0 md:text-base"></p>
          <div className="flex w-full flex-col  gap-1.5 px-5 text-[0.8rem] md:gap-3 md:pl-0 md:text-base">
            {isMarketingLists.map((item, index) => {
              return (
                <Radio key={index} value={item} className="flex items-center">
                  {({ isSelected }) => (
                    <div className="flex items-center justify-center gap-2">
                      <div className="text-2xl">
                        {isSelected ? (
                          <MdOutlineRadioButtonChecked />
                        ) : (
                          <MdOutlineRadioButtonUnchecked />
                        )}
                      </div>
                      <span className="font-medium md:min-w-[7rem]">
                        {item}
                      </span>
                    </div>
                  )}
                </Radio>
              );
            })}

            <section className="flex flex-row gap-3 md:ml-10">
              <p className="my-2 text-[0.8rem] font-semibold md:min-w-16 md:text-base">
                วัน/เดือน/ปี :
              </p>
              <div className="w-40 rounded-lg bg-slate-300 p-1">
                <Calendar
                  required={
                    workData?.isMarketing === "ได้โฆษณาแล้วโดยโฆษณาครั้งแรก"
                  }
                  disabled={
                    workData?.isMarketing !== "ได้โฆษณาแล้วโดยโฆษณาครั้งแรก"
                  }
                  value={
                    workData?.marketingDate
                      ? new Date(workData.marketingDate)
                      : null
                  }
                  onChange={(e) =>
                    handleChangeCalendar({
                      value: e.value as Date,
                      name: "marketingDate",
                    })
                  }
                  locale="th"
                  placeholder="วัน/เดือน/ปี"
                  dateFormat="dd/mm/yy"
                />
              </div>
              <FieldError className="text-xs text-red-700" />
            </section>
            <TextField className={"flex w-full items-center gap-3 md:ml-10"}>
              <Label className="my-2 w-16 text-[0.8rem] font-semibold md:min-w-16 md:text-base">
                ประเทศ :
              </Label>
              <section className="flex w-full flex-col">
                <Input
                  required={
                    workData?.isMarketing === "ได้โฆษณาแล้วโดยโฆษณาครั้งแรก"
                  }
                  disabled={
                    workData?.isMarketing !== "ได้โฆษณาแล้วโดยโฆษณาครั้งแรก"
                  }
                  value={workData?.marketingCountry}
                  onChange={handleChangeWorkData}
                  type="text"
                  name="marketingCountry"
                  className="md:w-62 h-8 rounded-md bg-slate-300 p-1 pl-3 md:ml-2 md:h-10 "
                  placeholder="ประเทศ"
                />
                <FieldError className="text-xs text-red-700" />
              </section>
            </TextField>
          </div>
        </RadioGroup>

        {/* ข้อ 11*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={11} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              การอนุญาตให้ใช้สิทธิ์/โอนลิขสิทธิ์
            </p>
          </section>

          <RadioGroup
            value={workData?.tranferPermission}
            isRequired
            onChange={(e) =>
              handleChangeRaio({ e: e, name: "tranferPermission" })
            }
            className="mb-3 flex flex-col items-start justify-center gap-2 md:ml-10 md:gap-5 "
          >
            {tranferPermissionOptions.map((item, index) => {
              return (
                <Radio
                  key={index}
                  value={item}
                  className="flex w-full items-center"
                >
                  {({ isSelected }) => (
                    <div className="flex flex-col justify-center gap-2  md:flex-row md:items-center">
                      <div className="flex w-full gap-2 text-2xl md:items-center">
                        {isSelected ? (
                          <MdOutlineRadioButtonChecked />
                        ) : (
                          <MdOutlineRadioButtonUnchecked />
                        )}
                        <div className="flex flex-col items-center md:flex-row">
                          <span className="w-full text-[0.9rem] font-medium md:min-w-64 md:text-base">
                            {item}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </Radio>
              );
            })}
            <FieldError className="text-xs text-red-700" />
            <TextField className={"flex w-full items-center gap-3 md:ml-10"}>
              <section className="flex w-full flex-col">
                <Input
                  type="text"
                  required={
                    workData?.tranferPermission ===
                    "อนุญาตให้ใช้สิทธิ์/โอนลิขสิทธิ์ให้แก่"
                  }
                  disabled={
                    workData?.tranferPermission !==
                    "อนุญาตให้ใช้สิทธิ์/โอนลิขสิทธิ์ให้แก่"
                  }
                  value={workData?.tranferPermissionDetail}
                  onChange={handleChangeWorkData}
                  name="tranferPermissionDetail"
                  className="h-8 rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:w-96 "
                  placeholder="โอนสิทธิ์ให้กับใคร"
                />
                <FieldError className="text-xs text-red-700" />
              </section>
            </TextField>
            <section className="flex flex-row gap-3 md:ml-10">
              <p className="my-2 w-28 text-[0.8rem] font-semibold md:min-w-16 md:text-base">
                เมื่อวัน/เดือน/ปี :
              </p>
              <div className="w-40 rounded-lg bg-slate-300 p-1">
                <Calendar
                  required={
                    workData?.tranferPermission ===
                    "อนุญาตให้ใช้สิทธิ์/โอนลิขสิทธิ์ให้แก่"
                  }
                  disabled={
                    workData?.tranferPermission !==
                    "อนุญาตให้ใช้สิทธิ์/โอนลิขสิทธิ์ให้แก่"
                  }
                  value={
                    workData?.tranferPermissionDate
                      ? new Date(workData.tranferPermissionDate)
                      : null
                  }
                  onChange={(e) =>
                    handleChangeCalendar({
                      value: e.value as Date,
                      name: "tranferPermissionDate",
                    })
                  }
                  locale="th"
                  placeholder="วัน/เดือน/ปี"
                  dateFormat="dd/mm/yy"
                />
              </div>
              <FieldError className="text-xs text-red-700" />
            </section>
          </RadioGroup>

          {workData.tranferPermission ===
            "อนุญาตให้ใช้สิทธิ์/โอนลิขสิทธิ์ให้แก่" && (
            <RadioGroup
              isRequired={
                workData?.tranferPermission ===
                "อนุญาตให้ใช้สิทธิ์/โอนลิขสิทธิ์ให้แก่"
              }
              value={workData?.tranferPermissionQuality}
              onChange={(e) =>
                handleChangeRaio({ e: e, name: "tranferPermissionQuality" })
              }
              className="mb-3 flex flex-col items-start justify-center gap-2 md:ml-12 md:gap-5"
            >
              <Label className="font-semibold ">ลักษณะการโอนสิทธิ :</Label>
              <FieldError className="text-xs text-red-700" />
              {tranferPermissionQualityOptions.map((item, index) => {
                return (
                  <Radio
                    key={index}
                    value={item}
                    className="flex w-full items-center"
                  >
                    {({ isSelected }) => (
                      <div className="flex flex-col justify-center gap-2  md:flex-row md:items-center">
                        <div className="flex w-full gap-2 text-2xl md:items-center">
                          {isSelected ? (
                            <MdOutlineRadioButtonChecked />
                          ) : (
                            <MdOutlineRadioButtonUnchecked />
                          )}
                          <div className="flex flex-col items-center md:flex-row">
                            <span className="w-full text-[0.9rem] font-medium md:min-w-64 md:text-base">
                              {item}{" "}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </Radio>
                );
              })}

              <TextField className={"flex w-full flex-col items-center gap-3 "}>
                <Input
                  value={workData?.tranferPermissionQualityDetail}
                  onChange={handleChangeWorkData}
                  name="tranferPermissionQualityDetail"
                  required={
                    workData?.tranferPermissionQuality ===
                    "โอนสิทธิบางส่วน (ระบุ)"
                  }
                  disabled={
                    workData?.tranferPermissionQuality !==
                    "โอนสิทธิบางส่วน (ระบุ)"
                  }
                  type="text"
                  className="h-8 rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:w-56 "
                  placeholder="ระบุลักษณะการโอนสิทธิ"
                />
                <FieldError className="text-xs text-red-700" />
              </TextField>
            </RadioGroup>
          )}

          {workData.tranferPermission ===
            "อนุญาตให้ใช้สิทธิ์/โอนลิขสิทธิ์ให้แก่" && (
            <RadioGroup
              isRequired={
                workData?.tranferPermission ===
                "อนุญาตให้ใช้สิทธิ์/โอนลิขสิทธิ์ให้แก่"
              }
              value={workData?.tranferPermissionDuration}
              onChange={(e) =>
                handleChangeRaio({ e: e, name: "tranferPermissionDuration" })
              }
              className={`mb-3 flex flex-col items-start justify-center gap-2 md:ml-12 md:gap-5  `}
            >
              <Label className="font-semibold ">ระยะเวลาโอนสิทธิ :</Label>
              {tranferPermissionDurationOptions.map((item, index) => {
                return (
                  <Radio key={index} value={item} className="flex items-center">
                    {({ isSelected }) => (
                      <div className="flex items-center justify-center gap-2">
                        <div className="text-2xl">
                          {isSelected ? (
                            <MdOutlineRadioButtonChecked />
                          ) : (
                            <MdOutlineRadioButtonUnchecked />
                          )}
                        </div>
                        <span className="font-medium md:min-w-[7rem]">
                          {item}
                        </span>
                      </div>
                    )}
                  </Radio>
                );
              })}

              <TextField className={"flex w-full items-center gap-3 md:ml-10"}>
                <section className="flex w-full flex-col">
                  <Input
                    value={workData?.tranferPermissionDurationDetail}
                    onChange={handleChangeWorkData}
                    name="tranferPermissionDurationDetail"
                    required={
                      workData?.tranferPermissionDuration ===
                      "มีกำหนดเวลา (ระบุ)"
                    }
                    disabled={
                      workData?.tranferPermissionDuration !==
                      "มีกำหนดเวลา (ระบุ)"
                    }
                    type="text"
                    className="h-8 rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:w-56 "
                    placeholder=""
                  />
                  <FieldError className="text-xs text-red-700" />
                </section>
              </TextField>
            </RadioGroup>
          )}
        </section>

        {/* ข้อ 12*/}
        <section className="flex flex-col items-start justify-center gap-2 md:gap-5 ">
          <section className="flex items-center gap-3">
            <Number number={12} />
            <p className="my-2 w-full text-[0.8rem] font-semibold md:text-base">
              รายละเอียดผลงานโดยย่อ
            </p>
          </section>
          <p className="pl-5 text-[0.85rem] font-medium md:ml-10 md:pl-0 md:text-base">
            บรรยายถึงที่มาหรือวัตถุประสงค์ในการสร้างสรรค์ผลงาน
            แรงบันดาลใจในการสร้างสรรค์ผลงาน ลักษณะของผลงานหรือการนำผลงานไปใช้
            ประโยชน์ในด้านต่างๆ
          </p>
          <div className="flex w-full flex-col flex-wrap gap-3 pl-5 text-[0.8rem] md:flex-row md:gap-5 md:pl-0 md:text-base">
            <TextField className={"w-full md:px-8"}>
              <TextArea
                value={workData?.workDescription}
                onChange={handleChangeWorkData}
                name="workDescription"
                required
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
});

export default NrruCopyrightForm2;
