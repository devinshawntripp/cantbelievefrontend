import React, { ChangeEvent, useEffect, useState } from "react";

interface IParentProps {}

const ParentComp: React.FC<IParentProps> = (props) => {
  const [innerValue, setInnerValue] = useState<string>();
  const [ghostValue, setGhostValue] = useState<string>();
  // create some boolean to detect when the enter key was pressed in the input field so that you
  //can remove the input field and add the child component
  const handleChange = (event: ChangeEvent<HTMLDivElement>) => {
    setInnerValue(event.currentTarget.innerHTML);
    setGhostValue(event.currentTarget.innerHTML);
  };

  const handleGhostChange = (event: ChangeEvent<HTMLDivElement>) => {
    setGhostValue(event.currentTarget.innerHTML);
  };

  //handle screen refresh, or send the ghost value to the backend
  useEffect(() => {}, []);

  return (
    <div>
      <input type="text" onChange={handleChange} />

      <ChildComponent handleChange={handleGhostChange}>
        {innerValue}
      </ChildComponent>
    </div>
  );
};

interface IChildProps {
  handleChange: (e: ChangeEvent<HTMLDivElement>) => void;
  children: React.ReactNode;
}

const ChildComponent: React.FC<IChildProps> = (props) => {
  return (
    <p
      contentEditable="true"
      suppressContentEditableWarning={true}
      onInput={props.handleChange}
    >
      {props.children}
    </p>
  );
};
