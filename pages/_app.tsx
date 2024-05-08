import "@/styles/globals.css";
import "primereact/resources/themes/bootstrap4-light-purple/theme.css";
import { PrimeReactProvider, addLocale } from "primereact/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import { useState } from "react";
import { PagesProgressBar as ProgressBar } from "next-nprogress-bar";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 60, // 1 hour in ms
            refetchOnMount: false, // Disables automatic refetching when component is mounted.removed
            refetchOnWindowFocus: false, // Disables automatic refetching when browser window is focused.
          },
        },
      }),
  );

  addLocale("th", {
    firstDayOfWeek: 1,
    dayNames: [
      "อาทิตย์",
      "จันทร์",
      "อังคาร",
      "พุธ",
      "พฤหัสบดี",
      "ศุกร์",
      "เสาร์",
    ],
    dayNamesShort: ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."],
    dayNamesMin: ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"],
    monthNames: [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ],
    monthNamesShort: [
      "ม.ค.",
      "ก.พ.",
      "มี.ค.",
      "เม.ย.",
      "พ.ค.",
      "มิ.ย.",
      "ก.ค.",
      "ส.ค.",
      "ก.ย.",
      "ต.ค.",
      "พ.ย.",
      "ธ.ค.",
    ],
    today: "วันนี้",
    clear: "ล้าง",
  });
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ProgressBar
          height="4px"
          color="#10316B"
          options={{ showSpinner: false }}
          shallowRouting
        />
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
}
