import { useRouter } from "next/router";
import React from "react";
import HomeLayout from "../../../layouts/homepageLayout";
import Head from "next/head";
import TrademarkStatus from "../../../components/Status/trademarkStatus";

function Index() {
  const router = useRouter();
  return (
    <HomeLayout>
      <>
        <Head>
          <title>ตรวจสอบสถานะ คำขอจดทะเบียนเครื่องหมายการค้า</title>
        </Head>
        <main className="font-Anuphan">
          {router.isReady && router.query.trademarkId ? (
            <TrademarkStatus trademarkId={router.query.trademarkId as string} />
          ) : (
            <div></div>
          )}
        </main>
      </>
    </HomeLayout>
  );
}

export default Index;
