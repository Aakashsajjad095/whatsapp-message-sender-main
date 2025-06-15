import React from 'react';
import { BiCog } from 'react-icons/bi';
import { Link, useRouteMatch } from 'react-router-dom';

import './styles.scss';

function Header() {
  const isHomePath = useRouteMatch({
    path: '/',
    exact: true
  });

  const isMessagePath = useRouteMatch({
    path: '/message',
    exact: true
  });

  return (
    <header className='headerContainer'>
      <div className='header'>
        <div className='logo-container'>
          <img src='assets/logo-full.png' alt='WhatsApp Bulk Sender Logo' />
          <div className='title-container'>
            <h1>WhatsApp Bulk Sender</h1>
            <span>by Teamstrak</span>
          </div>
        </div>
        <Link to='/config'>
          <BiCog size={32} className='icon' />
        </Link>
      </div>
      <nav className='tabsNavigation'>
        <Link to='/' className='nav-link'>
          <div className={`tab ${isHomePath ? 'active' : ''}`}>
            <h2>Contacts</h2>
            <div className='indicator'></div>
          </div>
        </Link>
        <Link to='/message' className='nav-link'>
          <div className={`tab ${isMessagePath ? 'active' : ''}`}>
            <h2>Message</h2>
            <div className='indicator'></div>
          </div>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
