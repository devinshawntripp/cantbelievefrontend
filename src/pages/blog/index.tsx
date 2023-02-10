import React, { useContext } from "react";
import Head from "next/head";
import productR from "../../images/product_research.png";
import Likes from "../../../public/assets/imgs/icons/like-svgrepo-com.svg";
import DarkLike from "../../../public/assets/imgs/icons/dislike-svgrepo-com-fancy-filled.svg";
import Profile from "../../../public/assets/imgs/icons/profile-circle-svgrepo-com.svg";
import Graph from "../../../public/assets/imgs/icons/graph-asc-svgrepo-com.svg";
import Link from "next/link";

import { ThemeContext } from "../../Components/Theme";

interface IBlogPageProps {}

const Blog: React.FC<IBlogPageProps> = (props: {}) => {
  const { dark } = useContext(ThemeContext);

  return (
    <>
      <Head>
        <title>This is the blog page</title>
      </Head>
      <main className="container mt-200">
        <div className="mb-50">
          <Link className="btn btn-brand-1" href="/create-post">
            Add Post
          </Link>
        </div>
        <section className="section">
          <div className="col-xl-3">
            <div className="card-product-grid card-product-grid-2 hover-up">
              <div className="d-flex align-items-center justify-content-around mb-10 border-bottom p-10">
                <div className="col-xl-3 d-flex align-items-center justify-content-center">
                  <div className="d-flex flex-direction-row">
                    <Graph
                      width="35px"
                      height="35px"
                      className={`${dark ? "dark-icon" : "profile"}`}
                    />
                    <div className="mt-15">10</div>
                  </div>
                </div>
                <div className="col-xl-3 d-flex align-items-center justify-content-center">
                  <div className="d-flex flex-direction-row">
                    <DarkLike className="like mr-2 mt-8" />
                    <div className="ml-5 mt-10">3</div>
                  </div>
                </div>
                <div className="col-xl-3 d-flex align-items-center justify-content-center">
                  <div className="d-flex flex-direction-row">
                    <DarkLike className="dislike mr-2 mt-8 hover-up" />
                    <div className="ml-5 mt-10">10</div>
                  </div>
                </div>
                <div className="col-xl-3 d-flex align-items-center justify-content-center">
                  <div className="d-flex flex-direction-row">
                    <Profile
                      width="35px"
                      height="35px"
                      fill="currentValue"
                      className={`${dark ? "dark-icon" : "profile"}`}
                    />
                  </div>
                </div>
              </div>
              <div className="card-image">
                <img src={productR.src}></img>
              </div>
              <h6 className="card-title">This is a title for this blog post</h6>
              <div className="card-info font-md">
                LOREM IPSUMal sjflakjds flajdk faljsd ;fla sdjfaljksjdfaklsdj
                faklsdjfa lksdjfalksdjflkaj sdk jfaklsjdflka jkdsfj akljsd lkfaj
                sdkfja klsdj falkjsdfklajsd fklajsd klfajd slkfajsd klfajsdklfja
                klsd
              </div>
              <div className="d-flex mt-20 align-items-center border-top pt-20 justify-content-around text-align-center">
                <a
                  className="btn btn-border-brand-1 mr-20"
                  target="_blank"
                  rel="noopener noreferrer"
                  href=""
                >
                  {/* <Button
                variant="success"
                // style={{ backgroundColor: "green" }}
                // target="_blank"
                // rel="noopener noreferrer"
                // className="btn btn-primary"
              > */}
                  Read More
                  {/* </Button> */}
                </a>

                <div className="d-flex flex-column mr-20 align-items-center">
                  <p>...5 min read</p>
                </div>
                <p className="price">
                  {/* ${String(Number(price).toLocaleString("en"))} */}
                  more..
                </p>
                {/* </div> */}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Blog;
