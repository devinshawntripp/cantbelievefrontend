import React, { useState, useEffect, MouseEvent, ChangeEvent } from "react";
// import { InputGroup, FormControl, Button } from "react-bootstrap";
import axios from "axios";
import { useDispatch } from "react-redux";
import Link from "next/link";
// import { loadAppData } from "../store/slices/app-slice";

interface IRegisterProps {}

const Register: React.FC<IRegisterProps> = ({}) => {
  const [email, setEmail] = useState<string>();
  const [pwd, setPwd] = useState<string>();
  const dispatch = useDispatch();

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
    // console.log("SDJFLKSDFLKJ FLKJ");

    await axios
      .post(`${process.env.NEXT_PUBLIC_APP_URL}/api/registerUser`, payload)
      .then((res) => {
        console.log(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <section className="section box-page-register">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="box-steps-small">
                <div className="item-number hover-up active">
                  <div className="num-ele">1</div>
                  <div className="info-num">
                    <h5 className="color-brand-1 mb-15">Register</h5>
                    <p className="font-md color-grey-500">
                      All you need is your name, email and a strong password, Or
                      use your social media accounts.
                    </p>
                  </div>
                </div>
                <div className="item-number hover-up">
                  <div className="num-ele">2</div>
                  <div className="info-num">
                    <h5 className="color-brand-1 mb-15">Activate</h5>
                    <p className="font-md color-grey-500">
                      Use the code sent to your email to activate your account.
                    </p>
                  </div>
                </div>
                <div className="item-number hover-up">
                  <div className="num-ele">3</div>
                  <div className="info-num">
                    <h5 className="color-brand-1 mb-15">
                      Open a trading account
                    </h5>
                    <p className="font-md color-grey-500">
                      Create a real or demo trading account on our platform. No
                      credit card required.
                    </p>
                  </div>
                </div>
                <div className="item-number hover-up">
                  <div className="num-ele">4</div>
                  <div className="info-num">
                    <h5 className="color-brand-1 mb-15">
                      Connect with investors
                    </h5>
                    <p className="font-md color-grey-500">
                      With a real-time analysis system you will become a
                      professional investor.
                    </p>
                  </div>
                </div>
                <div className="item-number hover-up">
                  <div className="num-ele">5</div>
                  <div className="info-num">
                    <h5 className="color-brand-1 mb-15">Almost done</h5>
                    <p className="font-md color-grey-500">
                      Start your amazing journey on our platform.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="box-register">
                <h2 className="color-brand-1 mb-15">Create an account</h2>
                <p className="font-md color-grey-500">
                  Create an account today and start using our platform
                </p>
                <div className="line-register mt-25 mb-50" />
                <div className="row">
                  <div className="col-lg-6 col-sm-6">
                    <div className="form-group mb-25">
                      <input
                        className="form-control icon-name"
                        type="text"
                        placeholder="Your name"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-6">
                    <div className="form-group mb-25">
                      <input
                        className="form-control icon-phone"
                        type="text"
                        placeholder="Phone"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-6">
                    <div className="form-group mb-25">
                      <input
                        className="form-control icon-email"
                        type="text"
                        placeholder="Email"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-6">
                    <div className="form-group mb-25">
                      <input
                        className="form-control icon-user"
                        type="text"
                        placeholder="Username"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-6">
                    <div className="form-group mb-25">
                      <input
                        className="form-control icon-password"
                        type="text"
                        placeholder="Password"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-6">
                    <div className="form-group mb-25">
                      <input
                        className="form-control icon-password"
                        type="text"
                        placeholder="Re-password"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group mb-25">
                      <p className="font-sm-bold text-center color-grey-500">
                        Or continue with
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6 col-6">
                    <div className="form-group mb-25">
                      <a className="btn btn-border-80 btn-full" href="#">
                        <img
                          className="d-inline-block align-middle mr-5"
                          src="assets/imgs/page/register/google.svg"
                          alt="iori"
                        />
                        Google
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6 col-6">
                    <div className="form-group mb-25">
                      <a className="btn btn-border-80 btn-full" href="#">
                        <img
                          className="d-inline-block align-middle mr-5"
                          src="assets/imgs/page/register/microsoft.svg"
                          alt="iori"
                        />
                        Microsoft
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6 col-6">
                    <div className="form-group mb-25">
                      <a className="btn btn-border-80 btn-full" href="#">
                        <img
                          className="d-inline-block align-middle mr-5"
                          src="assets/imgs/page/register/tw.svg"
                          alt="iori"
                        />
                        Twitter
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6 col-6">
                    <div className="form-group mb-25">
                      <a className="btn btn-border-80 btn-full" href="#">
                        <img
                          className="d-inline-block align-middle mr-5"
                          src="assets/imgs/page/register/fb.svg"
                          alt="iori"
                        />
                        Facebook
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-12 mt-15">
                    <div className="form-group mb-25">
                      <label className="cb-container">
                        <input type="checkbox" defaultChecked={true} />
                        <span className="text-small">
                          I have read and agree to the Terms &amp; Conditions
                          and the Privacy Policy of this website.
                        </span>
                        <span className="checkmark" />
                      </label>
                    </div>
                    <div className="form-group mb-25">
                      <label className="cb-container">
                        <input type="checkbox" />
                        <span className="text-small">
                          I want to receive design inspiration and product
                          updates. (No spam. You can opt-out anytime.)
                        </span>
                        <span className="checkmark" />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center mt-30">
                  <div className="col-xl-5 col-lg-5 col-md-5 col-sm-6 col-6">
                    <div className="form-group">
                      <button
                        className="btn btn-brand-lg btn-full font-md-bold"
                        type="submit"
                      >
                        Sign up now
                      </button>
                    </div>
                  </div>
                  <div className="col-xl-7 col-lg-7 col-md-7 col-sm-6 col-6">
                    <span className="d-inline-block align-middle font-sm color-grey-500">
                      Already have an account?
                    </span>
                    <Link
                      className="d-inline-block align-middle color-success ml-3"
                      href="/login"
                    >
                      {" "}
                      Sign In
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section mt-80 mb-30">
        <div className="container">
          <div className="text-start">
            <h3 className="color-brand-1 mb-20">
              Loved By Developers <br className="d-none d-lg-block" />
              Trusted By Enterprises
            </h3>
            <p className="font-lg color-grey-500">
              We helped these brands turn online assessments into success
              stories.{" "}
            </p>
          </div>
          <div className="mt-50">
            <ul className="list-partners list-partners-left text-start">
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
              <li>
                <img src="assets/imgs/page/homepage2/reed.png" alt="iori" />
              </li>
              <li>
                <img src="assets/imgs/page/homepage2/vuori.png" alt="iori" />
              </li>
              <li>
                <img src="assets/imgs/page/homepage2/versed.png" alt="iori" />
              </li>
              <li>
                <img src="assets/imgs/page/homepage1/klippa.png" alt="iori" />
              </li>
              <li>
                <img src="assets/imgs/page/homepage1/factual.png" alt="iori" />
              </li>
            </ul>
          </div>
        </div>
      </section>
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

      <div className="container">
        <div className="card">
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
            onClick={handleLogin}
            className="LoginButton m-4"
            variant="primary"
          >
            Register
          </Button> */}
          </div>
          <div>
            <Link href="/Login">
              Already have an account? click here to Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
