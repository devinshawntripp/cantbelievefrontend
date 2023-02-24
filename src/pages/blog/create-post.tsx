import React, {
  useState,
  useRef,
  useContext,
  useEffect,
  ChangeEvent,
} from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import Axios from "axios";
import CSS from "csstype";
import { ThemeContext } from "../../Components/Theme";
import BlogItem from "@/Components/BlogItem";
import axios from "axios";
// import { FALSE } from "sass";
import { PopoverForContent } from "@/Components/BlogComponents/PopoverForContent";
import Popup from "@/Components/Popup";

interface IAddProductProps {}

interface Code {
  codeString: string;
  langauge: string;
  show: boolean;
}

interface Attributes {
  bold?: boolean;
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
  language?: string;
  changed: boolean;
  handlelangaugeselect?: (e: any, keyNum: number) => void;
}

interface IBlogPost {
  title: string;
  frontFacingPic: File;
  summary: string;
  likes: number;
  dislikes: number;
  views: number;
  author: string;
  authorPic?: File;
  arrayOfBlogItems: Array<IBlogItem>;
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
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [blogTextEle, setBlogTextElement] = useState<string>("");

  const [wholeBlogPost, setWholeBlogPost] = useState<IBlogPost>();

  const [blogPost, setBlogPost] = useState<Array<IBlogItem>>();
  const [showYoutubeEmbed, setShowYoutubeEmbed] = useState<boolean>(false);
  const youtubeRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<HTMLTextAreaElement>(null);

  const { dark } = useContext(ThemeContext);

  const targetRef = useRef(null);
  const [html, setHtml] = useState(true);

  //code formatting syntax
  const [code, setCode] = useState<Code>({
    codeString: "",
    langauge: "",
    show: false,
  });

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

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

  const handlelangaugeselect = (e: any, keyNum: number) => {
    const newCode: Code = {
      codeString: e.target.value,
      langauge:
        code.langauge !== undefined || code.langauge !== ""
          ? code.langauge
          : "javascript",
      show: code.show,
    };

    setCode(newCode);

    const newArr: Array<IBlogItem> = [...(blogPost || [])];

    if (newArr.at(keyNum) !== undefined) {
      newArr.at(keyNum)!.language = e.target.value;
    }

    setBlogPost(newArr);
  };

  const handlePublish = (event: any) => {
    // setWholeBlogPost
    // const payload: IBlogPost = {
    //   title: "",
    //   frontFacingPic: new File(Blob, ""),
    // }
    // axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/blog/add-blog-post`, payload)
    // .then((res) => {
    // })
  };

  const handleKeyDown = (event: any) => {
    // console.log("User pressed: ", event.key);

    if (event.key === "Enter") {
      // 👇️ your logic here
      var newBlogItem: IBlogItem = {
        type: "p",
        value: blogTextEle,
        attributes: { bold: false, src: undefined, altText: undefined },
        changed: true,
      };
      if (event.target.ariaLabel === "blogText") {
        newBlogItem = {
          type: "p",
          value: blogTextEle,
          attributes: { src: undefined, altText: undefined },
          changed: true,
        };
      }
      if (event.target.ariaLabel === "youtubeEmbed") {
        ///get the youtube link
        //get just the id
        const srcId = youtubeLink.split("watch?v=")[1];

        newBlogItem = {
          type: "iframe",
          value: "",
          attributes: { src: srcId, altText: "" },
          changed: true,
        };
      }

      if (event.target.ariaLabel === "code") {
        newBlogItem = {
          type: "code",
          value: code.codeString,
          language: code.langauge,
          attributes: { src: undefined, altText: undefined },
          changed: true,
        };
      }

      setShowYoutubeEmbed(false);
      setBlogPost((prevBlogPost) => [...(prevBlogPost || []), newBlogItem]);
      setBlogTextElement("");
      const newCode: Code = {
        codeString: "",
        langauge: "javascript",
        show: false,
      };
      setCode(newCode);
    }

    if (event.key === "Backspace") {
      if (blogTextEle === "") {
        setBlogPost((prevBlogPost) => [
          ...(prevBlogPost?.splice(prevBlogPost.length - 1, 1) || []),
        ]);
      }
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

  const [youtubeLink, setYoutubeLink] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<any>) => {
    // console.log(e);

    if (e.target.ariaLabel === "blogText") {
      // setBlogPost((prevBlogPost) => [...(prevBlogPost || []), newBlogItem]);
      setBlogTextElement(e.target.value);
    }

    if (e.target.ariaLabel === "youtubeEmbed") {
      setYoutubeLink(e.target.value);
    }

    if (e.target.ariaLabel === "code") {
      const newCode: Code = {
        codeString: e.target.value,
        langauge:
          code.langauge !== undefined || code.langauge !== ""
            ? code.langauge
            : "javascript",
        show: code.show,
      };

      setCode(newCode);
    }
  };

  const handleFileGet = (event: any) => {
    event.preventDefault();
    fileRef.current?.click();
  };

  const handleCodeClicked = (event: any) => {
    const newStatus = {
      status: !isActive.status,
    };

    setIsActive(newStatus);
    setShowOverlay(false);

    const newCode: Code = {
      codeString: code.codeString,
      langauge:
        code.langauge !== undefined || code.langauge !== ""
          ? code.langauge
          : "javascript",
      show: true,
    };

    setCode(newCode);

    codeRef.current?.focus();
  };

  const handleYoutubeEmbed = (event: any) => {
    const newStatus = {
      status: !isActive.status,
    };

    setIsActive(newStatus);
    setShowOverlay(false);
    setShowYoutubeEmbed(true);
    youtubeRef.current?.focus();
  };
  useEffect(() => {
    youtubeRef.current?.focus();
  }, [youtubeRef.current, showYoutubeEmbed]);

  useEffect(() => {
    codeRef.current?.focus();
  }, [code.show]);

  // const handleFileChange = (event: any) => {
  //   const fileUploaded = event.target.files[0];
  // };

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
    setShowOverlay(!showOverlay);
    setIsActive(newStatus);
  };

