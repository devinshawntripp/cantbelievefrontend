import React, { useEffect, useState } from "react";
import picture from "../images/nail_stamper.jpg";
import { Button } from "react-bootstrap";
import saveIcon from "../images/heartIcon.png";
import saveIconFilled from "../images/heartIconFilled.png";
import saveIconWhite from "../images/heartIconWhite.png";
import CSS from "csstype";
import "./AmazonItem.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { appSelector } from "../store/slices/app-slice";

interface IAmazonItemProps {
  name: String;
  url: String;
  desc: String;
  imgUrl: String;
  price: number;
  saves: number;
  id: String;
}

const AmazonItem: React.FC<IAmazonItemProps> = (props: {
  name: String;
  url: String;
  desc: String;
  imgUrl: String;
  price: number;
  saves: number;
  id: String;
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

  const [actSaves, setSaves] = useState(saves);

  const user = useSelector(appSelector);

  const [pic, setPic] = useState(saveIconWhite);

  useEffect(() => {
    console.log(id);
    user.idsSaved.map((userIdsSaved) => {
      console.log(userIdsSaved);
      console.log(id);
      if (userIdsSaved == id) {
        setPic(saveIconFilled);
      }
    });
    // user.idsSaved;
  }, [user]);

  const handleMouseOver = () => {
    setPic(saveIconFilled);
  };

  const handleMouseLeave = () => {
    setPic(saveIconWhite);
  };

  const handleClickSave = async (idPassed: String) => {
    //get the id of the item
    console.log(user);

    const payload = {
      itemId: idPassed,
      userId: user.id,
    };
    await axios
      .post(`${process.env.REACT_APP_URL}/items/saveProduct`, payload)
      .then((res) => {
        console.log(res.data);
        if (res.status == 200) {
          if (res.data.found) {
            setPic(saveIconWhite);
            setSaves(actSaves - 1);
          } else {
            setPic(saveIconFilled);
            setSaves(actSaves + 1);
          }
        }
      });
  };

  return (
    <div className="AmazonItemBox">
      <p className="title">{String(name)}</p>
      {/* <div className="imgContainer"> */}
      {imgUrl ? (
        <img style={{ marginTop: "4%" }} src={String(imgUrl)} />
      ) : (
        <p>Not avail</p>
      )}
      {/* </div> */}
      <div className="ItemDetails">
        <p className="text desc">{String(desc).trim()}</p>
      </div>
      {/* <div style={PriceAndLink}> */}
      <div className="priceAndLink">
        <Button
          href={String(url)}
          target="_blank"
          rel="noopener noreferrer"
          className="button"
        >
          Click Me
        </Button>

        <div className="saves">
          <img
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClickSave(String(id))}
            style={{ width: "20px", height: "20px", objectFit: "fill" }}
            src={pic}
          />
          <p>{String(actSaves)} Saves</p>
        </div>
        <p className="price">${String(Number(price).toLocaleString("en"))}</p>
        {/* </div> */}
      </div>
    </div>
  );
};

export default AmazonItem;
