import Header from "./Header";
import Lside from "./Lside";
import Main from "./Main";
import "./App.css";
function App() {
  return (
    <>
      <div className="container">
        <Lside />
        <div>
          <Header />
        </div>
      </div>
    </>
  );
}

export default App;
