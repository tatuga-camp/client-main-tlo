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
import Checkbox from "@mui/material/Checkbox";
import {
  Amphure,
  ErrorMessages,
  Province,
  Tambon,
  User,
} from "../../../models";
import { UseQueryResult } from "@tanstack/react-query";
import {
  ResponseGetTrademarkService,
  UpdateTrademarkervice,
} from "../../../services/trademark/trademark";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import { isMongoDBId, isUUIDv4 } from "../../../utilities/validateID";

import SnackbarNoSaveData from "../../Snackbars/SnackBarNoSaveData";
import SnackbarLoading from "../../Snackbars/SnackBarLoading";
import { MdDelete } from "react-icons/md";
import { Dropdown } from "primereact/dropdown";
import { TitleNameList } from "../../../data/name";
import { OccupationLists } from "../../../data/user";
import { partnerStatus } from "../../../data/invention";
import {
  PersonStatusOptions,
  personStatusOptions,
} from "../../../data/trademark";
import { UpdatePartnerTrademarkervice } from "../../../services/trademark/partner-trademark";

type TrademarkForm1Props = {
  trademark: UseQueryResult<ResponseGetTrademarkService, Error>;
  user: User;
};
const TrademarkForm1 = forwardRef(function FormTrademark(
  { trademark, user }: TrademarkForm1Props,
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
  const [partnerData, setPartnerData] = useState<{
    personStatus?: PersonStatusOptions | null;
    firstName?: string | null;
    lastName?: string | null;
    title?: string | null;
    phone?: string | null;
    idCard?: string | null;
    houseNumber?: string | null;
    authorizedPerson?: string | null;
    nationality?: string | null;
    passPort?: string | null;
    villageNumber?: string | null;
    tambon?: Tambon | null;
    country?: string;
    amphure?: Amphure | null;
    province?: Province | null;
    road?: string | null;
    zipCode?: string | null;
    career?: string | null;
    email?: string | null;
  }>();

  useEffect(() => {
    if (trademark.data) {
      setPartnerData(() => {
        const person = trademark.data.partnerOnTrademarks[0];
        return {
          personStatus:
            (person.personStatus as PersonStatusOptions) ?? "บุคคลธรรมดา",
          firstName: person.firstName,
          lastName: person.lastName,
          title: person.title,
          email: person.email,

          country: person.country,
          phone: person.phone,
          idCard: person.idCard,
          houseNumber: person.addressNumber,
          authorizedPerson: person.authorizedPerson,
          passPort: person.passPort,
          villageNumber: person.moo,
          nationality: person.nationality,
          tambon: {
            name_th: person.tambon as string,
          },
          amphure: {
            name_th: person.amphure as string,
          },
          province: {
            name_th: person.province as string,
          },
          road: person.road,
          zipCode: person.postalCode,
          career: person.career,
        };
      });
    }
  }, [trademark.data]);

  const handleChangePartnerData = (
    e: React.ChangeEvent<HTMLInputElement> | InputMaskChangeEvent,
  ) => {
    const { name, value } = e.target;
    const parsedValue = typeof value === "string" ? value : "";

    setPartnerData((prev) => {
      return {
        ...prev,
        [name]: name === "participateRate" ? Number(parsedValue) : value,
      };
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
        return {
          ...prev,
          province: value as Province,
        };
      });
    } else if (type === "amphure") {
      setPartnerData((prev) => {
        return {
          ...prev,
          amphure: value as Amphure,
        };
      });
    } else if (type === "tambon") {
      setPartnerData((prev) => {
        return {
          ...prev,
          tambon: value as Tambon,
        };
      });
    }
  };

  const saveData = async () => {
    try {
      if (!trademark.data) return;
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
      if (!partnerData && !trademark.data) {
        throw new Error("กรุณากรอกข้อมูลผู้ประดิษฐ์");
      }

      await UpdatePartnerTrademarkervice({
        query: {
          partnerId: trademark.data?.partnerOnTrademarks[0].id,
        },
        body: {
          personStatus: partnerData?.personStatus as PersonStatusOptions,
          passPort: partnerData?.passPort as string,
          country: partnerData?.country as string,
          authorizedPerson: partnerData?.authorizedPerson as string,
          email: partnerData?.email as string,
          title: partnerData?.title as string,
          firstName: partnerData?.firstName as string,
          postalCode: partnerData?.zipCode as string,
          lastName: partnerData?.lastName as string,
          idCard: partnerData?.idCard?.replace(/-/g, "") as string,
          addressNumber: partnerData?.houseNumber as string,
          moo: partnerData?.villageNumber as string,
          road: partnerData?.road as string,
          tambon: partnerData?.tambon?.name_th as string,
          nationality: partnerData?.nationality as string,
          amphure: partnerData?.amphure?.name_th as string,
          province: partnerData?.province?.name_th as string,
          phone: partnerData?.phone?.replace(/-/g, "") as string,
          career: partnerData?.career as string,
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
      let result = error as ErrorMessages;
      Swal.fire({
        title: result.error ? result.error : "เกิดข้อผิดพลาด",
        text: result.message.toString(),
        footer: result.statusCode
          ? "รหัสข้อผิดพลาด: " + result.statusCode?.toString()
          : "กรุณาลองใหม่อีกครั้ง",
        icon: "error",
      });
    }
  };
  useImperativeHandle(ref, () => ({
    saveData,
  }));
  return (
    <div className="   rounded-md border-[1px] border-solid border-[#BED6FF] bg-white p-5 py-10 md:p-10">
      <Form
        ref={formRef}
        className="mx-0 my-5 flex flex-col gap-5 md:mx-5 md:my-10 "
      >
        {/* ข้อ 1*/}

        <div
          className={`flex flex-col gap-5 rounded-lg p-5  ring-1 ring-gray-400  `}
        >
          <div className="flex flex-col gap-1">
            <div className="w-44 rounded-lg bg-slate-300 p-1 lg:w-80">
              <Dropdown
                required
                value={partnerData?.personStatus}
                onChange={(e) =>
                  setPartnerData((prev) => {
                    return {
                      ...partnerData,
                      personStatus: e.value as PersonStatusOptions,
                    };
                  })
                }
                options={personStatusOptions}
                placeholder="เลือกสถานะ"
                className="lg:w-14rem w-full "
              />
            </div>

            {!partnerData?.personStatus && (
              <span className="text-xs text-red-700">
                Please fill out this field.
              </span>
            )}
          </div>
          <section className="flex items-start justify-start gap-3 md:items-start md:gap-5">
            <NumberTitle number={1} />
            <div className="flex  flex-col flex-wrap gap-3 text-[0.8rem] md:gap-5 md:text-base lg:flex-row">
              {partnerData?.personStatus === "บุคคลธรรมดา" && (
                <TextField className={"flex flex-col items-start "}>
                  <Label className=" text-[var(--primary-blue) min-w-20 font-semibold md:min-w-24">
                    คำนำหน้าชื่อ
                  </Label>
                  <div className="flex  flex-col gap-1">
                    <Dropdown
                      value={partnerData?.title}
                      options={TitleNameList}
                      onChange={(e) => {
                        setPartnerData((prev) => {
                          return {
                            ...prev,
                            title: e.value,
                          };
                        });
                      }}
                      required
                      className=" rounded-md bg-slate-300 text-sm "
                    />

                    {!partnerData?.title && (
                      <span className="text-xs text-red-700">
                        Please fill out this field.
                      </span>
                    )}
                  </div>
                </TextField>
              )}
              <TextField className={"flex flex-col "}>
                <Label className="min-w-8 font-semibold text-[var(--primary-blue)] ">
                  {partnerData?.personStatus === "นิติบุคคล"
                    ? "ชื่อนิติบุคคล"
                    : partnerData?.personStatus === "ส่วนราชการไทย"
                      ? "ชื่อหน่วยงานราชการ "
                      : partnerData?.personStatus === "ต่างชาติ"
                        ? "ชื่อ-สกุล (เป็นภาษาไทย)"
                        : "ชื่อจริง"}
                </Label>
                <div className="flex flex-col gap-1">
                  <Input
                    required
                    value={partnerData?.firstName as string}
                    onChange={handleChangePartnerData}
                    name="firstName"
                    type="text"
                    className="h-8 w-44 rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:w-60  md:p-2 md:pl-4"
                    placeholder={
                      partnerData?.personStatus === "นิติบุคคล"
                        ? "ชื่อนิติบุคคล"
                        : partnerData?.personStatus === "ส่วนราชการไทย"
                          ? "ชื่อหน่วยงานราชการ "
                          : partnerData?.personStatus === "ต่างชาติ"
                            ? "ชื่อ-สกุล (เป็นภาษาไทย)"
                            : "ชื่อจริง"
                    }
                  />

                  <FieldError className="text-xs text-red-700" />
                </div>
              </TextField>
              {partnerData?.personStatus === "บุคคลธรรมดา" && (
                <TextField className="flex flex-col">
                  <Label className="min-w-14 font-semibold text-[var(--primary-blue)] md:min-w-16">
                    นามสกุล
                  </Label>
                  <div className="flex flex-col gap-1">
                    <Input
                      required
                      value={partnerData?.lastName as string}
                      onChange={handleChangePartnerData}
                      name="lastName"
                      type="text"
                      className="h-8 w-40 rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:w-60  md:p-2 md:pl-4"
                      placeholder="นามสกุล"
                    />
                    <FieldError className="text-xs text-red-700" />
                  </div>
                </TextField>
              )}
            </div>
          </section>

          {/* ข้อ 2*/}
          <section className="flex items-start justify-start gap-3 md:items-center md:gap-5">
            <NumberTitle number={2} />
            <div className="flex  flex-col gap-3 text-[0.8rem] md:flex-row md:gap-5 md:text-base">
              <TextField className={"flex  flex-col    "}>
                <Label className=" text-[var(--primary-blue) min-w-24 font-semibold md:min-w-44">
                  {partnerData?.personStatus === "นิติบุคคล"
                    ? "เลขทะเบียนนิติบุคคล"
                    : partnerData?.personStatus === "ส่วนราชการไทย"
                      ? "เลขประจำตัวผู้เสียภาษี "
                      : partnerData?.personStatus === "ต่างชาติ"
                        ? "เลขที่หนังสือเดินทาง"
                        : "เลขบัตรประชาชน"}
                </Label>
                <div className="flex flex-col gap-1">
                  {partnerData?.personStatus === "ต่างชาติ" ? (
                    <Input
                      required
                      value={partnerData?.passPort as string}
                      onChange={handleChangePartnerData}
                      name="passPort"
                      className="w-50 h-8 rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:w-72 md:pl-4 "
                      placeholder="เลขที่หนังสือเดินทาง"
                      inputMode="numeric"
                      type="text"
                    />
                  ) : (
                    <InputMask
                      required
                      value={partnerData?.idCard as string}
                      onChange={handleChangePartnerData}
                      name="idCard"
                      className="w-50 h-8 rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:w-72 md:pl-4 "
                      placeholder={
                        partnerData?.personStatus === "นิติบุคคล"
                          ? "เลขทะเบียนนิติบุคคล"
                          : partnerData?.personStatus === "ส่วนราชการไทย"
                            ? "เลขประจำตัวผู้เสียภาษี "
                            : "เลขบัตรประชาชน"
                      }
                      maxLength={13}
                      inputMode="numeric"
                      type="text"
                      mask="9-9999-99999-99-9"
                    />
                  )}

                  <FieldError className="text-xs text-red-700" />
                </div>
              </TextField>

              {partnerData?.personStatus === "ต่างชาติ" && (
                <TextField className={"flex  flex-col items-start gap-1    "}>
                  <Label className=" text-[var(--primary-blue) min-w-14 font-semibold ">
                    ประเทศ
                  </Label>
                  <div className="flex flex-col gap-1">
                    <Input
                      required
                      value={partnerData?.country as string}
                      onChange={handleChangePartnerData}
                      name="country"
                      type="text"
                      className="h-8  rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 lg:w-72 "
                      placeholder="กรอกประเทศ"
                    />
                    <FieldError className="text-xs text-red-700" />
                  </div>
                </TextField>
              )}
              {partnerData?.personStatus === "ต่างชาติ" && (
                <TextField className={"flex  flex-col items-start gap-1    "}>
                  <Label className=" text-[var(--primary-blue) min-w-14 font-semibold ">
                    สัญชาติ
                  </Label>
                  <div className="flex flex-col gap-1">
                    <Input
                      required
                      value={partnerData?.nationality as string}
                      onChange={handleChangePartnerData}
                      name="nationality"
                      type="text"
                      className="h-8  rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 lg:w-72 "
                      placeholder="กรอกสัญชาติ"
                    />
                    <FieldError className="text-xs text-red-700" />
                  </div>
                </TextField>
              )}
            </div>
          </section>

          {/* ข้อ 3*/}
          <section className="flex items-start justify-start  gap-3  md:gap-5">
            <NumberTitle number={3} />
            <div className="flex  flex-col gap-3 text-[0.8rem] md:flex-row md:flex-wrap md:gap-5 md:text-base">
              <TextField
                className={"flex flex-col gap-3  lg:flex-row lg:items-center  "}
              >
                <p className="font-semibold">
                  {partnerData?.personStatus === "นิติบุคคล"
                    ? "ที่อยู่นิติบุคคล"
                    : partnerData?.personStatus === "ส่วนราชการไทย"
                      ? "ที่อยู่ส่วนราชการ "
                      : partnerData?.personStatus === "ต่างชาติ"
                        ? "ที่อยู่"
                        : "ที่อยู่ (ตามบัตรประชาชน)"}
                </p>
                <section className="flex items-center lg:gap-5">
                  <Label className="text-[var(--primary-blue) min-w-16 font-medium ">
                    บ้านเลขที่
                  </Label>
                  <div className="flex flex-col gap-1">
                    <Input
                      required
                      value={partnerData?.houseNumber as string}
                      onChange={handleChangePartnerData}
                      name="houseNumber"
                      type="text"
                      className="h-8  rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
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
                    value={partnerData?.villageNumber as string}
                    onChange={handleChangePartnerData}
                    name="villageNumber"
                    type="text"
                    className="h-8  rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
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
                    value={partnerData?.road as string}
                    onChange={handleChangePartnerData}
                    name="road"
                    type="text"
                    className="h-8 w-40   rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                    placeholder="ถนน"
                  />
                  <FieldError className="text-xs text-red-700" />
                </div>
              </TextField>
              <TextField className={"w-50 flex items-center  gap-3 md:w-72  "}>
                <Label className=" text-[var(--primary-blue) font-medium ">
                  จังหวัด
                </Label>

                <ProviceCombobox
                  handleDataFromCombobox={handleDataFromCombobox}
                  selectProvince={partnerData?.province as Province}
                />
              </TextField>
              <TextField className={"w-50 flex items-center  gap-3 md:w-72  "}>
                <Label className=" text-[var(--primary-blue) font-medium ">
                  อำเภอ
                </Label>

                <AmphureCombobox
                  handleDataFromCombobox={handleDataFromCombobox}
                  selectAmphure={partnerData?.amphure as Amphure}
                  selectProvinceId={partnerData?.province?.originalId}
                />
              </TextField>
              <TextField className={"w-50 flex items-center  gap-3 md:w-72  "}>
                <Label className=" text-[var(--primary-blue) font-medium ">
                  ตำบล
                </Label>
                <TambonCombobox
                  handleDataFromCombobox={handleDataFromCombobox}
                  selectAmphureId={partnerData?.amphure?.originalId}
                  selectTambon={partnerData?.tambon as Tambon}
                />
              </TextField>
              <TextField className={"flex  items-center gap-3  "}>
                <Label className=" text-[var(--primary-blue) font-medium ">
                  รหัสไปรษณีย์
                </Label>
                <div className="flex flex-col gap-1">
                  <Input
                    required
                    value={partnerData?.zipCode as string}
                    onChange={handleChangePartnerData}
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

          {/* ข้อ 4*/}
          <section className="flex items-start justify-start gap-3 md:items-center md:gap-5">
            <NumberTitle number={4} />
            <div className="flex  flex-col gap-3 text-[0.8rem] md:flex-row md:gap-5 md:text-base">
              <TextField
                className={"flex  flex-col items-start gap-1  md:w-96    "}
              >
                <Label className=" text-[var(--primary-blue) min-w-24 font-semibold md:min-w-36">
                  หมายเลขโทรศัพท์
                </Label>
                <div className="flex  flex-col gap-1">
                  <div className="flex flex-col gap-1">
                    <InputMask
                      required
                      value={partnerData?.phone as string}
                      onChange={handleChangePartnerData}
                      name="phone"
                      className="h-8  rounded-md bg-slate-300 p-1 pl-3   "
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
          {/* ข้อ 5*/}
          <section className="flex items-start justify-start gap-3 md:items-center md:gap-5">
            <NumberTitle number={5} />
            <div className="flex  flex-col gap-3 text-[0.8rem] md:flex-row md:gap-5 md:text-base">
              <TextField className={"flex  flex-col items-start gap-1    "}>
                <Label className=" text-[var(--primary-blue) min-w-14 font-semibold ">
                  E-mail
                </Label>
                <div className="flex flex-col gap-1">
                  <Input
                    required
                    value={partnerData?.email as string}
                    onChange={handleChangePartnerData}
                    name="email"
                    type="email"
                    className="h-8  rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 lg:w-72 "
                    placeholder="xxx@gmail.com"
                  />
                  <FieldError className="text-xs text-red-700" />
                </div>
              </TextField>
              {(partnerData?.personStatus === "นิติบุคคล" ||
                partnerData?.personStatus === "ส่วนราชการไทย") && (
                <TextField className={"flex  flex-col items-start gap-1    "}>
                  <Label className=" text-[var(--primary-blue) min-w-14 font-semibold ">
                    ชื่อผู้มีอำนาจในการลงนาม
                  </Label>
                  <div className="flex flex-col gap-1">
                    <Input
                      required
                      value={partnerData?.authorizedPerson as string}
                      onChange={handleChangePartnerData}
                      name="authorizedPerson"
                      type="text"
                      className="h-8  rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 lg:w-72 "
                      placeholder="กรอกชื่อผู้มีอำนาจในการลงนาม"
                    />
                    <FieldError className="text-xs text-red-700" />
                  </div>
                </TextField>
              )}
            </div>
          </section>

          {/* ข้อ 6*/}
          <section className="flex items-start justify-start gap-3 md:items-center md:gap-5">
            <NumberTitle number={6} />
            <div className="flex  flex-col gap-3 text-[0.8rem] md:flex-row md:gap-5 md:text-base">
              <TextField className={"flex  flex-col items-start gap-1   "}>
                <Label className=" text-[var(--primary-blue) min-w-10 font-semibold ">
                  อาชีพ
                </Label>
                <div className="flex  flex-col gap-1">
                  <Dropdown
                    value={partnerData?.career}
                    options={OccupationLists}
                    onChange={(e) => {
                      setPartnerData((prev) => {
                        return {
                          ...prev,
                          career: e.value,
                        };
                      });
                    }}
                    required
                    className=" rounded-md bg-slate-300 text-sm "
                  />

                  {!partnerData?.career && (
                    <span className="text-xs text-red-700">
                      Please fill out this field.
                    </span>
                  )}
                </div>
              </TextField>
            </div>
          </section>
        </div>

        {snackBarData.open && snackBarData.action}
      </Form>
    </div>
  );
});

export default TrademarkForm1;
