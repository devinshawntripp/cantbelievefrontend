import React from "react";
import { Row, Col } from "react-bootstrap";

import CSS from "csstype";
import "./css/Blog.css";

interface IBlogPageProps {}

export const Blog: React.FC<IBlogPageProps> = (props: {}) => {
  const rowStyle: CSS.Properties = {
    // marginTop: "5%",
  };
  const leftSideCol: CSS.Properties = {
    width: "10% !important",
    height: "100%",
  };
  const rightSideCol: CSS.Properties = {
    width: "10% !important",
    height: "100%",
  };
  const middleCol: CSS.Properties = {
    width: "80% !important",
    height: "100%",
  };

  return (
    <div className="blogContainer">
      <Col style={leftSideCol}>
        <div>left drawer</div>
      </Col>
      <Col style={middleCol}>
        <Row style={rowStyle}>
          <h1>Most recent</h1>
          <Col>Most recent post</Col>
          <Col>Most recent post</Col>
          <Col>Most recent post</Col>
        </Row>
        <Row style={rowStyle}>
          <h1>Most Liked</h1>
          <Col>Most liked post</Col>
          <Col>Most liked post</Col>
          <Col>Most liked post</Col>
        </Row>
      </Col>
      <Col style={rightSideCol}>
        <div> right drawer</div>
      </Col>
    </div>
  );
};
