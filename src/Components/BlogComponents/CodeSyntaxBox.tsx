import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { docco } from "react-syntax-highlighter/dist/cjs/styles/hljs";

interface ICodeSyntaxBoxProps {
  codeString: string;
  language: string | undefined;
  handlelangaugeselect: (e: any, keyNum: number) => void;
  keyNum: number;
}

const CodeSyntaxBox: React.FC<ICodeSyntaxBoxProps> = (props) => {
  if (props.language === undefined) {
    props.language === "javascript";
  }

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center p-20">
        <label className="mr-10 text" htmlFor="codeselect">
          Langauge:
        </label>
        <select
          id="codeselect"
          className="form-select"
          value={props.language}
          onChange={(e: any) => props.handlelangaugeselect(e, props.keyNum)}
        >
          {SyntaxHighlighter.supportedLanguages.map((lang) => {
            return <option value={lang}>{lang}</option>;
          })}
        </select>
      </div>
      <SyntaxHighlighter
        className="code-text"
        showLineNumbers
        language={props.language}
        style={dark}
      >
        {props.codeString}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeSyntaxBox;
