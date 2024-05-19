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
import { ErrorMessages, User } from "../../../models";
import { UseQueryResult } from "@tanstack/react-query";
import {
  ResponseGetDesignPatentService,
  UpdateDesignPatentService,
} from "../../../services/design-patent/design-patent";
import { useRouter } from "next-nprogress-bar";
import Swal from "sweetalert2";
import NrruDesignForm1 from "./NrruDesignForm1";
import NrruDesignForm2 from "./NrruDesignForm2/NrruDesignForm2";
import NrruDesignForm3 from "./NrruDesignForm3/NrruDesignForm3";
import NrruDesignForm4 from "./NrruDesignForm4/NrruDesignForm4";

type NrruDesignForm5Props = {
  design: UseQueryResult<ResponseGetDesignPatentService, Error>;
  user: User;
};
const NrruDesignForm5 = ({ design, user }: NrruDesignForm5Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleUpdateDesign = async () => {
    try {
      setIsLoading(true);
      Swal.fire({
        title: "ส่งคำขอสำเร็จ",
        text: "ระบบกำลังดำเนินการตรวจสอบข้อมูล",
        icon: "success",
      });
      await UpdateDesignPatentService({
        query: {
          designPatentId: design.data?.id as string,
        },
        body: {
          isComplete: true,
        },
      });
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
      <NrruDesignForm1 user={user} design={design} />
      <NrruDesignForm2 design={design} />
      <NrruDesignForm3 design={design} />
      <NrruDesignForm4 design={design} />
      {design.data?.isComplete === false ? (
        <button
          disabled={isLoading}
          onClick={handleUpdateDesign}
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

export default NrruDesignForm5;
