import React from "react";
import { FileOnNews, News } from "../../../models";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";
import parse from "html-react-parser";

type NewsCardProps = {
  news: News & {
    files: FileOnNews[];
  };
  index: number;
};
function NewsCard({ news, index }: NewsCardProps) {
  const isOdd = index % 2 !== 0;
  const converImage = news.files.find((file) => file.type === "image/jpeg");

  return (
    <div
      className={`flex h-[16rem] md:h-[28rem]  ${
        isOdd ? "flex-row-reverse" : "flex-row"
      } w-screen items-center justify-start md:w-full  `}
    >
      <div className="relative h-full  w-full">
        <Image
          src={converImage ? converImage.url : "/picture/Information1.png"}
          fill
          className="object-cover"
          alt={`picture of ${news.title}`}
        />
      </div>

      <div className="flex h-full w-11/12 flex-col items-start justify-center gap-3 bg-[var(--primary-blue)] p-6 text-start text-white md:w-10/12 md:gap-5 md:px-16">
        <h2 className="max-w-full truncate text-[0.9rem] font-bold md:text-3xl">
          {news.title}
        </h2>
        <p className="text-[0.6rem] md:text-base">
          {moment(news.releaseAt).format("DD/MM/YYYY : HH:mm")}
        </p>
        {news.content && (
          <p className=" line-clamp-3 md:line-clamp-6 ">
            {parse(news.content)}
          </p>
        )}

        <Link
          href={`/news/${news.id}`}
          className="bg-[var(--secondary-yellow)] px-3 py-1 text-xs font-semibold text-[var(--primary-blue)] drop-shadow-md duration-300 hover:scale-110 hover:bg-yellow-500 md:px-4 md:py-2 md:text-base"
        >
          เพิ่มเติม
        </Link>
      </div>
    </div>
  );
}

export default NewsCard;
