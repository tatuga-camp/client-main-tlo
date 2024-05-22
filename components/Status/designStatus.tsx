import React, { FormEvent, useEffect, useState } from "react";
import { ErrorMessages, SelectStatus, StatusLists, User } from "../../models";
import { useQuery } from "@tanstack/react-query";
import {
  GetStatusDesignPatentsService,
  UpdateStatusDesignPatentService,
} from "../../services/design-patent/status-design";
import Swal from "sweetalert2";
import { UpdateDesignPatentService } from "../../services/design-patent/design-patent";
import UpdateStatus from "../Forms/updateStatus";
import { Button, Form, Input, Label, TextField } from "react-aria-components";
import SuccessfulStatus from "./statusLists/successfulStatus";
import InprogressStatus from "./statusLists/inprogressStatus";
import PendingStatus from "./statusLists/pendingStatus";
import { Calendar } from "primereact/calendar";

type DesignStatusProps = {
  designId: string;
  user?: User;
};

function DesignStatus({ designId, user }: DesignStatusProps) {
  const [numberRequest, setNumberRequest] = useState<string>();
  const [requestDate, setRequestDate] = useState<string>();

  const [triggerUpdateStatus, setTriggerUpdateStatus] = useState(false);
  const [selectStatus, setSelectStatus] = useState<SelectStatus>();
  const status = useQuery({
    queryKey: ["design-status", { designId: designId }],
    queryFn: () =>
      GetStatusDesignPatentsService({
        designPatentId: designId,
      }),
    staleTime: 1000 * 10,
    refetchInterval: 1000 * 10,
  });

  useEffect(() => {
    if (status.isSuccess) {
      setNumberRequest(status.data?.design.numberRequest ?? "");
      setRequestDate(status.data?.design.requestDate ?? "");
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
      let body = {
        numberRequest: numberRequest,
        requestDate: requestDate,
      };

      if (!requestDate) {
        delete body.requestDate;
      }
      if (!numberRequest) {
        delete body.numberRequest;
      }

      await UpdateDesignPatentService({
        query: {
          designPatentId: status.data?.design.id as string,
        },
        body: {
          ...body,
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
      await UpdateStatusDesignPatentService({
        query: {
          statusDesignId: statusId,
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
          <TextField>
            <Label className="text-lg">เลขที่คำขอ:</Label>
            <Input
              disabled={user?.role !== "ADMIN"}
              onChange={(e) => setNumberRequest(e.target.value)}
              value={numberRequest}
              placeholder={numberRequest === "" ? "กรุณากรอกเลขที่คำขอ" : ""}
              type="text"
              className=" h-12 w-full rounded-md bg-slate-300 p-1 pl-3 text-lg  md:min-w-80 md:pl-4 "
            />
          </TextField>
          <TextField>
            <Label className="text-lg">วันยื่นคำขอ:</Label>
            <div className="w-40 rounded-lg bg-slate-300 p-1">
              <Calendar
                value={requestDate ? new Date(requestDate) : null}
                onChange={(e) => {
                  setRequestDate(e.value?.toISOString());
                }}
                disabled={user?.role !== "ADMIN"}
                className="h-10"
                locale="th"
                placeholder="ระบุวันที่ยื่นคำขอ"
              />
            </div>
          </TextField>
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
            {status.data?.design.workInfoOnDesignPatent.thaiName} /{" "}
            {status.data?.design.workInfoOnDesignPatent.englishName}
          </p>
        </section>
        <section className="flex w-10/12 flex-col gap-2 text-xs md:flex-row md:justify-between lg:text-base">
          <p>
            <span className="font-semibold">ชื่อผู้สิ่งประดิษฐ์/ออกแบบ :</span>{" "}
            {status.data?.design.partnerInfoOnDesignPatents.map((partner) => {
              return (
                <span key={partner.id}>
                  {partner.title} {partner.firstName} {partner.lastName}
                </span>
              );
            })}
          </p>
          {status.data?.design.userType === "INTERNAL" && (
            <p>
              <span className="font-semibold">สังกัด : </span>{" "}
              {status.data?.design.partnerInfoOnDesignPatents.map((partner) => {
                return (
                  <span key={partner.id}>
                    {partner.major} {partner.faculty} {partner.department}
                  </span>
                );
              })}
            </p>
          )}
        </section>
        <div className="w-full overflow-x-auto">
          <div className="relative my-8 flex w-[18rem] min-w-max gap-16 py-5 ">
            {status.data?.status?.map((list) => {
              if (list.status === "APPROVED") {
                return (
                  <SuccessfulStatus
                    key={list.id}
                    setSelectStatus={setSelectStatus}
                    status={list}
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
                    key={list.id}
                    user={user}
                    setSelectStatus={setSelectStatus}
                    status={list}
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

export default DesignStatus;
