import React from "react";
import { Link } from "react-router-dom";
import { auth, logout } from "../firebaseSDK.js";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const handleLogout = () => {
    logout(); // Call the logout function here
  };
  return (
    <nav>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link to="/">
            <a className="btn btn-ghost text-xl">
              Surgery Documentation Wizard
            </a>
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li Link to="/">
              <Link to="/mytemplates">My templates</Link>
            </li>
            <li>
              <ul className=" bg-base-100 rounded-t-none">
                <li>
                  <Link to="/create">
                    <a>Create template</a>
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <ul className=" bg-base-100 rounded-t-none">
                <li>
                  {!!user ? (
                    <a onClick={handleLogout}>Logout</a>
                  ) : (
                    <Link to="/login">Login</Link>
                  )}
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
