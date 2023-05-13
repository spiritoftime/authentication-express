import React from "react";
import { Quill } from "react-quill";
import { useAppContext } from "../context/appContext";
const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

const Font = Quill.import("formats/font");
Font.whitelist = [
  "Arial",
  "Comic Sans MS",
  "Courier New",
  "Georgia",
  "Helvetica",
  "Lucida Sans Unicode",
];
Quill.register(Font, true);

// Modules object for setting up the Quill editor
export const modules = {
  syntax: true,
  toolbar: {
    container: "#toolbar",
  },
};

// Formats objects for setting up the Quill editor
export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "code-block",
];

// Quill Toolbar component
export const ReactQuillBar = () => {
  const { isDarkMode } = useAppContext();
  return (
    <div id="toolbar">
      <span className={`ql-formats ${isDarkMode ? "dark" : "light"}`}>
        <select className="ql-font" defaultValue="Arial">
          <option value="Arial">Arial</option>
          <option value="Comic Sans MS">Comic Sans</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Lucida Sans Unicode">Lucida</option>
        </select>
        <select className="ql-size" defaultValue="medium">
          <option value="extra-small">Size 1</option>
          <option value="small">Size 2</option>
          <option value="medium">Size 3</option>
          <option value="large">Size 4</option>
        </select>
        <select className="ql-header" defaultValue="3">
          <option value="1">Heading</option>
          <option value="2">Subheading</option>
          <option value="3">Normal</option>
        </select>
      </span>
      <span className={`ql-formats ${isDarkMode ? "dark" : "light"}`}>
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
        <button className="ql-strike" />
      </span>
      <span className={`ql-formats ${isDarkMode ? "dark" : "light"}`}>
        <button className="ql-list" value="ordered" />
        <button className="ql-list" value="bullet" />
        <button className="ql-indent" value="-1" />
        <button className="ql-indent" value="+1" />
      </span>
      <span className={`ql-formats ${isDarkMode ? "dark" : "light"}`}>
        <button className="ql-script" value="super" />
        <button className="ql-script" value="sub" />
        <button className="ql-blockquote" />
        <button className="ql-direction" />
      </span>
      <span className={`ql-formats ${isDarkMode ? "dark" : "light"}`}>
        <select className="ql-align" />
        <select className="ql-color" />
        <select className="ql-background" />
      </span>
      <span className={`ql-formats ${isDarkMode ? "dark" : "light"}`}>
        <button className="ql-link" />
        <button className="ql-image" />
        <button className="ql-video" />
      </span>
      <span className={`ql-formats ${isDarkMode ? "dark" : "light"}`}>
        <button className="ql-formula" />
        <button className="ql-code-block" />
        <button className="ql-clean" />
      </span>
    </div>
  );
};

export default ReactQuillBar;
