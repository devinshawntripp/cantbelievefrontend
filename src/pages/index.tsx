import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Row } from "react-bootstrap";
import AmazonItem from "../Components/AmazonItem";
import { useRouter } from "next/router";
import CSS from "csstype";
import { appSelector } from "../store/slices/app-slice";
import { useSelector } from "react-redux";
import useMediaQuery from "../hooks/useMediaQuery";
import Popup from "../Components/Popup";

export interface IHomeProps {}

export default function Home() {
  const [items, setItems] = useState<
    Array<{
      _id: string;
      name: string;
      url: string;
      imgUrl: string;
      desc: string;
      price: number;
      saves: number;
    }>
  >();

  let navigate = useRouter();
  const routeChange = () => {
    let path = `AddProduct`;
    navigate.push(path);
  };

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  let getStuff: boolean = useMediaQuery("(max-width: 600px)");

  const deleteItem = async (id: string) => {
    // console.log(id);
    //are you sure you want to delete

    const payload = { itemId: id };
    await axios
      .post(`${process.env.NEXT_PUBLIC_APP_URL}/items/deleteItem`, payload)
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
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
      .get(`${process.env.NEXT_PUBLIC_APP_URL}/api/items`)
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
    display: "flex",
    width: "100%",
    marginTop: "5%",
    // marginLeft: "10%",
    // marginRight: "10%",

    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  };

  const productItem: CSS.Properties = {
    display: "flex",
    flexDirection: "column",
    width: getStuff ? "100% " : "20%",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "2%",
    marginTop: "2%",
  };

  return (
    <div className="Home">
      {app.admin && (
        <Row>
          <div style={{ marginTop: "10%" }}>
            {/* <Button>Add Product</Button> */}
            <Button onClick={routeChange}>Add Product</Button>
          </div>
        </Row>
      )}
      <div style={productsStyle}>
        {items &&
          items.map((item) => {
            // console.log(item);
            return (
              <div key={item._id} style={productItem}>
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
                  <Button style={{ width: "90%" }} onClick={togglePopup}>
                    Delete
                  </Button>
                )}

                {isOpen && app.admin && (
                  <Popup
                    content={
                      <>
                        <h1>Are you sure you want to delete?</h1>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                        >
                          <Button
                            onClick={() => deleteItem(item._id)}
                            style={{ width: "20%" }}
                            variant="danger"
                          >
                            Yes
                          </Button>

                          <Button
                            onClick={togglePopup}
                            style={{ width: "20%" }}
                            variant="success"
                          >
                            No
                          </Button>
                        </div>
                      </>
                    }
                    handleClose={togglePopup}
                  />
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
