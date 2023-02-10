import React, { useState } from "react";

const ReadMore = (props: { children: any; class: string }) => {
  const text: string = String(props.children.props.children);
  const [isReadMore, setIsReadMore] = useState<boolean>(true);
  const toggleReadMore = () => {
    console.log(text.length);
    setIsReadMore(!isReadMore);
  };
  return (
    <p className={props.class}>
      {isReadMore ? String(text).slice(0, 150) : text}
      {text.length > 150 && (
        <span onClick={toggleReadMore} className="light-text">
          {isReadMore ? "...read more" : " show less"}
        </span>
      )}
    </p>
  );
};

export default ReadMore;
