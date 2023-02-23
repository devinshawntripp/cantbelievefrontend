import React from "react";
// import { Row, Col } from "react-bootstrap";
import Link from "next/link";
import newLogo from "../../public/assets/imgs/pages/homepage/whyyoubuyinglogo.png";
import CSS from "csstype";

interface FooterProps {}

const Footer: React.FC<FooterProps> = (props: {}) => {
  return (
    <div className="footer">
      <main className="containerFooter ">
        <div className="container ">
          <div className="row rowStyle">
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
          </div>
          {/* <div className="d-flex align-items-center"> */}
          <div className="row rowStyle">
            <div className="col-lg-2 colStyle font-md mr-30">
              <Link className="footer-link-style" href="/">
                <img src={newLogo.src} />
              </Link>
              <h5 className="text-white">
                1234 Some address
                <br></br>
                Grapevine, Texas, 76208
              </h5>
              <h6 className="text-white">devin@onetripp.com</h6>
            </div>
            <div className="col-lg-3 colStyle font-md mt-100">
              <h3 className="footer-header-style">Information</h3>
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
              <Link className="footer-link-style" href="/legal/privacypolicy">
                Privacy Policy
              </Link>
              <Link className="footer-link-style" href="/legal/termsofservice">
                Terms of Service
              </Link>
            </div>
            <div className="col-lg-3 colStyle mt-100">
              <h3 className="footer-header-style">Social</h3>
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
            </div>

            <div className="col-lg-3 colStyle mt-100">
              <h3 className="footer-header-style">Services</h3>
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
            </div>
          </div>
          {/* </div> */}
        </div>
        <div className="col colStyleCopy">
          <p>
            &copy; {String(new Date().getFullYear() + "")} all rights reserved
          </p>
        </div>
      </main>
    </div>
  );
};

export default Footer;
