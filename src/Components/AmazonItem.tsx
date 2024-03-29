import React, { useEffect, useState, useContext } from "react";
// import picture from "../images/nail_stamper.jpg";
import { Button, Form } from "react-bootstrap";
// import saveIcon from "../images/heartIcon.png";
import saveIconFilled from "../images/heartIconFilled.png";
import saveIconWhite from "../images/heartIconWhite.png";
import saveIconBlack from "../images/heartIcon.png";
// import CSS from "csstype";
import axios from "axios";
import { useSelector } from "react-redux";
import { appSelector } from "../store/slices/app-slice";
import { ToastContainer, toast } from "react-toastify";

import { editProduct, saveProduct } from "../api/index.js";
import Image from "next/image";
import ReadMore from "./ReadMore";
import { ThemeContext } from "../Components/Theme";

/**
 * TODO:
 *  - add alt text prop and change this in the database
 */

interface IAmazonItemProps {
  name: String;
  url: String;
  desc: string;
  imgUrl: String;
  price: number;
  saves: number;
  id: String;
}

const AmazonItem: React.FC<IAmazonItemProps> = (props: {
  name: String;
  url: String;
  desc: string;
  imgUrl: String;
  price: number;
  saves: number;
  id: String;
}) => {
  // var something: String =
  //   "https://amazon.com/itemnumblahalkjsdlfkajdklfajdfalkjjdfjkl3859283?=12454";

  var { name, url, desc, imgUrl, price, saves, id } = props;
  var showUrl = url;

  const { dark } = useContext(ThemeContext);

  if (showUrl && showUrl.length > 30) {
    showUrl = showUrl.slice(0, 30) + "...";
  }

  if (name && name.length > 68) {
    name = name.slice(0, 68) + "...";
  }
  const notify = (msg: any) =>
    toast(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const [actSaves, setSaves] = useState(saves);

  const user = useSelector(appSelector);

  // const [pic, setPic] = useState(saveIconWhite);
  const [pic, setPic] = useState(dark ? saveIconWhite : saveIconBlack);
  useEffect(() => {
    setPic(dark ? saveIconWhite : saveIconBlack);
  }, [dark]);

  useEffect(() => {
    user.idsSaved.map((userIdsSaved: String) => {
      if (userIdsSaved === id) {
        setPic(saveIconFilled);
      }

      return true;
    });
    // user.idsSaved;
  }, [user]);

  const handleMouseOver = () => {
    setPic(saveIconFilled);
  };

  const handleMouseLeave = () => {
    // setPic(saveIconWhite);
    setPic(dark ? saveIconWhite : saveIconBlack);
  };

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const toggleEdit = async () => {
    if (isEdit) {
      submitForm();
    }
    setIsEdit(!isEdit);
  };

  const [editDesc, setEditDesc] = useState<string>(desc);

  const handleChange = (e: React.ChangeEvent<any>) => {
    if (e.target.ariaLabel === "Desc") {
      setEditDesc(e.target.value);
    }

    // if (e.target.ariaLabel === "Desc") {
    //   setDesc(e.target.value);
    // }

    // if (e.target.ariaLabel === "AmzUrl") {
    //   setAmzUrl(e.target.value);
    // }

    // if (e.target.ariaLabel === "Price" && !isNaN(e.target.valueAsNumber)) {
    //   setPrice(e.target.valueAsNumber);
    // }
  };

  const submitForm = async () => {
    //validate

    if (
      // fileRef.current?.files &&
      // file &&
      // fileName != "" &&
      // title != "" &&
      editDesc !== ""
      // amzUrl != "" &&
      // desc != undefined &&
      // amzUrl != undefined &&
      // title != undefined &&
      // price != 0
    ) {
      const formData = new FormData();
      // formData.append("file", file);
      // formData.append("fileName", String(fileName));
      // formData.append("title", String(title));
      formData.append("desc", String(editDesc));
      formData.append("id", String(id));
      // formData.append("amzURL", String(amzUrl));
      // formData.append("price", String(price));

      console.log(formData);

      await editProduct(formData)
        .then((res) => {
          notify("Successfully updated a product: " + res.data.msg);
        })
        .catch((err) => {
          notify("Something went wrong: " + err.response.data.msg);
        });

      // await axios
      //   .post(`${process.env.NEXT_PUBLIC_APP_URL}/items/UpdateItem`, formData)
      //   .then((res) => {
      //     notify("Successfully updated a product: " + res.data.msg);
      //   })
      //   .catch((err) => {
      //     notify("Something went wrong: " + err.response.data.msg);
      //   });
    } else {
      notify("All values were not entered correctly");
    }
  };

  const handleClickSave = async (idPassed: String) => {
    //get the id of the item
    if (user.email == "") {
      notify("You must log in to use this!");
      return;
    }

    const payload = {
      itemId: idPassed,
      userId: user.id,
    };
    await saveProduct(payload).then((res) => {
      console.log(res.data);
      if (res.status === 200) {
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
    <>
      <ToastContainer
        toastStyle={{ backgroundColor: "black" }}
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {isEdit ? (
        <div className="card-product-grid card-product-grid-2 hover-up">
          <div className="card-title">
            <h6>{String(name)}</h6>
          </div>

          {/* <div className="imgContainer"> */}
          <div className="card-image">
            <img className="" src={String(imgUrl)} alt="image not found" />
          </div>
          {/* </div> */}
          <div className="card-info mt-20 h-100">
            <textarea
              className="form-control text-area"
              rows={10}
              cols={50}
              value={editDesc}
              aria-label="Desc"
              onChange={handleChange}
            />

            {/* <p className="text desc">{String(desc).trim()}</p> */}
            {/* <Form.Control
              as="textarea"
              rows={10}
              value={editDesc}
              aria-label="Desc"
              onChange={handleChange}
            /> */}
          </div>
          <div className="d-flex mt-20 align-items-center border-top pt-20 justify-content-around text-align-center">
            <a
              className="btn btn-border-brand-1 mr-20"
              target="_blank"
              rel="noopener noreferrer"
              href={String(url)}
            >
              Click Me
            </a>

            <div className="saves">
              <img
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClickSave(String(id))}
                style={{ width: "20px", height: "20px", objectFit: "fill" }}
                src={pic.src}
              />
              <p>{String(actSaves)} Saves</p>
            </div>
            <p className="price">
              ${String(Number(price).toLocaleString("en"))}
            </p>
            {/* </div> */}
          </div>
          {user.role === "admin" && (
            <Button
              variant="success"
              style={{ width: "90%" }}
              onClick={toggleEdit}
            >
              Submit
            </Button>
          )}
        </div>
      ) : (
        <div className="card-product-grid card-product-grid-2 hover-up">
          <div className="card-title">
            <h6>{String(name)}</h6>
          </div>
          {/* <div className="imgContainer"> */}
          <div className="card-image">
            <img className="" src={String(imgUrl)} alt="image not found" />
          </div>

          {/* </div> */}
          <div className="card-info mt-20">
            <ReadMore class="font-md">
              <p className="">{String(desc).trim()}</p>
            </ReadMore>
          </div>
          {/* <div style={PriceAndLink}> */}
          <div className="d-flex mt-20 align-items-center border-top pt-20 justify-content-around text-align-center">
            <a
              className="btn btn-border-brand-1 mr-20"
              target="_blank"
              rel="noopener noreferrer"
              href={String(url)}
            >
              Click Me
            </a>

            <div className="d-flex flex-column mr-20 align-items-center">
              <img
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClickSave(String(id))}
                style={{ width: "20px", height: "20px", objectFit: "fill" }}
                className="hover-up"
                src={pic.src}
              />
              <p className="light-text">{String(actSaves)} Saves</p>
            </div>
            <p className="price light-text">
              ${String(Number(price).toLocaleString("en"))}
            </p>
            {/* </div> */}
          </div>
        </div>
      )}
      {user.role === "admin" && (
        <Button
          variant="success"
          className="mb-20 ml-15"
          style={{ width: "90%" }}
          onClick={toggleEdit}
        >
          Edit
        </Button>
      )}
    </>
    // <>
    //   <ToastContainer
    //     toastStyle={{ backgroundColor: "black" }}
    //     position="top-right"
    //     autoClose={5000}
    //     hideProgressBar={false}
    //     newestOnTop={false}
    //     closeOnClick
    //     rtl={false}
    //     pauseOnFocusLoss
    //     draggable
    //     pauseOnHover
    //   />
    //   {isEdit ? (
    //     <div className="AmazonItemBox">
    //       <div className="titleContainer">
    //         <p className="amz-item-title">{String(name)}</p>
    //       </div>

    //       {/* <div className="imgContainer"> */}
    //       {imgUrl ? (
    //         <img style={{ marginTop: "0%" }} src={String(imgUrl)} />
    //       ) : (
    //         <p>Not avail</p>
    //       )}
    //       {/* </div> */}
    //       <div className="ItemDetails">
    //         {/* <p className="text desc">{String(desc).trim()}</p> */}
    //         <Form.Control
    //           as="textarea"
    //           rows={5}
    //           value={editDesc}
    //           aria-label="Desc"
    //           onChange={handleChange}
    //         />
    //       </div>
    //       {/* <div style={PriceAndLink}> */}
    //       <div className="priceAndLink">
    //         {/* <Button
    //           href={String(url)}
    //           target="_blank"
    //           rel="noopener noreferrer"
    //           className="clickme-button"
    //         >
    //           Click Me
    //         </Button> */}

    //         <div className="saves">
    //           <img
    //             onMouseOver={handleMouseOver}
    //             onMouseLeave={handleMouseLeave}
    //             onClick={() => handleClickSave(String(id))}
    //             style={{ width: "20px", height: "20px", objectFit: "fill" }}
    //             src={pic.src}
    //           />
    //           <p>{String(actSaves)} Saves</p>
    //         </div>
    //         <p className="price">
    //           ${String(Number(price).toLocaleString("en"))}
    //         </p>
    //         {/* </div> */}
    //       </div>
    //       {user.role === "admin" && (
    //         <Button
    //           variant="success"
    //           style={{ width: "90%" }}
    //           onClick={toggleEdit}
    //         >
    //           Submit
    //         </Button>
    //       )}
    //     </div>
    //   ) : (
    //     <div className="AmazonItemBox">
    //       <div className="titleContainer">
    //         <p className="amz-item-title">{String(name)}</p>
    //       </div>
    //       {/* <div className="imgContainer"> */}
    //       {imgUrl ? (
    //         <img style={{ marginTop: "4%" }} src={String(imgUrl)} />
    //       ) : (
    //         <p>Not avail</p>
    //       )}
    //       {/* </div> */}
    //       <div className="ItemDetails">
    //         <p className="text desc">{String(desc).trim()}</p>
    //       </div>
    //       {/* <div style={PriceAndLink}> */}
    //       <div className="priceAndLink">
    //         <a target="_blank" rel="noopener noreferrer" href={String(url)}>
    //           <Button
    //             variant="success"
    //             // style={{ backgroundColor: "green" }}
    //             // target="_blank"
    //             // rel="noopener noreferrer"
    //             // className="btn btn-primary"
    //           >
    //             Click Me
    //           </Button>
    //         </a>

    //         <div className="saves">
    //           <img
    //             onMouseOver={handleMouseOver}
    //             onMouseLeave={handleMouseLeave}
    //             onClick={() => handleClickSave(String(id))}
    //             style={{ width: "20px", height: "20px", objectFit: "fill" }}
    //             src={pic.src}
    //           />
    //           <p>{String(actSaves)} Saves</p>
    //         </div>
    //         <p className="price">
    //           ${String(Number(price).toLocaleString("en"))}
    //         </p>
    //         {/* </div> */}
    //       </div>
    //       {user.role === "admin" && (
    //         <Button
    //           variant="success"
    //           style={{ width: "90%" }}
    //           onClick={toggleEdit}
    //         >
    //           Edit
    //         </Button>
    //       )}
    //     </div>
    //   )}
    // </>
  );
};

export default AmazonItem;
