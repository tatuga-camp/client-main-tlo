import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React, { useEffect, useState } from "react";
import { GetUserService } from "../../../services/user";
import AdminLayout from "../../../layouts/adminLayout";
import Head from "next/head";
import { IoIosCloseCircle } from "react-icons/io";
import { Pagination, Switch } from "@mui/material";
import { GoPencil } from "react-icons/go";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { IoCreate } from "react-icons/io5";
import CreateNews from "../../../components/Forms/News/createNews";
import Link from "next/link";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DeleteNewsService,
  GetNewsByPageService,
  ResponseGetNewsByPageService,
} from "../../../services/news/news";
import moment from "moment";
import parse from "html-react-parser";
import { LuSearch } from "react-icons/lu";
import Swal from "sweetalert2";
import { ErrorMessages } from "../../../models";
import FileOnNews from "../../../components/Forms/News/FileOnNews";

function ManageNews() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [searchField, setSearchField] = useState({
    delay: "",
    actual: "",
  });
  const news = useQuery({
    queryKey: ["news", { page: page, searchField: searchField.actual }],
    queryFn: () =>
      GetNewsByPageService({
        page: page,
        limit: 5,
        searchField: searchField.actual,
      }),
  });

  useEffect(() => {
    news.refetch();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      setSearchField((prev) => {
        return {
          ...prev,
          actual: prev.delay,
        };
      });
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchField]);

  const handleDeleteNews = async ({ newsId }: { newsId: string }) => {
    if (!news.data) {
      throw new Error("โปรดรอสักครู่ และลองใหม่อีกครั้ง");
    }
    const replacedText = "ยืนยันการลบข้อมูล";
    let content = document.createElement("div");
    content.innerHTML =
      "<div>กรุณาพิมพ์คำด้านล่าง </div> <strong>" +
      replacedText +
      "</strong> <div>เพื่อเป็นการยืนยันในการลบข้อมูล</div>";
    const { value } = await Swal.fire({
      title: "ยืนยันการลบข้อมูล",
      input: "text",
      footer:
        "ข้อมูลทั้งหมดที่เกี่ยวข้องกับข้อมูลนี้จะถูกลบออกทั้งหมด และไม่สามารถกู้คืนได้อีก",
      html: content,
      showCancelButton: true,
      inputValidator: (value) => {
        if (value !== replacedText) {
          return "คำที่พิมพ์ไม่ตรงกับคำที่ต้องการลบ กรุณาลองใหม่อีกครั้ง";
        }
      },
    });
    if (value) {
      try {
        Swal.fire({
          title: "กำลังดำเนินการลบข้อมูล",
          html: "กรุณารอสักครู่",
          allowEscapeKey: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        await DeleteNewsService({
          newsId: newsId,
        });

        const updateNews: ResponseGetNewsByPageService = {
          data: news.data?.data.filter((news) => news.id !== newsId),
          meta: news.data?.meta,
        };

        await queryClient.setQueryData(
          ["news", { page: page, searchField: searchField.actual }],
          updateNews,
        );

        Swal.fire({
          title: "ลบข้อมูลสำเร็จ",
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
        <div
          className="flex h-full w-full flex-col items-center bg-[#F4F8FF] 
        pb-10 font-Anuphan text-[var(--primary-blue)] lg:justify-center"
        >
          <header className="flex w-full flex-col items-center gap-10">
            <div
              className="mt-16 w-[70%]  bg-[var(--secondary-yellow)] p-2 
            text-center font-semibold "
            >
              ข่าวประชาสัมพันธ์
            </div>
            <Link
              href={"/admin/manage-news/create"}
              className="flex w-96 items-center justify-center gap-2 rounded-md
               bg-[#BED6FF] p-2 font-semibold drop-shadow-md
             transition  duration-100 hover:bg-[#87aced] active:scale-105 "
            >
              สร้างโพสต์ใหม่ <IoCreate />
            </Link>
          </header>

          <main className="mt-5 flex w-full flex-col items-center gap-5">
            <div className="flex w-6/12 items-center justify-center gap-2 md:gap-5">
              <div className="text-base md:text-xl">
                <LuSearch />
              </div>

              <input
                type="text"
                onChange={(e) => {
                  setSearchField((prev) => {
                    return {
                      ...prev,
                      delay: e.target.value,
                    };
                  });
                  setPage(() => 1);
                }}
                value={searchField.delay}
                placeholder="ค้นหาด้วยชื่อหรือเนื้อหาข่าว"
                className="w-full rounded-md border-[1.5px] border-solid border-[#BED6FF] p-3 pl-2 placeholder:font-medium placeholder:text-[#2166DD] 
                  md:p-2 md:pl-10"
              />
            </div>
            <Pagination
              page={page}
              onChange={(e, page) => setPage(page)}
              count={news.data?.meta.total || 1}
              color="primary"
            />
            {news.isLoading ? (
              <div>Loading...</div>
            ) : (
              news.data?.data.map((list) => {
                return (
                  <section
                    key={list.id}
                    className="flex w-9/12 flex-col items-center justify-between rounded-md border-[1px] border-solid bg-white p-6 py-8"
                  >
                    <section className="flex  w-[95%] flex-col justify-between md:flex-row md:items-center">
                      <div className="flex items-center gap-5">
                        {" "}
                        <Switch checked={list.isPublic} disabled />
                        <label className="font-semibold">เผยแพร่</label>
                      </div>
                      <div className=" ml-2 mt-5 flex flex-col gap-2 font-semibold text-[#6e98e199] md:ml-0 md:mt-0 md:flex-row md:items-center md:gap-5">
                        <Link
                          href={`/admin/manage-news/${list.id}`}
                          className="flex items-center gap-2 duration-200 hover:text-[#5372a7]"
                        >
                          <div className="text-xl">
                            <GoPencil />
                          </div>
                          <p>แก้ไขโพสต์</p>
                        </Link>
                        <button
                          onClick={() => handleDeleteNews({ newsId: list.id })}
                          className="flex items-center gap-2 duration-200 hover:text-[#5372a7]"
                        >
                          <div className="text-xl">
                            <IoIosCloseCircle />
                          </div>

                          <p>ลบโพสต์</p>
                        </button>
                      </div>
                    </section>
                    <div className="flex w-[90%] flex-col gap-3 ">
                      <h1 className="mt-10 text-start font-bold md:text-xl ">
                        {list.title}
                      </h1>
                      <p className="text-xs md:text-base">
                        {moment(list.releaseAt).format("DD/MM/YYYY HH:mm")}
                      </p>
                    </div>
                    {list.files.filter((file) => file.type === "image/jpeg")
                      .length > 0 && (
                      <div className="my-5 flex w-full justify-center md:my-10 ">
                        <Swiper
                          slidesPerView={1}
                          spaceBetween={30}
                          modules={[Navigation]}
                          navigation={true}
                          className=" w-[90%]  md:w-[80%]"
                        >
                          {list.files
                            .filter((file) => file.type === "image/jpeg")
                            .map((image, index) => (
                              <SwiperSlide key={index}>
                                <div className=" flex h-[10rem] justify-center   md:h-[23rem] md:w-full">
                                  <div className="relative h-full w-[35rem] ">
                                    <Image
                                      src={image.url}
                                      fill
                                      sizes="(max-width: 768px) 100vw, 33vw"
                                      className="overflow-hidden object-cover"
                                      alt={`Image ${index + 1}`}
                                    />
                                  </div>
                                </div>
                              </SwiperSlide>
                            ))}
                        </Swiper>
                      </div>
                    )}
                    {list.content && (
                      <p className="mb-10 w-[90%] ">{parse(list.content)}</p>
                    )}
                    <section className="grid w-full grid-cols-4 gap-5">
                      {list.files.map((file) => {
                        return <FileOnNews file={file} key={file.id} />;
                      })}
                    </section>
                  </section>
                );
              })
            )}
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
