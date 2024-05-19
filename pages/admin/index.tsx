import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";
import { GetUserService } from "../../services/user";
import AdminLayout from "../../layouts/adminLayout";
import RequestSummary from "../../components/Tables/requestSummary";
import { User } from "../../models";

function Index({ user }: { user: User }) {
  return (
    <AdminLayout>
      <div className="flex min-h-screen flex-col items-center">
        <main className="w-10/12">
          <RequestSummary user={user} />
        </main>
      </div>
    </AdminLayout>
  );
}

export default Index;
export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext,
) => {
  try {
    const user = await GetUserService({
      type: "SERVER-SIDE",
      context: ctx,
    });
    if (user.role !== "ADMIN") {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    return {
      props: {
        user,
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
