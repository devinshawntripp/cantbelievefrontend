import React from "react";
import BoldImg from "../../public/assets/imgs/icons/text-changes/bold-svgrepo-com.svg";
import ItalicsImg from "../../public/assets/imgs/icons/text-changes/italics-svgrepo-com.svg";
import LinkImg from "../../public/assets/imgs/icons/text-changes/link-3-svgrepo-com.svg";
import QuotesImg from "../../public/assets/imgs/icons/text-changes/quotes-svgrepo-com.svg";
import TitleImg from "../../public/assets/imgs/icons/text-changes/title-svgrepo-com.svg";

const TextOverlayIcons = () => {
  const handleClick = (event: any) => {};

  return (
    <div className="d-flex">
      <label htmlFor="file">
        <div className="m-20 format-text-icon hover-up">
          <BoldImg
            // onClick={handleFileGet}
            width="15px"
            height="15px"
            fill="green"

            // className={`${dark ? "dark-icon" : "dark-icon"}`}
          />
        </div>
      </label>
      <div className="m-20 format-text-icon border-right hover-up">
        <ItalicsImg
          width="15px"
          height="15px"
          fill="green"
          // className={`${dark ? "dark-icon" : "profile"} hover-up mr-10`}
        />
      </div>
      <div className="m-20 format-text-icon hover-up">
        <LinkImg
          width="15px"
          height="15px"
          fill="green"
          // className={`${dark ? "dark-icon" : "profile"} hover-up mr-10`}
        />
      </div>
      <div className="m-20 format-text-icon hover-up add-content-icon-code">
        <QuotesImg
          width="15px"
          height="15px"
          fill="green"
          // className={`${dark ? "dark-icon" : "profile"} hover-up`}
        />
      </div>
      <div className="m-20 format-text-icon hover-up add-content-icon-code">
        <TitleImg
          width="15px"
          height="15px"
          fill="green"
          // className={`${dark ? "dark-icon" : "profile"} hover-up`}
        />
      </div>
    </div>
  );
};

export default TextOverlayIcons;
