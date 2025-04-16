import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';

export default function Layout({ children }) {
  return (
    <div className="page-container">
      <header className="header">
        <img
          className="logo"
          src="https://pigment.github.io/fake-logos/logos/large/color/fast-banana.png"
          alt="logo"
          width="120"
        />
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/auth/login">Login</Link>
          <Link to="/auth/register">Register</Link>
          <Link to="/profile/123">Account</Link>
        </nav>
      </header>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
