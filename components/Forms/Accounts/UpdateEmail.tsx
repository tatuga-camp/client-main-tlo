import { DefinedUseQueryResult } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "react-aria-components";
import { ErrorMessages, User } from "../../../models";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import { UpdateUserEmailService } from "../../../services/user";
type UpdateEmailProps = {
  user: DefinedUseQueryResult<User, Error>;
};
function UpdateEmail({ user }: UpdateEmailProps) {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isHidden, setIsHidden] = useState<boolean>(false);

  const handleTriggerVisibility = () => {
    setIsHidden((prev) => !prev);
  };

  const handleUpdateEmail = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      Swal.fire({
        title: "กำลังเปลี่ยน E-mail",
        text: "กรุณารอสักครู่",
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });

      if (!email || !password) {
        throw new Error("โปรดกรอกข้อมูลให้ครบ");
      }

      const update = await UpdateUserEmailService({
        email: email,
        password: password,
      });

      user.refetch();

      Swal.fire({
        title: "เปลี่ยน E-mail สำเร็จ",
        text: "เปลี่ยน E-mail สำเร็จ",
        icon: "success",
      });
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
      onSubmit={handleUpdateEmail}
      className=" flex w-11/12 flex-col gap-2 bg-white p-8 md:w-6/12 "
    >
      <Label className="text-2xl font-semibold text-main-color">
        เปลี่ยน E-mail
      </Label>
      <TextField isDisabled type="text" className="flex flex-col gap-1">
        <Label className="font-semibold text-[var(--primary-blue)]">
          email เดิม
        </Label>
        <Input
          value={user.data?.email}
          disabled
          name="oldEmail"
          type="email"
          className="h-10 w-full rounded-md bg-slate-300 p-2 pl-4"
          placeholder="อีเมลล์เดิม"
        />
      </TextField>
      <TextField type="text" className="flex flex-col gap-1">
        <Label className="font-semibold text-[var(--primary-blue)]">
          email ใหม่
        </Label>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name="email"
          type="email"
          className="h-10 w-full rounded-md bg-slate-300 p-2 pl-4"
          placeholder="อีเมลล์ใหม่"
        />
        <FieldError className="text-xs text-red-600" />
      </TextField>
      <TextField
        type={isHidden ? "text" : "password"}
        isRequired
        className="relative  flex flex-col gap-3"
      >
        <Label className="font-semibold text-[var(--primary-blue)]">
          รหัสผ่าน
        </Label>

        <Input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name="password"
          className="w-full rounded-md bg-slate-300 p-2 pl-4"
          placeholder="Password"
        />
        <Button
          onPress={handleTriggerVisibility}
          className="absolute bottom-3 right-2 text-lg "
        >
          {isHidden ? <FaRegEye /> : <FaRegEyeSlash />}
        </Button>

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

export default UpdateEmail;
