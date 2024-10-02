import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";

// choose a better font
const inter = Inter({
  weight: "400",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </>
  );
}
