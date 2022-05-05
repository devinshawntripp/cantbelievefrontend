import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutPage from "./Pages/About";
import Home from "./Pages/Home";
import ContactPage from "./Pages/Contact";
import "reset-css";
import "./App.css";

import Menu from "./Components/Menu";

const navigation = {
  brand: { name: "Trippy-Tech", to: "/" },
  links: [
    { name: "About Me", to: "/About" },
    // { name: "Blog", to: "/blog" },
    // { name: "Developement", to: "/dev" },
    // { name: "Graphic Design", to: "/design" },
    { name: "Contact", to: "/Contact" },
  ],
};

export default class App extends Component {
  public render() {
    const { brand, links } = navigation;

    return (
      <div className="App">
        <Menu brand={brand} links={links} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<AboutPage />} />
            <Route path="/Contact" element={<ContactPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
