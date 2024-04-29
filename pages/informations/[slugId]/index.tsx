import { useRouter } from "next/router";
import React from "react";
import fakeInformations from "@/data/fakeInformation";
import HomeLayout from "@/layouts/homepageLayout";
import Head from "next/head";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Navigation } from "swiper/modules";
import { FaSquareFacebook } from "react-icons/fa6";
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

const Index = () => {
  const router = useRouter();
  const { slugId } = router.query;

  const information = fakeInformations.find((info) => info.slugId === slugId);

  if (!information) {
    return <div>No information found for the specified ID.</div>;
  }

  let url = "hehe";
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <title>{information.title}</title>
      </Head>
      <HomeLayout>
        <div className="flex h-full w-full flex-col items-center bg-[rgb(244,248,255)] pb-10 font-Anuphan text-[var(--primary-blue)] lg:justify-center ">
          <div className="my-20 mt-[8rem] flex w-[75%] flex-col items-center gap-5">
            <div className="flex w-[85%] flex-col justify-start gap-5 md:w-[75%]">
              <h1 className="text-start text-2xl font-bold md:text-3xl">
                {information.title}
              </h1>
              <section className="flex w-[80%] items-center gap-3 font-semibold md:w-[70%]">
                <p className="mr-6">{information.date}</p>
                <FacebookShareButton url={"shareUrl"}>
                  <FacebookIcon size={30} round={true} />
                </FacebookShareButton>
                <p className="text-base text-[var(--primary-blue)] duration-200 group-hover:text-blue-400">
                  Share
                </p>
              </section>
            </div>

            {/* Images */}

            <div className="my-5 flex w-full justify-center md:my-10 ">
              <Swiper
                slidesPerView={1}
                spaceBetween={30}
                modules={[Navigation]}
                navigation={true}
                className=" w-[90%]  md:w-[80%]"
              >
                {information.image.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className=" flex h-[10rem] justify-center   md:h-[23rem] md:w-full">
                      <div className="relative h-full w-[40rem] ">
                        <Image
                          src={image}
                          fill
                          className="overflow-hidden object-cover"
                          alt={`Image ${index + 1}`}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Description */}
            <div className="w-[90%] text-xs md:w-[78%] md:text-base">
              <p>{information.discription}</p>
            </div>
          </div>
        </div>
      </HomeLayout>
    </>
  );
};

export default Index;
