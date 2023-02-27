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
  handlelinkset: (e: any) => void;
  handleChange: (event: any) => void;
  handlekeydown: (event: any) => void;
  selectedText?: string;
  className: string;
  keynum: number;
  newRef?: React.Ref<HTMLDivElement>;
  onFocus?: (e: any) => void;
}

export type Ref = HTMLDivElement;

const TextOverlayIcons = forwardRef<Ref, ITextOverlayIconsProps>(
  (props, ref) => {
    const [clickedLink, setClickedLink] = useState(false);
    const [link, setLink] = useState("");

    const blog = useSelector(blogSelector);
    const dispatch = useDispatch();

    const toggleClickedLink = (event: any) => {
      setClickedLink(true);
    };

    const handleChange = (e: any) => {
      const blogItems = [...blog.arrayOfBlogItems]; // Create a new array with the existing blog items
      const blogItem = { ...blogItems[props.keynum] }; // Create a new object with the blog item at index keyNum
      const att = { ...blogItem.attributes };

      setLink(e.target.value);
    };

    const handleClickedIcon = (event: any) => {
      const blogItems = [...blog.arrayOfBlogItems]; // Create a new array with the existing blog items
      const blogItem = { ...blogItems[props.keynum] }; // Create a new object with the blog item at index keyNum
      const att = { ...blogItem.attributes };

      if (event.target.ariaLabel === "title") {
        if (blogItem.type === "h1") {
          blogItem.type = "p";
        } else {
          blogItem.type = "h1";
        }
        console.log("TITLE CLICKED");
      }

      if (event.target.ariaLabel === "bold") {
        if (att.className?.includes("bold")) {
          att!.className = att!.className.replace("bold", "");
        } else {
          att!.className = att!.className + " bold";
        }
        blogItem.attributes = att;
      }

      if (event.target.ariaLabel === "italics") {
        if (att.className?.includes("italics")) {
          att!.className = att!.className.replace("fst-italic fw-lighter", "");
        } else {
          att!.className = att!.className + "fst-italic fw-lighter";
        }
        blogItem.attributes = att;
      }

      blogItem.changed = true;
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

    // console.log(blog);

    const handleKeyDown = (e: any) => {
      if (e.key === "Enter") {
        console.log("ENTER KEY PRESSED", props.selectedText);
        const blogItems = [...blog.arrayOfBlogItems]; // Create a new array with the existing blog items
        const blogItem = { ...blogItems[props.keynum] }; // Create a new object with the blog item at index keyNum
        const att = { ...blogItem.attributes };
        const innerTags = { ...blogItem.possibleInnerTags };

        console.log(
          "lakjdklfaj lkdsjf alksdj fskdj flk: ",
          blogItem.value.includes(props.selectedText)
        );

        blogItem.value.replace(
          props.selectedText,
          `<a className="blog-link" href=${link}>${props.selectedText}</a>`
        );

        blogItems[props.keynum] = blogItem;

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
      }

      // if (e.key === "enter") {
      //   blogItem.possibleInnerTags = [...blogItem.possibleInnerTags, innerTags] | [];
      // }
    };

    return (
      <div ref={props.newRef}>
        <Popover id="popover-positioned-right" ref={ref} {...props}>
          {clickedLink ? (
            <input
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="form-control"
              placeholder="...past a link"
            />
          ) : (
            <>
              <a
                className="m-20 format-text-icon hover-up add-content-icon-code"
                aria-label="title"
                onClick={handleClickedIcon}
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
                onClick={handleClickedIcon}
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
                onClick={handleClickedIcon}
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
        </Popover>
      </div>
    );
  }
);

export default TextOverlayIcons;
