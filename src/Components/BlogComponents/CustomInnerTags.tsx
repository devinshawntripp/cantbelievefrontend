import { blogSelector, loadBlogData } from "@/store/slices/blog-slice";
import React, { ChangeEvent, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

interface ICustomInnerTagProps {
  htmlTag: string;
  keyNum: number;
  key: number;
  value: string;
  href: string;
}

const CustomInnerTag: React.FC<ICustomInnerTagProps> = (props) => {
  const blog = useSelector(blogSelector);
  const dispatch = useDispatch();

  const ptagref = useRef(null);

  const handleChange = (event: ChangeEvent<HTMLDivElement>) => {
    // setBlogEleValue(event.target.innerHTML);
    // targetDiv.current!.innerHTML = event.currentTarget.innerHTML;
    // console.log("here");

    const blogItems = [...blog.arrayOfBlogItems]; // Create a new array with the existing blog items
    const blogItem = { ...blogItems[props.keyNum] }; // Create a new object with the blog item at index keyNum
    //find the first string
    var value =
      Array(blogItem.value).find((element) => typeof element === "string") ||
      "";
    let index = blogItem.value.indexOf(value);
    value = event.target.innerHTML;
    blogItem.value[index] = event.target.innerHTML;
    console.log("HERE IS SOME VALUE: ", blogItem.value);
    // blogItem.value[props.key] = event.target.innerHTML; // Update the value property of the blog item
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

    // props.onChange(event, props.keyNum);
  };

  return React.createElement(
    `${props.htmlTag}`,
    {
      contentEditable: "true",
      suppressContentEditableWarning: true,
      href: props.href,
      className:
        blog.arrayOfBlogItems.at(props.keyNum)!.attributes?.className +
        " blog-link font-xl text",
      // ref: customTagProps.targetDiv,
      // dangerouslySetInnerHtml: { __html: ptagref.current },
      onInput: (e: any) => handleChange(e),
    },

    //   null,
    props.value
  );
};

export default CustomInnerTag;
