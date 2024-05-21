import React, { FormEvent, useEffect, useState } from "react";
import { ErrorMessages, SelectStatus, StatusLists, User } from "../../models";
import { useQuery } from "@tanstack/react-query";
import {
  GetStatusTrademarksService,
  UpdateStatusTrademarkervice,
} from "../../services/trademark/status-trademark";
import Swal from "sweetalert2";
import { UpdateTrademarkervice } from "../../services/trademark/trademark";
import UpdateStatus from "../Forms/updateStatus";
import { Button, Form, Input } from "react-aria-components";
import SuccessfulStatus from "./statusLists/successfulStatus";
import InprogressStatus from "./statusLists/inprogressStatus";
import PendingStatus from "./statusLists/pendingStatus";

type TrademarkStatusProps = {
  user?: User;
  trademarkId: string;
};
function TrademarkStatus({ trademarkId, user }: TrademarkStatusProps) {
  const [numberRequest, setNumberRequest] = useState<string>();
  const [triggerUpdateStatus, setTriggerUpdateStatus] = useState(false);
  const [selectStatus, setSelectStatus] = useState<SelectStatus>();
  const status = useQuery({
    queryKey: ["trademark-status", { trademarkId: trademarkId }],
    queryFn: () =>
      GetStatusTrademarksService({
        trademarkId: trademarkId,
      }),
    staleTime: 1000 * 10,
    refetchInterval: 1000 * 10,
  });

  useEffect(() => {
    if (status.isSuccess) {
      setNumberRequest(status.data?.trademark.numberRequest ?? "");
    }
  }, [status.data]);

  const handleUpdateNumnerRequest = async (e: FormEvent) => {
    try {
      e.preventDefault();

      Swal.fire({
        title: "กำลังอัพเดทสถานะ",
        text: "กรุณารอสักครู่",
        icon: "info",
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showCloseButton: false,
        showCancelButton: false,
        showDenyButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });
      await UpdateTrademarkervice({
        query: {
          trademarkId: status.data?.trademark.id as string,
        },
        body: {
          numberRequest: numberRequest,
        },
      });

      await status.refetch();
      Swal.fire({
        title: "อัพเดทสถานะสำเร็จ",
        text: "อัพเดทสถานะสำเร็จ",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
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

  const handleUpdateStatus = async ({
    e,
    statusId,
    statusValue,
    note,
  }: {
    e: FormEvent;
    statusId: string;
    statusValue: StatusLists;
    note: string;
  }) => {
    try {
      e.preventDefault();

      Swal.fire({
        title: "กำลังอัพเดทสถานะ",
        text: "กรุณารอสักครู่",
        icon: "info",
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showCloseButton: false,
        showCancelButton: false,
        showDenyButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });
      await UpdateStatusTrademarkervice({
        query: {
          statusTrademarkId: statusId,
        },
        body: {
          status: statusValue,
          note: note,
        },
      });

      await status.refetch();
      Swal.fire({
        title: "อัพเดทสถานะสำเร็จ",
        text: "อัพเดทสถานะสำเร็จ",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
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
  return (
    <div className="  w-full  rounded-md border-[1px] border-solid border-[#BED6FF] bg-white p-5 py-10 lg:p-10">
      {triggerUpdateStatus && selectStatus && (
        <UpdateStatus
          user={user}
          handleUpdateStatus={handleUpdateStatus}
          selectStatus={selectStatus}
          setTrigger={setTriggerUpdateStatus}
        />
      )}
      <div className="flex w-full flex-col items-center gap-3">
        <Form
          onSubmit={handleUpdateNumnerRequest}
          className="flex w-max items-center gap-2 text-xl font-semibold lg:text-2xl "
        >
          <span className="w-60">เลขที่คำขอ:</span>
          <Input
            disabled={user?.role !== "ADMIN"}
            onChange={(e) => setNumberRequest(e.target.value)}
            value={numberRequest}
            placeholder={numberRequest === "" ? "กรุณากรอกเลขที่คำขอ" : ""}
            type="text"
            className="h-8 w-full rounded-md bg-slate-300 p-1 pl-3 text-lg md:h-10 md:min-w-80 md:pl-4 "
          />
          {user?.role === "ADMIN" && (
            <Button
              type="submit"
              className="rounded-md bg-[var(--secondary-yellow)] px-3 py-1 text-[0.65rem] font-semibold ring-1 ring-black drop-shadow-md duration-200 hover:bg-yellow-400 lg:text-[0.85rem]"
            >
              ยืนยัน
            </Button>
          )}
        </Form>
        <h1 className="font-semibold lg:text-xl">
          ประเภท : สิทธิบัตรการประดิษฐ์
        </h1>
        <section className="mt-5 w-10/12 text-start text-xs lg:text-base">
          <p>
            <span className="font-semibold">ชื่อสิ่งประดิษฐ์/การออกแบบ : </span>{" "}
            {status.data?.trademark.titleTrademark}
          </p>
        </section>
        <section className="flex w-10/12 flex-col gap-2 text-xs md:flex-row md:justify-between lg:text-base">
          <p>
            <span className="font-semibold">ชื่อผู้สิ่งประดิษฐ์/ออกแบบ :</span>{" "}
            {status.data?.trademark.partnerInfoOnTrademarks.map((partner) => {
              return (
                <span key={partner.id}>
                  {partner.title} {partner.firstName} {partner.lastName}
                </span>
              );
            })}
          </p>
          <p>
            <span className="font-semibold">อาชีพ : </span>{" "}
            {status.data?.trademark.partnerInfoOnTrademarks.map((partner) => {
              return <span key={partner.id}>{partner.career}</span>;
            })}
          </p>
        </section>
        <div className="w-full overflow-x-auto">
          <div className="relative my-8 flex w-[18rem] min-w-max gap-16 py-5 ">
            {status.data?.status?.map((list) => {
              if (list.status === "APPROVED") {
                return (
                  <SuccessfulStatus
                    setSelectStatus={setSelectStatus}
                    status={list}
                    key={list.id}
                    user={user}
                    setTriggerUpdateStatus={setTriggerUpdateStatus}
                  />
                );
              } else if (list.status === "INPROGRESS") {
                return (
                  <InprogressStatus
                    key={list.id}
                    setSelectStatus={setSelectStatus}
                    status={list}
                    user={user}
                    setTriggerUpdateStatus={setTriggerUpdateStatus}
                  />
                );
              } else if (list.status === "PENDING") {
                return (
                  <PendingStatus
                    setSelectStatus={setSelectStatus}
                    status={list}
                    key={list.id}
                    user={user}
                    setTriggerUpdateStatus={setTriggerUpdateStatus}
                  />
                );
              }
            })}

            <div className="absolute left-10 top-10 h-[0.3rem] w-full bg-slate-300 "></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrademarkStatus;
