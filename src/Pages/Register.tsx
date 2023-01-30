import React, { useState, useEffect, MouseEvent, ChangeEvent } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import axios from "axios";
import { useDispatch } from "react-redux";
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
    <div className="container">
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
            Register
          </Button>
        </div>
        <div>
          <a href="/Login">
            <p>Already have an account? click here to Login</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
