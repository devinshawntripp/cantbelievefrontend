import { blogSelector, loadBlogData } from "@/store/slices/blog-slice";
import React, { ChangeEvent, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

interface ICustomInnerTagProps extends React.HTMLAttributes<HTMLDivElement> {
  htmlTag?: string;
  keyNum: number;
  key: number;
  value: string;
  href?: string;
}

const CustomInnerTag: React.FC<ICustomInnerTagProps> = (props) => {
  const blog = useSelector(blogSelector);
  const dispatch = useDispatch();

  const handleChange = (event: ChangeEvent<HTMLDivElement>) => {
    console.log(event);
    // setBlogEleValue(event.target.innerHTML);
    // targetDiv.current!.innerHTML = event.currentTarget.innerHTML;
    // console.log("here");

    const blogItems = [...blog.arrayOfBlogItems]; // Create a new array with the existing blog items
    const blogItem = { ...blogItems[props.keyNum] }; // Create a new object with the blog item at index keyNum
    //find the first string
    // var value =
    //   Array(blogItem.value).find((element) => typeof element === "string") ||
    //   "";
    // let index = value === "" ? 0 : blogItem.value.indexOf(value);
    // value = event.target.innerHTML;
    const newValue = [...blogItem.value];

    if (typeof newValue[props.key] === "string") {
      newValue[props.key] = event.target.innerHTML;
    } else {
      newValue[props.key].value = event.target.innerHTML;
    }

    console.log("NEW VALUE: ", newValue);

    console.log("HERE IS SOME ARRAY: ", blogItem.value);
    // blogItem.value[props.key] = event.target.innerHTML; // Update the value property of the blog item
    blogItem.value = newValue;
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

    // Save the current selection to be used later

    // props.onChange(event, props.keyNum);
  };

  return React.createElement(
    `${props.htmlTag}`,
    {
      contentEditable: "true",
      suppressContentEditableWarning: true,
      href: props.href,
      onInput: (e: any) => handleChange(e),
      className: props.htmlTag === "a" && "blog-link",
      ...props,
      // ref: customTagProps.targetDiv,
      // dangerouslySetInnerHtml: { __html: ptagref.current },
    },

    //   null,
    props.value
  );
};

export default CustomInnerTag;
