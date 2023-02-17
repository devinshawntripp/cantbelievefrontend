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
import BlogItem from "@/Components/BlogItem";

interface IAddProductProps {}

interface Attributes {
  bold?: false;
  src?: string;
  altText?: string;
  contentEditable?: string;
  className?: string;
  onDoubleClick?: () => void;
}

interface IBlogItem {
  type: string;
  value: any;
  attributes?: Attributes;
  changed: boolean;
}

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
  const [blogTextEle, setBlogTextElement] = useState<string>("");

  const [blogPost, setBlogPost] = useState<Array<IBlogItem>>();

  const { dark } = useContext(ThemeContext);

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

  const handleKeyDown = (event: any) => {
    console.log("User pressed: ", event.key);

    if (event.key === "Enter") {
      // 👇️ your logic here
      const newBlogItem: IBlogItem = {
        type: "p",
        value: blogTextEle,
        attributes: { bold: false, src: undefined, altText: undefined },
        changed: true,
      };

      setBlogPost((prevBlogPost) => [...(prevBlogPost || []), newBlogItem]);
      setBlogTextElement("");
    }

    if (event.key === "Backspace") {
      setBlogPost((prevBlogPost) => [
        ...(prevBlogPost?.splice(prevBlogPost.length - 1, 1) || []),
      ]);
    }
  };

  // useEffect(() => {
  //   const keyDownHandler = (event: any) => {
  //     console.log("User pressed: ", event.key);

  //     if (event.key === "Enter") {
  //       event.preventDefault();

  //       const newBlogItem: BlogItem = {
  //         type: "p",
  //         value: blogTextEle,
  //         attributes: { bold: false, src: undefined, altText: undefined },
  //         changed: true,
  //       };

  //       setBlogPost((prevBlogPost) => [...(prevBlogPost || []), newBlogItem]);

  //       // 👇️ your logic here
  //       // myFunction();
  //     }
  //   };

  //   document.addEventListener("keydown", keyDownHandler);

  //   return () => {
  //     document.removeEventListener("keydown", keyDownHandler);
  //   };
  // }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.ariaLabel === "blogText") {
      // setBlogPost((prevBlogPost) => [...(prevBlogPost || []), newBlogItem]);
      setBlogTextElement(e.target.value);
    }
  };

  const handleFileGet = (event: any) => {
    event.preventDefault();
    fileRef.current?.click();
  };

  const handleFileChange = (event: any) => {
    const fileUploaded = event.target.files[0];
  };

  const handleDisplayFileDetails = async (e: any) => {
    fileToDataUri(e.target.files[0]).then((dataUri) => {
      console.log("DATA URI ", dataUri);
      const newBlogItem: IBlogItem = {
        type: "img",
        value: null,
        attributes: { bold: false, src: String(dataUri) },
        changed: true,
      };

      setBlogPost((prevBlogPost) => [...(prevBlogPost || []), newBlogItem]);

      e.target.value = null;

      setShowImg(dataUri);
    });
  };

  const fileToDataUri = (file: File) =>
    new Promise((resolve, reject) => {
      if (!file) {
        return;
      }
      console.log(file);
      const reader = new FileReader();
      reader.onload = (event: any) => {
        resolve(event.target.result);
      };

      if (file && file.type.match("image.*")) {
        reader.readAsDataURL(file);
      }
    });

  const toggleActive = (e: any) => {
    const newStatus = {
      status: !isActive.status,
    };
    setIsActive(newStatus);
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

  const popoverRight = (
    <Popover
      id="popover-positioned-right"
      className="h-40 d-flex text-align-center align-items-center justify-content-center p-20 popover-plus"
    >
      <label htmlFor="file">
        <div className="m-20 add-content-icon hover-up">
          <Imageimg
            onClick={handleFileGet}
            width="15px"
            height="15px"
            fill="green"

            // className={`${dark ? "dark-icon" : "dark-icon"}`}
          />
        </div>
      </label>
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
      {/* {showImg && (
        <section className="about_sectionOne_style">
          <img className="about_imgStyle_style" src={showImg} />
        </section>
      )} */}
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
      <div className="container d-flex flex-column col-xl-12 align-items-center justify-content-center">
        <input
          type="file"
          id="file"
          ref={fileRef}
          onChange={(e: any) => handleDisplayFileDetails(e)}
          style={{ display: "none" }}
          // accept="video/*"
        />
        {blogPost?.map((blogItem: any, key: any) => {
          console.log(blogItem);
          return <BlogItem blogItem={blogItem} key={key} />;
        })}
        <div className="w-80 d-flex align-items-center justify-content-center mr-80 mb-100">
          <OverlayTrigger
            trigger="click"
            placement="right"
            overlay={popoverRight}
          >
            <div className={`plus-plus-container`}>
              <div>
                <div
                  className={`${
                    isActive.status ? "active" : "notactive"
                  } plus-container mr-20`}
                  onClick={(e: any) => toggleActive(e)}
                >
                  <div
                    onClick={(e: any) => toggleActive(e)}
                    className={`${dark ? "dark-plus" : "plus"} radius`}
                  ></div>
                </div>
              </div>
            </div>
          </OverlayTrigger>

          <div className="col-lg-6">
            <div className="form-group">
              <input
                type="text"
                // placeholder="Enter something"
                aria-label="blogText"
                className="form-control icon-email"
                value={blogTextEle}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              ></input>
            </div>
          </div>
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
      </div>
    </div>
  );
};

export default CreatePost;
