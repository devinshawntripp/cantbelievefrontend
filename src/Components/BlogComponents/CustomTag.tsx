import React, { useRef } from "react";

const CustomTag: any = (customTagProps: any) => {
  const ptagref = useRef(customTagProps.value);

  return React.createElement(
    `${customTagProps.htmlTag}`,
    {
      contentEditable: "true",
      suppressContentEditableWarning: true,
      className:
        customTagProps.blogItem.attributes?.className +
        " blog-item-p font-xl text",
      ref: customTagProps.targetDiv,
      dangerouslySetInnerHtml: { __html: ptagref.current },
      onInput: (e: any) => customTagProps.handleChange(e),
    },

    //   null,
    [
      // `${customTagProps.text ? customTagProps.text : ""}`,
      //   customTagProps.extraTags &&
      //     customTagProps.extraTags.map((extraT: any, index: any) => {
      //       console.log(extraT);
      //       return (
      //         <CustomTag
      //           key={index}
      //           htmlTag={extraT.tag.tag}
      //           text={extraT.text}
      //           // extraTags={extraT.tag.extraTags}
      //         />
      //       );
      //     }),
    ]
  );
};
