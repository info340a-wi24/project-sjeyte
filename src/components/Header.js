import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../img/Harmony-logo.png';

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container justify-content-center">
          <Link className="navbar-brand" to="/">
            <img src={logoImage} alt="Harmony Logo" width="120" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/mood-tracker">Mood Tracker</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/guided-meditation">Guided Meditation</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/resource-directory">Resource Directory</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signin">Sign In</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;