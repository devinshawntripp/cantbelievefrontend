import React from "react";

interface PopupProps {
  handleClose: (params: any) => any;
  content: React.ReactNode;
}

const Popup: React.FC<PopupProps> = (props: {
  handleClose: (params: any) => any;
  content: React.ReactNode;
}) => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}></span>
        {props.content}
      </div>
    </div>
  );
};

export default Popup;
