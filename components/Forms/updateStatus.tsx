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
  SelectStatus,
  StatusInventionPatent,
  StatusLists,
  User,
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
  handleUpdateStatus: ({
    e,
    statusId,
    statusValue,
    note,
  }: {
    e: FormEvent;
    statusId: string;
    statusValue: StatusLists;
    note: string;
  }) => Promise<void>;
  selectStatus: SelectStatus;
  user?: User;
};
function UpdateStatus({
  setTrigger,
  selectStatus,
  user,
  handleUpdateStatus,
}: UpdateStatusProps) {
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

  return (
    <div
      className="fixed bottom-0 left-0 right-0 top-0 z-50 m-auto 
    flex h-screen w-screen flex-col items-center justify-center"
    >
      <Form
        onSubmit={(e) =>
          handleUpdateStatus({
            e,
            statusId: selectStatus.id,
            statusValue: updateStatusData.status.value,
            note: updateStatusData.note,
          })
        }
        className="flex  h-max w-96 flex-col items-center gap-5 rounded-md bg-white p-3 ring-1
        ring-main-color drop-shadow-xl"
      >
        <section
          className={` w-full flex-col ${user?.role === "ADMIN" ? "flex" : "hidden"} `}
        >
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
              disabled={user?.role !== "ADMIN"}
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
        {user?.role === "ADMIN" && (
          <Button
            type="submit"
            className="rounded-md bg-main-color px-5 py-1 text-lg
         text-white drop-shadow-md transition duration-100 active:scale-105"
          >
            อัพเดท
          </Button>
        )}
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
