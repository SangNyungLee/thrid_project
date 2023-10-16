import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { changeCategory } from './store';
import { BsYoutube, BsFillHouseDoorFill } from 'react-icons/bs';
import './NavBar.css';
import { WindowDash } from 'react-bootstrap-icons';
function NavBar() {
  const category = useSelector((state) => state.category.category);
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
    <div>
      <Navbar bg="light" expand="lg" className="mainNavBar">
        <Navbar.Brand href="/">
          <BsFillHouseDoorFill className="goHome" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="order-0">
          {/* <BsYoutube /> */}
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
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
        </Navbar.Collapse>
      </Navbar>
      <div className="navUnderline"></div>
    </div>
  );
}

export default NavBar;
