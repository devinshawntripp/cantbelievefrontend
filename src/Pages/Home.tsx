import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import AmazonItem from "../Components/AmazonItem";
import { useNavigate } from "react-router-dom";
import CSS from "csstype";
import { appSelector, loadAppData } from "../store/slices/app-slice";
import "./css/Home.css";
import { useSelector } from "react-redux";

export interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  const [items, setItems] = useState<
    Array<{
      _id: number;
      name: string;
      url: string;
      imgUrl: string;
      desc: string;
      price: number;
      saves: number;
    }>
  >();

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `AddProduct`;
    navigate(path);
  };

  const deleteItem = async (id: number) => {
    // console.log(id);
    const payload = { itemId: id };
    await axios
      .post(`${process.env.REACT_APP_URL}/items/deleteItem`, payload)
      .then((res) => {
        console.log(res.status);
        if (res.status == 200) {
        }
        // const item = items?.find((i) => i._id == id);
        // items?.findIndex(obj =>{return obj._id == id})
        // items?.slice(), )
        window.location.reload();
      });
  };

  const app = useSelector(appSelector);

  const getAllItems = async () => {
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

  const productsStyle: CSS.Properties = {
    width: "100%",
    marginTop: "5%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const productItem: CSS.Properties = {
    display: "flex",
    flexDirection: "column",
    width: "24%",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div className="Home">
      <div style={productsStyle}>
        {items &&
          items.map((item) => {
            // console.log(item);
            return (
              <div style={productItem}>
                <AmazonItem
                  id={item._id}
                  name={item.name}
                  url={item.url}
                  imgUrl={item.imgUrl}
                  desc={item.desc}
                  price={item.price ?? 0}
                  saves={item.saves ?? 0}
                />
                {app.admin && (
                  <Button
                    onClick={() => deleteItem(item._id)}
                    style={{ width: "90%" }}
                  >
                    Delete
                  </Button>
                )}
              </div>
            );
          })}
      </div>

      {app.admin && (
        <Row>
          <div style={{ marginTop: "10%" }}>
            {/* <Button>Add Product</Button> */}
            <Button onClick={routeChange}>Add Product</Button>
          </div>
        </Row>
      )}
    </div>
  );
};

export default Home;
