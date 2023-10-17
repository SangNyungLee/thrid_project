import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, NavDropdown, NavLink } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { changeCategory } from "./store";
import {
  BsYoutube,
  BsFillHouseDoorFill,
  BsFillPersonFill,
  BsCloudPlus,
  BsSearch,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { WindowDash } from "react-bootstrap-icons";
import { useState } from "react";
import { searchYoutubeVideos } from "./func/GetApi";
function NavBar() {
  const [youtubeSearch, SetYoutubeSearch] = useState("");
  const category = useSelector((state) => state.category.category);
  const dispatch = useDispatch();

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      // alert("엔터키 눌림");
      SetYoutubeSearch("");
      searchYoutubeVideos(youtubeSearch);
    }
  };
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
    <div>
      <Navbar bg="light" expand="lg" className="mainNavBar">
        <Navbar.Brand href="/">
          <BsFillHouseDoorFill className="goHome" />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="order-0"
        ></Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto navFlex">
            <Nav.Link onClick={NEW} className="navborder">
              최신
            </Nav.Link>
            <Nav.Link onClick={MUSIC} className="navborder">
              음악
            </Nav.Link>
            <Nav.Link onClick={GAME} className="navborder">
              게임
            </Nav.Link>
            <Nav.Link onClick={MOVIE}>영화</Nav.Link>
          </Nav>
          <Nav className="mr-auto">
            <Nav.Link>
              <input
                type="text"
                placeholder={`검색하기🔍`}
                value={youtubeSearch}
                onChange={(e) => SetYoutubeSearch(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <span>
                <Link to={"/search"} state={{ data: youtubeSearch }}>
                  이동하기
                </Link>
              </span>
            </Nav.Link>
            <Nav.Link>
              <BsFillPersonFill />
            </Nav.Link>
            {/* <Nav.Link>
              <BsCloudPlus />
            </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="navUnderline"></div>
    </div>
  );
}

export default NavBar;
