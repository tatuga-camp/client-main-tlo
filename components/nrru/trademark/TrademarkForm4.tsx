import { UseQueryResult } from "@tanstack/react-query";
import React, { forwardRef, useState } from "react";
import { HiOutlinePhotograph } from "react-icons/hi";
import {
  ResponseGetTrademarkService,
  UpdateTrademarkervice,
} from "../../../services/trademark/trademark";
import { ErrorMessages, User } from "../../../models";
import { useRouter } from "next-nprogress-bar";
import Swal from "sweetalert2";
import TrademarkForm1 from "./TrademarkForm1";
import TrademarkForm2 from "./TrademarkForm2";
import TrademarkForm3 from "./TrademarkForm3";

type TrademarkForm4Props = {
  trademark: UseQueryResult<ResponseGetTrademarkService, Error>;
  user: User;
};
const TrademarkForm4 = forwardRef(function FormTrademark(
  { trademark, user }: TrademarkForm4Props,
  ref,
) {
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
      await UpdateTrademarkervice({
        query: {
          trademarkId: trademark.data?.id as string,
        },
        body: {
          isComplete: true,
        },
      });
      await trademark.refetch();
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
  React.useImperativeHandle(ref, () => ({
    saveData,
  }));
  return (
    <div className="flex flex-col gap-5">
      <TrademarkForm1 user={user} trademark={trademark} />
      <TrademarkForm2 trademark={trademark} />
      <TrademarkForm3 trademark={trademark} />
      {trademark.data?.isComplete === true && (
        <div
          className="fixed bottom-2 left-2 mt-5 w-80 rounded-md bg-green-500 px-3 py-2
       font-semibold text-white  drop-shadow-lg "
        >
          คำขอของคุณได้รับการส่งเรียบร้อยแล้ว
        </div>
      )}
    </div>
  );
});

export default TrademarkForm4;
