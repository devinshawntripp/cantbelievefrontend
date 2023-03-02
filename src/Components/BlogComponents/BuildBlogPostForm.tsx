import { appSelector, loadAppData } from "@/store/slices/app-slice";
import { blogSelector, loadBlogData } from "@/store/slices/blog-slice";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface IBuildBlogPostForm {}

const BuildBlogPostForm: React.FC<IBuildBlogPostForm> = (props) => {
  const dispatch = useDispatch();
  const blog = useSelector(blogSelector);
  const app = useSelector(appSelector);
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File>();

  const handleChange = (event: any) => {
    if (event.target.ariaLabel === "title") {
      console.log("EVENT: ", event);

      dispatch(
        loadBlogData({
          title: event.target.value,
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
    if (event.target.ariaLabel === "front-facing-pic") {
      console.log(event);
      // fileRef.current?.files && setFile(fileRef.current.files[0]);
      setFile(event.target.files[0]);

      // dispatch(
      //   loadBlogData({
      //     title: blog.title,
      //     frontFacingPic: fileRef.current?.files && fileRef.current?.files[0],
      //     summary: blog.summary,
      //     likes: 0,
      //     dislikes: 0,
      //     views: 0,
      //     author: blog.author,
      //     authorPic: undefined,
      //     arrayOfBlogItems: blog.arrayOfBlogItems,
      //   })
      // );
    }
    if (event.target.ariaLabel === "summary") {
      dispatch(
        loadBlogData({
          title: blog.title,
          frontFacingPic: blog.frontFacingPic,
          summary: event.target.value,
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

  const handleSubmit = async (event: any) => {
    const formData = new FormData();

    if (file) {
      formData.append("title", String(blog.title));
      formData.append("frontFacingPic", file);
      formData.append("summary", String(blog.title));
      formData.append("likes", String(blog.likes));
      formData.append("dislikes", String(blog.dislikes));
      formData.append("views", String(blog.views));
      formData.append("author", String(blog.author));
      formData.append("authorPic", String(blog.author));
      formData.append(
        "arrayOfBlogItems",
        JSON.stringify(blog.arrayOfBlogItems)
      );
    }

    const post = {
      title: blog.title,
      frontFacingPic: blog.frontFacingPic,
      summary: blog.summary,
      likes: 0,
      dislikes: 0,
      views: 0,
      author: app.email && "Anonymous",
      authorPic: undefined,
      arrayOfBlogItems: blog.arrayOfBlogItems,
    };

    await axios
      .post(`${process.env.NEXT_PUBLIC_APP_URL}/blog/add-blog-post`, formData)
      .then((success) => console.log("SUCCESSFULLY POSTED"))
      .catch((error) => {
        console.log("SOME ERROR HAPPENED: ", error);
      });
  };

  return (
    <form>
      <div className="form-group">
        <label>Title</label>
        <input
          aria-label="title"
          className="form-control"
          onChange={handleChange}
          value={blog.title}
        ></input>
      </div>

      <div className="form-group">
        <label>Front Facing Pic</label>
        <input
          aria-label="front-facing-pic"
          className="form-control"
          type="file"
          ref={fileRef}
          onChange={handleChange}
          // value={blog.frontFacingPic[0]}
        />
      </div>

      <div className="form-group">
        <label>Summary</label>
        <textarea
          aria-label="summary"
          className="form-control"
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="row">
        <a className="btn btn-brand-1 mt-10" onClick={handleSubmit}>
          Submit Post
        </a>
      </div>
    </form>
  );
};

export default BuildBlogPostForm;
