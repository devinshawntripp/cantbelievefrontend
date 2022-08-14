import { linkSync } from "fs";
import * as React from "react";
import { useSelector } from "react-redux";
import { appSelector, loadAppData } from "../store/slices/app-slice";
import { store } from "../store/store";
import { useDispatch } from "react-redux";
import logo from "../images/whyareyoubuyingthislogo.png";
import "./Menu.css";

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
        <a href={link.to}>{link.name}</a>
      </li>
    ));

  return (
    <>
      <div className="Navbar">
        <a className="Brand" href={brand.to}>
          <img
            style={{
              maxHeight: "90px",
              maxWidth: "120px",
              marginRight: "-50px",
              marginBottom: "-15px",
              marginTop: "-25px",
            }}
            src={logo}
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
          <a className="Login" href="/Login">
            Login/Register
          </a>
        )}
      </div>
    </>
  );
};

export default Menu;
