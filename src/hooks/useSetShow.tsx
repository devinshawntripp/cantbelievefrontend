import React, { useEffect, useState } from "react";

function useSetShow(
  ref: React.RefObject<HTMLDivElement>,
  initialShow: boolean
) {
  const [show, setShow] = useState(initialShow);
  // Creating a state variable and a setter function for the selected text
  const [selectedText, setSelectedText] = useState<any>("");
  //   const [offset, setOffset] = useState<any>();

  function handleSelection(event: any) {
    // Get the selected text as a string

    if (typeof window !== undefined) {
      if (ref.current && ref.current.contains(event.target)) {
        const text = window.getSelection()?.toString();
        // console.log(text);
        // Set the selected text state
        console.log("selected text: ", text);
        setSelectedText(text);
      }

      if (ref.current && ref.current.contains(event.target)) {
        // alert("You clicked outside of me!");

        setShow(true);
        console.log(show);

        // Get the coordinates of the selected text area
        // const rect = window
        //   .getSelection()
        //   ?.getRangeAt(0)
        //   .getBoundingClientRect();

        // console.log(ref.current);

        // setOffset(rect);

        // Do something with the coordinates, such as rendering a popup menu
        // console.log(rect);
      } else {
        setShow(false);
      }
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mouseup", handleSelection);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mouseup", handleSelection);
    };
  }, [ref]);

  return [selectedText, show, setShow] as const;
}

export default useSetShow;
