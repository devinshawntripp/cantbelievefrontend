import React, { useState, useEffect, MouseEvent, ChangeEvent } from "react";
import { InputGroup, FormControl, Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadAppData } from "../store/slices/app-slice";

import { render } from "@react-email/render";
// import { Email } from './email';

import { Html } from "@react-email/html";
import { Button as ButtonHtml } from "@react-email/button";
// import { Button } from "@react-email/button";

import axios from "axios";
import "./css/forms.css";

interface IContactPageProps {}

const ContactPage: React.FC<IContactPageProps> = ({}) => {
  const [email, setEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notify = (msg: string) =>
    toast(msg, {
      position: "top-center",
      autoClose: 8000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.ariaLabel === "email") {
      setEmail(e.target.value);
    }

    if (e.target.ariaLabel === "subject") {
      setSubject(e.target.value);
    }

    if (e.target.ariaLabel === "emailbody") {
      setMessage(e.target.value);
    }
  };
  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(message);
    console.log(email);
    console.log(subject);

    if (email === "" || subject === "" || message === "") {
      // create a toast to display that the user must enter an email or password
      notify("You need to have all fields with something entered");
      return;
    }

    const emailHtml = render(<Html>{message}</Html>);

    const options = {
      Source: "devin@onetripp.com",
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: emailHtml,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: subject,
        },
      },
    };

    const payload = { options: options };

    axios
      .post(`${process.env.REACT_APP_URL}/api/sendMail`, payload)
      .then((res) => {
        notify(res.data);
      })
      .catch((error) => {
        notify(error);
      });
  };

  return (
    <div className="container">
      <ToastContainer
        toastStyle={{
          backgroundColor: "white",
          color: "black",
        }}
        // position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Form className="formInputs">
        <Form.Group className="inputG" controlId="exampleForm.ControlInput1">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="ex: youremail@gmail.com"
            aria-label="email"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="inputG" controlId="exampleForm.ControlInput1">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            type="subject"
            placeholder="ex: business inquiry"
            aria-label="subject"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="inputG" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Write me a compelling email!</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            aria-label="emailbody"
            onChange={handleChange}
          />
        </Form.Group>
        <div className="sendButton">
          <Button
            onClick={handleSubmit}
            className="LoginButton m-4"
            variant="primary"
          >
            Send
          </Button>
        </div>
      </Form>
    </div>
    // </div>
  );
};

export default ContactPage;
