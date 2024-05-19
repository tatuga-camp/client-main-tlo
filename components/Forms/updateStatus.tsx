import { Dropdown } from "primereact/dropdown";
import React, { FormEvent, useState } from "react";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
} from "react-aria-components";
import {
  ErrorMessages,
  StatusInventionPatent,
  StatusLists,
} from "../../models";
import { statusOptions } from "../../data/status";
import { UseQueryResult } from "@tanstack/react-query";
import {
  ResponseGetStatusInventionPatentsService,
  UpdateStatusInventionPatentService,
} from "../../services/invention-patent/status-invention";
import { ResponseGetInventionPatentService } from "../../services/invention-patent/invention-patent";
import Swal from "sweetalert2";

type UpdateStatusProps = {
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  selectStatus: StatusInventionPatent;
  status: UseQueryResult<
    {
      status: ResponseGetStatusInventionPatentsService;
      invention: ResponseGetInventionPatentService;
    },
    Error
  >;
};
function UpdateStatus({ setTrigger, selectStatus, status }: UpdateStatusProps) {
  const [updateStatusData, setUpdateStatusData] = useState<{
    note: string;
    status: {
      label: string;
      value: StatusLists;
    };
  }>(() => {
    return {
      note: selectStatus.note,
      status: {
        label:
          statusOptions.find((status) => status.value === selectStatus.status)
            ?.label ?? "",
        value: selectStatus.status,
      },
    };
  });

  const handleUpdateStatus = async (e: FormEvent) => {
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
      await UpdateStatusInventionPatentService({
        query: {
          statusInventionId: selectStatus.id,
        },
        body: {
          status: updateStatusData.status.value,
          note: updateStatusData.note,
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
    <div
      className="fixed bottom-0 left-0 right-0 top-0 z-50 m-auto 
    flex h-screen w-screen flex-col items-center justify-center"
    >
      <Form
        onSubmit={handleUpdateStatus}
        className="flex  h-96 w-96 flex-col items-center gap-5 rounded-md bg-white p-3 ring-1
        ring-main-color drop-shadow-xl"
      >
        <section className=" flex w-full flex-col">
          <label>เลือกสะถานะ</label>
          <div className="flex flex-col gap-1">
            <div className=" h-12 rounded-lg bg-slate-300 p-1">
              <Dropdown
                options={statusOptions}
                optionLabel="label"
                onChange={(e) => {
                  setUpdateStatusData((prev) => {
                    return {
                      ...prev,
                      status: {
                        label:
                          statusOptions.find(
                            (status) => status.value === e.target.value,
                          )?.label ?? "",
                        value: e.target.value,
                      },
                    };
                  });
                }}
                value={updateStatusData.status.value}
                required
                placeholder="เลือกสถานะ"
                className="md:w-14rem h-10 w-full"
              />
            </div>
            {!updateStatusData?.status && (
              <span className="text-xs text-red-700">
                Please fill out this field.
              </span>
            )}
          </div>
        </section>
        <TextField className={"flex w-full flex-col items-start gap-1 "}>
          <Label className="">เพิ่มโน๊ค</Label>
          <div className="flex w-full flex-col gap-1">
            <TextArea
              onChange={(e) => {
                setUpdateStatusData((prev) => {
                  return {
                    ...prev,
                    note: e.target.value,
                  };
                });
              }}
              value={updateStatusData.note}
              name="note"
              className="min-h-40   w-full	 resize-none
              rounded-md bg-slate-300  p-1 pl-3 text-[0.8rem] md:h-10 md:p-2  md:pl-4 md:text-base"
              placeholder="เพิ่มโน๊ค"
            />
            <FieldError className="text-xs text-red-700" />
          </div>
        </TextField>
        <Button
          type="submit"
          className="rounded-md bg-main-color px-5 py-1 text-lg
         text-white drop-shadow-md transition duration-100 active:scale-105"
        >
          อัพเดท
        </Button>
      </Form>
      <footer
        onClick={() => setTrigger(false)}
        className="fixed bottom-0 left-0 right-0 top-0  -z-10 m-auto
       h-screen w-screen bg-white/40 backdrop-blur-md"
      ></footer>
    </div>
  );
}

export default UpdateStatus;
