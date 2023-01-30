import type { AppProps } from "next/app";
import { Children, useEffect } from "react";
import { useRouter } from "next/router";
import Menu from "@/Components/Menu";
import { useDispatch } from "react-redux";
import Axios from "axios";
import { loadAppData } from "../store/slices/app-slice";
// import { BrowserRouter as Router, Route, Link, Routes } from "next/router";
// import Link from "next/link";
// import { Home } from "./Home";
// import AboutPage from "./About";
// import ContactPage from "./Contact";
// import Login from "./Login";
// import Register from "./Register";
// import AddProduct from "@/Components/AddProduct";
// import { Blog } from "./Blog";
import Footer from "@/Components/Footer";
const navigation = {
  brand: { name: "Why Are You Buying This?!", to: "/" },
  links: [
    { name: "About Me", to: "/About" },
    { name: "Blog", to: "/Blog" },
    { name: "Affiliate Link", to: "/AffiliateLink" },
    // { name: "Developement", to: "/dev" },
    // { name: "Graphic Design", to: "/design" },
    { name: "Contact", to: "/Contact" },
  ],
};

import Head from "next/head";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });
const gtag = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`;

export default function AppWrapper(props: {
  children?: React.ReactChild | React.ReactChild[];
}) {
  const { brand, links } = navigation;

  const dispatch = useDispatch();

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");

      if (token === null || token === "") {
        localStorage.setItem("auth-token", "");
        token = "";
      }

      const tokenResponse = await Axios.post(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/checkToken`,
        null,
        { headers: { "x-auth-token": token } }
      );

      if (tokenResponse.data) {
        const userRes = await Axios.get(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/loginwithjwt`,
          {
            headers: { "x-auth-token": token },
          }
        );
        // console.log(userRes.data.user);
        // console.log("HI THERE");

        dispatch(
          loadAppData({
            id: userRes.data.user._id,
            email: userRes.data.user.email,
            admin: userRes.data.user.admin,
            vouchers: userRes.data.user.vouchers,
            idsSaved: userRes.data.user.idsSaved,
          })
        );
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <>
      <Head>
        <title>Why Buy?</title>
        <meta
          name="description"
          content="Why are you buying this is an application that shows you affiliate links to amazon.com"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/whyareyoubuyingthislogo.png" />

        <script async src={gtag}></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  page_path: window.location.pathname,
                });
              `,
          }}
        />
      </Head>
      <Menu brand={brand} links={links} />
      {props.children}
      <Footer />
      {/* <Link href="/"></Link> */}
      {/* <Home /> */}
      {/* <Footer /> */}

      {/* <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<AboutPage />} />
          <Route path="/Contact" element={<ContactPage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/AddProduct" element={<AddProduct />} />
          <Route path="/Blog" element={<Blog />} />
        </Routes>
      </Router> */}
    </>
  );
}
