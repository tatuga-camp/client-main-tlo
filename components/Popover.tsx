import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import Link from "next/link";
import React from "react";
import { FaCaretDown } from "react-icons/fa";

type PopoverProps = {
  title: string;
  icon: React.ReactNode;
  url?: string;
  lists?: {
    title: string;
    description?: string;
    icon?: React.ReactNode;
    url: string;
  }[];
};
function PopoverElement({ title, lists, icon, url }: PopoverProps) {
  return (
    <>
      <Popover className=" font-Anuphan text-main-color">
        <PopoverButton className=" group flex items-center gap-1 outline-none">
          {url ? (
            <Link
              className="flex h-10 items-center gap-1 duration-300 hover:text-[#2166DD] md:gap-2"
              href={url}
            >
              {icon}
              {title}
            </Link>
          ) : (
            <div className="flex h-10 items-center gap-1 duration-300 hover:text-[#2166DD] md:gap-2">
              {icon}
              {title}
            </div>
          )}
          {lists && <FaCaretDown className="group-data-[open]:rotate-180" />}
        </PopoverButton>
        <PopoverPanel
          transition
          anchor={{
            to: "bottom start",
            gap: 20,
          }}
          className="z-50 w-max   divide-y divide-white/5 rounded-md bg-white p-5  
          text-sm/6 ring-1 ring-main-color drop-shadow-md transition duration-200 ease-in-out
           data-[closed]:-translate-y-1 data-[closed]:opacity-0"
        >
          <ul className="flex w-full flex-col items-start gap-2">
            {lists?.map((list, index) => {
              return (
                <li key={index} className="w-full">
                  <Link
                    href={list.url}
                    className="flex w-full cursor-pointer items-center justify-start gap-2 
                    rounded-md p-2 font-Anuphan text-base text-main-color  no-underline
                     transition duration-150 hover:bg-slate-200  "
                  >
                    {list.icon}
                    {list.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </PopoverPanel>
      </Popover>
    </>
  );
}

export default PopoverElement;
