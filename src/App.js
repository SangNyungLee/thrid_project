import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Lside from './Lside';
import Main from './Main';
import './App.css';
import NavBar from './NavBar';
import Page from './Page';
import '@fontsource/open-sans'; // Defaults to weight 400
import '@fontsource/open-sans'; // Defaults to weight 400
import '@fontsource/open-sans/400.css'; // Specify weight
import '@fontsource/open-sans/400-italic.css'; // Specify weight and style
import Sidebar from './SideBar';

function App() {
  //화면너비 지정
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div className="myContainer">
      <BrowserRouter>
        <div>
          {windowWidth > 991 && <Lside />}
          {windowWidth <= 991 && <Sidebar />}
        </div>
        <div>
          {/* <Header /> */}
          <NavBar />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/page" element={<Page />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
