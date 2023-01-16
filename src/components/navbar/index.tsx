import React from 'react';
import './style.css';

export const Navbar = () => {
  return (
    <nav className="navbar">
      <a className="navbar-item" href="/">
        Home
      </a>
      <a className="navbar-item" href="/favorites">
        Favorites
      </a>
    </nav>
  );
};
