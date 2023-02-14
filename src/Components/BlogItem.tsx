import React, { useEffect, useState } from "react";

interface Attributes {
  bold?: false;
  src?: string;
  altText?: string;
  contentEditable?: string;
  className?: string;
}

interface IBlogItem {
  type: string;
  value: any;
  attributes?: Attributes;
  changed: boolean;
}

const BlogItem = (props: { blogItem: IBlogItem; key: number }) => {
  const [att, setAtt] = useState<Attributes>();
  const [blogEleValue, setBlogEleValue] = useState(props.blogItem.value);

  const handleChange = (event: any) => {
    setBlogEleValue(event.target.value);
  };

  useEffect(() => {
    if (props.blogItem.type.match("img")) {
      //build img tag
      const newAtt: Attributes = {
        bold: props.blogItem.attributes?.bold,
        src: props.blogItem.attributes?.src,
        altText: props.blogItem.attributes?.altText,
        className: props.blogItem.attributes?.className,
      };
      props.blogItem.changed = false;
      setAtt(newAtt);
    }

    if (props.blogItem.type.match("p")) {
      const newAtt: Attributes = {
        bold: props.blogItem.attributes?.bold,
        src: props.blogItem.attributes?.src,
        altText: props.blogItem.attributes?.altText,
        contentEditable: "true",
        className: props.blogItem.attributes?.className + " blog-item-p",
      };
      props.blogItem.changed = false;
      setAtt(newAtt);
    }
  }, [props.blogItem.changed == true]);

  return (
    <div className="mb-50">
      {" "}
      {React.createElement(props.blogItem.type, att, blogEleValue)}
      {props.blogItem.type != "img" && (
        <input
          type="hidden"
          className="form-control"
          onChange={handleChange}
          value={blogEleValue}
        />
      )}
    </div>
  );
};

export default BlogItem;
