import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import myimage from "../../images/product_research.png";
import Head from "next/head";
import { getPostById } from "../../api/index.js";

interface HtmlTagSchema {
  tag: string;
  class?: string;
  id?: string;
  src?: string;
  href?: string;
  name?: string;
  content?: string;
  extraTags?: Array<{
    tag: HtmlTagSchema;
    text?: string;
  }>;
}

interface TagSchema {
  _id: string;
  title?: string;
  author?: string;

  metaContent: Map<HtmlTagSchema, string>;
  content: Map<HtmlTagSchema, string>;
  date: string;
}

export default function BlogItem() {
  let router = useRouter();
  const [post, setPost] = useState<TagSchema>();

  console.log(router.query);
  const { blog } = router.query;

  const CustomTag: any = (props: any) => {
    // console.log(props);
    const propsPassed = {
      [props.class && "className"]: props.class,
      [props.src && "src"]: props.src,
    };

    return React.createElement(
      `${props.htmlTag}`,
      propsPassed,

      //   null,
      [
        `${props.text ? props.text : ""}`,
        props.extraTags &&
          props.extraTags.map((extraT: any, index: any) => {
            console.log(extraT);
            return (
              <CustomTag
                key={index}
                htmlTag={extraT.tag.tag}
                text={extraT.text}
                extraTags={extraT.tag.extraTags}
              />
            );
          }),
      ]
    );
  };

  useEffect(() => {
    if (!router.isReady) return;
    // console.log(router);
    console.log("GETTTING POSTS");
    const getPosts = async () => {
      //   console.log(blog);
      await getPostById(blog)
        .then((res) => {
          //   console.log(res);
          setPost(res.data.post);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    console.log("GETTTING POSTS");
    getPosts();
  }, [router.isReady]);

  return (
    <div className="about_container_style">
      <Head>
        <title>{post && post.title}</title>
        {post &&
          Array.from(post.metaContent).map((value: any, index) => {
            console.log("name: " + value.tag.name);
            return React.createElement(
              `${value.tag.tag}`,
              {
                //   `name=${value.tag.name} content: ${value.tag.content}`
                name: value.tag.name,
                content: value.tag.content,
              },

              //   null,
              `${value.text ? value.text : ""}`
            );
          })}
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
      </Head>
      {post && <h1 className="title">{post.title}</h1>}
      {post && <p className="author">{post.author}</p>}
      {post && <p className="date">{new Date(post.date).toUTCString()}</p>}
      {post &&
        Array.from(post.content).map((text: any, index) => {
          console.log(text);
          return (
            <CustomTag
              key={index}
              htmlTag={text.tag.tag}
              text={text.text}
              extraTags={text.tag.extraTags}
              class={text.tag.class}
            />
          );
        })}
    </div>
  );
}
