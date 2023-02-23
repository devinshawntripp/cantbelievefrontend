import React, {
  useEffect,
  useState,
  useRef,
  ChangeEvent,
  HTMLAttributes,
} from "react";
import { Tooltip, Overlay } from "react-bootstrap";
import CodeSyntaxBox from "./BlogComponents/CodeSyntaxBox";
import TextOverlayIcons from "./TextOverlayIcons";

interface Attributes extends HTMLAttributes<HTMLDivElement> {
  //   bold?: boolean;
  src?: string;
  altText?: string;
  //   contentEditable?: string;
  //   suppressContentEditableWarning?: string;
  //   className?: string;
  //   onDoubleClick?: (event: any) => void;
  handleTextOverlayClick?: (event: any) => void;
  //   ["aria-label"]?: string;
  //   ["aria-current"]?: string;
  ref?: React.RefObject<HTMLDivElement>;
  //   onInput?: (e: any) => void;
  //   type?: string;
  //   value?: string;
  //   onClick?: (event: any) => void;
}

interface IBlogItem {
  type: string;
  value: any;
  attributes?: Attributes;
  language?: string;
  changed: boolean;
  handlelangaugeselect?: (e: any, keyNum: number) => void;
}

function useOutsideAlerter(
  ref: React.RefObject<HTMLDivElement>,
  initialShow: boolean
) {
  const [show, setShow] = useState(initialShow);
  // Creating a state variable and a setter function for the selected text
  const [selectedText, setSelectedText] = useState<any>("");
  const [offset, setOffset] = useState<any>();

  function handleSelection(event: any) {
    // Get the selected text as a string
    if (typeof window !== undefined) {
      if (ref.current && ref.current.contains(event.target)) {
        // alert("You clicked outside of me!");
        const text = window.getSelection()?.toString();
        // console.log(text);
        // Set the selected text state
        setSelectedText(text);
        setShow(true);
        // console.log(show);

        // Get the coordinates of the selected text area
        const rect = window
          .getSelection()
          ?.getRangeAt(0)
          .getBoundingClientRect();

        setOffset(rect);

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
  }, [ref]);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        // alert("You clicked outside of me!");
        // console.log("fhjdhjdghjf ffhjgj");
        // setShow(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };

    // Add the event listener to the text element
  }, [ref]);

  return [offset, show, setShow] as const;
}

interface IBlogItemProps {
  blogItem: IBlogItem;
  keyNum: number;
  onChange: (event: any, keyNum: number) => void;
  language?: string;
  handlelangaugeselect?: (e: any, keyNum: number) => void;
}

const BlogItem: React.FC<IBlogItemProps> = (props) => {
  const [att, setAtt] = useState<Attributes>();
  const [blogEleValue, setBlogEleValue] = useState(props.blogItem.value);
  const [altTextValue, setAltTextValue] = useState(
    props.blogItem.attributes?.altText
  );
  const targetDiv = useRef<HTMLDivElement>(null);
  const [offset, show, setShow] = useOutsideAlerter(targetDiv, false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const targetImg = useRef<HTMLDivElement>(null);
  const [showAltTextOverlay, setShowAltTextOverlay] = useState<boolean>(false);

  const [showAltTextInput, setShowAltTextInput] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLDivElement>) => {
    // setBlogEleValue(event.currentTarget.innerHTML);
    // targetDiv.current!.innerHTML = event.currentTarget.innerHTML;
    // console.log("here");
    props.onChange(event, props.keyNum);
  };

  const handleClickTextEdit = (event: any) => {
    if (event.target.ariaLabel === "bold") {
    }
  };

  const handleClickAltText = (event: any) => {
    setShowAltTextInput(true);
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
    if (targetDiv.current) {
      const rect = targetDiv.current.getBoundingClientRect();
      setHeight(rect.height);
      setWidth(rect.width);
      setPosition({ x: rect.x, y: rect.y });
    }
  }, [targetDiv.current]);

  useEffect(() => {
    if (props.blogItem.type.match("img")) {
      //build img tag
      const newAtt: Attributes = {
        // bold: props.blogItem.attributes?.bold,
        src: props.blogItem.attributes?.src,
        altText: props.blogItem.attributes?.altText,
        className: props.blogItem.attributes?.className,
        ["aria-label"]: "image",
        ref: targetImg,
        onClick: (e) => handleClickedImg(e),
        onMouseLeave: (e: any) => handleLeftImg(e),
        // onDoubleClick: showToolTip,
      };
      props.blogItem.changed = false;
      setAtt(newAtt);
    }

    // if (props.blogItem.type.match("iframe")) {
    //   //build img tag
    //   const newAtt: Attributes = {
    //     // bold: props.blogItem.attributes?.bold,
    //     src: props.blogItem.attributes?.src,
    //     altText: props.blogItem.attributes?.altText,
    //     className: props.blogItem.attributes?.className,
    //     ["aria-label"]: "frame",
    //     ref: targetImg,
    //     frameborder: 0,
    //     allowFullScreen,
    //     onClick: (e) => handleClickedImg(e),
    //     onMouseLeave: (e: any) => handleLeftImg(e),
    //     // onDoubleClick: showToolTip,
    //   };
    //   props.blogItem.changed = false;
    //   setAtt(newAtt);
    // }

    if (props.blogItem.type.match("p")) {
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
      props.blogItem.changed = false;
      setAtt(newAtt);
    }

    if (props.blogItem.type.match("")) {
    }
  }, [props.blogItem.changed == true]);

  return (
    <div className="mb-25 graf" key={props.keyNum}>
      {props.blogItem.type !== "iframe" &&
        props.blogItem.type !== "code" &&
        React.createElement(props.blogItem.type, att, blogEleValue)}
      <div className="youtubeVid">
        {props.blogItem.type === "iframe" && (
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
        )}
      </div>

      {props.blogItem.type === "code" && (
        <CodeSyntaxBox
          codeString={props.blogItem.value}
          language={props.blogItem.language}
          keyNum={props.keyNum}
          handlelangaugeselect={props.handlelangaugeselect!}
        />
      )}
      <Overlay target={targetDiv.current} show={show} placement="top">
        {(props) => (
          <Tooltip className="displayOverany" id="tooltip-top" {...props}>
            <TextOverlayIcons handleTextOverlayClick={handleClickTextEdit} />
          </Tooltip>
        )}
      </Overlay>
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
