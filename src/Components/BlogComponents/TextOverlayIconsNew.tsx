import React, { forwardRef, useState } from "react";
import BoldImg from "../../../public/assets/imgs/icons/text-changes/bold-svgrepo-com.svg";
import ItalicsImg from "../../../public/assets/imgs/icons/text-changes/italics-svgrepo-com.svg";
import LinkImg from "../../../public/assets/imgs/icons/text-changes/link-3-svgrepo-com.svg";
import QuotesImg from "../../../public/assets/imgs/icons/text-changes/quotes-svgrepo-com.svg";
import TitleImg from "../../../public/assets/imgs/icons/text-changes/title-svgrepo-com.svg";
import { Popover } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { blogSelector, loadBlogData } from "@/store/slices/blog-slice";

interface ITextOverlayIconsProps {
  handletextoverlayclick: (
    e: any,
    keyNum: number,
    selectedText: string
  ) => void;
  className: string;
  handlelinkset: (e: any) => void;
  handlekeydown: (e: any) => void;
  keynum: number;
  newRef?: React.Ref<HTMLDivElement>;
  onFocus?: (e: any) => void;
}

const TextOverlayIconsNew: React.FC<ITextOverlayIconsProps> = (props) => {
  const [clickedLink, setClickedLink] = useState(false);
  const blog = useSelector(blogSelector);
  const dispatch = useDispatch();

  const toggleClickedLink = (event: any) => {
    setClickedLink(true);
  };

  const handleClickedIcon = (event: any) => {
    const blogItems = [...blog.arrayOfBlogItems]; // Create a new array with the existing blog items
    const blogItem = { ...blogItems[props.keynum] }; // Create a new object with the blog item at index keyNum

    if (blogItem.attributes?.className?.includes("bold")) {
      blogItem.attributes!.className = blogItem.attributes!.className.replace(
        "bold",
        ""
      );
    } else {
      blogItem.attributes!.className = blogItem.attributes!.className + " bold";
    }

    blogItems[props.keynum] = blogItem; // Update the blog item at index keyNum in the new array

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
  };

  return (
    <div ref={props.newRef}>
      {clickedLink ? (
        <input
          onChange={props.handlelinkset}
          onKeyDown={props.handlekeydown}
          className="form-control"
          placeholder="...past a link"
        />
      ) : (
        <>
          <a
            className="m-20 format-text-icon hover-up add-content-icon-code"
            aria-label="title"
            onClick={(e: any) =>
              props.handletextoverlayclick(e, props.keynum, "")
            }
          >
            <div aria-label="title">
              <TitleImg
                width="15px"
                height="15px"
                fill="green"
                aria-label="title"
                pointerEvents="none"
                // className={`${dark ? "dark-icon" : "profile"} hover-up`}
              />
            </div>
          </a>
          <div
            className="m-20 format-text-icon hover-up"
            aria-label="bold"
            // onClick={(e: any) =>
            //   props.handletextoverlayclick(e, props.keynum, "")
            // }
            onClick={handleClickedIcon}
          >
            <div aria-label="bold">
              <BoldImg
                // onClick={handleFileGet}
                width="15px"
                height="15px"
                fill="green"
                aria-label="bold"
                pointerEvents="none"
                // className={`${dark ? "dark-icon" : "dark-icon"}`}
              />
            </div>
          </div>
          <div
            className="m-20 format-text-icon border-right hover-up"
            aria-label="italics"
            onClick={(e: any) =>
              props.handletextoverlayclick(e, props.keynum, "")
            }
          >
            <div aria-label="italics">
              <ItalicsImg
                width="15px"
                height="15px"
                fill="green"
                aria-label="italics"
                pointerEvents="none"
                // className={`${dark ? "dark-icon" : "profile"} hover-up mr-10`}
              />
            </div>
          </div>
          <div
            className="m-20 format-text-icon hover-up"
            aria-label="link"
            onClick={(e: any) =>
              // props.handletextoverlayclick(e, props.keynum)
              toggleClickedLink(e)
            }
          >
            <div aria-label="link">
              <LinkImg
                width="15px"
                height="15px"
                fill="green"
                aria-label="link"
                // className={`${dark ? "dark-icon" : "profile"} hover-up mr-10`}
              />
            </div>
          </div>
          <div
            className="m-20 format-text-icon hover-up add-content-icon-code"
            aria-label="quotes"
            onClick={(e: any) =>
              props.handletextoverlayclick(e, props.keynum, "")
            }
          >
            <QuotesImg
              width="15px"
              height="15px"
              fill="green"
              // className={`${dark ? "dark-icon" : "profile"} hover-up`}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default TextOverlayIconsNew;
