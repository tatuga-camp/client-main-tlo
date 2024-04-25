import Image from "next/image";
import Link from "next/link";
import React from "react";

type CardInformationProps = {
  index: number;
  title: string;
  date: string;
  info: string;
  image: string;
};

const CardInformation = ({
  index,
  title,
  date,
  info,
  image,
}: CardInformationProps) => {
  const isOdd = index % 2 !== 0;
  return (
    <div
      className={`flex h-[16rem] md:h-[28rem]  ${
        isOdd ? "flex-row-reverse" : "flex-row"
      } w-screen items-center justify-start md:w-full  `}
    >
      <div className="relative h-full  w-full">
        <Image
          src={image}
          fill
          className="object-cover"
          alt={`picture of ${image}`}
        />
      </div>

      <div className="flex h-full w-11/12 flex-col items-start justify-center gap-3 bg-[var(--primary-blue)] p-6 text-start text-white md:w-10/12 md:gap-5 md:px-16">
        <h2 className="text-[0.9rem] font-bold md:text-3xl">{title}</h2>
        <p className="text-[0.6rem] md:text-base">{date}</p>
        <p className="text-[0.6rem] md:text-base">{info}</p>

        <button className="bg-[var(--secondary-yellow)] px-3 py-1 text-xs font-semibold text-[var(--primary-blue)] drop-shadow-md duration-300 hover:scale-110 hover:bg-yellow-500 md:px-4 md:py-2 md:text-base">
          เพิ่มเติม
        </button>
      </div>
    </div>
  );
};

export default CardInformation;
