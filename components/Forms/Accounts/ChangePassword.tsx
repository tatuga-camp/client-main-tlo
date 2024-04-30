import { DefinedUseQueryResult } from "@tanstack/react-query";
import React, { useState } from "react";
import { ErrorMessages, User } from "../../../models";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "react-aria-components";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import { UpdateUserPasswordService } from "../../../services/user";

type ChangePasswordProps = {
  user: DefinedUseQueryResult<User, Error>;
};
function ChangePassword({ user }: ChangePasswordProps) {
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [updatePassword, setUpdatePassword] = useState<{
    oldPassword?: string;
    newPassword?: string;
    confirmNewPassword?: string;
  }>();

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatePassword((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTriggerVisibility = () => {
    setIsHidden((prev) => !prev);
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      Swal.fire({
        title: "กำลังเปลี่ยนรหัสผ่าน",
        text: "กรุณารอสักครู่",
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });

      if (
        !updatePassword?.oldPassword ||
        !updatePassword?.newPassword ||
        !updatePassword?.confirmNewPassword
      ) {
        throw new Error("โปรดกรอกข้อมูลให้ครบ");
      }

      if (updatePassword.newPassword !== updatePassword.confirmNewPassword) {
        throw new Error("รหัสผ่านใหม่ไม่ตรงกัน");
      }
      const update = await UpdateUserPasswordService({
        newPassword: updatePassword.newPassword,
        confirmNewPassword: updatePassword.confirmNewPassword,
        oldPassword: updatePassword.oldPassword,
      });

      if (update) {
        Swal.fire({
          title: "เปลี่ยนรหัสผ่านสำเร็จ",
          text: "รหัสผ่านของคุณได้รับการเปลี่ยนแล้ว",
          icon: "success",
        });
      }
    } catch (error) {
      console.log(error);
      let result = error as ErrorMessages;
      Swal.fire({
        title: `${result.error ? result.error : "เกิดข้อผิดพลาด"}`,
        text: result.message.toString(),
        footer:
          result.statusCode &&
          "รหัสข้อผิดพลาด: " + result.statusCode?.toString(),
        icon: "error",
      });
    }
  };

  return (
    <Form
      onSubmit={handleUpdatePassword}
      className=" flex w-11/12 flex-col gap-2 bg-white p-8 md:w-6/12 "
    >
      <Label className="text-2xl font-semibold text-main-color">
        เปลี่ยนรหัสผ่าน
      </Label>
      <TextField
        type={isHidden ? "text" : "password"}
        isRequired
        className="relative  flex flex-col gap-3"
      >
        <Label className="font-semibold text-[var(--primary-blue)]">
          รหัสผ่านเก่า
        </Label>
        <div className="relative">
          <Input
            onChange={handleChangePassword}
            value={updatePassword?.oldPassword}
            name="oldPassword"
            className="w-full rounded-md bg-slate-300 p-2 pl-4"
            placeholder="Password"
          />
          <Button
            onPress={handleTriggerVisibility}
            className="absolute bottom-3 right-2 text-lg "
          >
            {isHidden ? <FaRegEye /> : <FaRegEyeSlash />}
          </Button>
        </div>

        <FieldError className="text-xs text-red-600" />
      </TextField>
      <TextField
        type={isHidden ? "text" : "password"}
        isRequired
        className="relative  flex flex-col gap-3"
      >
        <Label className="font-semibold text-[var(--primary-blue)]">
          รหัสผ่านใหม่
        </Label>

        <div className="relative">
          <Input
            onChange={handleChangePassword}
            value={updatePassword?.newPassword}
            name="newPassword"
            className="w-full rounded-md bg-slate-300 p-2 pl-4"
            placeholder="Password"
          />
          <Button
            onPress={handleTriggerVisibility}
            className="absolute bottom-3 right-2 text-lg "
          >
            {isHidden ? <FaRegEye /> : <FaRegEyeSlash />}
          </Button>
        </div>
        <FieldError className="text-xs text-red-600" />
      </TextField>
      <TextField
        type={isHidden ? "text" : "password"}
        isRequired
        className="relative  flex flex-col gap-3"
      >
        <Label className="font-semibold text-[var(--primary-blue)]">
          ยืนยันรหัสผ่านใหม่
        </Label>
        <div className="relative">
          <Input
            onChange={handleChangePassword}
            value={updatePassword?.confirmNewPassword}
            name="confirmNewPassword"
            className="w-full rounded-md bg-slate-300 p-2 pl-4"
            placeholder="Password"
          />
          <Button
            onPress={handleTriggerVisibility}
            className="absolute bottom-3 right-2 text-lg "
          >
            {isHidden ? <FaRegEye /> : <FaRegEyeSlash />}
          </Button>
        </div>
        <FieldError className="text-xs text-red-600" />
      </TextField>
      <Button
        type="submit"
        className="w-60 rounded-md border-2 border-solid border-[var(--primary-blue)] bg-white px-3 py-2 font-semibold text-[var(--primary-blue)] duration-300 hover:border-blue-500 hover:text-blue-500"
      >
        แก้ไขข้อมูล
      </Button>
    </Form>
  );
}

export default ChangePassword;
