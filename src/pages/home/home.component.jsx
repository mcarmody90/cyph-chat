import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './home.styles.scss';

export default class HomePage extends Component {
  render() {
    return (
      <div className="home__container">
        <section>
            <div className="home">
              <h1 className="home__title">Welcome to CyphChat</h1>
              <p className="home__subtitle">A chat application that allows you to encrypt and decrypt messages</p>
              <div className="home__links">
                <Link className="home__btn" to="/signup">Create New Account</Link>
                <Link className="home__btn" to="/login">Login to Your Account</Link>
              </div>
            </div>
        </section>
      </div>
    )
  }
}