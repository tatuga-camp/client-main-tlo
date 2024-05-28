import React from "react";
import LogoFile from "../LogoFile";
import Link from "next/link";
import { PiUserCirclePlus } from "react-icons/pi";
import { PiUserCircleFill } from "react-icons/pi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "../../models";
import Image from "next/image";
import { IoIosArrowDropdown, IoIosArrowDropdownCircle } from "react-icons/io";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { MdAccountCircle, MdAdminPanelSettings } from "react-icons/md";
import { GoSignOut } from "react-icons/go";
import { useRouter } from "next-nprogress-bar";
import Cookies from "js-cookie";
import { GetUserService } from "../../services/user";
import { IoMenu } from "react-icons/io5";
import { useRouter as NextUseRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const nextRouter = NextUseRouter();
  const queryClient = useQueryClient();
  const access_token = Cookies.get("access_token");
  const user = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      GetUserService({
        type: "CLIENT-SIDE",
      }),
  });
  const handleSignOut = () => {
    Cookies.remove("access_token");
    queryClient.removeQueries();
    router.push("/");
  };

  return (
    <nav
      className="sticky top-0 z-30 flex  min-h-16 w-full items-center justify-between 
    bg-white p-2 font-Anuphan drop-shadow-md"
    >
      {/* Logo */}

      <Link href="/" className="ml-3 w-[5rem] md:ml-10 md:w-[6.25rem]">
        <LogoFile />
      </Link>

      {/* <button className="text-4xl text-main-color transition duration-100 hover:text-second-color active:scale-105">
          <IoMenu />
        </button> */}

      <div className="flex gap-2">
        {user.data && user.data.role === "ADMIN" && (
          <Link
            href={"/admin"}
            className="flex w-20 items-center justify-center gap-2 rounded-md p-2 text-lg text-main-color
         ring-1 ring-main-color transition duration-150 hover:bg-main-color
          hover:text-white md:w-40"
          >
            <MdAdminPanelSettings />
            <span className="hidden md:block">ผู้ดูแลระบบ</span>
          </Link>
        )}
        {/* Links */}
        {user.data ? (
          <Popover>
            {({ open }) => (
              <>
                <Popover.Button
                  className="group mr-3 flex items-center
               gap-1 rounded-lg  p-2 font-Anuphan  text-base font-semibold text-[var(--primary-blue)] text-main-color
                ring-main-color hover:ring-1 md:mr-10 md:gap-3 md:text-xl"
                >
                  <div className="relative h-6 w-6 overflow-hidden rounded-full md:h-10 md:w-10">
                    <Image
                      src={user.data.picture}
                      alt="profile picture"
                      fill
                      className=" object-cover"
                    />
                  </div>
                  <div className="flex max-w-20 items-center  gap-2 truncate  text-base md:max-w-96">
                    <span className="hidden md:block">{user.data.title}</span>
                    <span>{user.data.firstName}</span>
                    <span className="truncate">{user.data.lastName}</span>
                  </div>
                  <IoIosArrowDropdown className="block group-hover:hidden" />
                  <IoIosArrowDropdownCircle className="hidden group-hover:block" />
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute right-10 top-[4.5rem] w-60 rounded-md bg-white p-5 ring-1 ring-main-color drop-shadow-md">
                    <ul>
                      <li>
                        <Link
                          href="/account/setting"
                          className="flex cursor-pointer items-center justify-start gap-2 
                    rounded-md p-2 text-xl  no-underline
                     transition duration-150 hover:bg-slate-200  "
                        >
                          <MdAccountCircle />
                          ตั้งค่าบัญชี
                        </Link>
                      </li>

                      <li
                        onClick={handleSignOut}
                        className="flex cursor-pointer items-center 
                    justify-start gap-2 rounded-md p-2 text-xl
                     transition duration-150 hover:bg-slate-200  "
                      >
                        <GoSignOut />
                        ออกจากระบบ
                      </li>
                    </ul>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        ) : (
          <div className="mr-3 flex gap-4 text-base font-semibold text-[var(--primary-blue)] md:mr-10 md:gap-6 md:text-xl">
            <Link
              href={"/auth/sign-in"}
              className="flex items-center gap-1 duration-300 hover:text-[#2166DD] md:gap-2 "
            >
              {" "}
              <PiUserCircleFill />
              <p className="text-[0.8rem] md:text-base">เข้าสู่ระบบ</p>
            </Link>
            <Link
              href={"/auth/sign-up"}
              className="flex items-center gap-1 duration-300 hover:text-[#2166DD] md:gap-2"
            >
              {" "}
              <PiUserCirclePlus />{" "}
              <p className="text-[0.8rem] md:text-base">ลงทะเบียน</p>
            </Link>
            <Link
              href={""}
              className="flex items-center gap-1 duration-300 hover:text-[#2166DD] md:gap-2"
            >
              {" "}
              <p className="text-[0.8rem] md:text-base">ติดต่อเรา</p>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
