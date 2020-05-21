import React, { Component } from "react";
import CryptoJS from 'crypto-js';
import { auth } from "../../services/firebase";
import { db } from "../../services/firebase";
import './chat.styles.scss';

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      encryptedChats: [],
      chats: [],
      content: '',
      key: '',
      readError: null,
      writeError: null,
      loadingChats: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.decipherText = this.decipherText.bind(this);
    this.myRef = React.createRef();
  }

  async componentDidMount() {
    this.setState({ readError: null, loadingChats: true });
    const chatArea = this.myRef.current;
    try {
      db.ref("chats").on("value", snapshot => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        chats.sort(function (a, b) { return a.timestamp - b.timestamp })
        this.setState({ 
          chats,
          encryptedChats: chats 
        });
        chatArea.scrollBy(0, chatArea.scrollHeight);
        this.setState({ loadingChats: false });
      });
    } catch (error) {
      this.setState({ readError: error.message, loadingChats: false });
    }
  }

  handleChange(e) {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    if(!this.state.content) {
      return;
    }
    this.setState({ writeError: null });
    const chatArea = this.myRef.current;
    try {
      await db.ref("chats").push({
        user: this.state.user.email.split("@")[0],
        content: this.state.key ? CryptoJS.AES.encrypt(this.state.content, this.state.key).toString() : this.state.content,
        timestamp: Date.now(),
        uid: this.state.user.uid
      });
      this.setState({ content: '' });
      chatArea.scrollBy(0, chatArea.scrollHeight);
    } catch (error) {
      this.setState({ writeError: error.message });
    }
  }

  decipherText(e) {
    e.preventDefault();
    const newChats = JSON.parse(JSON.stringify(this.state.encryptedChats));

    if(this.state.key) {    
      for(let i = 0; i < newChats.length; i++) {
        if ((CryptoJS.AES.decrypt(newChats[i].content, this.state.key)).toString(CryptoJS.enc.Utf8)) {
          newChats[i].content = (CryptoJS.AES.decrypt(newChats[i].content, this.state.key)).toString(CryptoJS.enc.Utf8);
        }
      }
      this.setState({
        chats: newChats
      });
    } else {
      this.setState({
        chats: this.state.encryptedChats
      })
    }
  }

  formatTime(timestamp) {
    const d = new Date(timestamp);
    const time = `${d.getDate()}/${(d.getMonth()+1)}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
    return time;
  }

  render() {
    return (
      <div className='chat'>
        <div className="chat__container" ref={this.myRef}>
          {/* loading indicator */}
          {this.state.loadingChats ? <div className="spinner-border text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div> : ""}
          {/* chat area */}
          {this.state.chats.map(chat => {
            return <p key={chat.timestamp} className={"chat__bubble " + (this.state.user.uid === chat.uid ? "current-user" : "")}>
              {chat.content}
              <br />
              <span className="chat__time float-right">{this.formatTime(chat.timestamp)}</span>
            </p>
          })}
        </div>
        <form onSubmit={this.handleSubmit} autoComplete="off" className="chat__form">
          <textarea placeholder="Type a message..." className="chat__text" name="content" onChange={this.handleChange} value={this.state.content}></textarea>
          <input placeholder="Enter a key..." className="chat__key" type='text' name='key' onChange={this.handleChange} value={this.state.key} />
          <button type="submit" className="chat__submit"></button>
          <button className='chat__key-submit' onClick={this.decipherText}></button>
          {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
        </form>
        <div className="chat__account">
          Logged in as: <strong className="chat__account-text">{this.state.user.email}</strong>
        </div>
      </div>
    );
  }
}