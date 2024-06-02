import React from "react";
import LogoFile from "./LogoFile";
import { useRouter } from "next/router";
import Link from "next/link";

const menuSidebars = [
  {
    title: "ทรัพย์สินทางปัญญาที่ยื่นจด",
    link: "/admin",
  },
  {
    title: "ข่าวประชาสัมพันธ์",
    link: "/admin/manage-news",
  },
  {
    title: "คลังความรู้",
    link: "/admin/manage-knowledge",
  },
  {
    title: "หน้าหลัก",
    link: "/",
  },
];

type SidebarProps = {
  setTriggerSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};
function Sidebar({ setTriggerSidebar }: SidebarProps) {
  const router = useRouter();
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-40 flex h-screen w-screen justify-start font-Anuphan">
      <main className="flex h-screen w-72 flex-col items-center justify-start gap-5 bg-white p-5 px-1 drop-shadow-md">
        <Link
          href="/"
          className="ml-3 mt-20 flex w-[5rem] items-center justify-center  md:w-40  "
        >
          <LogoFile />
        </Link>
        <ul className="mt-5 flex w-full flex-col gap-5">
          {menuSidebars.map((menu, index) => (
            <Link
              href={menu.link}
              key={index}
              className={`
              ${router.pathname === menu.link ? "bg-blue-100" : "bg-white"}
              duration-50 group relative w-full py-2 text-center text-lg font-semibold 
               hover:bg-blue-100`}
            >
              <p className="cursor-pointer  duration-300   hover:text-main-color">
                {menu.title}
              </p>
              <div
                className={`absolute bottom-0 right-0 top-0 m-auto h-full w-2
               bg-main-color opacity-0  group-hover:opacity-100 ${router.pathname === menu.link ? "opacity-100" : "opacity-0"} `}
              ></div>
            </Link>
          ))}
        </ul>
      </main>
      <footer
        onClick={() => setTriggerSidebar((prev) => !prev)}
        className="fixed bottom-0 left-0 right-0 top-0 -z-10  h-screen w-screen bg-black/10 backdrop-blur-lg"
      ></footer>
    </div>
  );
}

export default Sidebar;
