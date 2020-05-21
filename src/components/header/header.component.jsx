import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../services/firebase';
import './header.styles.scss';

function Header() {
  return (
    <header>
      <nav className="header">
        <Link className="header__brand" to="/">CyphChat</Link>
        {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button> */}
        <div className="header__links" id="navbarNavAltMarkup">
          {auth().currentUser
            ? <div className="header__item">
                <Link className="header__link" to="/chat">Chat</Link>
              <button className="header__link" onClick={() => auth().signOut()}>Logout</button>
            </div>
            : <div className="header__item">
                <Link className="header__link" to="/login">Sign In</Link>
                <Link className="header__link" to="/signup">Sign Up</Link>
            </div>}
        </div>
      </nav>
    </header>
  );
}

export default Header;