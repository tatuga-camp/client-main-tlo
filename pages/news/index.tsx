import React, { useState } from "react";
import HomeLayout from "../../layouts/homepageLayout";
import Head from "next/head";
import { BsEnvelopePaper } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import NewsCard from "../../components/Forms/News/newsCard";
import NewsList from "../../components/Tables/newsList";
import { useQuery } from "@tanstack/react-query";
import { GetNewsByPageService } from "../../services/news/news";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";

function Index() {
  const [page, setPage] = useState(1);
  const news = useQuery({
    queryKey: ["news", { page: page }],
    queryFn: () =>
      GetNewsByPageService({
        limit: 3,
        page: 1,
        searchField: "",
        type: "news",
      }),
  });
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
          content="ข่าวสาร | งานทรัพย์สินทางปัญญา กองกิจการพิเศษ สำนักงานอธิการบดี"
        />
        <title>
          ข่าวสาร | งานทรัพย์สินทางปัญญา กองกิจการพิเศษ สำนักงานอธิการบดี
        </title>
      </Head>
      <HomeLayout>
        {" "}
        <div className="w-full">
          <div className="mt-12 flex w-full flex-col items-center gap-8 md:items-start ">
            <h1
              className="z-10 flex w-[85%] items-center justify-center gap-5 bg-[var(--secondary-yellow)]
               px-4 py-2 text-center font-semibold hover:drop-shadow-md md:justify-start md:pl-32 md:text-start md:text-xl"
            >
              <BsEnvelopePaper />
              ข่าวประชาสัมพันธ์
            </h1>

            {/* mobile (swiper) */}
            <div className="w-full bg-[var(--primary-blue)]  ">
              <Swiper
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                slidesPerView={1}
                pagination={true}
                modules={[Pagination, Autoplay]}
                spaceBetween={30}
              >
                {news.data?.data.map((list, index) => (
                  <SwiperSlide key={index}>
                    <NewsCard news={list} index={index} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <NewsList />
        </div>
      </HomeLayout>
      ;
    </>
  );
}

export default Index;
