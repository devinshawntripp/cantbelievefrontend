import React, { useState } from "react";

interface ISearchMenuProps {}

const SearchMenu: React.FC<ISearchMenuProps> = (props) => {
  const [active, setActive] = useState(1);

  const handleActive = (key: number) => {
    setActive(key);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center p-50 mt-20">
        <a
          className={
            active === 1
              ? "btn btn-border-brand-2 fs-5 active"
              : "btn btn-border-brand-2 fs-5"
          }
          onClick={(e: any) => handleActive(1)}
        >
          Newest
        </a>
        <a
          className={
            active === 2
              ? "btn btn-border-brand-2 fs-5 active"
              : "btn btn-border-brand-2 fs-5"
          }
          onClick={(e: any) => handleActive(2)}
        >
          oldest
        </a>
        <a
          className={
            active === 3
              ? "btn btn-border-brand-2 fs-5 active"
              : "btn btn-border-brand-2 fs-5"
          }
          onClick={(e: any) => handleActive(3)}
        >
          Most Liked
        </a>
        <a
          className={
            active === 4
              ? "btn btn-border-brand-2 fs-5 active"
              : "btn btn-border-brand-2 fs-5"
          }
          onClick={(e: any) => handleActive(4)}
        >
          Most Expensive
        </a>
        <a
          className={
            active === 5
              ? "btn btn-border-brand-2 fs-5 active"
              : "btn btn-border-brand-2 fs-5"
          }
          onClick={(e: any) => handleActive(5)}
        >
          Least Expensive
        </a>
        <a
          className={
            active === 6
              ? "btn btn-border-brand-2 fs-5 active"
              : "btn btn-border-brand-2 fs-5"
          }
          onClick={(e: any) => handleActive(6)}
        >
          Valentines gooch
        </a>
      </div>
      <div className="row filter justify-content-center align-items-center">
        <div className="col-lg-3">
          <label className="form-label">Sort By</label>
          <select className="form-control w-20" value="Popular">
            <option>Popular</option>
            <option>Highest To Lowest</option>
            <option>Lowest To Highest</option>
            <option>Newest</option>
          </select>
        </div>
        <div className="col-lg-3">
          <input className="form-control" />
        </div>
        <div className="col-lg-3">
          <input className="form-control" />
        </div>
        <div className="col-lg-3 ml-auto">
          <a className="btn btn-brand-1">Apply</a>
        </div>
      </div>
    </>
  );
};

export default SearchMenu;
