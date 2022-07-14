import React, { useEffect, useState } from "react";
import picture from "../images/nail_stamper.jpg";
import { Button } from "react-bootstrap";
import saveIcon from "../images/heartIcon.png";
import saveIconFilled from "../images/heartIconFilled.png";
import saveIconWhite from "../images/heartIconWhite.png";
import CSS from "csstype";
import "./AmazonItem.css";

interface IAmazonItemProps {
  name: String;
  url: String;
  desc: String;
  imgUrl: String;
  price: Number;
  saves: Number;
  id: Number;
}

const AmazonItem: React.FC<IAmazonItemProps> = (props: {
  name: String;
  url: String;
  desc: String;
  imgUrl: String;
  price: Number;
  saves: Number;
  id: Number;
}) => {
  var something: String =
    "https://amazon.com/itemnumblahalkjsdlfkajdklfajdfalkjjdfjkl3859283?=12454";

  var { name, url, desc, imgUrl, price, saves, id } = props;
  var showUrl = url;

  if (showUrl.length > 30) {
    showUrl = showUrl.slice(0, 30) + "...";
  }

  if (name.length > 68) {
    name = name.slice(0, 68) + "...";
  }

  // if (desc.length > 65) {
  //   desc = desc.slice(0, 400) + "...";
  // }

  useEffect(() => {
    const getIdsOfUserSaved = async () => {};
  }, []);

  const [pic, setPic] = useState(saveIconWhite);

  const handleMouseOver = () => {
    setPic(saveIconFilled);
  };

  const handleMouseLeave = () => {
    setPic(saveIconWhite);
  };

  const handleClickSave = (idPassed: Number) => {
    //get the id of the item
  };

  return (
    <div className="AmazonItemBox">
      <p className="title">{String(name)}</p>
      {imgUrl ? (
        <img style={{ marginTop: "4%" }} src={String(imgUrl)} />
      ) : (
        <p>Not avail</p>
      )}
      <div className="ItemDetails">
        <p className="text desc">{String(desc).trim()}</p>
      </div>
      {/* <div style={PriceAndLink}> */}
      <div className="priceAndLink">
        {/* <a href={String(url)} target="_blank" rel="noopener noreferrer"> */}
        <Button
          href={String(url)}
          target="_blank"
          rel="noopener noreferrer"
          className="button"
        >
          Click Me
        </Button>
        {/* </a> */}
        {/* <div className="priceSaves" style={SavesUrIPrice}>
         */}
        {/* <div style={SavesUrIPrice}> */}
        {/* <div className="iconSaves"> */}
        <div className="saves">
          <img
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClickSave(id)}
            style={{ width: "20px", height: "20px", objectFit: "fill" }}
            src={pic}
          />
          {/* <p className="saves">{String(saves)} Saves</p> */}
          <p>{String(saves)} Saves</p>
        </div>
        <p className="price">${String(price)}</p>
        {/* </div> */}
      </div>
    </div>
  );
};

export default AmazonItem;
