// import { linkSync } from "fs";
import * as React from "react";
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

  const NavLinks: any = () =>
    links.map((link: { name: string; to: string }) => (
      <li key={link.name}>
        <Link className="gradient-text" href={link.to}>
          {link.name}
        </Link>
      </li>
    ));

  return (
    <>
      <div className="Navbar">
        <a className="gradient-text Brand" href={brand.to}>
          <img
            style={{
              maxHeight: "90px",
              maxWidth: "120px",
              marginRight: "-30px",
              marginBottom: "-20px",
              marginTop: "-25px",
              marginLeft: "-15px",
            }}
            src={logo.src}
          />
          {/* {brand.name} */}
        </a>
        <NavLinks />
        <a></a>
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
      </div>
    </>
  );
};

export default Menu;
