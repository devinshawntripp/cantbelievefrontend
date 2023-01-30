import React, { useState, useEffect, MouseEvent, ChangeEvent } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loadAppData } from "../store/slices/app-slice";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
// import { useLocation } from 'react-router'

interface ILoginProps {}

const Login: React.FC<ILoginProps> = ({}) => {
  const [email, setEmail] = useState<string>();
  const [pwd, setPwd] = useState<string>();
  const navigate = useRouter();
  const dispatch = useDispatch();
  const notify = (msg: string) =>
    toast(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  //   const handleChange = (e: ChangeEvent) => {
  //     console.log(e.target.);
  //   };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.ariaLabel === "Username") {
      setEmail(e.target.value);
    }

    if (e.target.ariaLabel === "Password") {
      setPwd(e.target.value);
    }
  };
  const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (email === "" || pwd === "") {
      // create a toast to display that the user must enter an email or password
      return;
    }

    const payload = { email: email, password: pwd };
    //request for
    // console.log("HIIHIHSDKF DSKFL")
    await axios
      .post(`${process.env.NEXT_PUBLIC_APP_URL}/api/login`, payload)
      .then((res) => {
        console.log(res);
        const user = res.data.user;
        dispatch(
          loadAppData({
            id: user.id,
            email: user.email,
            admin: user.admin,
            vouchers: user.vouchers,
            idsSaved: user.idsSaved,
          })
        );
        console.log(res.data.token);
        localStorage.setItem("auth-token", res.data.token);
        notify("You have logged in successfully!");
        navigate.replace("/");
      })
      .catch((err) => {
        console.log(err);
        notify(err.response.data.msg);
      });
  };

  return (
    <div className="container">
      <ToastContainer
        toastStyle={{ backgroundColor: "black" }}
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="card">
        <div className="inputG">
          <InputGroup>
            <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
            <FormControl
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={handleChange}
            />
          </InputGroup>
        </div>
        <div className="inputG">
          <InputGroup className="mt-3">
            <InputGroup.Text id="password-1">Password</InputGroup.Text>
            <FormControl
              placeholder="Password"
              aria-label="Password"
              aria-describedby="password-1"
              type="password"
              onChange={handleChange}
            />
          </InputGroup>
        </div>
        <div className="LoginButton">
          <Button
            onClick={handleLogin}
            className="LoginButton m-4"
            variant="primary"
          >
            Login
          </Button>
        </div>
        <div>
          <Link href="/Register">
            Don&apos;t have an account? click here to register
          </Link>
        </div>
        <div
          className="blackLine"
          style={{
            color: "Black",
            width: "90%",
            backgroundColor: "Black",
            height: 3,
            borderTop: "2px solid #fff ",
            borderRadius: "3px",
            marginBottom: 0,
          }}
        ></div>

        <div className="altSignins">
          <Button className="altSignins mt-3" variant="primary">
            Login
          </Button>
        </div>
        <div className="altSignins">
          <Button className="altSignins mt-3" variant="primary">
            Login
          </Button>
        </div>
        <div className="altSignins">
          <Button className="altSignins mt-3" variant="primary">
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
