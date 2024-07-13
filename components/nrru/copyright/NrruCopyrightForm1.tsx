import NumberTitle from "@/components/Number";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "react-aria-components";
import { InputMask, InputMaskChangeEvent } from "primereact/inputmask";
import { FiPlusCircle } from "react-icons/fi";
import ProviceCombobox from "@/components/Combobox/proviceCombobox";
import AmphureCombobox from "@/components/Combobox/amphureCombobox";
import TambonCombobox from "@/components/Combobox/tambonCombobox";
import {
  Amphure,
  ErrorMessages,
  Province,
  Tambon,
  User,
} from "../../../models";
import { UseQueryResult } from "@tanstack/react-query";
import { ResponseGetCopyrightService } from "../../../services/copyright/copyright";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import { isMongoDBId, isUUIDv4 } from "../../../utilities/validateID";
import {
  CreatePartnerCopyrightService,
  DeletePartnerCopyrightService,
  UpdatePartnerCopyrightService,
} from "../../../services/copyright/partner-copyright";
import SnackbarLoading from "../../Snackbars/SnackBarLoading";
import SnackbarNoSaveData from "../../Snackbars/SnackBarNoSaveData";
import { MdDelete } from "react-icons/md";
import { Dropdown } from "primereact/dropdown";
import { TitleNameList } from "../../../data/name";
import { FacultyLists } from "../../../data/user";

