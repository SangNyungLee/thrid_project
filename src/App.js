import React from 'react';
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

function App() {
  return (
    <div className="myContainer">
      <BrowserRouter>
        <div>
          <Lside />
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
