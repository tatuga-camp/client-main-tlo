import React from "react";
import HomeLayout from "../../../layouts/homepageLayout";
import Head from "next/head";

function Index() {
  return (
    <HomeLayout>
      <>
        <Head>
          <title>ตรวจสอบสถานะ คำขอรับสิทธิบัตรการประดิษฐ์/อนุสิทธิบัตร</title>
        </Head>
      </>
    </HomeLayout>
  );
}

export default Index;
