import React from "react";
import { BsYoutube } from "react-icons/bs";
import Main from "./Main";
import "./Header.css";
import { connect } from "react-redux";
export default function Header() {
  return (
    <>
      <div className="headerDiv">
        <span className="headerSpan">
          <BsYoutube />
        </span>
        <span onClick={(e) => {}}>최신</span>
        <span>음악</span>
        <span>게임</span>
        <span>영화</span>
      </div>
      <Main />
    </>
  );
}
