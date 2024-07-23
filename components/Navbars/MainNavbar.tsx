import React from "react";
import LogoFile from "../LogoFile";
import Link from "next/link";
import { PiUserCirclePlus } from "react-icons/pi";
import { PiUserCircleFill } from "react-icons/pi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "../../models";
import Image from "next/image";
import { IoIosArrowDropdown, IoIosArrowDropdownCircle } from "react-icons/io";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { Fragment } from "react";
import { MdAccountCircle, MdAdminPanelSettings } from "react-icons/md";
import { GoSignOut } from "react-icons/go";
import { useRouter } from "next-nprogress-bar";
import Cookies from "js-cookie";
import { GetUserService } from "../../services/user";
import { IoDocumentTextSharp, IoMenu } from "react-icons/io5";
import { useRouter as NextUseRouter } from "next/router";
import { GrContact, GrHome, GrServices } from "react-icons/gr";
import PopoverElement from "../Popover";
import { FaBook, FaDownload } from "react-icons/fa";
import { HiNewspaper } from "react-icons/hi";
import { BsAward, BsBook, BsPeople } from "react-icons/bs";
import { FaServicestack, FaVideo } from "react-icons/fa6";

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
      className="sticky top-0 z-30 flex min-h-16 w-full items-center  justify-between bg-white p-2 font-Anuphan 
    font-semibold text-[var(--primary-blue)] text-main-color drop-shadow-md"
    >
      {/* Logo */}

      <Link href="/" className="ml-3 w-[5rem] md:ml-10 md:w-[6.25rem]">
        <LogoFile />
      </Link>
      <div className=" w-11/12 overflow-auto px-2   py-1">
        <div className="flex w-max min-w-full items-center justify-end gap-3 ">
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

          <PopoverElement icon={<GrHome />} title="หน้าหลัก" url="/" />

          <PopoverElement
            icon={<BsPeople />}
            title="เกี่ยวกับ TLO"
            url="/about-us"
          />

          <PopoverElement
            icon={<BsBook />}
            title="ความรู้ด้านทรัพย์สินทางปัญญา"
            lists={[
              {
                title: "สื่อวิดีโองานทรัพย์สินทางปัญญา",
                url: "/dashboard",
                icon: <FaVideo />,
              },
              {
                title: "ลิขสิทธิ์",
                url: "/dashboard",
              },
              {
                title: "สิทธิบัตรการประดิษฐ์/อนุสิทธิบัตร",
                url: "/news",
              },
              {
                title: "สิทธิบัตรการออกแบบผลิตภัณฑ์",
                url: "/news",
              },
              {
                title: "เครื่องหมายการค้า",
                url: "/news",
              },
              {
                title: "สิ่งบ่งชี้ทางภูมิศาสตร์",
                url: "/news",
              },
            ]}
          />
          <PopoverElement
            icon={<GrServices />}
            title="บริการของเรา"
            lists={[
              {
                title: "ยื่นคำขอ",
                url: "/dashboard",
                icon: <IoDocumentTextSharp />,
              },
              {
                title: "ผลงานทรัพย์สินทางปัญญา",
                url: "/awards",
                icon: <BsAward />,
              },
              {
                title: "ดาวน์โหลดเอกสาร",
                url: "/dashboard",
                icon: <FaDownload />,
              },
              {
                title: "ข่าวสาร",
                url: "/news",
                icon: <HiNewspaper />,
              },
            ]}
          />
          <Link
            href={""}
            className="flex items-center gap-1 duration-300 hover:text-[#2166DD] md:gap-2"
          >
            <GrContact />
            <p className="text-[0.8rem] md:text-base">ติดต่อเรา</p>
          </Link>
          {/* Links */}
          {user.data ? (
            <Popover>
              {({ open }) => (
                <>
                  <PopoverButton
                    className="flex h-10 w-20 items-center justify-center gap-2 rounded-md p-2 text-lg text-main-color
                  ring-1 ring-main-color transition duration-150 hover:bg-main-color
                   hover:text-white md:w-60"
                  >
                    <div className="relative h-6 w-6 overflow-hidden rounded-full md:h-7 md:w-7">
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
                  </PopoverButton>

                  <PopoverPanel
                    anchor={{
                      to: "bottom start",
                      gap: 20,
                    }}
                    className="z-50 w-60   divide-y divide-white/5 rounded-md bg-white p-5  
          text-sm/6 ring-1 ring-main-color drop-shadow-md transition duration-200 ease-in-out
           data-[closed]:-translate-y-1 data-[closed]:opacity-0"
                  >
                    <ul>
                      <li>
                        <Link
                          href="/account/setting"
                          className="flex cursor-pointer items-center justify-start gap-2 
                    rounded-md p-2 font-Anuphan text-base text-main-color  no-underline
                     transition duration-150 hover:bg-slate-200  "
                        >
                          <MdAccountCircle />
                          ตั้งค่าบัญชี
                        </Link>
                      </li>

                      <li
                        onClick={handleSignOut}
                        className="flex cursor-pointer items-center 
                    justify-start gap-2 rounded-md p-2 font-Anuphan text-base text-main-color
                     transition duration-150 hover:bg-slate-200  "
                      >
                        <GoSignOut />
                        ออกจากระบบ
                      </li>
                    </ul>
                  </PopoverPanel>
                </>
              )}
            </Popover>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
