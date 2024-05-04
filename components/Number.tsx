import React from "react";

interface NumberProps {
  number: number;
}

const Number: React.FC<NumberProps> = ({ number }) => {
  return (
    <div className="flex h-[1.5rem] w-[1.5rem]  items-center justify-center rounded-full border-[1px] border-solid border-[#10316B] bg-[#BED6FF] p-2 text-[0.8rem] text-[#10316B] md:h-[2rem] md:w-[2rem] md:text-base">
      <p>{number}</p>
    </div>
  );
};

export default Number;
