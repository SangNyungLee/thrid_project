import React from "react";
import { BsYoutube } from "react-icons/bs";
import Main from "./Main";
import "./Header.css";
export default function Header() {
  return (
    <>
      <div className="headerDiv">
        <span className="headerSpan">
          <BsYoutube />
        </span>
      </div>
      <Main />
    </>
  );
}
