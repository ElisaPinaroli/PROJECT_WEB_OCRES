import React from "react";
import PropTypes from "prop-types";
import { Link, BrowserRouter as Router, Routes } from "react-router-dom";
import { Button } from "./button2";
import "./header.css";
import "./button.css";

function Header({ user, onLogin, onLogout, onCreateAccount }) {
  return (
    <header>
      <div className="wrapper">
        <div>
          <h1>Moon</h1>
        </div>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
        </div>
        <div>
          {user ? (
            <>
              <span className="welcome">
                Welcome, <b>{user.name}</b>!
              </span>

              <Button size="small" onClick={onLogout} label="Log out" />
            </>
          ) : (
            <>
              <Button size="small" onClick={onLogin} label="Log in" />
              <Button
                primary
                size="small"
                onClick={onCreateAccount}
                label="Sign up"
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  user: PropTypes.shape({}),
  //onLogin: PropTypes.func.isRequired,
  //onLogout: PropTypes.func.isRequired,
  //onCreateAccount: PropTypes.func.isRequired,
};

Header.defaultProps = {
  user: null,
};

export default Header;
