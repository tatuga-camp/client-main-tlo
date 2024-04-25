import "@/styles/globals.css";
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
