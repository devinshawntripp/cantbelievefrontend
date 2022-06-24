import axios from "axios";
import React, { useEffect, useState } from "react";
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
      .get("//localhost:8174/api/items")
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
      {/* <AmazonItem name={} /> */

      items &&
        items.map((item) => {
          return (
            <div className="Item">
              <AmazonItem
                name={item.name}
                url={item.url}
                imgUrl={item.imgUrl}
                desc={item.desc}
              />
            </div>
          );
        })}
    </div>
  );
};

export default Home;
