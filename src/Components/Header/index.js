import React, { useState, useEffect } from 'react';
import './header.css';
import { FaUserCircle } from "react-icons/fa";
import Logo from '../../assets/logo.svg';

function Header() {
  return (
    <header>
        <nav>
          <img src={Logo} alt='Logo'/>
          <FaUserCircle size={40} color='#89ABC0'/>
        </nav>
    </header>
  );
}

export default Header;
