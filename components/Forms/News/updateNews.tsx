import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useState } from "react";
import { ErrorMessages } from "../../../models";
import Swal from "sweetalert2";
import { filterBase64Image } from "../../../utilities/filterImageBase64";
import {
  GetNewsByIdService,
  UpdateNewsService,
} from "../../../services/news/news";
import { replaceBase64WithNewContentService } from "../../../services/replaceBase64";
import {
  GetSignURLService,
  UploadSignURLService,
} from "../../../services/google-storage";
import {
  CreateFileNewsService,
  DeleteFileNewsService,
} from "../../../services/news/file-news";
import { useQuery } from "@tanstack/react-query";
import {
  Button,
  FieldError,
  FileTrigger,
  Form,
  Input,
  Link,
  TextField,
} from "react-aria-components";
import { MdCancel } from "react-icons/md";
import { Switch } from "@mui/material";
import LoadingSpinner from "../../Loading/loadingSpinner";
import { Editor } from "@tinymce/tinymce-react";
import { filePickerCallback } from "../../../utilities/filePickerCallback";
import FileOnNews from "./FileOnNews";

function UpdateNews() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [newsData, setNewsData] = useState<{
    title?: string;
    description?: string;
    date?: string;
    isPublic?: boolean;
  }>();
  const [files, setFiles] = useState<
    {
      id?: string;
      url: string;
      type?: string;
      file?: File;
    }[]
  >([]);

  const news = useQuery({
    queryKey: ["news", { newsId: router.query.newsId as string }],
    queryFn: () =>
      GetNewsByIdService({ newsId: router.query.newsId as string }),
  });

  useEffect(() => {
    if (news.data) {
      setNewsData({
        title: news.data.title,
        description: news.data.content,
        date: new Date(news.data.releaseAt).toISOString().slice(0, 16),
        isPublic: news.data.isPublic,
      });
      setFiles(
        news.data.files.map((file) => {
          return {
            id: file.id,
            url: file.url,
            type: file.type,
          };
        }),
      );
    }
  }, [news.data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewsData({
      ...newsData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDeleteFile = async ({
    url,
    fileOnNewsId,
  }: {
    url: string;
    fileOnNewsId?: string;
  }) => {
    try {
      Swal.fire({
        title: "กำลังลบไฟล์",
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
      if (fileOnNewsId) {
        await DeleteFileNewsService({
          fileId: fileOnNewsId,
        });
        setFiles((prev) => {
          return [...prev?.filter((file) => file.url !== url)];
        });
      } else {
        setFiles((prev) => {
          return [...prev?.filter((file) => file.url !== url)];
        });
      }

      Swal.fire({
        title: "ลบไฟล์สำเร็จ",
        text: "ระบบกำลังดำเนินการตรวจสอบข้อมูล",
        icon: "success",
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

  const handleUpdateNews = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (!newsData?.title || !newsData?.description || !newsData?.date) {
        throw new Error("กรุณากรอกข้อมูลให้ครบ");
      }

      Swal.fire({
        title: "กำลังอัพเดทข่าว",
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

      const filterFiles = files?.filter((file) => !file.id);

      const imageBase64 = filterBase64Image(newsData?.description);

      const replace = await replaceBase64WithNewContentService({
        base64: imageBase64,
        content: newsData?.description,
      });

      await UpdateNewsService({
        query: {
          newsId: router.query.newsId as string,
        },
        body: {
          title: newsData?.title,
          releaseAt: new Date(newsData?.date).toISOString(),
          isPublic: newsData?.isPublic,
          content: replace.content,
        },
      });

      let uploadFiles: { file: File; url: string }[] = [];
      uploadFiles.push(...replace.files);

      for (const file of filterFiles) {
        const getSignURL = await GetSignURLService({
          fileName: file.file?.name as string,
          fileType: file.file?.type as string,
        });

        await UploadSignURLService({
          contentType: file.file?.type as string,
          file: file.file as File,
          signURL: getSignURL.signURL,
        });
        uploadFiles.push({
          file: file.file as File,
          url: getSignURL.originalURL,
        });
      }
      await Promise.allSettled(
        uploadFiles.map((file) =>
          CreateFileNewsService({
            newsId: router.query.newsId as string,
            url: file.url,
            type: file.file.type,
            size: file.file.size,
          }),
        ),
      );
      Swal.fire({
        title: "อัพเดทข่าวสำเร็จ",
        text: "ระบบกำลังดำเนินการตรวจสอบข้อมูล",
        icon: "success",
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
    <Form
      onSubmit={handleUpdateNews}
      className="relative flex h-max w-9/12 flex-col gap-5 rounded-md bg-background-color p-10 drop-shadow-xl "
    >
      <Link
        href={"/admin/manage-news"}
        className="absolute right-2 top-2 m-auto flex items-center
     justify-center gap-2 rounded-md bg-red-300 px-3 py-1 text-red-600
      transition duration-150 hover:bg-red-400 active:scale-105"
      >
        <MdCancel />
        ยกเลิก
      </Link>
      <TextField className={"mt-5 flex w-full items-center gap-3"}>
        <section className="flex w-full flex-col">
          <Input
            name="title"
            type="text"
            onChange={handleChange}
            value={newsData?.title}
            className=" w-full rounded-sm bg-white p-1 pl-4 ring-1 ring-blue-200  md:h-10 "
            placeholder="ใส่หัวข้อข่าว"
          />
          <FieldError className="text-xs text-red-700" />
        </section>
      </TextField>

      <section className="flex w-full items-end justify-between">
        <div className="flex items-center gap-5">
          {" "}
          <Switch
            checked={newsData?.isPublic}
            onChange={(e) =>
              setNewsData((prev) => {
                return {
                  ...prev,
                  isPublic: e.target.checked,
                };
              })
            }
          />
          <label className="font-semibold">เผยแพร่</label>
        </div>

        <section className="flex flex-row gap-3 md:ml-10">
          <p className="my-2 text-[0.8rem] font-semibold md:min-w-16 md:text-base">
            เลือกวันที่ของข่าว :
          </p>
          <input
            required
            name="date"
            onChange={handleChange}
            value={newsData?.date}
            className="w-96 rounded-sm px-2 ring-1 ring-blue-200"
            type="datetime-local"
          />
          <FieldError className="text-xs text-red-700" />
        </section>
      </section>
      {loading && (
        <div className="flex h-full w-full animate-pulse items-center justify-center bg-gray-100">
          <LoadingSpinner />
        </div>
      )}
      <div className="h-96">
        <Editor
          onInit={() => {
            setLoading(false);
          }}
          tinymceScriptSrc={"/assets/libs/tinymce/tinymce.min.js"}
          textareaName="description"
          value={newsData?.description}
          onEditorChange={(content) => {
            setNewsData({
              ...newsData,
              description: content,
            });
          }}
          init={{
            link_context_toolbar: true,
            height: "100%",
            width: "100%",
            menubar: true,
            image_title: true,
            automatic_uploads: true,
            file_picker_types: "image",
            file_picker_callback: filePickerCallback,
            plugins: [
              "contextmenu",
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
              "help",
              "wordcount",
            ],
            contextmenu:
              "paste | link image inserttable | cell row column deletetable",
            toolbar:
              "undo redo | formatselect | blocks | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help | link | image",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
      </div>
      <section className="w-full border-t border-black py-3">
        <FileTrigger
          allowsMultiple
          onSelect={(e) => {
            if (!e) return null;

            const files: FileList = e;
            Array.from(files).forEach((file) => {
              const url = URL.createObjectURL(file);
              const reader = new FileReader();

              setFiles((prev) => {
                return [...prev, { file: file, url: url }];
              });

              reader.readAsDataURL(file);
            });
          }}
        >
          <Button
            type="button"
            className="rounded-md bg-[var(--secondary-yellow)] px-3 py-3 font-semibold shadow-md"
          >
            อัพโหลดไฟล์
          </Button>
        </FileTrigger>
        <section className="mt-5 grid grid-cols-3 gap-2 2xl:grid-cols-4">
          {...files.map((file) => {
            return (
              <FileOnNews
                file={file}
                key={file.url}
                handleDeleteFile={handleDeleteFile}
              />
            );
          })}
        </section>
      </section>
      <Button
        type="submit"
        className="w-40 rounded-md bg-main-color px-3 py-3 font-semibold
     text-white shadow-md transition duration-100 hover:drop-shadow-lg active:scale-105"
      >
        อัพเดท
      </Button>
    </Form>
  );
}

export default UpdateNews;
