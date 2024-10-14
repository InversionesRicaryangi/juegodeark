import "@/styles/style.scss";
import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { API_KYE_THIRDWEB, RED } from "@/constants/contratos";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider clientId={API_KYE_THIRDWEB} activeChain={RED}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}
