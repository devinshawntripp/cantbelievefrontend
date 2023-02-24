import React from "react";

interface PopupProps {
  handleClose: (params: any) => any;
  content?: React.ReactNode;
  children?: React.ReactNode;
}

const Popup: React.FC<PopupProps> = (props) => {
  return (
    <div className="popup-box color-text">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}></span>
        {props.content}
        {props.children}
      </div>
    </div>
  );
};

export default Popup;
