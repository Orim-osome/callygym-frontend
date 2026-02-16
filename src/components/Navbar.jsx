import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/navbar.css";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".navbar")) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        {/* Logo */}
        <Link to="/" className="logo" onClick={closeMenu}>
          ❚█══█❚ CallyGym
        </Link>

        {/* Hamburger button – only visible on mobile */}
        <button
          className={`hamburger ${isMenuOpen ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Desktop navigation links */}
        <ul className="nav-links desktop">
          <li>
            <Link to="/" onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={closeMenu}>
              About
            </Link>
          </li>
          <li>
            <Link to="/classes" onClick={closeMenu}>
              Classes
            </Link>
          </li>
          <li>
            <Link to="/trainers" onClick={closeMenu}>
              Trainers
            </Link>
          </li>
          <li>
            <Link to="/membership" onClick={closeMenu}>
              Membership
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={closeMenu}>
              Contact
            </Link>
          </li>

          {/* "Join Now" button – now inside desktop nav */}
          <li>
            <Link to="/membership" className="btn-primary" onClick={closeMenu}>
              Join Now
            </Link>
          </li>
        </ul>

        {/* Mobile navigation menu */}
        <ul className={`nav-links mobile ${isMenuOpen ? "active" : ""}`}>
          <li>
            <Link to="/" onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={closeMenu}>
              About
            </Link>
          </li>
          <li>
            <Link to="/classes" onClick={closeMenu}>
              Classes
            </Link>
          </li>
          <li>
            <Link to="/trainers" onClick={closeMenu}>
              Trainers
            </Link>
          </li>
          <li>
            <Link to="/membership" onClick={closeMenu}>
              Membership
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={closeMenu}>
              Contact
            </Link>
          </li>

          {/* "Join Now" in mobile menu */}
          <li>
            <Link to="/membership" className="btn-primary" onClick={closeMenu}>
              Join Now
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
