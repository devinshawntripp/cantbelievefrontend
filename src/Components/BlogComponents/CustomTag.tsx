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

  const [ghostValue, setGhostValue] = useState<Array<any>>([]);

  const [totalTagLength, setTotalTagLength] = useState();

  useEffect(() => {
    const blogItems = [...blog.arrayOfBlogItems]; // Create a new array with the existing blog items
    const blogItem = { ...blogItems[props.keyNum] };

    var newValues: any = [];
    blogItem.value.forEach((bValue) => {
      if (typeof bValue === "string") {
        newValues.push(bValue);
      } else {
        newValues.push(bValue.value);
      }
    });

    setGhostValue([...newValues]);
  }, []);

  const handleKeyDown = (event: KeyboardEvent) => {
    const blogItems = [...blog.arrayOfBlogItems]; // Create a new array with the existing blog items
    const blogItem = { ...blogItems[props.keyNum] }; // Create a new object with the blog item at index keyNum
    console.log("CURRENT BLOG ITEMS:", blogItems);
    if (event.key === "Enter") {
      event.preventDefault();
      const carretPos = getCaretCharacterOffsetWithin(event.target);
      console.log("ENTER KEY PRESSED INSIDE OF DIV", carretPos);

      console.log("CURRENT BLOG ITEMS:", blogItems);
      var totalLength = 0;
      for (var i = 0; i < blogItem.value.length; i++) {
        const val = blogItem.value.at(i);
        if (typeof val === "string") {
          const lengthOfVal = val.length;
          totalLength += lengthOfVal;
        } else {
          const lengthOfVal = val.value.length;
          totalLength += lengthOfVal;
        }
      }
      console.log(totalLength, " TOTAL LENGTH");

      //take whatever is to the right of the cursor
      //if it is empty to the right of the cursor then create a new tag altogether

      if (carretPos === totalLength) {
      } else {
        const value = [...blogItem.value];
        var totalLengthAgain = 0;
        var newIndex = 0;
        for (var i = 0; i < blogItem.value.length; i++) {
          const val = blogItem.value.at(i);

          if (typeof val === "string") {
            const lengthOfVal = val.length;
            console.log("LENGTH OF VAL: ", lengthOfVal);
            totalLengthAgain += lengthOfVal;
            console.log("TOTAL LENGTH: ", totalLengthAgain);
            if (carretPos <= totalLengthAgain) {
              newIndex = i;
              console.log("FOUND THAT ITS LOWER");
              break;
            }
          } else {
            const lengthOfVal = val.value.length;
            totalLengthAgain += lengthOfVal;
            if (carretPos <= totalLengthAgain) {
              newIndex = i;
              break;
            }
          }
        }
        var i = 0;
        var prevLength = blogItem.value.at(i).length;
        while (prevLength < carretPos) {
          if (typeof blogItem.value.at(i) === "string") {
            prevLength += blogItem.value.at(i).length;
          } else {
            prevLength += blogItem.value.at(i).value.length;
          }
          i++;
        }
        console.log("PREV LENGTH: ", prevLength);

        const strLeft =
          i === 0
            ? blogItem.value.at(i).slice(0, carretPos)
            : blogItem.value.at(i).slice(prevLength, carretPos);
        const strRight = blogItem.value
          .at(i)
          .slice(carretPos, blogItem.value.at(i).length);

        const newValue = [...blogItem.value];
        newValue[i] = strLeft;
        console.log("newValue: ", newValue);

        blogItem.value = [...newValue];

        var newBlogItem: IBlogItem = {
          type: "p",
          value: strRight,
          changed: false,
        };

        blogItems[props.keyNum] = blogItem;

        console.log("CURRENT BLOG ITEMS:", blogItems);

        const newBlogItems = blogItems.splice(props.keyNum + 1, 0, newBlogItem);
        console.log("NEW BLOG ITEMS: ", newBlogItems);

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
            arrayOfBlogItems: blog.arrayOfBlogItems,
          })
        );

        console.log("STR LEFT: ", strLeft);
        console.log("STR RIGHT: ", strRight);
      }

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
          arrayOfBlogItems: blog.arrayOfBlogItems,
        })
      );
    }
  };

  const handleChange = (event: ChangeEvent<HTMLDivElement>) => {
    // setBlogEleValue(event.target.innerHTML);
    // targetDiv.current!.innerHTML = event.currentTarget.innerHTML;
    const carretPos = getCaretCharacterOffsetWithin(event.target);

    console.log("CARRET POS: ", carretPos);

    const blogItems = [...blog.arrayOfBlogItems]; // Create a new array with the existing blog items
    const blogItem = { ...blogItems[props.keyNum] }; // Create a new object with the blog item at index keyNum
    console.log("CURRENT BLOG ITEMS CHANGE:", blogItems);
    var totalLength = 0;
    var newIndex = 0;
    for (var i = 0; i < blogItem.value.length; i++) {
      const val = blogItem.value.at(i);

      if (typeof val === "string") {
        const lengthOfVal = val.length;
        console.log("LENGTH OF VAL: ", lengthOfVal);
        totalLength += lengthOfVal;
        console.log("TOTAL LENGTH: ", totalLength);
        if (carretPos <= totalLength) {
          newIndex = i;
          console.log("FOUND THAT ITS LOWER");
          break;
        }
      } else {
        const lengthOfVal = val.value.length;
        totalLength += lengthOfVal;
        if (carretPos <= totalLength) {
          newIndex = i;
          break;
        }
      }
    }

    console.log("NEW INDEX: ", newIndex);

    const newValue = [...blogItem.value];

    console.log("EVVENT: ", event.target.children.item(newIndex)?.innerHTML);

    if (typeof newValue[newIndex] === "string") {
      newValue[newIndex] = event.target.children.item(newIndex)?.innerHTML;
    } else {
      const newNotStringVal = { ...newValue[newIndex] };

      newNotStringVal.value = event.target.children.item(newIndex)?.innerHTML;

      newValue[newIndex] = newNotStringVal;
    }

    console.log("NEW VALUE: ", newValue);

    console.log("HERE IS SOME ARRAY: ", blogItem.value);
    // blogItem.value[props.key] = event.target.innerHTML; // Update the value property of the blog item
    // blogItem.value = newValue;
    // blogItems[props.keyNum] = blogItem; // Update the blog item at index keyNum in the new array

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

  function getCaretCharacterOffsetWithin(element: any) {
    var caretOffset = 0;
    var doc = element.ownerDocument || element.document;
    var win = doc.defaultView || doc.parentWindow;
    var sel;
    if (typeof win.getSelection !== "undefined") {
      sel = win.getSelection();
      if (sel.rangeCount > 0) {
        var range = win.getSelection().getRangeAt(0);
        var preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        caretOffset = preCaretRange.toString().length;
      }
    } else if ((sel = doc.selection) && sel.type !== "Control") {
      var textRange = sel.createRange();
      var preCaretTextRange = doc.body.createTextRange();
      preCaretTextRange.moveToElementText(element);
      preCaretTextRange.setEndPoint("EndToEnd", textRange);
      caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
  }

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
      onKeyDown: (e: any) => handleKeyDown(e),
      // ...props,
    },

    [
      blog.arrayOfBlogItems.at(props.keyNum)!.value &&
        blog.arrayOfBlogItems.at(props.keyNum)!.value.length > 0 &&
        blog.arrayOfBlogItems
          .at(props.keyNum)!
          .value!.map((extraT: any, indexinner: any) => {
            console.log(extraT);

            if (typeof extraT !== "undefined" && typeof extraT === "string") {
              // return ghostValue.at(indexinner);
              // return extraT;
              return (
                <CustomInnerTag
                  keyNum={props.keyNum}
                  key={indexinner}
                  htmlTag="span"
                  value={ghostValue.at(indexinner)}
                />
              );
            } else if (typeof extraT !== "undefined") {
              return (
                <CustomInnerTag
                  keyNum={props.keyNum}
                  key={indexinner}
                  htmlTag={extraT.type}
                  value={ghostValue.at(indexinner)}
                  href={extraT.attributes.href}
                />
              );
            }
          }),
    ]
  );
};

export default CustomTag;
