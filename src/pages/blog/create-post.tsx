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
import BuildBlogPostForm from "@/Components/BlogComponents/BuildBlogPostForm";
import { useDispatch, useSelector } from "react-redux";
import { blogSelector, loadBlogData } from "../../store/slices/blog-slice";

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

interface IInnerTags {
  type: string;
  attributes?: Attributes;
  value: any;
}

interface IBlogItem {
  type: string;
  value: any;
  attributes?: Attributes;
  language?: string;
  possibleInnerTags?: Array<IInnerTags>;
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
  const dispatch = useDispatch();

  const [title, setTitle] = useState<String>();
  // const [desc, setDesc] = useState<String>();
  // const [amzUrl, setAmzUrl] = useState<String>();
  // const [fileName, setFileName] = useState<String>("");
  // const [file, setFile] = useState<File>();
  const fileRef = useRef<HTMLInputElement>(null);
  // const [price, setPrice] = useState<Number>(0);
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

  const handleTextOverlayClick = (
    event: any,
    keyNum: number,
    selectedText: string
  ) => {
    console.log(event);
    event.preventDefault();
    const newArr: Array<IBlogItem> = [...(blogPost || [])];
    if (event.target.ariaLabel === "title") {
      if (newArr.at(keyNum) !== undefined) {
        // const newAtt: Attributes | undefined = newArr.at(keyNum)!.attributes;
        // newAtt!.className = newAtt?.className + " ";

        if (newArr.at(keyNum)!.type === "h1") {
          newArr.at(keyNum)!.type = "p";
        } else {
          newArr.at(keyNum)!.type = "h1";
        }
      }
      newArr.at(keyNum)!.changed = true;
      setBlogPost(newArr);
      console.log("TITLE CLICKED");
    }

    if (event.target.ariaLabel === "bold") {
      if (newArr.at(keyNum) !== undefined) {
        const newAtt: Attributes | undefined = newArr.at(keyNum)!.attributes;

        //changes from bold to non bold toggle
        if (newAtt!.className?.includes("bold")) {
          newAtt!.className = newAtt!.className.replace("bold", "");
        } else {
          newAtt!.className = newAtt?.className + " bold";
        }

        newArr.at(keyNum)!.attributes = newAtt;
        newArr.at(keyNum)!.changed = true;
        setBlogPost(newArr);
        console.log("BOLD CLICKED");
      }
    }

    if (event.target.ariaLabel === "italics") {
      if (newArr.at(keyNum) !== undefined) {
        const newAtt: Attributes | undefined = newArr.at(keyNum)!.attributes;

        //changes from bold to non bold toggle
        if (newAtt!.className?.includes("fst-italic fw-lighter")) {
          newAtt!.className = newAtt!.className.replace(
            "fst-italic fw-lighter",
            ""
          );
        } else {
          newAtt!.className = newAtt?.className + " fst-italic fw-lighter";
        }

        newArr.at(keyNum)!.attributes = newAtt;
        newArr.at(keyNum)!.changed = true;
        setBlogPost(newArr);
        console.log("ITALICS CLICKED");
      }

      // font-italic
    }

    if (event.target.ariaLabel === "link") {
      if (newArr.at(keyNum) !== undefined) {
        const newAtt: Attributes | undefined = newArr.at(keyNum)!.attributes;

        //changes from bold to non bold toggle
        // if (newAtt!.className?.includes("fst-italic fw-lighter")) {
        //   newAtt!.className = newAtt!.className.replace(
        //     "fst-italic fw-lighter",
        //     ""
        //   );
        // } else {
        //   newAtt!.className = newAtt?.className + " fst-italic fw-lighter";
        // }

        // newArr.at(keyNum)!.attributes = newAtt;
        // newArr.at(keyNum)!.changed = true;
        setBlogPost(newArr);
        console.log("LINK CLICKED");
      }

      // font-italic
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (typeof document !== undefined) {
      const body = document.querySelector("body");
      body!.style.overflow = isOpen ? "hidden" : "auto";
    }
  }, [isOpen]);

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

  const blog = useSelector(blogSelector);

