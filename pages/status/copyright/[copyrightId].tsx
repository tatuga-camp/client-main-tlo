import { useRouter } from "next/router";
import React from "react";
import HomeLayout from "../../../layouts/homepageLayout";
import Head from "next/head";
import CopyrightStatus from "../../../components/Status/copyrightStatus";

function Index() {
  const router = useRouter();
  return (
    <HomeLayout>
      <>
        <Head>
          <title>ตรวจสอบสถานะ คำขอรับสิทธิบัตรการออกแบบผลิตภัณฑ์</title>
        </Head>
        <main className="font-Anuphan">
          {router.isReady && router.query.copyrightId ? (
            <CopyrightStatus copyrightId={router.query.copyrightId as string} />
          ) : (
            <div></div>
          )}
        </main>
      </>
    </HomeLayout>
  );
}

export default Index;
