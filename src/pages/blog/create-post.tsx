import React, { useState, useRef, useContext, useEffect } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import Axios from "axios";
import CSS from "csstype";
import { ThemeContext } from "../../Components/Theme";
import Imageimg from "../../../public/assets/imgs/icons/image-svgrepo-com.svg";
import YoutubeImg from "../../../public/assets/imgs/icons/youtube-svgrepo-com.svg";
import EmbededImg from "../../../public/assets/imgs/icons/embed-post-svgrepo-com.svg";
import CodeImg from "../../../public/assets/imgs/icons/code-tag-svgrepo-com.svg";

interface IAddProductProps {}

const CreatePost: React.FC<IAddProductProps> = (props: {}) => {
  const [title, setTitle] = useState<String>();
  const [desc, setDesc] = useState<String>();
  const [amzUrl, setAmzUrl] = useState<String>();
  const [fileName, setFileName] = useState<String>("");
  const [file, setFile] = useState<File>();
  const fileRef = useRef<HTMLInputElement>(null);
  const [price, setPrice] = useState<Number>(0);
  const [showImg, setShowImg] = useState<any>(null);
  const [isActive, setIsActive] = useState({
    status: false,
  });

  const { dark } = useContext(ThemeContext);

  const popoverRef = useRef();
  // useEffect(() => {
  //   var popover = new bootstrap.Popover(popoverRef.current, {
  //     content: "Hello popover content!",
  //     title: "My Popover",
  //   });
  // }, []);

  const targetRef = useRef(null);
  const [html, setHtml] = useState(true);

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
    const fr = new FileReader();
    fileRef.current?.files &&
      setShowImg(fr.readAsDataURL(fileRef.current?.files[0]));

    fileRef.current?.files &&
      fileToDataUri(fileRef.current?.files[0]).then((dataUri) => {
        setShowImg(dataUri);
      });
  };

  const fileToDataUri = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    });

  const toggleActive = (e: any) => {
    const newStatus = {
      status: !isActive.status,
    };
    setIsActive(newStatus);
  };

  const showModal = () => {
    const { Modal } = require("bootstrap");
    const myModal = new Modal("#exampleModal");
    myModal.show();
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
        `${process.env.NEXT_PUBLIC_APP_URL}/items/AddProduct`,
        formData
      ).then(() => {
        notify("Successfully added a product");
      });
    } else {
      notify("All values were not entered correctly");
    }
  };

  const formCss: CSS.Properties = {
    width: "100% !important",
    marginTop: "3%",
  };

  const cardCss: CSS.Properties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  };

  const popoverRight = (
    <Popover
      id="popover-positioned-right"
      className="h-40 d-flex text-align-center align-items-center justify-content-center p-20 popover-plus"
    >
      <div className="m-20 add-content-icon hover-up">
        <Imageimg
          width="15px"
          height="15px"
          fill="green"
          // className={`${dark ? "dark-icon" : "dark-icon"}`}
        />
      </div>
      <div className="m-20 add-content-icon hover-up">
        <YoutubeImg
          width="15px"
          height="15px"
          fill="green"
          // className={`${dark ? "dark-icon" : "profile"} hover-up mr-10`}
        />
      </div>
      <div className="m-20 add-content-icon hover-up">
        <EmbededImg
          width="15px"
          height="15px"
          fill="green"
          // className={`${dark ? "dark-icon" : "profile"} hover-up mr-10`}
        />
      </div>
      <div className="m-20 add-content-icon hover-up add-content-icon-code">
        <CodeImg
          width="15px"
          height="15px"
          fill="green"
          // className={`${dark ? "dark-icon" : "profile"} hover-up`}
        ></CodeImg>
      </div>
    </Popover>
  );

  return (
    <div className="container mt-100">
      {showImg && (
        <section className="about_sectionOne_style">
          <img className="about_imgStyle_style" src={showImg} />
        </section>
      )}
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
      <div className="container">
        <div className="w-80 d-flex align-items-center justify-content-center ml-50">
          <OverlayTrigger
            trigger="click"
            placement="right"
            overlay={popoverRight}
          >
            <div className="plus-container mr-20">
              <div
                onClick={(e: any) => toggleActive(e)}
                className={`${dark ? "dark-plus" : "plus"} radius ${
                  isActive.status && "active"
                } hover-up`}
              ></div>
            </div>
          </OverlayTrigger>

          <div className="col-lg-6">
            <div className="form-group">
              <input
                type="text"
                // placeholder="Enter something"
                className="form-control icon-email"
              ></input>
            </div>
          </div>

          {/* <button
            type="button"
            className="btn btn-lg btn-danger"
            data-bs-toggle="popover"
            data-bs-title="Popover title"
            data-bs-content="And here's some amazing content. It's very engaging. Right?"
          >
            Click to toggle popover
          </button> */}
        </div>
        {/* <Form style={formCss}>
          {showImg ? (
            <></>
          ) : (
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                // onChange={handleChange}
                ref={fileRef}
                onChange={handleDisplayFileDetails}
              />
            </Form.Group>
          )} */}
        {/* <Form.Group
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

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Product Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              aria-label="Desc"
              onChange={handleChange}
            />
          </Form.Group> */}
        {/* </Form> */}
        {/* <div className="LoginButton">
          <Button
            onClick={submitForm}
            className="LoginButton m-4"
            variant="primary"
          >
            Add Product
          </Button>
        </div> */}

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

export default CreatePost;
