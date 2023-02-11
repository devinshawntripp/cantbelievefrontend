// import "@/styles/globals.css";
// import "@/styles/Menu.css";
// import "@/styles/AmazonItem.css";
// import "@/styles/popup.css";
// import "@/styles/Blog.css";
// import "@/styles/forms.css";
// import "@/styles/Home.css";
// import "@/styles/Login.css";
// import "@/styles/Register.css";
// import "@/styles/Footer.css";
// import "@/styles/About.css";
import "react-toastify/scss/main.scss";
import "../../public/assets/css/ScssStyles.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { store } from "../store/store";
import { Provider } from "react-redux";
import AppWrapper from "./AppWrapper";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Theme from "../Components/Theme";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();
  // useEffect(() => {
  //   const handleRouteChange = (url: any) => {
  //     if (typeof window !== "undefined") {
  //       (window as any).gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
  //         page_path: url,
  //       });
  //     }
  //   };
  //   router.events.on("routeChangeComplete", handleRouteChange);
  //   return () => {
  //     router.events.off("routeChangeComplete", handleRouteChange);
  //   };
  // }, [router.events]);
  return (
    <Provider store={store}>
      <Theme>
        <GoogleOAuthProvider clientId="171120276082-puk81l0iku6vp1amdfhu19l45snf3lg4.apps.googleusercontent.com">
          <AppWrapper>
            <Component {...pageProps} />
          </AppWrapper>
        </GoogleOAuthProvider>
      </Theme>
    </Provider>
  );
}
