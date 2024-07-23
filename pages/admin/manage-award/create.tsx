import React from "react";
import Head from "next/head";
import AdminLayout from "../../../layouts/adminLayout";
import CreateAward from "../../../components/Forms/Award/createAward";

function Create() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <title>สร้างผลงานทรัพย์สินทางปัญญา</title>
      </Head>
      <AdminLayout>
        <main className="flex w-full justify-center py-20">
          <CreateAward />
        </main>
      </AdminLayout>
    </>
  );
}

export default Create;
