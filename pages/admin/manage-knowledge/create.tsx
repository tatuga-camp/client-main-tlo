import React from "react";
import Head from "next/head";
import AdminLayout from "../../../layouts/adminLayout";
import CreateKnowledge from "../../../components/Forms/Knowledge/createKnowledge";

function Create() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <title>สร้างคลังความรู้</title>
      </Head>
      <AdminLayout>
        <main className="flex w-full justify-center py-20">
          <CreateKnowledge />
        </main>
      </AdminLayout>
    </>
  );
}

export default Create;
