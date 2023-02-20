import React from "react";
import BoldImg from "../../public/assets/imgs/icons/text-changes/bold-svgrepo-com.svg";
import ItalicsImg from "../../public/assets/imgs/icons/text-changes/italics-svgrepo-com.svg";
import LinkImg from "../../public/assets/imgs/icons/text-changes/link-3-svgrepo-com.svg";
import QuotesImg from "../../public/assets/imgs/icons/text-changes/quotes-svgrepo-com.svg";
import TitleImg from "../../public/assets/imgs/icons/text-changes/title-svgrepo-com.svg";

const TextOverlayIcons = (props: {
  handleTextOverlayClick: (event: any) => void;
}) => {
  return (
    <div className="d-flex">
      <label htmlFor="file">
        <div
          className="m-20 format-text-icon hover-up"
          aria-label="bold"
          onClick={props.handleTextOverlayClick}
        >
          <BoldImg
            // onClick={handleFileGet}
            width="15px"
            height="15px"
            fill="green"

            // className={`${dark ? "dark-icon" : "dark-icon"}`}
          />
        </div>
      </label>
      <div
        className="m-20 format-text-icon border-right hover-up"
        aria-label="italics"
        onClick={props.handleTextOverlayClick}
      >
        <ItalicsImg
          width="15px"
          height="15px"
          fill="green"
          // className={`${dark ? "dark-icon" : "profile"} hover-up mr-10`}
        />
      </div>
      <div
        className="m-20 format-text-icon hover-up"
        aria-label="link"
        onClick={props.handleTextOverlayClick}
      >
        <LinkImg
          width="15px"
          height="15px"
          fill="green"
          // className={`${dark ? "dark-icon" : "profile"} hover-up mr-10`}
        />
      </div>
      <div
        className="m-20 format-text-icon hover-up add-content-icon-code"
        aria-label="quotes"
        onClick={props.handleTextOverlayClick}
      >
        <QuotesImg
          width="15px"
          height="15px"
          fill="green"
          // className={`${dark ? "dark-icon" : "profile"} hover-up`}
        />
      </div>
      <div
        className="m-20 format-text-icon hover-up add-content-icon-code"
        aria-label="italics"
        onClick={props.handleTextOverlayClick}
      >
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
