import React from "react";
import { Row, Col } from "react-bootstrap";

import CSS from "csstype";

interface IBlogPageProps {}

const Blog: React.FC<IBlogPageProps> = (props: {}) => {
  return (
    <div className="blogContainer">
      <Col className="blog-leftside-col">
        <div className="card bg-secondary">left drawer</div>
      </Col>
      <Col className="blog-middle-col">
        <Row className="blog-row-style p-4">
          <h1>Most recent</h1>
          <Col className="card bg-secondary m-4">Most recent post</Col>
          <Col className="card bg-secondary m-4">Most recent post</Col>
          <Col className="card bg-secondary m-4">Most recent post</Col>
        </Row>
        <Row className="blog-row-style">
          <h1>Most Liked</h1>
          <Col className="card bg-secondary">Most liked post</Col>
          <Col className="card bg-secondary">Most liked post</Col>
          <Col className="card bg-secondary">Most liked post</Col>
        </Row>
      </Col>
      <Col className="blog-rightside-col">
        <div className="card bg-secondary"> right drawer</div>
      </Col>
    </div>
  );
};

export default Blog;
