import React from "react";
import "./LsideStyle.css";
export default function Lside() {
  return (
    <div className="mainSide">
      <div>사이드부분</div>
      <input type="text" className="idInput" placeholder="아이디"></input>
      <input type="text" className="idInput" placeholder="비밀번호"></input>
      <button className="btnLogin">로그인</button>
      <br />
      <span>회원가입</span>
      <span>SNS 로그인</span>
      <div className="sideCategory">카테고리 부분</div>
    </div>
  );
}
