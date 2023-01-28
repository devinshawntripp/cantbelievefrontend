import React from "react";
import { Row, Col } from "react-bootstrap";

import CSS from "csstype";

// import "./Footer.css";

interface FooterProps {}

const Footer: React.FC<FooterProps> = (props: {}) => {
  const rowStyle: CSS.Properties = {
    // height: "200px",
    marginTop: "2%",
    marginLeft: "10%",
  };

  const colStyle: CSS.Properties = {
    width: "33%",
    // justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    top: "0",
    marginBottom: "3%",
    // height: "200px",
  };

  return (
    <div className="containerFooter">
      <Row style={rowStyle}>
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
      </Row>

      <Row style={rowStyle}>
        <Col style={colStyle}>
          <h1>About Us</h1>
          <a href="#">Hello</a>
        </Col>
        <Col style={colStyle}>
          <h1>Social</h1>
          <a href="#">Faceboook</a>
          <a href="#">Youtube</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
          <a href="#">TikTok</a>
        </Col>

        <Col style={colStyle}>
          <h1>Services</h1>
          <a href="#">Affiliate Marketing</a>
          <a href="#">Development</a>
          <a href="#">SEO Audit</a>
          <a href="#">Architech Consulting</a>
        </Col>
        <Col style={colStyle}>
          <h1>
            <a href="#">Contact Us</a>
          </h1>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