  const handleKeyDown = (event: any) => {
    // console.log("User pressed: ", event.key);

    if (event.key === "Enter") {
      // 👇️ your logic here
      var newBlogItem: IBlogItem = {
        type: "p",
        value: [blogTextEle],
        attributes: { bold: false, src: undefined, altText: undefined },
        changed: true,
      };

      if (event.target.ariaLabel === "blogText") {
        newBlogItem = {
          type: "p",
          value: [blogTextEle],
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
      if (blog.arrayOfBlogItems.length === 0) {
        dispatch(
          loadBlogData({
            title: blog.title,
            frontFacingPic: blog.frontFacingPic,
            summary: blog.summary,
            likes: 0,
            dislikes: 0,
            views: 0,
            author: blog.author,
            authorPic: undefined,
            arrayOfBlogItems: [newBlogItem],
          })
        );
      } else {
        dispatch(
          loadBlogData({
            title: blog.title,
            frontFacingPic: blog.frontFacingPic,
            summary: blog.summary,
            likes: 0,
            dislikes: 0,
            views: 0,
            author: blog.author,
            authorPic: undefined,
            arrayOfBlogItems: [...blog.arrayOfBlogItems, newBlogItem],
          })
        );
      }

      console.log(blog);

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
        const newBlogItems = [...blog.arrayOfBlogItems.slice(0, -1)];

        dispatch(
          loadBlogData({
            title: blog.title,
            frontFacingPic: blog.frontFacingPic,
            summary: blog.summary,
            likes: 0,
            dislikes: 0,
            views: 0,
            author: blog.author,
            authorPic: undefined,
            arrayOfBlogItems: newBlogItems,
          })
        );
        // setBlogPost((prevBlogPost) => [...(prevBlogPost?.slice(0, -1) || [])]);
      }
    }
  };

  // useEffect(() => {
  //   const keyDownHandler = (event: any) => {
  //     console.log("User pressed: ", event.key);

  //     if (event.key === "Backspace") {
  //       if (blogTextEle === "") {
  //         if (blogPost?.length !== 0) {
  //           setBlogPost((prevBlogPost) => [
  //             ...(prevBlogPost?.slice(0, -1) || []),
  //           ]);
  //         }
  //       }
  //     }
  //   };

  //   document.addEventListener("keydown", keyDownHandler);

  //   return () => {
  //     document.removeEventListener("keydown", keyDownHandler);
  //   };
  // }, [blogPost?.length]);

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

  const handleLinkSet = (event: any) => {
    console.log("Link Text event: ", event);
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
    const formData = new FormData();

    if (e.target.files[0]) {
      formData.append("pic", e.target.files[0]);
    }

    await axios
      .post(`${process.env.NEXT_PUBLIC_APP_URL}/blog/add-photo`, formData)
      .then((res) => {
        console.log("SUCCESSFULLY POSTED", res);

        const newBlogItem: IBlogItem = {
          type: "img",
          value: null,
          attributes: { bold: false, src: String(res.data.src) },
          changed: true,
        };

        if (blog.arrayOfBlogItems.length === 0) {
          dispatch(
            loadBlogData({
              title: blog.title,
              frontFacingPic: blog.frontFacingPic,
              summary: blog.summary,
              likes: 0,
              dislikes: 0,
              views: 0,
              author: blog.author,
              authorPic: undefined,
              arrayOfBlogItems: [newBlogItem],
            })
          );
        } else {
          dispatch(
            loadBlogData({
              title: blog.title,
              frontFacingPic: blog.frontFacingPic,
              summary: blog.summary,
              likes: 0,
              dislikes: 0,
              views: 0,
              author: blog.author,
              authorPic: undefined,
              arrayOfBlogItems: [...blog.arrayOfBlogItems, newBlogItem],
            })
          );
        }
        e.target.value = null;
      })
      .catch((error) => {
        console.log("SOME ERROR HAPPENED: ", error);
      });

    // fileToDataUri(e.target.files[0]).then((dataUri) => {
    //   console.log("DATA URI ", dataUri);

    //   e.target.value = null;

    //   setShowImg(dataUri);
    // });
  };

  // const fileToDataUri = (file: File) =>
  //   new Promise((resolve, reject) => {
  //     if (!file) {
  //       return;
  //     }
  //     console.log(file);
  //     const reader = new FileReader();
  //     reader.onload = (event: any) => {
  //       resolve(event.target.result);
  //     };

  //     if (file && file.type.match("image.*")) {
  //       reader.readAsDataURL(file);
  //     }
  //   });

  const toggleActive = (e: any) => {
    const newStatus = {
      status: !isActive.status,
    };
    setShowOverlay(!showOverlay);
    setIsActive(newStatus);
  };

  const handleLinkKeyDown = (event: any) => {};

  return (
    <div className="row">
      <div className="col-lg-3"></div>
      <div className="col-lg-6 mt-100">
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

          {blog.arrayOfBlogItems.map((blogItem: any, key: number) => {
            // console.log(key);
            return (
              <BlogItem
                blogItem={blogItem}
                // onChange={changeBlogItem}
                keyNum={key}
                key={key}
                handlelinkset={handleLinkSet}
                handlelangaugeselect={handlelangaugeselect}
                handlekeydown={handleLinkKeyDown}
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
          <BuildBlogPostForm />
        </Popup>
      )}
      <div className="col-lg-3">
        <div className="row d-flex flex-row justify-content-center align-items-center">
          <div className="col-lg-3"></div>
        </div>
      </div>
      <div className="publish-box">
        <div className="btn btn-brand-1 publish-btn" onClick={togglePopup}>
          Publish
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
