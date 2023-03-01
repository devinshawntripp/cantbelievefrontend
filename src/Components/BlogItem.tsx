import { blogSelector, loadBlogData } from "@/store/slices/blog-slice";
import React, {
  useEffect,
  useState,
  useRef,
  ChangeEvent,
  HTMLAttributes,
} from "react";
import { Tooltip, Overlay, OverlayTrigger, Popover } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CodeSyntaxBox from "./BlogComponents/CodeSyntaxBox";
import CustomTag from "./BlogComponents/CustomTag";
import TextOverlayIcons from "./BlogComponents/TextOverlayIcons";
import TextOverlayIconsNew from "./BlogComponents/TextOverlayIconsNew";

interface Attributes extends HTMLAttributes<HTMLDivElement> {
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
  const [offset, setOffset] = useState<any>();

  function handleSelection(event: any) {
    // Get the selected text as a string

    var isText = false;

    if (typeof window !== undefined && typeof document !== undefined) {
      if (ref.current && ref.current.contains(event.target)) {
        const text = window.getSelection()?.toString();

        if (text !== "" || text === undefined || text === null) {
          isText = true;
        } else {
          isText = false;
        }
        // console.log(text);
        // Set the selected text state
        console.log("selected text: ", text);
        setSelectedText(text);
      }

      // console.log(ref);

      if (
        (ref.current && ref.current.contains(event.target)) ||
        (overlayref.current && overlayref.current.contains(event.target))
      ) {
        // alert("You clicked outside of me!");
        if (isText) {
          setShow(true);
        }

        console.log(show);

        // Get the coordinates of the selected text area

        if (isText) {
          const rect = window
            .getSelection()
            ?.getRangeAt(0)
            .getBoundingClientRect();

          const viewportWidth = document.documentElement.clientWidth;
          const maxOffset = 300;
          const left = rect?.left || 0;
          const distanceFromLeft = left - viewportWidth / 2.1;
          console.log(viewportWidth);

          // console.log(ref.current);
          console.log("FROM LEFT: ", distanceFromLeft);
          rect?.left;
          setOffset(distanceFromLeft);
        }

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

  return [selectedText, show, setShow, offset] as const;
}

interface IBlogItemProps {
  blogItem: IBlogItem;
  keyNum: number;
  // onChange: (event: any, keyNum: number) => void;
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
  const [selectedText, show, setShow, offset] = useOutsideAlerter(
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

        // onInput: (e: any) => handleChange(e),
      };
      //   props.blogItem.changed = false;
      setAtt(newAtt);
    }
  }, [props.blogItem.changed == true]);
  //   props.blogItem.changed == true;

  const popperConfig = {
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [offset | 0, 8], // Adjust the overlay's position by changing the offset
        },
      },
    ],
  };

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

      <Overlay
        target={targetDiv.current}
        show={show}
        placement="top"
        popperConfig={popperConfig}
      >
        <TextOverlayIcons
          handleChange={handleTextIconOverlayChange}
          // handleKeyDown={handleTextIconOverlayKeyDown}
          selectedText={selectedText}
          newRef={overlayIconsRef}
          handletextoverlayclick={props.handletextoverlayclick!}
          handlekeydown={props.handlekeydown!}
          handlelinkset={props.handlelinkset}
          keynum={props.keyNum}
          setShow={setShow}
          className="d-flex"
        />
      </Overlay>

      {(props.blogItem.type.match("p") || props.blogItem.type.match("h1")) &&
        !props.blogItem.type.match("img") && (
          // <OverlayTrigger
          //   trigger="click"
          //   placement="top"
          //   target={targetDiv.current}
          //   show={show}
          //   // delay={{ show: 700, hide: 0 }}
          //   overlay={
          // <TextOverlayIcons
          //   handleChange={handleTextIconOverlayChange}
          //   // handleKeyDown={handleTextIconOverlayKeyDown}
          //   selectedText={selectedText}
          //   newRef={overlayIconsRef}
          //   handletextoverlayclick={props.handletextoverlayclick!}
          //   handlekeydown={props.handlekeydown!}
          //   handlelinkset={props.handlelinkset}
          //   keynum={props.keyNum}
          //   className="d-flex"
          // />
          //   }
          // >
          // {({ ref, ...triggerHandler }) => (
          <CustomTag
            htmlTag={props.blogItem.type}
            keyNum={props.keyNum}
            key={0}
            customref={targetDiv}
            overlayIconsRef={overlayIconsRef}
          />
        )}

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
