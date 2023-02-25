import React, { forwardRef, useState } from "react";
import BoldImg from "../../../public/assets/imgs/icons/text-changes/bold-svgrepo-com.svg";
import ItalicsImg from "../../../public/assets/imgs/icons/text-changes/italics-svgrepo-com.svg";
import LinkImg from "../../../public/assets/imgs/icons/text-changes/link-3-svgrepo-com.svg";
import QuotesImg from "../../../public/assets/imgs/icons/text-changes/quotes-svgrepo-com.svg";
import TitleImg from "../../../public/assets/imgs/icons/text-changes/title-svgrepo-com.svg";
import { Popover } from "react-bootstrap";

interface ITextOverlayIconsProps {
  handletextoverlayclick: (event: any, keyNum: number) => void;
  handleChange: (event: any) => void;
  handleKeyDown: (event: any) => void;
  className: string;
  keynum: number;
  newRef?: React.Ref<HTMLDivElement>;
  onFocus?: (e: any) => void;
}

export type Ref = HTMLDivElement;

const TextOverlayIcons = forwardRef<Ref, ITextOverlayIconsProps>(
  (props, ref) => {
    const [clickedLink, setClickedLink] = useState(false);
    const [link, setLink] = useState("");

    const toggleClickedLink = (event: any) => {
      setClickedLink(true);
    };

    const handleChange = (e: any) => {
      setLink(e.target.value);
    };

    const handleKeyDown = (e: any) => {
      if (e.key === "enter") {
      }
    };

    return (
      <div ref={props.newRef}>
        <Popover id="popover-positioned-right" ref={ref} {...props}>
          {clickedLink ? (
            <input
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="form-control"
              placeholder="...past a link"
            />
          ) : (
            <>
              <a
                className="m-20 format-text-icon hover-up add-content-icon-code"
                aria-label="title"
                onClick={(e: any) =>
                  props.handletextoverlayclick(e, props.keynum)
                }
              >
                <div aria-label="title">
                  <TitleImg
                    width="15px"
                    height="15px"
                    fill="green"
                    aria-label="title"
                    pointerEvents="none"
                    // className={`${dark ? "dark-icon" : "profile"} hover-up`}
                  />
                </div>
              </a>
              <div
                className="m-20 format-text-icon hover-up"
                aria-label="bold"
                onClick={(e: any) =>
                  props.handletextoverlayclick(e, props.keynum)
                }
              >
                <div aria-label="bold">
                  <BoldImg
                    // onClick={handleFileGet}
                    width="15px"
                    height="15px"
                    fill="green"
                    aria-label="bold"
                    pointerEvents="none"
                    // className={`${dark ? "dark-icon" : "dark-icon"}`}
                  />
                </div>
              </div>
              <div
                className="m-20 format-text-icon border-right hover-up"
                aria-label="italics"
                onClick={(e: any) =>
                  props.handletextoverlayclick(e, props.keynum)
                }
              >
                <div aria-label="italics">
                  <ItalicsImg
                    width="15px"
                    height="15px"
                    fill="green"
                    aria-label="italics"
                    pointerEvents="none"
                    // className={`${dark ? "dark-icon" : "profile"} hover-up mr-10`}
                  />
                </div>
              </div>
              <div
                className="m-20 format-text-icon hover-up"
                aria-label="link"
                onClick={(e: any) =>
                  // props.handletextoverlayclick(e, props.keynum)
                  toggleClickedLink(e)
                }
              >
                <div aria-label="link">
                  <LinkImg
                    width="15px"
                    height="15px"
                    fill="green"
                    aria-label="link"
                    // className={`${dark ? "dark-icon" : "profile"} hover-up mr-10`}
                  />
                </div>
              </div>
              <div
                className="m-20 format-text-icon hover-up add-content-icon-code"
                aria-label="quotes"
                onClick={(e: any) =>
                  props.handletextoverlayclick(e, props.keynum)
                }
              >
                <QuotesImg
                  width="15px"
                  height="15px"
                  fill="green"
                  // className={`${dark ? "dark-icon" : "profile"} hover-up`}
                />
              </div>
            </>
          )}
        </Popover>
      </div>
    );
  }
);

export default TextOverlayIcons;
