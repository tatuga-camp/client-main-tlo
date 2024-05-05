import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";
import { GetUserService } from "../../services/user";
import AdminLayout from "../../layouts/adminLayout";

function Index() {
  return (
    <AdminLayout>
      <div className="min-h-screen"></div>
    </AdminLayout>
  );
}

export default Index;
export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext,
) => {
  try {
    const userServer = await GetUserService({
      type: "SERVER-SIDE",
      context: ctx,
    });
    if (userServer.role !== "ADMIN") {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
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
