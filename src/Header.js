import React from 'react';
import Main from './Main';
import './Header.css';
import NavBar from './NavBar';
import Page from './Page';

export default function Header() {
  return (
    <>
      <div className="headerDiv">
        <NavBar />
      </div>
      <Main />
    </>
  );
}
