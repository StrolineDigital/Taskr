import Auth from "../../src/utils/auth";
import { Link } from "react-router-dom";
import './navbar.css'; 

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">           
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/login">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }
  return (
    <>
<div className="header">
{/**  TITLE/HEADER */}
<div className="title"> <Link to="/">
          <span >    </span>
          TASKR APP
        </Link></div>

{/**  List/Menu Items */}
<div className="menuItems">    {showNavigation()}</div>
</div>

    </> 
  );

  }
export default Nav;



