import React, { useEffect, useState } from "react";
import HomeLayout from "../../layouts/homepageLayout";
import Head from "next/head";

import { useQuery } from "@tanstack/react-query";
import { GetNewsByPageService } from "../../services/news/news";
import { LuSearch } from "react-icons/lu";
import { Pagination } from "@mui/material";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";

function Index() {
  const [page, setPage] = useState(1);
  const [searchField, setSearchField] = useState({
    delay: "",
    actual: "",
  });
  const awards = useQuery({
    queryKey: [
      "awards",
      { page: page, searchField: searchField.actual, isPublic: true },
    ],
    queryFn: () =>
      GetNewsByPageService({
        page: page,
        limit: 5,
        searchField: searchField.actual,
        type: "award",
        isPublic: true,
      }),
  });

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
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <meta
          property="og:title"
          content="งานทรัพย์สินทางปัญญา กองกิจการพิเศษ สำนักงานอธิการบดี
          มหาวิทยาลัยราชภัฏนครราชสีมา NRRU TLO"
        />
        <meta
          property="og:description"
          content="งานทรัพย์สินทางปัญญา กองกิจการพิเศษ สำนักงานอธิการบดี
          มหาวิทยาลัยราชภัฏนครราชสีมา NRRU TLO"
        />
        <meta
          property="og:image"
          content="https://storage.googleapis.com/production-nrru-tlo/public/thumbnail-nrru-tlo-main.png"
        />
        <meta
          property="og:image:secure_url"
          content="https://storage.googleapis.com/production-nrru-tlo/public/thumbnail-nrru-tlo-main.png"
        />
        <meta
          name="twitter:image:src"
          content="https://storage.googleapis.com/production-nrru-tlo/public/thumbnail-nrru-tlo-main.png"
        />
        <meta
          name="description"
          content="ผลงานทรัพย์สินทางปัญญา | งานทรัพย์สินทางปัญญา กองกิจการพิเศษ สำนักงานอธิการบดี"
        />
        <title>
          ผลงานทรัพย์สินทางปัญญา | งานทรัพย์สินทางปัญญา กองกิจการพิเศษ
          สำนักงานอธิการบดี
        </title>
      </Head>
      <HomeLayout>
        {/* Header */}
        <header
          className=" flex   w-full flex-col items-center justify-center 
        gap-5 bg-[url('/picture/HomeHeader.png')] text-white md:h-[27rem] lg:h-[34.5rem]"
        >
          <div className="flex w-8/12 flex-col gap-5 text-center">
            <h1 className=" uppercase  text-[var(--secondary-yellow)]  md:text-2xl lg:text-4xl">
              ผลงานทรัพย์สินทางปัญญา
            </h1>
            <h2 className="text-lg">
              มหาวิทยาลัยราชภัฏนครราชสีมา พร้อมถ่ายทอดเทคโนโลยี
              ให้ผู้ประกอบการไปใช้ประโยชน์เชิงพาณิชย์  เพื่อผลิตและจำหน่าย
            </h2>
          </div>
        </header>
        <main className="mt-20 flex w-full flex-col items-center justify-start gap-5">
          <div className="flex w-10/12 items-center justify-center gap-2 md:w-96 md:gap-5">
            <div className=" text-base md:text-xl">
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
              placeholder="ค้นหา ผลงานทรัพย์สินทางปัญญา"
              className="w-full rounded-md border-[1.5px] border-solid border-[#BED6FF] p-3 pl-2 placeholder:font-medium placeholder:text-[#2166DD] 
             md:p-2 md:pl-10"
            />
          </div>
          <section className="grid w-full grid-cols-4 place-items-center gap-5 p-5">
            {awards.data?.data.map((award, index) => {
              const converImage = award.files.find(
                (file) => file.type === "image/jpeg",
              );

              return (
                <Link
                  href={`/awards/${award.id}`}
                  className="group flex h-80 min-w-80 flex-col  items-center overflow-hidden rounded-md bg-white ring-1 ring-blue-300 transition hover:scale-105 hover:drop-shadow-md"
                  key={index}
                >
                  <div className="relative h-52 w-full overflow-hidden rounded-t-md bg-[#BED6FF]">
                    <Image
                      src={converImage ? converImage.url : "/picture/award.jpg"}
                      fill
                      className="object-cover transition group-hover:scale-110"
                      alt={`picture of ${award.title}`}
                    />
                  </div>
                  <h1 className="mt-5 w-72 truncate font-Anuphan text-sm  text-main-color">
                    {award.title}
                  </h1>
                  <div className="mt-10 flex w-full justify-between  px-3 font-medium">
                    <p className="text-xs  text-blue-400">
                      {moment(award.releaseAt).format("DD/MM/YYYY HH:mm")}
                    </p>
                    <Link
                      href={`/awards/${award.id}`}
                      className="text-xs  text-blue-400 hover:underline"
                    >
                      อ่านต่อ
                    </Link>
                  </div>
                </Link>
              );
            })}
          </section>
          <Pagination
            page={page}
            onChange={(e, page) => setPage(page)}
            count={awards.data?.meta.total}
            color="primary"
          />
        </main>
      </HomeLayout>
      ;
    </>
  );
}

export default Index;
