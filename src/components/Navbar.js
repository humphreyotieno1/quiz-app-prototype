import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className='navbar'>
      <h1>SOMA QUIZ</h1>
      <ul className='navbar-list'>
        <li className='navbar-item dropdown'>
          <span className='navbar-link'>Welcome</span>
          <div className='dropdown-content'>
            <Link to="/questions" activeClassName="active">Questions</Link>
            <Link to="/score" activeClassName="active">Score</Link>
            <Link to="/feedback" activeClassName="active">Feedback</Link>
            <Link to="/about" activeClassName="active">About</Link>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
