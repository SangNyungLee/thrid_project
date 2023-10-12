import React from "react";
import { Provider } from "react";
import store from "./store";
import Header from "./Header";
import Lside from "./Lside";
import Main from "./Main";
import "./App.css";

function App() {
  return (
    <>
      <Provider store={store}>
        <div className="container">
          <Lside />
          <div>
            <Header />
          </div>
        </div>
      </Provider>
    </>
  );
}

export default App;
