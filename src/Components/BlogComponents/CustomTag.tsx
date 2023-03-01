import useGetSelectionAndSetShow from "@/hooks/useGetSelectionAndSetShow";
import { blogSelector, loadBlogData } from "@/store/slices/blog-slice";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomInnerTag from "./CustomInnerTags";

interface ICustomTagProps {
  htmlTag: string;
  keyNum: number;
  customref: React.Ref<any>;
  overlayIconsRef: React.RefObject<HTMLDivElement>;
}

const CustomTag: React.FC<ICustomTagProps> = (props) => {
  const blog = useSelector(blogSelector);
  const dispatch = useDispatch();
  const currentSelection = useRef<Selection | null>(null);
  const [index, setIndex] = useState(0);
  const divRef = useRef<HTMLDivElement>(null);
  const ptagref = useRef(null);
  const [ghostValue, setGhostValue] = useState("");

  // const [selection, show, setShow] = useGetSelectionAndSetShow(
  //   divRef,
  //   props.overlayIconsRef,
  //   false
  // );

  useEffect(() => {
    const blogItems = [...blog.arrayOfBlogItems]; // Create a new array with the existing blog items
    const blogItem = { ...blogItems[props.keyNum] };
    var value =
      Array(blogItem.value).find((element) => typeof element === "string") ||
      "";

    value !== "" && setIndex(blogItem.value.indexOf(value));

    setGhostValue(
      blogItem.value.indexOf(value) !== -1
        ? blogItem.value.at(blogItem.value.indexOf(value))
        : blogItem.value.at(0)
    );
  }, []);

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

    let index = value === "" ? 0 : blogItem.value.indexOf(value);
    value = event.target.innerHTML;
    const newValue = [...blogItem.value];

    newValue[index] = event.target.innerHTML;

    console.log(
      "HERE IS SOME VALUE: ",
      blogItem.value,
      "HERE IS THE ARRAY : ",
      blogItem.value.at(index)
    );
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
      className:
        blog.arrayOfBlogItems.at(props.keyNum)!.attributes?.className +
        " blog-item-p font-xl text",
      // ref: currentSelection,
      ref: props.customref,
      // dangerouslySetInnerHtml: { __html: ptagref.current },
      onInput: (e: any) => handleChange(e),
      ...props,
    },

    //   null,
    [
      // `${
      //   blog.arrayOfBlogItems.at(props.keyNum)!.value.at(index)
      //     ? blog.arrayOfBlogItems.at(props.keyNum)!.value
      //     : ""
      // }`,
      // `${ghostValue}`,
      blog.arrayOfBlogItems.at(props.keyNum)!.value &&
        blog.arrayOfBlogItems
          .at(props.keyNum)!
          .value!.map((extraT: any, indexinner: any) => {
            console.log(extraT);
            if (typeof extraT === "string") {
              return extraT;
            } else {
              return (
                <CustomInnerTag
                  keyNum={props.keyNum}
                  key={indexinner}
                  htmlTag={extraT.type}
                  value={extraT.value}
                  href={extraT.attributes.href}
                />
              );
            }
          }),
    ]
  );
};

export default CustomTag;
