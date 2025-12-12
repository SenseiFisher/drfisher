import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && !event.target.closest('header')) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="לוגו דר פישר" />
          </Link>
        </div>
        <button 
          className="menu-toggle" 
          onClick={toggleMenu}
          aria-label="תפריט"
          aria-expanded={menuOpen}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
        <nav className={menuOpen ? 'menu-open' : ''}>
          <ul>
            <li>
              <Link to="/" className={isActive('/') && location.pathname === '/' ? 'active' : ''}>
                בית
              </Link>
            </li>
            <li>
              <Link to="/cases" className={isActive('/cases') ? 'active' : ''}>
                הצגת מקרים
              </Link>
            </li>
            <li>
              <Link to="/equipment" className={isActive('/equipment') ? 'active' : ''}>
                מכשור מתקדם
              </Link>
            </li>
            <li>
              <Link to="/about" className={isActive('/about') ? 'active' : ''}>
                אודות
              </Link>
            </li>
            <li>
              <Link to="/referral" className={isActive('/referral') ? 'active' : ''}>
                הפניית מטופל
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;

