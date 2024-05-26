import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import {
  GetNewsByIdService,
  ResponseGetNewsByIdService,
} from "../../services/news/news";
import HomeLayout from "../../layouts/homepageLayout";
import moment from "moment";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import parse from "html-react-parser";
import FileOnNews from "../../components/Forms/News/FileOnNews";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
} from "react-share";
import { useRouter } from "next/router";
function Index({ news }: { news: ResponseGetNewsByIdService }) {
  const [fullUrl, setFullUrl] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentUrl = window.location.href;
      setFullUrl(currentUrl);
    }
  }, [router.isReady]);
  return (
    <HomeLayout>
      <div
        className="flex h-full w-full flex-col items-center bg-[#F4F8FF] 
        pb-10 font-Anuphan text-[var(--primary-blue)] lg:justify-center"
      >
        <main className="flex w-9/12 flex-col items-center justify-between rounded-md border-[1px] border-solid bg-white p-6 py-8">
          <div className="flex w-[90%] flex-col gap-3 ">
            <section className="flex w-[80%] items-center gap-3 font-semibold md:w-[70%]">
              <FacebookShareButton url={fullUrl}>
                <FacebookIcon size={30} round={true} />
              </FacebookShareButton>
              <p className="text-base text-[var(--primary-blue)] duration-200 group-hover:text-blue-400">
                Share
              </p>
            </section>
            <h1 className="mt-10 text-start font-bold md:text-xl ">
              {news.title}
            </h1>
            <p className="text-xs md:text-base">
              {moment(news.releaseAt).format("DD/MM/YYYY HH:mm")}{" "}
              <span className="font-semibold">
                เผยแพร่ โดย {news.user.firstName} {news.user.lastName}
              </span>
            </p>
          </div>
          {news.files.filter((file) => file.type === "image/jpeg").length >
            0 && (
            <div className="my-5 flex w-full justify-center md:my-10 ">
              <Swiper
                slidesPerView={1}
                spaceBetween={30}
                modules={[Navigation]}
                navigation={true}
                className=" w-[90%]  md:w-[80%]"
              >
                {news.files
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
          {news.content && (
            <div className="mb-10 w-[90%] ">{parse(news.content)}</div>
          )}
          <section className="grid w-full grid-cols-4 gap-5">
            {news.files.map((file) => {
              return <FileOnNews file={file} key={file.id} />;
            })}
          </section>
        </main>
      </div>
    </HomeLayout>
  );
}

export default Index;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { newsId } = ctx.query;

    const news = await GetNewsByIdService({
      newsId: newsId as string,
    });

    return {
      props: {
        news,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};
