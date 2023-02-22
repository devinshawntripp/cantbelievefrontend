import React, { forwardRef } from "react";
import { Popover } from "react-bootstrap";
import Imageimg from "../../../public/assets/imgs/icons/image-svgrepo-com.svg";
import YoutubeImg from "../../../public/assets/imgs/icons/youtube-svgrepo-com.svg";
import EmbededImg from "../../../public/assets/imgs/icons/embed-post-svgrepo-com.svg";
import CodeImg from "../../../public/assets/imgs/icons/code-tag-svgrepo-com.svg";

interface IPopoverForContentProps {
  handlefileget: (e: any) => void;
  handleyoutubeembed: (e: any) => void;
  className: string;
  // youtubeFor: string;

  //   Ref: React.RefObject<HTMLDivElement>;
}

export type Ref = HTMLDivElement;

export const PopoverForContent = forwardRef<Ref, IPopoverForContentProps>(
  (props, ref) => {
    return (
      <Popover id="popover-positioned-right" ref={ref} {...props}>
        <label htmlFor="file">
          <div className="m-20 add-content-icon hover-up">
            <Imageimg
              onClick={props.handlefileget}
              width="15px"
              height="15px"
              fill="green"

              // className={`${dark ? "dark-icon" : "dark-icon"}`}
            />
          </div>
        </label>
        <div className="m-20 add-content-icon hover-up">
          <YoutubeImg
            width="15px"
            height="15px"
            fill="green"
            onClick={props.handleyoutubeembed}
            // for={props.youtubeFor}
            // className={`${dark ? "dark-icon" : "profile"} hover-up mr-10`}
          />
        </div>
        <div className="m-20 add-content-icon hover-up">
          <EmbededImg
            width="15px"
            height="15px"
            fill="green"
            // className={`${dark ? "dark-icon" : "profile"} hover-up mr-10`}
          />
        </div>
        <div className="m-20 add-content-icon hover-up add-content-icon-code">
          <CodeImg
            width="15px"
            height="15px"
            fill="green"
            // className={`${dark ? "dark-icon" : "profile"} hover-up`}
          ></CodeImg>
        </div>
      </Popover>
    );
  }
);

// export default PopoverForContent;
