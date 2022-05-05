import React from "react";
import picture from "../images/nail_stamper.jpg";
import "./AmazonItem.css";

interface IAmazonItemProps {}

const AmazonItem: React.FC<IAmazonItemProps> = ({}) => {
  var something: String =
    "https://amazon.com/itemnumblahalkjsdlfkajdklfajdfalkjjdfjkl3859283?=12454";

  if (something.length > 20) {
    something = something.slice(0, 20) + "...";
  }

  return (
    <div className="AmazonItemBox">
      <img style={{ marginTop: "4%" }} src={picture} />
      <div className="ItemDetails">
        <p>Item Name: Nail Stamper</p>
        <p className="text">Item Description: blah blah blah</p>
        <p className="text">Item Price: 10 dowar</p>
        <p className="text">Amazon Link: {something}</p>
      </div>
    </div>
  );
};

export default AmazonItem;
