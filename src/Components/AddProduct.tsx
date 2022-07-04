import React, { useState, useRef } from "react";
import { InputGroup, FormControl, Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import Axios from "axios";
import CSS from "csstype";

interface IAddProductProps {}

const AddProduct: React.FC<IAddProductProps> = (props: {}) => {
  const [title, setTitle] = useState<String>();
  const [desc, setDesc] = useState<String>();
  const [amzUrl, setAmzUrl] = useState<String>();
  const [fileName, setFileName] = useState<String>("");
  const [file, setFile] = useState<File>();
  const fileRef = useRef<HTMLInputElement>(null);
  const [price, setPrice] = useState<Number>(0);

  const notify = (msg: string) =>
    toast(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.ariaLabel === "Title") {
      setTitle(e.target.value);
    }

    if (e.target.ariaLabel === "Desc") {
      setDesc(e.target.value);
    }

    if (e.target.ariaLabel === "AmzUrl") {
      setAmzUrl(e.target.value);
    }

    if (e.target.ariaLabel === "Price" && !isNaN(e.target.valueAsNumber)) {
      setPrice(e.target.valueAsNumber);
    }
  };

  const handleDisplayFileDetails = () => {
    // console.log(fileRef.current?.files);
    fileRef.current?.files && setFileName(fileRef.current.files[0].name);
    fileRef.current?.files && setFile(fileRef.current.files[0]);
  };

  const submitForm = async () => {
    //validate

    if (
      fileRef.current?.files &&
      file &&
      fileName != "" &&
      title != "" &&
      desc != "" &&
      amzUrl != "" &&
      desc != undefined &&
      amzUrl != undefined &&
      title != undefined &&
      price != 0
    ) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", String(fileName));
      formData.append("title", String(title));
      formData.append("desc", String(desc));
      formData.append("amzURL", String(amzUrl));
      formData.append("price", String(price));

      // console.log(formData);

      await Axios.post(
        `${process.env.REACT_APP_URL}/items/AddProduct`,
        formData
      ).then(() => {
        notify("Successfully added a product");
      });
    } else {
      notify("All values were not entered correctly");
    }
  };

  const formCss: CSS.Properties = {
    width: "90%",
    marginTop: "3%",
  };

  const cardCss: CSS.Properties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  };

  return (
    <div className="container">
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
      <div className="card" style={cardCss}>
        <Form style={formCss}>
          <Form.Group
            className="mb-3 w-90"
            controlId="exampleForm.ControlInput1"
          >
            <Form.Label>Product Title</Form.Label>
            <Form.Control
              type="title"
              placeholder="ex: Love you caitlyn"
              aria-label="Title"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group
            className="mb-3 w-90"
            controlId="exampleForm.ControlInput1"
          >
            <Form.Label>Product Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="ex: 20.90"
              aria-label="Price"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group
            className="mb-3 w-90"
            controlId="exampleForm.ControlInput1"
          >
            <Form.Label>Amazon Aff URL</Form.Label>
            <Form.Control
              type="title"
              placeholder="ex: Link"
              aria-label="AmzUrl"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              // onChange={handleChange}
              ref={fileRef}
              onChange={handleDisplayFileDetails}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Product Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              aria-label="Desc"
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
        <div className="LoginButton">
          <Button
            onClick={submitForm}
            className="LoginButton m-4"
            variant="primary"
          >
            Add Product
          </Button>
        </div>

        {/* <div
          className="blackLine"
          style={{
            color: "Black",
            width: "90%",
            backgroundColor: "Black",
            height: 3,
            borderTop: "2px solid #fff ",
            borderRadius: "3px",
            marginBottom: 0,
          }}
        ></div> */}
      </div>
    </div>
  );
};

export default AddProduct;
