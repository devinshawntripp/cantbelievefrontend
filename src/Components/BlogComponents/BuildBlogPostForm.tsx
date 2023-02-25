import React from "react";

interface IBuildBlogPostForm {}

// frontFacingPic: File;
// summary: string;
// likes: number;
// dislikes: number;
// views: number;
// author: string;
// authorPic?: File;

const BuildBlogPostForm: React.FC<IBuildBlogPostForm> = (props) => {
  return (
    <form>
      <div className="form-group">
        <label>Title</label>
        <input className="form-control"></input>
      </div>

      <div className="form-group">
        <label>Front Facing Pic</label>
        <input type="file" className="form-control" />
      </div>

      <div className="form-group">
        <label>Summary</label>
        <textarea rows={10} className="form-control textarea"></textarea>
      </div>
      <div className="row">
        <a className="btn btn-brand-1 mt-10">Submit Post</a>
      </div>
    </form>
  );
};

export default BuildBlogPostForm;
