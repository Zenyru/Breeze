import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Breeze - Best way to keep records of the books you read</title>
        <meta
          name="description"
          content="Breeze is your assistant to manage and keep records of the books you read"
        />
        <link rel="icon" href="../../images/favicon.ico" type="image/x-icon" />
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
