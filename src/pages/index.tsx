import Head from "next/head";

import Home from "@/components/views/home/Home";

const home = () => {
  return (
    <>
      <Head>
        <title>Dark Age LegendS</title>
        <meta name="description" content="Dark Age LegendS" />
      </Head>

      <Home />
    </>
  );
};

export default home;
