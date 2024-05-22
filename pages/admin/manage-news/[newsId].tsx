import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React, { useRef, useState } from "react";
import { GetUserService } from "../../../services/user";
import AdminLayout from "../../../layouts/adminLayout";
import Head from "next/head";
import {
  Button,
  FieldError,
  FileTrigger,
  Form,
  Input,
  Label,
  TextField,
} from "react-aria-components";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Calendar } from "primereact/calendar";
import { IoIosCloseCircle } from "react-icons/io";
import { MdOutlinePhoto, MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import fakeImageUpload from "@/data/fakeImageUpload";
import { Editor } from "@tinymce/tinymce-react";

const label = { inputProps: { "aria-label": "Switch demo" } };
function ManageNews() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log("error");
    }
  };
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <title>ข่าวประชาสัมพันธ์</title>
      </Head>
      <AdminLayout>
        <div className="flex h-full w-full flex-col items-center bg-[#F4F8FF] pb-10 font-Anuphan text-[var(--primary-blue)] lg:justify-center">
          <header className="flex w-full flex-col items-center gap-10">
            <div className="mt-16 w-[70%] bg-[var(--secondary-yellow)] p-2 text-center font-semibold ">
              ข่าวประชาสัมพันธ์
            </div>
          </header>
          <main className="mt-5 flex w-full flex-col items-center ">
            <Form className="mt-8 flex w-[70%] flex-col  gap-5 ">
              <TextField type="text" isRequired className="flex flex-col gap-3">
                <Input
                  name="text"
                  type="text"
                  className="w-full rounded-md border-[1px] border-solid border-[#BED6FF] bg-white p-3 pl-4"
                  placeholder="Title"
                />
                <FieldError className="text-xs text-red-600" />
              </TextField>
              <section className="flex flex-col justify-between  md:flex-row-reverse md:items-center">
                <div className="flex items-center gap-3">
                  <Label className="min-w-32 font-semibold">
                    กำหนดเวลาโพสต์
                  </Label>
                  <div className="w-40 rounded-lg border-[1px] border-solid border-[#BED6FF] bg-slate-300 p-[0.07rem] ">
                    <Calendar
                      required
                      locale="th"
                      placeholder="mm/dd/yyyy"
                      yearNavigator={true}
                      monthNavigator={true}
                      dateFormat="mm/dd/yy"
                    />
                  </div>
                </div>
                <h1 className="font-semibold">คำอธิบาย</h1>
              </section>
              <div>
                <Editor
                  apiKey="your-api-key"
                  onInit={(_evt, editor) => (editorRef.current = editor)}
                  initialValue="<p>This is the initial content of the editor.</p>"
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                />
              </div>

              <section className="flex w-full flex-col gap-5 md:flex-row">
                <FileTrigger>
                  <button className="mb-5 flex h-12 w-36 items-center rounded-md bg-[var(--secondary-yellow)] px-8 py-3 drop-shadow-md">
                    อัพโหลดไฟล์
                  </button>
                </FileTrigger>

                <section className="grid grid-cols-1 gap-2 md:grid-cols-2">
                  {fakeImageUpload.map((image, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-5 rounded-md border-[1px] border-solid bg-white p-3"
                    >
                      <span className="flex items-center gap-3 text-xs text-[#4680e399] md:text-base">
                        <MdOutlinePhoto />
                        {image.id}
                      </span>
                      <button className="text-2xl text-red-500">
                        <IoIosCloseCircle />
                      </button>
                    </div>
                  ))}
                </section>
              </section>
            </Form>
          </main>
        </div>
      </AdminLayout>
    </>
  );
}

export default ManageNews;
export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext,
) => {
  try {
    const userServer = await GetUserService({
      type: "SERVER-SIDE",
      context: ctx,
    });
    if (userServer.role !== "ADMIN") {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    return {
      props: {
        userServer,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        destination: "/auth/sign-in",
        permanent: false,
      },
    };
  }
};
