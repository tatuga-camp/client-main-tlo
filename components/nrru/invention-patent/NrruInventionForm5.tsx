import Number from "@/components/Number";
import React, { forwardRef, useImperativeHandle, useState } from "react";
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
  ResponseGetInventionPatentService,
  UpdateInventionPatentService,
} from "../../../services/invention-patent/invention-patent";
import NrruInventionForm1 from "./NrruInventionForm1";
import moment from "moment";
import { ErrorMessages, User } from "../../../models";
import NrruInventionForm3 from "./NrruInventionForm3/NrruInventionForm3";
import NrruInventionForm2 from "./NrruInventionForm2/NrruInventionForm2";
import NrruInventionForm4 from "./NrruInventionForm4/NrruInventionForm4";
import Swal from "sweetalert2";
import { useRouter } from "next-nprogress-bar";

type FileOnWorkInventionProps = {
  invention: UseQueryResult<ResponseGetInventionPatentService, Error>;
  user: User;
};
const NrruInventionForm5 = forwardRef(
  ({ invention, user }: FileOnWorkInventionProps, ref) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const saveData = async () => {
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
        await UpdateInventionPatentService({
          query: {
            inventionPatentId: invention.data?.id as string,
          },
          body: {
            isComplete: true,
          },
        });
        await invention.refetch();
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
    useImperativeHandle(ref, () => ({
      saveData,
    }));
    return (
      <div className="flex flex-col gap-5">
        <NrruInventionForm1 invention={invention} user={user} />
        <NrruInventionForm2 invention={invention} />
        <NrruInventionForm3 invention={invention} />
        <NrruInventionForm4 invention={invention} />
        {invention.data?.isComplete === true && (
          <div
            className="fixed bottom-2 left-2 mt-5 w-80 rounded-md bg-green-500 px-3 py-2
       font-semibold text-white  drop-shadow-lg "
          >
            คำขอของคุณได้รับการส่งเรียบร้อยแล้ว
          </div>
        )}
      </div>
    );
  },
);

export default NrruInventionForm5;