  const changeBlogItem = (
    event: ChangeEvent<HTMLDivElement>,
    keyNum: number
  ) => {
    event.preventDefault();

    const newArr: Array<IBlogItem> = [...(blogPost || [])];

    if (newArr.at(keyNum) !== undefined) {
      newArr.at(keyNum)!.value = event.currentTarget.innerHTML;
    }

    setBlogPost(newArr);
  };

  // const submitForm = async () => {
  //   //validate

  //   if (
  //     fileRef.current?.files &&
  //     file &&
  //     fileName != "" &&
  //     title != "" &&
  //     desc != "" &&
  //     amzUrl != "" &&
  //     desc != undefined &&
  //     amzUrl != undefined &&
  //     title != undefined &&
  //     price != 0
  //   ) {
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     formData.append("fileName", String(fileName));
  //     formData.append("title", String(title));
  //     formData.append("desc", String(desc));
  //     formData.append("amzURL", String(amzUrl));
  //     formData.append("price", String(price));

  //     // console.log(formData);

  //     await Axios.post(
  //       `${process.env.NEXT_PUBLIC_APP_URL}/items/AddProduct`,
  //       formData
  //     ).then(() => {
  //       notify("Successfully added a product");
  //     });
  //   } else {
  //     notify("All values were not entered correctly");
  //   }
  // };

  return (
    <div className="row">
      <div className="col-lg-3"></div>
      <div className="col-lg-6 mt-100">
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
          {blogPost?.map((blogItem: any, key: number) => {
            // console.log(key);
            return (
              <BlogItem
                blogItem={blogItem}
                onChange={changeBlogItem}
                keyNum={key}
                key={key}
                handlelangaugeselect={handlelangaugeselect}
              />
            );
          })}
          <div className="w-100 d-flex align-items-center justify-content-center mb-100">
            <OverlayTrigger
              trigger="click"
              placement="right"
              show={showOverlay}
              overlay={
                <PopoverForContent
                  className="h-40 d-flex text-align-center align-items-center justify-content-center p-20 popover-plus"
                  handlefileget={handleFileGet}
                  handleyoutubeembed={handleYoutubeEmbed}
                  handlecode={handleCodeClicked}
                />
              }
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

            <div className="col-lg-9">
              <div className="form-group">
                {!showYoutubeEmbed && !code.show && (
                  <input
                    type="text"
                    aria-label="blogText"
                    className="form-control icon-email"
                    value={blogTextEle}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                  ></input>
                )}
                {showYoutubeEmbed && (
                  <input
                    id="youtubeEmbedId"
                    type="text"
                    aria-label="youtubeEmbed"
                    className="form-control icon-email youtube-embed"
                    value={youtubeLink}
                    ref={youtubeRef}
                    placeholder="...<Paste youtube link and hit enter key>"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                  ></input>
                )}
                {code.show && (
                  <textarea
                    id="code"
                    aria-label="code"
                    className="form-control icon-email youtube-embed"
                    value={code.codeString}
                    ref={codeRef}
                    rows={20}
                    placeholder="...<Paste your code and hit enter key>"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <Popup handleClose={togglePopup}>
          <div>hjgjhgkjhkjh kjhkj h</div>
        </Popup>
      )}
      <div className="col-lg-3">
        <div className="row d-flex flex-row justify-content-center align-items-center">
          <div className="col-lg-3">
            <div className="btn btn-brand-1" onClick={togglePopup}>
              Publish
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
