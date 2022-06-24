import React, { useState, useEffect, MouseEvent, ChangeEvent } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import "./css/Login.css";

interface ILoginProps {}

const Login: React.FC<ILoginProps> = ({}) => {
  const [email, setEmail] = useState<string>();
  const [pwd, setPwd] = useState<string>();

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
  const handleLogin = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (email === "" || pwd === "") {
      // create a toast to display that the user must enter an email or password
      return;
    }

    const payload = { email: email, password: pwd };

    //request for
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
            Login
          </Button>
        </div>
        <div>
          <a href="/Register">
            <p>Don't have an account? click here to register</p>
          </a>
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
