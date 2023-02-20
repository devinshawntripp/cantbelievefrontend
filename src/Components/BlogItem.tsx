import React, { useEffect, useState, useRef, ChangeEvent } from "react";
import { Tooltip, Overlay } from "react-bootstrap";
import TextOverlayIcons from "./TextOverlayIcons";

interface Attributes {
  bold?: boolean;
  src?: string;
  altText?: string;
  contentEditable?: string;
  suppressContentEditableWarning?: string;
  className?: string;
  onDoubleClick?: (event: any) => void;
  handleTextOverlayClick?: (event: any) => void;
  ["aria-label"]?: string;
  ["aria-current"]?: string;
  ref?: React.RefObject<HTMLDivElement>;
  onInput?: (e: any) => void;
  type?: string;
  value?: string;
}

interface IBlogItem {
  type: string;
  value: any;
  attributes?: Attributes;
  changed: boolean;
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
        console.log(text);
        // Set the selected text state
        setSelectedText(text);
        setShow(true);
        console.log(show);

        // Get the coordinates of the selected text area
        const rect = window
          .getSelection()
          ?.getRangeAt(0)
          .getBoundingClientRect();

        setOffset(rect);

        // Do something with the coordinates, such as rendering a popup menu
        console.log(rect);
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
        console.log("fhjdhjdghjf ffhjgj");
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
}

const BlogItem: React.FC<IBlogItemProps> = (props) => {
  const [att, setAtt] = useState<Attributes>();
  const [blogEleValue, setBlogEleValue] = useState(props.blogItem.value);
  const targetDiv = useRef<HTMLDivElement>(null);
  const [offset, show, setShow] = useOutsideAlerter(targetDiv, false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

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
        bold: props.blogItem.attributes?.bold,
        src: props.blogItem.attributes?.src,
        altText: props.blogItem.attributes?.altText,
        className: props.blogItem.attributes?.className,
        ["aria-label"]: "image",
        ref: targetDiv,
        // onDoubleClick: showToolTip,
      };
      props.blogItem.changed = false;
      setAtt(newAtt);
    }

    if (props.blogItem.type.match("p")) {
      const newAtt: Attributes = {
        bold: props.blogItem.attributes?.bold,
        src: props.blogItem.attributes?.src,
        contentEditable: "true",
        suppressContentEditableWarning: "true",
        className:
          props.blogItem.attributes?.className + " blog-item-p font-xl",
        ["aria-label"]: "text",
        ref: targetDiv,
        // value: blogEleValue,
        // onInput: (e: any) => props.onChange(e, props.keyNum),
        onInput: (e: any) => handleChange(e),
        // type: "textarea",
        // onDoubleClick: showToolTip,
      };
      props.blogItem.changed = false;
      setAtt(newAtt);
    }
  }, [props.blogItem.changed == true]);

  return (
    <div className="mb-25 graf" key={props.keyNum}>
      {props.blogItem.type.match("p") && (
        <p
          onInput={(e: any) => handleChange(e)}
          className={`${props.blogItem.attributes?.className} blog-item-p font-xl`}
          contentEditable="true"
          suppressContentEditableWarning={true}
          ref={targetDiv}
        >
          {blogEleValue}
        </p>
      )}
      {/* {React.createElement(props.blogItem.type, att, blogEleValue)} */}
      {/* {props.blogItem.type != "img" && (
        <input
          type="hidden"
          className="form-control"
          //   onChange={(e: any) => props.onChange(e, props.keyNum)}
          onChange={handleChange}
          //   style={{
          //     position: "absolute",
          //     top: position.y,
          //     left: position.x,
          //     height: height,
          //     width: width,
          //     zIndex: 100000000000,
          //   }}
          // value={"lksjdlfkjalskdjfsd"}
          //   value={props.blogItem.value}
          value={blogEleValue}
        />
      )} */}
      <Overlay target={targetDiv.current} show={show} placement="top">
        {(props) => (
          <Tooltip className="displayOverany" id="tooltip-top" {...props}>
            <TextOverlayIcons handleTextOverlayClick={handleClickTextEdit} />
          </Tooltip>
        )}
      </Overlay>
    </div>
  );
};

export default BlogItem;
