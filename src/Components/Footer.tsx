import React from "react";
import { Row, Col } from "react-bootstrap";
import Link from "next/link";

import CSS from "csstype";

interface FooterProps {}

const Footer: React.FC<FooterProps> = (props: {}) => {
  const rowStyle: CSS.Properties = {
    // height: "200px",
    marginTop: "2%",
    marginLeft: "10%",
  };

  const colStyle: CSS.Properties = {
    width: "25%",
    // justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    top: "0",
    marginBottom: "3%",
    // height: "200px",
  };

  const colStyleCopy: CSS.Properties = {
    width: "20%",
    // justifyContent: "center",
    color: "white",
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    top: "0",
    // marginBottom: "3%",
    fontSize: "10pt",
    // height: "200px",
  };

  return (
    <div className="containerFooter">
      <Row className="rowStyle">
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

      <Row className="rowStyle">
        <Col className="colStyle">
          <h1 className="footer-header-style">Information</h1>
          <Link className="footer-link-style" href="/About">
            About us
          </Link>
          <a className="footer-link-style" href="#">
            Contact us
          </a>
          <a className="footer-link-style" href="#">
            Add a product
          </a>
          <Link className="footer-link-style" href="/AffiliateLink">
            Make an aff link
          </Link>
          <Link className="footer-link-style" href="/privacypolicy">
            Privacy Policy
          </Link>
          <Link className="footer-link-style" href="/termsofservice">
            Privacy Policy
          </Link>
        </Col>
        <Col className="colStyle">
          <h1 className="footer-header-style">Social</h1>
          <a className="footer-link-style" href="#">
            Faceboook
          </a>
          <a className="footer-link-style" href="#">
            Youtube
          </a>
          <a
            className="footer-link-style"
            href="https://twitter.com/WhyAreYouBuying"
          >
            Twitter
          </a>
          <a className="footer-link-style" href="#">
            Instagram
          </a>
          <a className="footer-link-style" href="#">
            TikTok
          </a>
        </Col>

        <Col className="colStyle">
          <h1 className="footer-header-style">Services</h1>
          <a className="footer-link-style" href="#">
            Affiliate Marketing
          </a>
          <a className="footer-link-style" href="#">
            Development
          </a>
          <a className="footer-link-style" href="#">
            SEO Audit
          </a>
          <a className="footer-link-style" href="#">
            Architech Consulting
          </a>
        </Col>
      </Row>

      <Col className="colStyleCopy">
        <p>
          &copy; {String(new Date().getFullYear() + "")} all rights reserved
        </p>
      </Col>
    </div>
  );
};

export default Footer;
