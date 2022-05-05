import React from "react";
import AmazonItem from "../Components/AmazonItem";
import "./Home.css";

export interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  return (
    <div className="Home">
      <AmazonItem />
    </div>
  );
};

export default Home;