type NrruCopyrightForm1Props = {
  user: User;
  copyright: UseQueryResult<ResponseGetCopyrightService, Error>;
};
const NrruCopyrightForm1 = forwardRef(function FormCopyright(
  { user, copyright }: NrruCopyrightForm1Props,
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
  const [partnerData, setPartnerData] = useState<
    {
      id: string;
      firstName?: string;
      lastName?: string;
      title?: string;
      phone?: string;
      idCard?: string;
      houseNumber?: string;
      villageNumber?: string;
      tambon?: Tambon;
      amphure?: Amphure;
      province?: Province;
      road?: string;
      zipCode?: string;
      faculty?: string;
      participateRate?: number;
      email?: string;
    }[]
  >();

  const handleAddMorePartner = () => {
    setPartnerData((prev) => {
      if (prev) {
        return [...prev, { id: uuidv4() }];
      }
    });
  };

  useEffect(() => {
    if (copyright.data) {
      setPartnerData(() => {
        if (
          copyright.data &&
          copyright.data?.partnerInfoOnCopyrights.length > 0
        ) {
          return copyright.data.partnerInfoOnCopyrights.map((partner) => {
            return {
              id: partner.id,
              firstName: partner.firstName,
              lastName: partner.lastName,
              title: partner.title,
              phone: partner.phone,
              idCard: partner.idCard,
              houseNumber: partner.addressNumber,
              villageNumber: partner.moo,
              tambon: {
                name_th: partner.tambon,
              },
              amphure: {
                name_th: partner.amphure,
              },
              province: {
                name_th: partner.province,
              },
              road: partner.road,
              zipCode: partner.postalCode,
              faculty: partner.faculty,
              participateRate: partner.participationRate,
              email: partner.email,
            };
          });
        } else {
          return [
            {
              id: uuidv4(),
              firstName: user.firstName,
              lastName: user.lastName,
              title: user.title,
              phone: user.phone,
              idCard: user.idCard,
              houseNumber: user.addressNumber,
              villageNumber: user.moo,
              tambon: {
                name_th: user.tambon,
              },
              amphure: {
                name_th: user.amphure,
              },
              province: {
                name_th: user.province,
              },
              road: user.road,
              zipCode: user.postalCode,
              faculty: user.faculty,
              participateRate: 100,
              email: user.email,
            },
          ];
        }
      });
    }
  }, [copyright.data]);

  const handleDeletePartner = (id: string) => {
    Swal.fire({
      title: "คุณแน่ใจหรือไม่ที่จะลบข้อมูลผู้สร้างสรรค์ผลงาน",
      text: "คุณจะไม่สามารถย้อนกลับได้!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่, ลบข้อมูล!",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const mongoDBId = isMongoDBId(id);
          const UUID = isUUIDv4(id);
          Swal.fire({
            title: "กำลังลบข้อมูลผู้สร้างสรรค์ผลงาน",
            text: "กรุณารอสักครู่",
            showConfirmButton: false,
            willOpen: () => {
              Swal.showLoading();
            },
          });
          if (UUID) {
            setPartnerData((prev) => {
              return prev?.filter((partner) => partner.id !== id);
            });
          } else if (mongoDBId) {
            await DeletePartnerCopyrightService({
              partnerId: id,
            });

            await copyright.refetch();
          }
          Swal.fire({
            title: "ลบข้อมูลสำเร็จ",
            text: "ลบข้อมูลผู้สร้างสรรค์ผลงานสำเร็จ",
            icon: "success",
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
      }
    });
  };

  const handleChangePartnerData = ({
    e,
    id,
  }: {
    e: React.ChangeEvent<HTMLInputElement> | InputMaskChangeEvent;
    id: string;
  }) => {
    const { name, value } = e.target;
    const parsedValue = typeof value === "string" ? value : "";

    setPartnerData((prev) => {
      const newState = prev?.map((partner) => {
        if (partner.id === id) {
          return {
            ...partner,
            [name]: name === "participateRate" ? Number(parsedValue) : value,
          };
        }

        return partner;
      });

      return newState;
    });
  };

  const handleDataFromCombobox = ({
    id,
    value,
    type,
  }: {
    id?: string;
    value: Province | Amphure | Tambon;
    type: "provice" | "amphure" | "tambon";
  }) => {
    if (type === "provice") {
      setPartnerData((prev) => {
        return prev?.map((partner) => {
          if (partner.id === id) {
            return {
              ...partner,
              province: value as Province,
            };
          }
          return partner;
        });
      });
    } else if (type === "amphure") {
      setPartnerData((prev) => {
        return prev?.map((partner) => {
          if (partner.id === id) {
            return {
              ...partner,
              amphure: value as Amphure,
            };
          }
          return partner;
        });
      });
    } else if (type === "tambon") {
      setPartnerData((prev) => {
        return prev?.map((partner) => {
          if (partner.id === id) {
            return {
              ...partner,
              tambon: value as Tambon,
            };
          }
          return partner;
        });
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
      setSnackBarData(() => {
        return {
          open: true,
          action: <SnackbarLoading />,
        };
      });
      if (partnerData?.length === 0 || !partnerData) {
        throw new Error("กรุณากรอกข้อมูลผู้สร้างสรรค์ผลงาน");
      }
      const totalParticipationRate = partnerData.reduce(
        (prev, current) => prev + (current.participateRate ?? 0),
        0,
      );
      if (totalParticipationRate !== 100) {
        throw new Error("กรุณากรอก % ส่วนร่วมให้ครบ 100");
      }
      for (const partner of partnerData) {
        const mongoDBId = isMongoDBId(partner.id);
        const UUID = isUUIDv4(partner.id);

        if (UUID) {
          await CreatePartnerCopyrightService({
            email: partner.email as string,
            title: partner.title as string,
            firstName: partner.firstName as string,
            lastName: partner.lastName as string,
            idCard: partner.idCard?.replace(/-/g, "") as string,
            addressNumber: partner.houseNumber as string,
            moo: partner.villageNumber as string,
            road: partner.road as string,
            tambon: partner.tambon?.name_th as string,
            amphure: partner.amphure?.name_th as string,
            province: partner.province?.name_th as string,
            postalCode: partner.zipCode as string,
            phone: partner.phone?.replace(/-/g, "") as string,
            faculty: partner.faculty as string,
            participationRate: partner.participateRate as number,
            copyrightId: copyright.data?.id as string,
            status: "STAFF",
          });
        } else if (mongoDBId) {
          await UpdatePartnerCopyrightService({
            query: {
              partnerId: partner.id,
            },
            body: {
              email: partner.email as string,
              title: partner.title as string,
              firstName: partner.firstName as string,
              lastName: partner.lastName as string,
              idCard: partner.idCard?.replace(/-/g, "") as string,
              addressNumber: partner.houseNumber as string,
              moo: partner.villageNumber as string,
              road: partner.road as string,
              tambon: partner.tambon?.name_th as string,
              amphure: partner.amphure?.name_th as string,
              province: partner.province?.name_th as string,
              postalCode: partner.zipCode as string,
              phone: partner.phone?.replace(/-/g, "") as string,
              faculty: partner.faculty as string,
              participationRate: partner.participateRate as number,
            },
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

  React.useImperativeHandle(ref, () => ({
    saveData,
  }));
  return (
    <div className=" w-full  rounded-md border-[1px] border-solid border-[#BED6FF] bg-white p-5 py-10 md:p-10">
      <Form
        ref={formRef}
        className="mx-0 my-5 flex flex-col gap-5 md:mx-5 md:my-10 "
      >
        {/* ข้อ 1*/}

        {partnerData?.map((partner, index) => {
          return (
            <div
              key={partner.id}
              className={`flex w-full flex-col gap-5 rounded-lg p-5 ring-1 ring-gray-400  `}
            >
              <h2 className="text-lg font-semibold text-[var(--primary-blue)]">
                ผู้สร้างสรรค์ผลงานคนที่ {index + 1}
              </h2>
              <section className="flex w-full items-start justify-start gap-3  md:items-center md:gap-5">
                <NumberTitle number={1} />
                <div
                  className="flex  flex-col gap-3
                   text-[0.8rem] md:gap-5 md:text-base lg:flex-row"
                >
                  <TextField className={"flex items-center gap-3"}>
                    <Label className=" text-[var(--primary-blue) w-max font-semibold">
                      คำนำหน้าชื่อ
                    </Label>
                    <div className="flex  flex-col gap-1">
                      <Dropdown
                        value={
                          partnerData.find((item) => item.id === partner.id)
                            ?.title
                        }
                        options={TitleNameList}
                        onChange={(e) => {
                          setPartnerData((prev) => {
                            return prev?.map((prevPartner) => {
                              if (prevPartner.id === partner.id) {
                                return {
                                  ...partner,
                                  title: e.value,
                                };
                              } else {
                                return prevPartner;
                              }
                            });
                          });
                        }}
                        required
                        className="w-full rounded-md bg-slate-300 text-sm md:w-60 "
                      />

                      {!partnerData.find((item) => item.id === partner.id)
                        ?.title && (
                        <span className="text-xs text-red-700">
                          Please fill out this field.
                        </span>
                      )}
                    </div>
                  </TextField>
                  <TextField className={"flex w-full items-center gap-3"}>
                    <Label className="min-w-8 font-semibold text-[var(--primary-blue)] md:min-w-10">
                      ชื่อ
                    </Label>
                    <div className="flex flex-col gap-1">
                      <Input
                        required
                        value={
                          partnerData.find((item) => item.id === partner.id)
                            ?.firstName
                        }
                        onChange={(e) =>
                          handleChangePartnerData({ e, id: partner.id })
                        }
                        name="firstName"
                        type="text"
                        className="h-8  w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:p-2 md:pl-4"
                        placeholder="ชื่อจริง"
                      />

                      <FieldError className="text-xs text-red-700" />
                    </div>
                  </TextField>
                  <TextField className={"flex w-full items-center gap-3 "}>
                    <Label className="min-w-14 font-semibold text-[var(--primary-blue)] md:min-w-16">
                      นามสกุล
                    </Label>
                    <div className="flex flex-col gap-1">
                      <Input
                        required
                        value={
                          partnerData.find((item) => item.id === partner.id)
                            ?.lastName
                        }
                        onChange={(e) =>
                          handleChangePartnerData({ e, id: partner.id })
                        }
                        name="lastName"
                        type="text"
                        className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10  md:p-2 md:pl-4"
                        placeholder="นามสกุล"
                      />
                      <FieldError className="text-xs text-red-700" />
                    </div>
                  </TextField>
                </div>
              </section>

              {/* ข้อ 2*/}
              <section className="flex items-start justify-start gap-3 md:items-center md:gap-5">
                <NumberTitle number={2} />
                <div className="flex w-full flex-col gap-3 text-[0.8rem] md:flex-row md:gap-5 md:text-base">
                  <TextField
                    className={"flex w-full flex-col  md:w-[60%] md:flex-col  "}
                  >
                    <Label className=" text-[var(--primary-blue) font-semibold">
                      เลขบัตรประจำตัวประชาชน
                    </Label>
                    <div className="flex flex-col gap-1">
                      <InputMask
                        required
                        value={
                          partnerData.find((item) => item.id === partner.id)
                            ?.idCard
                        }
                        onChange={(e) =>
                          handleChangePartnerData({ e, id: partner.id })
                        }
                        name="idCard"
                        className="h-8 w-56 rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:w-72 md:pl-4 "
                        placeholder="กรอกหมายเลขบัตรประชาชน"
                        maxLength={13}
                        inputMode="numeric"
                        type="text"
                        mask="9-9999-99999-99-9"
                      />
                      <FieldError className="text-xs text-red-700" />
                    </div>
                  </TextField>
                </div>
              </section>

              {/* ข้อ 3*/}
              <section className="flex items-start justify-start  gap-3  md:gap-5">
                <NumberTitle number={3} />
                <div className="flex w-full flex-col gap-3 text-[0.8rem] md:flex-row md:flex-wrap md:gap-5 md:text-base">
                  <TextField
                    className={
                      "flex flex-col gap-3 md:flex-row md:items-center  "
                    }
                  >
                    <p className="font-semibold">ที่อยู่ (ตามบัตรประชาชน)</p>
                    <section className="flex items-center lg:gap-5">
                      <Label className="text-[var(--primary-blue) min-w-16 font-medium ">
                        บ้านเลขที่
                      </Label>
                      <div className="flex flex-col gap-1">
                        <Input
                          required
                          value={
                            partnerData.find((item) => item.id === partner.id)
                              ?.houseNumber
                          }
                          onChange={(e) =>
                            handleChangePartnerData({ e, id: partner.id })
                          }
                          name="houseNumber"
                          type="text"
                          className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                          placeholder="บ้านเลขที่"
                        />
                        <FieldError className="text-xs text-red-700" />
                      </div>
                    </section>
                  </TextField>
                  <TextField className={"flex  items-center gap-3  "}>
                    <Label className=" text-[var(--primary-blue) font-medium ">
                      หมู่ที่
                    </Label>
                    <div className="flex flex-col gap-1">
                      <Input
                        required
                        value={
                          partnerData.find((item) => item.id === partner.id)
                            ?.villageNumber
                        }
                        onChange={(e) =>
                          handleChangePartnerData({ e, id: partner.id })
                        }
                        name="villageNumber"
                        type="text"
                        className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                        placeholder="หมู่"
                      />
                      <FieldError className="text-xs text-red-700" />
                    </div>
                  </TextField>
                  <TextField className={"flex   items-center gap-3  "}>
                    <Label className=" text-[var(--primary-blue) font-medium ">
                      ถนน
                    </Label>
                    <div className="flex flex-col gap-1">
                      <Input
                        required
                        value={
                          partnerData.find((item) => item.id === partner.id)
                            ?.road
                        }
                        onChange={(e) =>
                          handleChangePartnerData({ e, id: partner.id })
                        }
                        name="road"
                        type="text"
                        className="h-8 w-40   rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                        placeholder="ถนน"
                      />
                      <FieldError className="text-xs text-red-700" />
                    </div>
                  </TextField>
                  <TextField className={"flex  items-center  gap-3 md:w-72  "}>
                    <Label className=" text-[var(--primary-blue) font-medium ">
                      จังหวัด
                    </Label>

                    <ProviceCombobox
                      handleDataFromCombobox={handleDataFromCombobox}
                      selectProvince={
                        partnerData.find((item) => item.id === partner.id)
                          ?.province
                      }
                      arrayId={partner.id}
                    />
                  </TextField>
                  <TextField
                    className={"flex w-44 items-center gap-3 md:w-72  "}
                  >
                    <Label className=" text-[var(--primary-blue) font-medium ">
                      อำเภอ
                    </Label>

                    <AmphureCombobox
                      handleDataFromCombobox={handleDataFromCombobox}
                      selectAmphure={
                        partnerData.find((item) => item.id === partner.id)
                          ?.amphure
                      }
                      selectProvinceId={
                        partnerData.find((item) => item.id === partner.id)
                          ?.province?.originalId
                      }
                      arrayId={partner.id}
                    />
                  </TextField>
                  <TextField
                    className={"flex w-44 items-center gap-3 md:w-72  "}
                  >
                    <Label className=" text-[var(--primary-blue) font-medium ">
                      ตำบล
                    </Label>
                    <TambonCombobox
                      handleDataFromCombobox={handleDataFromCombobox}
                      selectAmphureId={
                        partnerData.find((item) => item.id === partner.id)
                          ?.amphure?.originalId
                      }
                      selectTambon={
                        partnerData.find((item) => item.id === partner.id)
                          ?.tambon
                      }
                      arrayId={partner.id}
                    />
                  </TextField>
                  <TextField className={"flex  items-center gap-3  "}>
                    <Label className=" text-[var(--primary-blue) font-medium ">
                      รหัสไปรษณีย์
                    </Label>
                    <div className="flex flex-col gap-1">
                      <Input
                        required
                        value={
                          partnerData.find((item) => item.id === partner.id)
                            ?.zipCode
                        }
                        onChange={(e) =>
                          handleChangePartnerData({ e, id: partner.id })
                        }
                        name="zipCode"
                        type="text"
                        className="h-8 w-40 rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                        placeholder="36120"
                      />
                      <FieldError className="text-xs text-red-700" />
                    </div>
                  </TextField>
                </div>
              </section>

              {/* ข้อ 5*/}
              <section className="flex items-start justify-start  gap-3  md:gap-5">
                <NumberTitle number={4} />{" "}
                <div className="flex w-full flex-col gap-2 text-[0.8rem] md:flex-row md:flex-wrap md:gap-5 md:text-base">
                  <p className=" text-[0.8rem] font-semibold md:text-base">
                    สังกัด
                  </p>
                  <TextField
                    className={"flex w-full flex-col items-start  md:w-96  "}
                  >
                    <Label className=" text-[var(--primary-blue) min-w-12 font-medium ">
                      คณะ/หน่วยงาน
                    </Label>
                    <div className="flex w-full flex-col gap-1">
                      <Dropdown
                        value={
                          partnerData.find((item) => item.id === partner.id)
                            ?.faculty
                        }
                        options={FacultyLists}
                        onChange={(e) => {
                          setPartnerData((prev) => {
                            return prev?.map((prevPartner) => {
                              if (prevPartner.id === partner.id) {
                                return {
                                  ...partner,
                                  faculty: e.value,
                                };
                              } else {
                                return prevPartner;
                              }
                            });
                          });
                        }}
                        required
                        className="w-full rounded-md bg-slate-300 text-sm"
                      />

                      {!partnerData.find((item) => item.id === partner.id)
                        ?.faculty && (
                        <span className="text-xs text-red-700">
                          Please fill out this field.
                        </span>
                      )}
                    </div>
                  </TextField>
                </div>
              </section>

              {/* ข้อ 5*/}
              <section className="flex items-start justify-start gap-3 md:items-center md:gap-5">
                <NumberTitle number={5} />
                <div className="flex w-full flex-col gap-3 text-[0.8rem] md:flex-row md:gap-5 md:text-base">
                  <TextField className={"flex flex-col  items-start   "}>
                    <Label className=" text-[var(--primary-blue) font-semibold ">
                      หมายเลขโทรศัพท์
                    </Label>
                    <div className="flex flex-col gap-1">
                      <div className="flex flex-col gap-1">
                        <InputMask
                          required
                          value={
                            partnerData.find((item) => item.id === partner.id)
                              ?.phone
                          }
                          onChange={(e) =>
                            handleChangePartnerData({ e, id: partner.id })
                          }
                          name="phone"
                          className="h-8 w-32 rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:w-60 md:pl-4 "
                          placeholder="กรอกหมายเลขโทรศัพท์"
                          maxLength={10}
                          inputMode="numeric"
                          type="text"
                          mask="999-999-9999"
                        />
                        <FieldError className="text-xs text-red-700" />
                      </div>
                    </div>
                  </TextField>
                </div>
              </section>
              {/* ข้อ 7*/}
              <section className="flex items-start justify-start gap-3 md:items-center md:gap-5">
                <NumberTitle number={6} />
                <div className="flex flex-col gap-3 text-[0.8rem] md:flex-row md:gap-5 md:text-base">
                  <TextField className={"flex items-center gap-2  lg:gap-3 "}>
                    <Label className=" text-[var(--primary-blue) min-w-14 font-semibold md:min-w-20">
                      E-mail
                    </Label>
                    <div className="flex flex-col gap-1">
                      <Input
                        required
                        value={
                          partnerData.find((item) => item.id === partner.id)
                            ?.email
                        }
                        onChange={(e) =>
                          handleChangePartnerData({ e, id: partner.id })
                        }
                        name="email"
                        type="email"
                        className="w-full rounded-md bg-slate-300 p-1 pl-3  "
                        placeholder="xxx@gmail.com"
                      />
                      <FieldError className="text-xs text-red-700" />
                    </div>
                  </TextField>
                </div>
              </section>
              {/* ข้อ 8*/}
              <section className="flex items-start justify-center gap-3 md:items-center md:gap-5">
                <NumberTitle number={7} />
                <div className="flex w-full flex-col gap-3 text-[0.8rem] md:flex-row md:gap-5 md:text-base">
                  <TextField
                    className={"flex w-full items-center gap-3 md:w-[30%] "}
                  >
                    <Label className=" text-[var(--primary-blue) min-w-24 font-semibold md:min-w-20">
                      % ส่วนร่วม
                    </Label>
                    <div className="flex flex-col gap-1">
                      <Input
                        required
                        value={
                          partnerData.find((item) => item.id === partner.id)
                            ?.participateRate
                        }
                        onChange={(e) =>
                          handleChangePartnerData({ e, id: partner.id })
                        }
                        name="participateRate"
                        type="text"
                        className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                        placeholder="40"
                      />
                      <FieldError className="text-xs text-red-700" />
                    </div>
                  </TextField>
                </div>
              </section>
              {index !== 0 && (
                <Button
                  type="button"
                  onPress={() => handleDeletePartner(partner.id)}
                  className="my-3 flex w-60 items-center justify-center gap-3 rounded-md bg-red-400 p-2 
              text-xs font-semibold text-white duration-300 hover:bg-red-700 md:px-3 md:py-2 md:text-base "
                >
                  <MdDelete />
                  <p>ลบชื่อผู้สร้างสรรค์ผลงาน</p>
                </Button>
              )}
            </div>
          );
        })}

        <Button
          type="button"
          onPress={handleAddMorePartner}
          className="my-3 flex w-60 items-center justify-center gap-3 rounded-md bg-[#9747FF] p-2 text-xs font-semibold text-white duration-300 hover:bg-purple-700 md:px-3 md:py-2 md:text-base "
        >
          <FiPlusCircle /> <p>เพิ่มชื่อผู้สร้างสรรค์ผลงาน</p>
        </Button>
        {snackBarData.open && snackBarData.action}
      </Form>
    </div>
  );
});

export default NrruCopyrightForm1;
