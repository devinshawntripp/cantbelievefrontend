import { blogSelector, loadBlogData } from "@/store/slices/blog-slice";
import React, {
  useEffect,
  useState,
  useRef,
  ChangeEvent,
  HTMLAttributes,
} from "react";
import { Tooltip, Overlay, OverlayTrigger } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CodeSyntaxBox from "./BlogComponents/CodeSyntaxBox";
import TextOverlayIcons from "./BlogComponents/TextOverlayIcons";
import TextOverlayIconsNew from "./BlogComponents/TextOverlayIconsNew";

interface Attributes extends HTMLAttributes<HTMLDivElement> {
  //   bold?: boolean;
  src?: string;
  altText?: string;
  //   contentEditable?: string;
  //   suppressContentEditableWarning?: string;
  //   className?: string;
  //   onDoubleClick?: (event: any) => void;
  //   ["aria-label"]?: string;
  //   ["aria-current"]?: string;
  ref?: React.RefObject<HTMLDivElement>;
  //   onInput?: (e: any) => void;
  //   type?: string;
  //   value?: string;
  //   onClick?: (event: any) => void;
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
  changed: boolean;
  possibleInnerTags?: Array<IInnerTags>;
  handlelangaugeselect?: (e: any, keyNum: number) => void;
  handletextoverlayclick?: (
    e: any,
    keyNum: number,
    selectedText: string
  ) => void;
  handlekeydown: (e: any) => void;
}

function useOutsideAlerter(
  ref: React.RefObject<HTMLDivElement>,
  overlayref: any,
  initialShow: boolean
) {
  const [show, setShow] = useState(initialShow);
  // Creating a state variable and a setter function for the selected text
  const [selectedText, setSelectedText] = useState<any>("");
  //   const [offset, setOffset] = useState<any>();

  function handleSelection(event: any) {
    // Get the selected text as a string

    if (typeof window !== undefined) {
      if (ref.current && ref.current.contains(event.target)) {
        const text = window.getSelection()?.toString();
        // console.log(text);
        // Set the selected text state
        console.log("selected text: ", text);
        setSelectedText(text);
      }

      if (
        (ref.current && ref.current.contains(event.target)) ||
        (overlayref.current && overlayref.current.contains(event.target))
      ) {
        // alert("You clicked outside of me!");

        setShow(true);
        console.log(show);

        // Get the coordinates of the selected text area
        // const rect = window
        //   .getSelection()
        //   ?.getRangeAt(0)
        //   .getBoundingClientRect();

        // console.log(ref.current);

        // setOffset(rect);

        // Do something with the coordinates, such as rendering a popup menu
        // console.log(rect);
      } else {
        setShow(false);
      }
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mouseup", handleSelection);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mouseup", handleSelection);
    };
  }, [ref, overlayref]);

  return [selectedText, show, setShow] as const;
}

interface IBlogItemProps {
  blogItem: IBlogItem;
  keyNum: number;
  onChange: (event: any, keyNum: number) => void;
  language?: string;
  possibleInnerTags?: Array<IInnerTags>;
  handlelangaugeselect?: (e: any, keyNum: number) => void;
  handletextoverlayclick?: (
    e: any,
    keyNum: number,
    selectedText: string
  ) => void;
  handlelinkset: (e: any) => void;
  handlekeydown: (e: any) => void;
}

