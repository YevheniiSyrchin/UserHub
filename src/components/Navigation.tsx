import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const Navigation: FC = () => {
  return (
    <nav className="navContainer">
      <div>
        <img src={logo} alt="userhub" className="logo" />
      </div>
      <div>
        <ul className="navigation font-Roboto">
          <li>
            <Link to="/UserHub/" className="button">
              Posts
            </Link>
          </li>
          <li>
            <Link to="/UserHub/todos" className="button">
              Todos
            </Link>
          </li>
          <li>
            <Link to="/UserHub/users" className="button">
              Users
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
