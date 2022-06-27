import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import AmazonItem from "../Components/AmazonItem";
import "./css/Home.css";

export interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  const [items, setItems] = useState<
    Array<{ name: string; url: string; imgUrl: string; desc: string }>
  >();

  const getAllItems = async () => {
    console.log("HI THERE");
    await axios
      .get(`${process.env.REACT_APP_URL}/api/items`)
      .then((res) => {
        if (res.status === 200) {
          setItems(res.data.items);
        } else {
          //some error message for later
        }
      })
      .catch((err) => {
        console.log(err);
        // console.log("HI THERE");
      });
  };

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <div className="Home">
        <Row style={{width: "100%"}}>
          {
            items &&
              items.map((item) => {
                return (
                  <Col>
                    <div>
                      <AmazonItem
                        name={item.name}
                        url={item.url}
                        imgUrl={item.imgUrl}
                        desc={item.desc}
                      />
                 
                    </div>
                  </Col>
                );
              })}
        </Row>
      
      <Row>
        <div style={{marginTop: "10%"}}>
          {/* <Button>Add Product</Button> */}
          <Button>Add Product</Button>
        </div>
      </Row>
        
    </div>
  );
};

export default Home;
