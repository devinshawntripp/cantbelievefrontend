import React, { useState, MouseEvent } from "react";
// import { Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

import { render } from "@react-email/render";
import Head from "next/head";

import { Html } from "@react-email/html";

import axios from "axios";

interface IContactPageProps {}

const ContactPage: React.FC<IContactPageProps> = (props: {}) => {
  const [email, setEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
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

    if (email === "" || subject === "" || message === "") {
      // create a toast to display that the user must enter an email or password
      notify("You need to have all fields with something entered");
      return;
    }

    const emailHtml = render(
      <Html>
        {message} From: {email}
      </Html>
    );

    const options = {
      Source: "devin@onetripp.com",
      Destination: {
        ToAddresses: ["devin@onetripp.com"],
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
          Data: subject + " From: " + email,
        },
      },
    };

    const payload = { options: options };

    axios
      .post(`${process.env.NEXT_PUBLIC_APP_URL}/api/sendMail`, payload)
      .then((res) => {
        notify("Message was sent successfully!");
      })
      .catch((error) => {
        notify("Message was not sent: " + error.message);
      });
  };

  return (
    <div className="container mt-200">
      <Head>
        <title>Contact Us - Why Are You Buying This</title>
        <meta
          name="description"
          content="Get in touch with the team behind whyareyoubuyingthis.com. Reach out to us for any questions, comments, or concerns. Contact us now."
        />
        <meta
          name="keywords"
          content="Contact Us, Why Are You Buying This, Questions, Comments, Concerns"
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
      </Head>

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
      <section className="container section ">
        <div className="row contact d-flex align-items-center">
          <div className="col-lg-6 contact-left col-sm-3">
            <h2 className="contact-h2">Send us some friendly mail!</h2>
            <br></br>
            <h6>We will get back to you within 24h!</h6>
          </div>

          <div className="col-lg-6 col-sm-6">
            <form>
              <div className="form-group">
                {/* <label className="form-label">Email: </label> */}
                <input
                  type="email"
                  className="form-control font-md"
                  placeholder="Email: "
                  aria-label="email"
                  onChange={handleChange}
                ></input>
              </div>
              <div className="form-group">
                {/* <label className="form-label">Email: </label> */}
                <input
                  type="subject"
                  className="form-control font-md"
                  placeholder="subject: "
                  aria-label="subject"
                  onChange={handleChange}
                ></input>
              </div>
              <div className="form-group">
                {/* <label className="form-label">Email: </label> */}
                <input
                  type="textarea"
                  className="form-control font-md"
                  placeholder="Message: "
                  aria-label="emailbody"
                  aria-rowspan={6}
                  onChange={handleChange}
                ></input>
              </div>
            </form>
            {/* <Form> */}
            {/* <Form.Group
                className="inputG"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  className="font-md"
                  placeholder="ex: youremail@gmail.com"
                  aria-label="email"
                  onChange={handleChange}
                />
              </Form.Group> */}
            {/* <Form.Group
                className="mt-20"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  type="subject"
                  placeholder="ex: business inquiry"
                  aria-label="subject"
                  onChange={handleChange}
                />
              </Form.Group> */}
            {/* 
              <Form.Group
                className="mt-20"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Write me a compelling email!</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  aria-label="emailbody"
                  onChange={handleChange}
                />
              </Form.Group> */}
            <div className="sendButton">
              <a
                onClick={(e: any) => handleSubmit(e)}
                className="btn btn-brand-1 m-4 ml-200"
              >
                Send
              </a>
            </div>
            {/* </Form> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
