import React from "react";
import HomeLayout from "../../../layouts/homepageLayout";
import Head from "next/head";
import { useRouter } from "next/router";
import InventionStatus from "../../../components/Status/InventionStatus";

function Index() {
  const router = useRouter();
  return (
    <HomeLayout>
      <>
        <Head>
          <title>ตรวจสอบสถานะ คำขอรับสิทธิบัตรการประดิษฐ์/อนุสิทธิบัตร</title>
        </Head>
        <main className="font-Anuphan">
          {router.isReady && router.query.inventionId ? (
            <InventionStatus inventionId={router.query.inventionId as string} />
          ) : (
            <div></div>
          )}
        </main>
      </>
    </HomeLayout>
  );
}

export default Index;
