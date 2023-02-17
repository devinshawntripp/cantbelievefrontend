import React, { forwardRef } from "react";
import { Overlay, Tooltip } from "react-bootstrap";
// import { CustomOverlayProps, CustomOverlayRef } from './types';
import { OverlayProps } from "react-bootstrap";

interface CustomOverlayProps extends OverlayProps {
  // add any custom props here
}

interface CustomOverlayRef {
  // add any custom ref attributes here
}

const CustomOverlay = forwardRef<CustomOverlayRef, CustomOverlayProps>(
  (props) => {
    return (
      <Overlay {...props}>
        <Tooltip id="tooltip-overlay">
          {/* your tooltip content here */}
        </Tooltip>
      </Overlay>
    );
  }
);

export default CustomOverlay;