const BlogItem: React.FC<IBlogItemProps> = (props) => {
  const [att, setAtt] = useState<Attributes>();
  //   const [blogEleValue, setBlogEleValue] = useState(props.blogItem.value);
  const [altTextValue, setAltTextValue] = useState(
    props.blogItem.attributes?.altText
  );

  const [classNameState, setClassNameState] = useState(
    props.blogItem.attributes?.className + " blog-item-p font-xl text"
  );
  const targetDiv = useRef<HTMLDivElement>(null);
  const overlayIconsRef = useRef(null);
  const [selectedText, show, setShow] = useOutsideAlerter(
    targetDiv,
    overlayIconsRef,
    false
  );

  const targetImg = useRef<HTMLImageElement>(null);
  const [showAltTextOverlay, setShowAltTextOverlay] = useState<boolean>(false);

  const [showAltTextInput, setShowAltTextInput] = useState<boolean>(false);
  const ptagref = useRef(props.blogItem.value);

  const dispatch = useDispatch();

  const [link, setLink] = useState("");
  const blog = useSelector(blogSelector);

  const handleChange = (event: ChangeEvent<HTMLDivElement>) => {
    // setBlogEleValue(event.target.innerHTML);
    // targetDiv.current!.innerHTML = event.currentTarget.innerHTML;
    // console.log("here");

    const blogItems = [...blog.arrayOfBlogItems]; // Create a new array with the existing blog items
    const blogItem = { ...blogItems[props.keyNum] }; // Create a new object with the blog item at index keyNum
    blogItem.value = event.target.innerHTML; // Update the value property of the blog item
    blogItems[props.keyNum] = blogItem; // Update the blog item at index keyNum in the new array

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
        arrayOfBlogItems: blogItems,
      })
    );

    console.log(blog);

    props.onChange(event, props.keyNum);
  };

  const handleClickAltText = (event: any) => {
    setShowAltTextInput(true);
  };

  const handleTextIconOverlayChange = (event: any) => {
    setLink(event.target.value);
  };

  const handleTextIconOverlayKeyDown = (event: any) => {
    if (event.key === "enter") {
      setShow(false);
    }
  };

  const handleAltTextChange = (event: any) => {
    // setAltTextValue()
  };

  const handleClickedImg = (event: any) => {
    setShowAltTextOverlay(true);
  };

  const handleLeftImg = (event: any) => {
    setShowAltTextOverlay(false);
  };

  useEffect(() => {
    setClassNameState(
      props.blogItem.attributes?.className + " blog-item-p font-xl text"
    );
  }, [props.blogItem.changed == true]);

  useEffect(() => {
    // if (props.blogItem.type.match("img")) {
    //   //build img tag
    //   const newAtt: Attributes = {
    //     // bold: props.blogItem.attributes?.bold,
    //     src: props.blogItem.attributes?.src,
    //     altText: props.blogItem.attributes?.altText,
    //     className: props.blogItem.attributes?.className,
    //     ["aria-label"]: "image",
    //     ref: targetImg,
    //     onClick: (e) => handleClickedImg(e),
    //     onMouseLeave: (e: any) => handleLeftImg(e),
    //     // onDoubleClick: showToolTip,
    //   };
    //   props.blogItem.changed = false;
    //   setAtt(newAtt);
    // }

    if (props.blogItem.type.match("p") || props.blogItem.type.match("h1")) {
      const newAtt: Attributes = {
        // bold: props.blogItem.attributes?.bold,
        src: props.blogItem.attributes?.src,
        contentEditable: "true",
        suppressContentEditableWarning: true,
        className:
          props.blogItem.attributes?.className + " blog-item-p font-xl text",
        ["aria-label"]: "text",
        ref: targetDiv,

        onInput: (e: any) => handleChange(e),
      };
      //   props.blogItem.changed = false;
      setAtt(newAtt);
    }
  }, [props.blogItem.changed == true]);
  //   props.blogItem.changed == true;

  return (
    <div className="mb-25 graf" key={props.keyNum}>
      {/* {props.blogItem.type !== "iframe" &&
        props.blogItem.type !== "code" &&
        React.createElement(props.blogItem.type, att, blogEleValue)} */}
      {props.blogItem.type === "iframe" && (
        <div className="youtubeVid">
          <iframe
            className="youtubeVid"
            data-width={854}
            data-height={480}
            width={700}
            height={393}
            src={`https://www.youtube.com/embed/${props.blogItem.attributes?.src}`}
            data-thumbnail="https://i.embed.ly/1/image?url=https%3A%2F%2Fi.ytimg.com%2Fvi%2FLQT47aMSTRE%2Fhqdefault.jpg&key=a19fcc184b9711e1b4764040d3dc5c07"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
          ></iframe>
        </div>
      )}

      {props.blogItem.type === "code" && (
        <CodeSyntaxBox
          codeString={props.blogItem.value}
          language={props.blogItem.language}
          keyNum={props.keyNum}
          handlelangaugeselect={props.handlelangaugeselect!}
        />
      )}

      {props.blogItem.type.match("img") && (
        <img
          src={props.blogItem.attributes?.src}
          ref={targetImg}
          onClick={(e) => handleClickedImg(e)}
          className={props.blogItem.attributes?.className}
          alt={props.blogItem.attributes?.altText}
        ></img>
      )}

      {(props.blogItem.type.match("p") || props.blogItem.type.match("h1")) &&
        !props.blogItem.type.match("img") && (
          // <>
          //   {show && (
          //     <TextOverlayIconsNew
          //       ref={overlayIconsRef}
          //       handletextoverlayclick={props.handletextoverlayclick!}
          //       keynum={props.keyNum}
          //       className="d-flex"
          //     />
          //   )}
          //   {React.createElement(props.blogItem.type, att, blogEleValue)}
          // </>
          <OverlayTrigger
            trigger="click"
            placement="top"
            show={show}
            overlay={
              <TextOverlayIcons
                handleChange={handleTextIconOverlayChange}
                // handleKeyDown={handleTextIconOverlayKeyDown}
                selectedText={selectedText}
                newRef={overlayIconsRef}
                handletextoverlayclick={props.handletextoverlayclick!}
                handlekeydown={props.handlekeydown!}
                handlelinkset={props.handlelinkset}
                keynum={props.keyNum}
                className="d-flex"
              />
            }
          >
            {/* {
              <CustomTag
                att={att}
                htmlTag={props.blogItem.type}
                extraTags={props.blogItem.possibleInnerTags}
              />
            } */}

            {props.blogItem.type === "p" ? (
              <p
                contentEditable="true"
                suppressContentEditableWarning={true}
                className={classNameState}
                ref={targetDiv}
                dangerouslySetInnerHTML={{ __html: ptagref.current }}
                onInput={(e: any) => handleChange(e)}
              ></p>
            ) : (
              <h1
                contentEditable="true"
                suppressContentEditableWarning={true}
                className={classNameState}
                ref={targetDiv}
                dangerouslySetInnerHTML={{ __html: ptagref.current }}
                onInput={(e: any) => handleChange(e)}
              ></h1>
            )}

            {/* {React.createElement(props.blogItem.type, att, blogEleValue)} */}
            {/* {props.blogItem.type === "p" ? <p
              contentEditable="true"
              suppressContentEditableWarning={true}
              className={`${props.blogItem.attributes?.className} + blog-item-p font-xl text`}
              aria-label="text"
              ref={targetDiv}
              onInput={(e: any) => handleChange(e)}
            >
              {blogEleValue}
            </p> : <h1></h1>} */}
          </OverlayTrigger>
        )}

      {/* <Overlay target={targetDiv.current} show={show} placement="top">
        {(props) => (
          <Tooltip className="displayOverany" id="tooltip-top" {...props}>
            <div className="row">
              <div
                aria-label="btn btn-brand-1 title color-text displayOveranyany"
                onClick={handleClickTextEdit}
              >
                CLICK ME
              </div>
            </div>
            <TextOverlayIcons
              handleTextOverlayClick={handleClickTextEdit}
              keyNum={props.keyNum}
            />
          </Tooltip>
        )}
      </Overlay> */}
      <Overlay
        target={targetImg.current}
        show={showAltTextOverlay}
        placement="top"
      >
        {(props) => (
          <Tooltip
            onClick={handleClickAltText}
            // className="displayOverany"
            id="tooltip-top-example"
            {...props}
          >
            <p className="text">Alt Text</p>
          </Tooltip>
        )}
      </Overlay>
      {showAltTextInput && (
        <input className="form-control" placeholder="some text"></input>
      )}
    </div>
  );
};

export default BlogItem;
