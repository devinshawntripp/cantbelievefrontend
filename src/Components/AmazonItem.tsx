import React, { useState } from "react";
import picture from "../images/nail_stamper.jpg";
import { Button } from "react-bootstrap";
import saveIcon from "../images/heartIcon.png";
import saveIconFilled from "../images/heartIconFilled.png";
import "./AmazonItem.css";

interface IAmazonItemProps {
  name: String;
  url: String;
  desc: String;
  imgUrl: String;
  price: Number;
}

const AmazonItem: React.FC<IAmazonItemProps> = (props: {
  name: String;
  url: String;
  desc: String;
  imgUrl: String;
  price: Number;
}) => {
  var something: String =
    "https://amazon.com/itemnumblahalkjsdlfkajdklfajdfalkjjdfjkl3859283?=12454";

  var { name, url, desc, imgUrl, price } = props;
  var showUrl = url;

  if (showUrl.length > 30) {
    showUrl = showUrl.slice(0, 30) + "...";
  }

  if (name.length > 68) {
    name = name.slice(0, 68) + "...";
  }

  if (desc.length > 65) {
    desc = desc.slice(0, 65) + "...";
  }

  const [pic, setPic] = useState(saveIcon);

  const handleMouseOver = () => {
    setPic(saveIconFilled);
  };

  const handleMouseLeave = () => {
    setPic(saveIcon);
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
        <p className="text desc">{String(desc)}</p>
      </div>
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
        <div className="priceSaves">
          <div className="iconSaves">
            <img
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
              style={{ width: "20px", height: "20px", objectFit: "fill" }}
              src={pic}
            />
            <p className="saves">200 Saves</p>
          </div>
          <p>{String(props.price)}</p>
        </div>
      </div>
    </div>
  );
};

export default AmazonItem;
