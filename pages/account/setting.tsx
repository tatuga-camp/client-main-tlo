import React, { useState } from "react";
import HomeLayout from "../../layouts/homepageLayout";
import { User } from "../../models";
import { useQuery } from "@tanstack/react-query";
import { GetUserService } from "../../services/user";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import BasicInformation from "../../components/Forms/Accounts/BasicInformation";

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
  const [selectMenu, setSelectMenu] = useState<string>("ข้อมูลส่วนตัว");
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
      <div className=" bg-background-color flex min-h-screen flex-col items-center gap-5 pb-5 pt-10  font-Anuphan">
        <header className="flex w-full flex-col items-center">
          <section
            className="bg-second-color flex w-10/12 justify-between px-2 py-1 font-semibold text-main-color
           drop-shadow-md"
          >
            <h2 className="text-xl">ตั้งค่าโปรไฟล์</h2>
            <h2 className="text-lg">บุคลากรมหาวิทยาลัยราชภัฏนครราชสีมา</h2>
          </section>
        </header>
        <main className="flex w-full items-start justify-center gap-3 px-5">
          <section className="sticky top-20 flex w-60 flex-col bg-white p-5 transition duration-200 hover:drop-shadow-md">
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
