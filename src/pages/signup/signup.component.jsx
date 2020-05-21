import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { signup, signInWithGoogle, signInWithGitHub } from '../../helpers/auth';
import './signup.styles.scss';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);
  }
  
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: '' });
    try {
      await signup(this.state.email, this.state.password);
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  async googleSignIn() {
    try {
      await signInWithGoogle();
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  async githubSignIn() {
    try {
      await signInWithGitHub();
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render() {
    return (
      <div className='signup'>
        <form className='signup__form' onSubmit={this.handleSubmit}>
          <h1 className='signup__title'>
            Sign Up to{' '}
            <Link className='signup__title-link' to="/">CyphChat</Link>
          </h1>
          <p className="signup__subtitle">Fill in the form below to create an account.</p>
          <div>
            <input className="signup__input" placeholder="Email" name="email" type="email" onChange={this.handleChange} value={this.state.email}></input>
          </div>
          <div>
            <input className="signup__input" placeholder="Password" name="password" onChange={this.handleChange} value={this.state.password} type="password"></input>
          </div>
          <div>
            {this.state.error ? <p>{this.state.error}</p> : null}
            <button className="signup__button signup__button--submit" type="submit">Sign up</button>
            <p>Or sign up with</p>
            <button className="signup__button signup__button--google" onClick={this.googleSignIn} type="button">
              <i class="fab fa-google"></i> Google
            </button>
            <button className="signup__button signup__button--github" type="button" onClick={this.githubSignIn}>
              <i class="fab fa-github"></i> GitHub
            </button>
          </div>
          <hr></hr>
          <p>Already have an account? <Link className='signup__link' to="/login">Login</Link></p>
        </form>
      </div>
    )
  }
}