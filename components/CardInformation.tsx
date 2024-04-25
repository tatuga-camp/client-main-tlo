import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type CardInformationProps = {
    index: number;
    title: string;
    date: string;
    info: string;
    image: string;
}

const CardInformation = ({index,title,date,info,image}: CardInformationProps) => {
    const isOdd = index % 2 !== 0;
  return (
    <div  className={`flex h-[16rem] md:h-[28rem]  ${
        isOdd ? "flex-row-reverse" : "flex-row"
      } w-screen md:w-full justify-start items-center  `}>
      
      <div className="w-full h-full  relative">
        <Image
        src={image}
        fill
        className="object-cover"
        alt={`picture of ${image}`}
        />
      </div>

      <div className='w-11/12 md:w-10/12 h-full bg-[var(--primary-blue)] text-white flex flex-col justify-center items-start text-start p-6 md:px-16 gap-3 md:gap-5'>
        <h2 className='text-[0.9rem] md:text-3xl font-bold'>{title}</h2>
        <p className='text-[0.6rem] md:text-base'>{date}</p>
        <p className='text-[0.6rem] md:text-base'>{info}</p>

        <button className='text-xs md:text-base bg-[var(--secondary-yellow)] px-3 py-1 md:px-4 md:py-2 drop-shadow-md hover:scale-110 duration-300 hover:bg-yellow-500 text-[var(--primary-blue)] font-semibold'>เพิ่มเติม</button>

      </div>
    </div>
  )
}

export default CardInformation
