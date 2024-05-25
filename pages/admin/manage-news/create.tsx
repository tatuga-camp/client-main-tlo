import React from "react";
import CreateNews from "../../../components/Forms/News/createNews";
import Head from "next/head";
import AdminLayout from "../../../layouts/adminLayout";

function Create() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <title>สร้างข่าวประชาสัมพันธ์</title>
      </Head>
      <AdminLayout>
        <main className="flex w-full justify-center py-20">
          <CreateNews />
        </main>
      </AdminLayout>
    </>
  );
}

export default Create;
