import React from "react";
import { BsYoutube } from "react-icons/bs";
import Main from "./Main";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
import { changeCategory } from "./store";
export default function Header() {
  const category = useSelector((state) => state.category.category);
  // console.log("??", category);
  const dispatch = useDispatch();
  const NEW = () => {
    dispatch(changeCategory.recent());
  };
  const MUSIC = () => {
    dispatch(changeCategory.music());
  };
  const GAME = () => {
    dispatch(changeCategory.game());
  };
  const MOVIE = () => {
    dispatch(changeCategory.movie());
  };
  return (
    <>
      <div className="headerDiv">
        <span className="headerSpan">
          <BsYoutube />
        </span>
        <span onClick={NEW}>최신</span>
        <span onClick={MUSIC}>음악</span>
        <span onClick={GAME}>게임</span>
        <span onClick={MOVIE}>영화</span>
      </div>
      <Main />
    </>
  );
}
