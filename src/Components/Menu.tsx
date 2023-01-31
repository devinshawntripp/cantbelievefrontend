// import { linkSync } from "fs";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { appSelector, loadAppData } from "../store/slices/app-slice";
import { store } from "../store/store";
import { useDispatch } from "react-redux";
import Link from "next/link";
import logo from "../images/whyareyoubuyingthislogo.png";

const Menu = (props: {
  brand: { name: string; to: string };
  links: Array<{ name: string; to: string }>;
}) => {
  type RootState = ReturnType<typeof store.getState>;
  const { brand, links } = props;
  const app = useSelector(appSelector);
  const dispatch = useDispatch();
  const [isMenu, setIsMenu] = useState<Boolean>(false);

  const toggleMenu = () => {
    // if (isMenu) {
    //   //add active to hamburger class
    // }

    setIsMenu(!isMenu);
  };

  const handleLogout = () => {
    dispatch(
      loadAppData({
        id: "",
        email: "",
        admin: false,
        vouchers: 0,
        idsSaved: [0],
      })
    );

    localStorage.setItem("auth-token", "");
  };

  return (
    <>
      <div className="Navbar">
        <Link className="Brand" href={brand.to}>
          <img
            className="menu-img-style"
            style={
              {
                // maxHeight: "90px",
                // maxWidth: "120px",
                // marginRight: "-30px",
                // marginBottom: "-20px",
                // marginTop: "-25px",
                // marginLeft: "-15px",
              }
            }
            src={logo.src}
          />
          {/* {brand.name} */}
        </Link>
        <ul className={`${isMenu ? "nav-menu active" : "nav-menu"}`}>
          {links.map((link: { name: string; to: string }) => (
            <li className="nav-item" key={link.name}>
              <Link className="gradient-text" href={link.to}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        {app.email != "" ? (
          <>
            <div className="Username">{app.email}</div>
            <a className="Logout" onClick={handleLogout}>
              Logout
            </a>
          </>
        ) : (
          <Link className="Login" href="/Login">
            Login/Register
          </Link>
        )}
        <div
          className={isMenu ? "hamburger active" : "hamburger"}
          onClick={toggleMenu}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </>
  );
};

export default Menu;
