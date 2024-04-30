import React, { useState } from "react";
import HomeLayout from "../../layouts/homepageLayout";
import { User } from "../../models";
import { useQuery } from "@tanstack/react-query";
import { GetUserService } from "../../services/user";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import BasicInformation from "../../components/Forms/Accounts/BasicInformation";
import UpdateEmail from "../../components/Forms/Accounts/UpdateEmail";
import ChangePassword from "../../components/Forms/Accounts/ChangePassword";
import Head from "next/head";

const menuAccountSetting = [
  {
    name: "ข้อมูลส่วนตัว",
  },
  {
    name: "เปลี่ยนรหัสผ่าน",
  },
  {
    name: "เปลี่ยน E-mail",
  },
] as const;
function Setting({ userServer }: { userServer: User }) {
  const [selectMenu, setSelectMenu] = useState<
    "ข้อมูลส่วนตัว" | "เปลี่ยนรหัสผ่าน" | "เปลี่ยน E-mail"
  >("ข้อมูลส่วนตัว");
  const user = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      GetUserService({
        type: "CLIENT-SIDE",
      }),
    initialData: userServer,
  });

  return (
    <HomeLayout>
      <Head>
        <title>ตั้งค่าโปรไฟล์</title>
      </Head>
      <div className=" flex min-h-screen flex-col items-center gap-5 bg-background-color pb-5 pt-10  font-Anuphan">
        <header className="flex w-full flex-col items-center">
          <section
            className="flex w-10/12 justify-between bg-second-color px-2 py-1 font-semibold text-main-color
           drop-shadow-md"
          >
            <h2 className="text-base md:text-xl">ตั้งค่าโปรไฟล์</h2>
            <h2 className="text-sm md:text-lg">
              บุคลากรมหาวิทยาลัยราชภัฏนครราชสีมา
            </h2>
          </section>
        </header>
        <main className="flex w-full flex-col items-center justify-center gap-3 px-5 md:flex-row md:items-start">
          <section className="top-20 flex w-11/12 flex-col bg-white p-5 transition duration-200 hover:drop-shadow-md md:sticky md:w-60">
            <ul className="flex flex-col gap-5 font-semibold text-main-color">
              {menuAccountSetting.map((menu) => (
                <li key={menu.name}>
                  <button
                    onClick={() => setSelectMenu(menu.name)}
                    className={`${
                      selectMenu === menu.name
                        ? "bg-main-color text-white"
                        : "bg-white"
                    } w-full rounded-md p-3 transition duration-150`}
                  >
                    {menu.name}
                  </button>
                </li>
              ))}
            </ul>
          </section>
          {selectMenu === "ข้อมูลส่วนตัว" && <BasicInformation user={user} />}
          {selectMenu === "เปลี่ยนรหัสผ่าน" && <ChangePassword user={user} />}
          {selectMenu === "เปลี่ยน E-mail" && <UpdateEmail user={user} />}
        </main>
      </div>
    </HomeLayout>
  );
}

export default Setting;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext,
) => {
  try {
    const userServer = await GetUserService({
      type: "SERVER-SIDE",
      context: ctx,
    });
    return {
      props: {
        userServer,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        destination: "/auth/sign-in",
        permanent: false,
      },
    };
  }
};
