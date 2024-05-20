import { useRouter } from "next/router";
import React from "react";
import HomeLayout from "../../../layouts/homepageLayout";
import DesignStatus from "../../../components/Status/designStatus";
import Head from "next/head";

function Index() {
  const router = useRouter();
  return (
    <HomeLayout>
      <>
        <Head>
          <title>ตรวจสอบสถานะ คำขอรับสิทธิบัตรการออกแบบผลิตภัณฑ์</title>
        </Head>
        <main className="font-Anuphan">
          {router.isReady && router.query.designId ? (
            <DesignStatus designId={router.query.designId as string} />
          ) : (
            <div></div>
          )}
        </main>
      </>
    </HomeLayout>
  );
}

export default Index;
