import Number from "@/components/Number";
import React, { useState } from "react";
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
import Checkbox from "@mui/material/Checkbox";
import { IoTrashOutline } from "react-icons/io5";
import { UseQueryResult } from "@tanstack/react-query";
import {
  ResponseGetCopyrightService,
  UpdateCopyrightService,
} from "../../../services/copyright/copyright";
import { ErrorMessages, User } from "../../../models";
import { useRouter } from "next-nprogress-bar";
import Swal from "sweetalert2";
import NrruCopyrightForm1 from "./NrruCopyrightForm1";
import NrruCopyrightForm2 from "./NrruCopyrightForm2/NrruCopyrightForm2";
import NrruCopyrightForm3 from "./NrruCopyrightForm3/NrruCopyrightForm3";
import NrruCopyrightForm4 from "./NrruCopyrightForm4/NrruCopyrightForm4";

type NrruCopyrightForm5Props = {
  copyright: UseQueryResult<ResponseGetCopyrightService, Error>;
  user: User;
};
const NrruCopyrightForm5 = ({ copyright, user }: NrruCopyrightForm5Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleUpdateCopyright = async () => {
    try {
      setIsLoading(true);
      Swal.fire({
        title: "กำลังส่งคำขอ",
        text: "กรุณารอสักครู่",
        icon: "info",
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });
      await UpdateCopyrightService({
        query: {
          copyrightId: copyright.data?.id as string,
        },
        body: {
          isComplete: true,
        },
      });
      await copyright.refetch();
      router.push("/dashboard");
      Swal.fire({
        title: "ส่งคำขอสำเร็จ",
        text: "ระบบกำลังดำเนินการตรวจสอบข้อมูล",
        icon: "success",
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
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
    <div className="flex flex-col gap-5">
      <NrruCopyrightForm1 user={user} copyright={copyright} />
      <NrruCopyrightForm2 copyright={copyright} />
      <NrruCopyrightForm3 copyright={copyright} />
      <NrruCopyrightForm4 copyright={copyright} />
      {copyright.data?.isComplete === false ? (
        <button
          disabled={isLoading}
          onClick={handleUpdateCopyright}
          className="fixed bottom-2 left-2 mt-5 w-80 rounded-md bg-[#10316B] px-3 py-2
       font-semibold text-white  drop-shadow-lg transition duration-100 hover:bg-[#19106b] active:ring-2"
        >
          ฉันยืนยันข้อมูลถูกต้องและ ต้องการส่งคำขอ
        </button>
      ) : (
        <div
          className="fixed bottom-2 left-2 mt-5 w-80 rounded-md bg-green-500 px-3 py-2
       font-semibold text-white  drop-shadow-lg "
        >
          คำขอของคุณได้รับการส่งเรียบร้อยแล้ว
        </div>
      )}
    </div>
  );
};

export default NrruCopyrightForm5;
