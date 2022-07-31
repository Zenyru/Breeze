import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import nProgress from "nprogress";
import "nprogress/nprogress.css";
import Router from "next/router";

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <NextUIProvider>
      <SessionProvider session={session}>
        <Head>
          <title>Breeze - Best way to keep records of the books you read</title>
          <meta
            name="description"
            content="Breeze is your assistant to manage and keep records of the books you read"
          />
          <link
            rel="icon"
            href="../../images/favicon.ico"
            type="image/x-icon"
          />
        </Head>
        <Component {...pageProps} />
        <ToastContainer
          className="toast-container"
          hideProgressBar={true}
          autoClose={3000}
        />
      </SessionProvider>
    </NextUIProvider>
  );
}
