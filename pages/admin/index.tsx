import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";
import { GetUserService } from "../../services/user";
import AdminLayout from "../../layouts/adminLayout";
import RequestSummary from "../../components/Tables/requestSummary";
import { User } from "../../models";
import SummaryData from "@/components/Tables/SummaryData";

function Index({ user }: { user: User }) {
  return (
    <AdminLayout>
      <div className="font-Anuphan">
        <main className="flex w-full flex-col items-center justify-center ">
          <SummaryData />
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
