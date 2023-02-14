import React, { useState, useEffect, MouseEvent, ChangeEvent } from "react";
// import { InputGroup, FormControl, Button } from "react-bootstrap";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loadAppData } from "../store/slices/app-slice";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import Link from "next/link";
import { GoogleLogin } from "@react-oauth/google";
import Image from "next/image";

// import "react-toastify/dist/ReactToastify.css";

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
  const handleLogin = async (
    e?: any,
    service?: String,
    credential?: String | undefined
  ) => {
    if (e !== undefined) {
      e.preventDefault();
    }

    console.log(e);

    if (service === "google") {
      const payload = { email: "", password: "", jwtGoogleCred: credential };

      await axios
        .post(`${process.env.NEXT_PUBLIC_APP_URL}/api/login`, payload)
        .then((res) => {
          console.log(res);
          const user = res.data.user;
          dispatch(
            loadAppData({
              id: user.id,
              email: user.email,
              role: user.role,
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
    }

    if (email === "" || pwd === "") {
      // create a toast to display that the user must enter an email or password
      notify("You need to enter a username or password!");
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
            role: user.role,
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

  const handleGoogleLogin = async () => {
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
            role: user.role,
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
    <div className="">
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
      <section className="section banner-login position-relative float-start">
        <div className="box-banner-abs">
          <div className="">
            <div className="row align-items-center">
              <div className="col-xxl-5 col-xl-12 col-lg-12 login-form">
                <div className="box-banner-login">
                  <h2 className="color-brand-1 mb-15">Welcome back</h2>
                  <p className="font-md color-grey-500">
                    Fill your email address and password to sign in.
                  </p>
                  <div className="line-login mt-25 mb-50" />
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group mb-25">
                        <input
                          className="form-control icon-user"
                          type="text"
                          placeholder="Username"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group mb-25">
                        <input
                          className="form-control icon-password"
                          placeholder="Password"
                          aria-label="Password"
                          aria-describedby="password-1"
                          type="password"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="altSignins">
                      <GoogleLogin
                        aria-label="google"
                        onSuccess={(credentialResponse) => {
                          console.log(credentialResponse);
                          handleLogin(
                            undefined,
                            "google",
                            credentialResponse.credential
                          );
                        }}
                        onError={() => {
                          console.log("Login Failed");
                        }}
                      />
                      <GoogleLogin
                        aria-label="google"
                        onSuccess={(credentialResponse) => {
                          console.log(credentialResponse);
                          handleLogin(
                            undefined,
                            "google",
                            credentialResponse.credential
                          );
                        }}
                        onError={() => {
                          console.log("Login Failed");
                        }}
                      />
                    </div>
                    <div className="col-lg-6 col-6 mt-15">
                      <div className="form-group mb-25">
                        <label className="cb-container">
                          <input type="checkbox" defaultChecked={true} />
                          <span className="text-small">Remember me</span>
                          <span className="checkmark" />
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-6 col-6 mt-15">
                      <div className="form-group mb-25 text-end">
                        <Link className="font-xs color-grey-500" href="#">
                          Forgot password?
                        </Link>
                      </div>
                    </div>
                    <div className="col-lg-12 mb-25">
                      <button
                        className="btn btn-brand-lg btn-full font-md-bold"
                        type="submit"
                        onClick={(e) => handleLogin(e, "", "")}
                      >
                        Sign in
                      </button>
                    </div>
                    <div className="col-lg-12">
                      <span className="color-grey-500 d-inline-block align-middle font-sm">
                        Don’t have an account?
                      </span>
                      <Link
                        className="d-inline-block align-middle color-success ml-3"
                        href="/Register"
                      >
                        {" "}
                        Sign up now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col m-0">
                {/* <div className="col-xxl-5 col-xl-7 col-lg-6" /> */}
                {/* <div className="col-xxl-7 col-xl-5 col-lg-6 pr-0"> */}
                {/* <div className="d-none d-xxl-block pl-70"> */}
                <img
                  className="d-block signin-banner"
                  // width="0"
                  // // layout="fill"
                  // priority
                  // height={0}
                  // src="/Users/devintripp/Desktop/GitHub/Javascript/AmazonAffiliateWebsite/cantbelievefrontend/public/assets/imgs/pages/login/playful_picture_that_would_be_a_banner_picture_for_a_sign.png"
                  src="/assets/imgs/pages/login/playful_picture_that_would_be_a_banner_picture_for_a_sign.png"
                  alt="Sign in Banner picture for why are you buying this.com"
                />
                {/* </div> */}
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </section>
      <div className="section bg-grey-80 pt-70 pb-70">
        <div className="container">
          {/* <ul className="list-partners">
            <li>
              <img src="assets/imgs/page/homepage1/placed.png" alt="iori" />
            </li>
            <li>
              <img src="assets/imgs/page/homepage1/cuebiq.png" alt="iori" />
            </li>
            <li>
              <img src="assets/imgs/page/homepage1/factual.png" alt="iori" />
            </li>
            <li>
              <img src="assets/imgs/page/homepage1/placeiq.png" alt="iori" />
            </li>
            <li>
              <img src="assets/imgs/page/homepage1/airmeet.png" alt="iori" />
            </li>
            <li>
              <img src="assets/imgs/page/homepage1/spen.png" alt="iori" />
            </li>
            <li>
              <img src="assets/imgs/page/homepage1/klippa.png" alt="iori" />
            </li>
            <li>
              <img src="assets/imgs/page/homepage1/matrix.png" alt="iori" />
            </li>
          </ul> */}
        </div>
      </div>
      <section className="section mt-50">
        <div className="container">
          <div className="box-newsletter box-newsletter-2">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-7 m-auto text-center">
                <span className="font-lg color-brand-1">Newsletter</span>
                <h2 className="color-brand-1 mb-15 mt-5">
                  Subcribe our newsletter
                </h2>
                <p className="font-md color-grey-500">
                  Do not miss the latest information from us about the trending
                  in the market. By clicking the button, you are agreeing with
                  our Term &amp; Conditions
                </p>
                <div className="form-newsletter mt-30">
                  <form action="#">
                    <input type="text" placeholder="Enter you mail .." />
                    <button className="btn btn-submit-newsletter" type="submit">
                      <svg
                        className="w-6 h-6 icon-16"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="card-login-grid">
        <div className="card-login-grid-2">
          <form className="">
            <div className="form-group icon-email">
              <input
                type="text"
                className="form-control icon-email"
                placeholder="Email:"
              />
              <small id="emailHelp" className="form-text text-muted">
                We&apos;ll never share your email with anyone else.
              </small>
            </div>
          </form>
          <div className="inputG">
            {/* <InputGroup>
            <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
            <FormControl
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={handleChange}
            />
          </InputGroup> */}
          </div>
          <div className="inputG">
            {/* <InputGroup className="mt-3">
            <InputGroup.Text id="password-1">Password</InputGroup.Text>
            <FormControl
              placeholder="Password"
              aria-label="Password"
              aria-describedby="password-1"
              type="password"
              onChange={handleChange}
            />
          </InputGroup> */}
          </div>
          <div className="LoginButton">
            {/* <Button
            onClick={(e) => handleLogin(e, "", "")}
            className="LoginButton m-4"
            variant="primary"
          >
            Login
          </Button> */}
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
            <GoogleLogin
              aria-label="google"
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
                handleLogin(undefined, "google", credentialResponse.credential);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
            ;
            {/* <Button
            className="altSignins mt-3"
            variant="primary"
            aria-label="google"
            onClick={handleLogin}
          >
            Google
          </Button> */}
          </div>
          {/* <div className="altSignins">
          <Button className="altSignins mt-3" variant="primary">
            Facebook
          </Button>
        </div>
        <div className="altSignins">
          <Button className="altSignins mt-3" variant="primary">
            Github
          </Button>
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
