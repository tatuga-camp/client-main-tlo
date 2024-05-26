import NumberTitle from "@/components/Number";
import React, { useEffect, useState } from "react";
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
import { ResponseGetTrademarkService } from "../../../services/trademark/trademark";
import { v4 as uuidv4 } from "uuid";
import SnackbarSaveData from "../../Snackbars/SnackbarSaveData";
import Swal from "sweetalert2";
import { isMongoDBId, isUUIDv4 } from "../../../utilities/validateID";
import {
  CreatePartnerTrademarkervice,
  DeletePartnerTrademarkervice,
  UpdatePartnerTrademarkervice,
} from "../../../services/trademark/partner-trademark";
import SnackbarNoSaveData from "../../Snackbars/SnackBarNoSaveData";
import SnackbarLoading from "../../Snackbars/SnackBarLoading";
import { MdDelete } from "react-icons/md";

type TrademarkForm1Props = {
  trademark: UseQueryResult<ResponseGetTrademarkService, Error>;
  user: User;
};
const TrademarkForm1 = ({ trademark, user }: TrademarkForm1Props) => {
  const [snackBarData, setSnackBarData] = useState<{
    open: boolean;
    action: React.ReactNode;
  }>({
    open: false,
    action: <></>,
  });

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
      career?: string;
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
    if (trademark.data) {
      setPartnerData((prev) => {
        if (trademark.data && trademark.data?.partnerOnTrademarks.length > 0) {
          return trademark.data.partnerOnTrademarks.map((partner) => {
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
              career: partner.career,
              email: partner.email,
            };
          });
        } else {
          setSnackBarData(() => {
            return {
              open: true,
              action: <SnackbarSaveData />,
            };
          });
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
              email: user.email,
            },
          ];
        }
      });
    }
  }, [trademark.data]);

  const handleDeletePartner = (id: string) => {
    Swal.fire({
      title: "คุณแน่ใจหรือไม่ที่จะลบข้อมูลผู้ประดิษฐ์",
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
            title: "กำลังลบข้อมูลผู้ประดิษฐ์",
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
            await DeletePartnerTrademarkervice({
              partnerId: id,
            });

            await trademark.refetch();
          }
          Swal.fire({
            title: "ลบข้อมูลสำเร็จ",
            text: "ลบข้อมูลผู้ประดิษฐ์สำเร็จ",
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
    setSnackBarData(() => {
      return {
        open: true,
        action: <SnackbarSaveData />,
      };
    });

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

  const handleUpdatePartners = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setSnackBarData(() => {
        return {
          open: true,
          action: <SnackbarLoading />,
        };
      });
      if (partnerData?.length === 0 || !partnerData) {
        throw new Error("กรุณากรอกข้อมูลผู้ประดิษฐ์");
      }

      for (const partner of partnerData) {
        const mongoDBId = isMongoDBId(partner.id);
        const UUID = isUUIDv4(partner.id);

        if (UUID) {
          await CreatePartnerTrademarkervice({
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
            trademarkId: trademark.data?.id as string,
            career: partner.career as string,
            status: "STAFF",
          });
        } else if (mongoDBId) {
          await UpdatePartnerTrademarkervice({
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
              career: partner.career as string,
            },
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
  return (
    <div className=" w-full  rounded-md border-[1px] border-solid border-[#BED6FF] bg-white p-5 py-10 md:p-10">
      <Form
        onSubmit={handleUpdatePartners}
        className="mx-0 my-5 flex flex-col gap-5 md:mx-5 md:my-10 "
      >
        {/* ข้อ 1*/}

        {partnerData?.map((partner, index) => {
          return (
            <div
              key={partner.id}
              className={`flex flex-col gap-5 rounded-lg p-5 ring-1 ring-gray-400  `}
            >
              <section className="flex items-start justify-center gap-3 md:items-center md:gap-5">
                <NumberTitle number={1} />
                <div className="flex w-full flex-col gap-3 text-[0.8rem] md:gap-5 md:text-base lg:flex-row">
                  <TextField
                    className={"flex w-full items-center gap-3 md:w-[50%]"}
                  >
                    <Label className=" text-[var(--primary-blue) min-w-20 font-semibold md:min-w-24">
                      คำนำหน้าชื่อ
                    </Label>
                    <div className="flex flex-col gap-1">
                      <Input
                        required
                        name="title"
                        value={
                          partnerData.find((item) => item.id === partner.id)
                            ?.title
                        }
                        onChange={(e) =>
                          handleChangePartnerData({ e, id: partner.id })
                        }
                        type="text"
                        className="h-8 w-28 rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:w-32 md:pl-4 "
                        placeholder="คำนำหน้า"
                      />
                      <FieldError className="text-xs text-red-700" />
                    </div>
                  </TextField>
                  <TextField
                    className={"flex w-full items-center gap-3 md:w-[50%]"}
                  >
                    <Label className="min-w-8 font-semibold text-[var(--primary-blue)] ">
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
                        className="h-8md:w-60 w-44 rounded-md bg-slate-300 p-1 pl-3 md:h-10  md:p-2 md:pl-4"
                        placeholder="ชื่อจริง"
                      />

                      <FieldError className="text-xs text-red-700" />
                    </div>
                  </TextField>
                  <TextField
                    className={"flex w-full items-center gap-3 md:w-[50%]"}
                  >
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
                        className="h-8md:w-60 w-40 rounded-md bg-slate-300 p-1 pl-3 md:h-10  md:p-2 md:pl-4"
                        placeholder="นามสกุล"
                      />
                      <FieldError className="text-xs text-red-700" />
                    </div>
                  </TextField>
                </div>
              </section>

              {/* ข้อ 2*/}
              <section className="flex items-start justify-center gap-3 md:items-center md:gap-5">
                <NumberTitle number={2} />
                <div className="flex w-full flex-col gap-3 text-[0.8rem] md:flex-row md:gap-5 md:text-base">
                  <TextField
                    className={
                      "flex w-full flex-col gap-3 md:w-[60%] md:flex-row md:items-center "
                    }
                  >
                    <Label className=" text-[var(--primary-blue) min-w-24 font-semibold md:min-w-44">
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
                        className="w-50 h-8 rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:w-72 md:pl-4 "
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
                  <TextField className={"flex  items-center gap-3  "}>
                    <p className="font-semibold">ที่อยู่ (ตามบัตรประชาชน)</p>
                    <Label className=" text-[var(--primary-blue) font-medium ">
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
                        className="h-8 w-40  max-w-20 rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                        placeholder="บ้านเลขที่"
                      />
                      <FieldError className="text-xs text-red-700" />
                    </div>
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
                        className="h-8 w-40  max-w-14 rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
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
                  <TextField
                    className={"w-50 flex items-center  gap-3 md:w-72  "}
                  >
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
                    className={"w-50 flex items-center  gap-3 md:w-72  "}
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
                    className={"w-50 flex items-center  gap-3 md:w-72  "}
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

              {/* ข้อ 4*/}
              <section className="flex items-start justify-center gap-3 md:items-center md:gap-5">
                <NumberTitle number={4} />
                <div className="flex w-full flex-col gap-3 text-[0.8rem] md:flex-row md:gap-5 md:text-base">
                  <TextField className={"flex  items-center gap-3 md:w-[40%] "}>
                    <Label className=" text-[var(--primary-blue) min-w-24 font-semibold md:min-w-36">
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
                          className="h-8 w-32 rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 lg:w-72 "
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
              <section className="flex items-start justify-center gap-3 md:items-center md:gap-5">
                <NumberTitle number={5} />
                <div className="flex w-full flex-col gap-3 text-[0.8rem] md:flex-row md:gap-5 md:text-base">
                  <TextField
                    className={"flex w-full items-center gap-3 md:w-[40%] "}
                  >
                    <Label className=" text-[var(--primary-blue) min-w-14 font-semibold ">
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
                        className="h-8 w-44 rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 lg:w-72 "
                        placeholder="xxx@gmail.com"
                      />
                      <FieldError className="text-xs text-red-700" />
                    </div>
                  </TextField>
                </div>
              </section>

              {/* ข้อ 6*/}
              <section className="flex items-start justify-center gap-3 md:items-center md:gap-5">
                <NumberTitle number={6} />
                <div className="flex w-full flex-col gap-3 text-[0.8rem] md:flex-row md:gap-5 md:text-base">
                  <TextField
                    className={"flex w-full items-center gap-3 md:w-[40%] "}
                  >
                    <Label className=" text-[var(--primary-blue) min-w-10 font-semibold ">
                      อาชีพ
                    </Label>
                    <div className="flex flex-col gap-1">
                      <Input
                        required
                        value={
                          partnerData.find((item) => item.id === partner.id)
                            ?.career
                        }
                        onChange={(e) =>
                          handleChangePartnerData({ e, id: partner.id })
                        }
                        name="career"
                        type="text"
                        className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 md:h-10 md:pl-4 "
                        placeholder="อาชีพ"
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
                  className="my-3 flex w-48 items-center justify-center gap-3 rounded-md bg-red-400 p-2 
              text-xs font-semibold text-white duration-300 hover:bg-red-700 md:px-3 md:py-2 md:text-base "
                >
                  <MdDelete />
                  <p>ลบชื่อผู้ประดิษฐ์</p>
                </Button>
              )}
            </div>
          );
        })}

        <Button
          type="button"
          onPress={handleAddMorePartner}
          className="my-3 flex w-48 items-center justify-center gap-3 rounded-md bg-[#9747FF] p-2 text-xs font-semibold text-white duration-300 hover:bg-purple-700 md:px-3 md:py-2 md:text-base "
        >
          <FiPlusCircle /> <p>เพิ่มชื่อผู้ประดิษฐ์</p>
        </Button>
        {snackBarData.open && snackBarData.action}
      </Form>
    </div>
  );
};

export default TrademarkForm1;
