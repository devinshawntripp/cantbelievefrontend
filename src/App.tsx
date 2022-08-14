import React, { Component, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Axios from "axios";
import AboutPage from "./Pages/About";
import Home from "./Pages/Home";
import ContactPage from "./Pages/Contact";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { loadAppData } from "./store/slices/app-slice";
import "reset-css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import Menu from "./Components/Menu";
import { useDispatch } from "react-redux";
import AddProduct from "./Components/AddProduct";

const navigation = {
  brand: { name: "Why Are You Buying This?!", to: "/" },
  links: [
    { name: "About Me", to: "/About" },
    // { name: "Blog", to: "/blog" },
    // { name: "Developement", to: "/dev" },
    // { name: "Graphic Design", to: "/design" },
    { name: "Contact", to: "/Contact" },
  ],
};

// const RouterPage = (
//   props: { pageComponent: JSX.Element } & RouteComponentProps
// ) => props.pageComponent;

interface IAppProps {}

const App: React.FC<IAppProps> = ({}) => {
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
        `${process.env.REACT_APP_URL}/api/checkToken`,
        null,
        { headers: { "x-auth-token": token } }
      );

      if (tokenResponse.data) {
        const userRes = await Axios.get(
          `${process.env.REACT_APP_URL}/api/loginwithjwt`,
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
    <div className="App">
      <Menu brand={brand} links={links} />
      {/* <Router>
          <RouterPage path="/" pageComponent={<Home />} />
        </Router> */}

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<AboutPage />} />
          <Route path="/Contact" element={<ContactPage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/AddProduct" element={<AddProduct />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
