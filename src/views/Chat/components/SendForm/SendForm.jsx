import React, { Component } from "react";
import firebase from "firebase";
import s from "./../../Chat.module.css"

class SendForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  sendMessage = (e) => {
    e.preventDefault()
    if (this.state.message.length > 0) {
      const message = {
        text: this.state.message,
        date: firebase.firestore.Timestamp.fromDate(new Date()),
        sendDate: new Date(),
      };
      this.props.sendMessage(this.props.myId, this.props.userId, message);
      this.setState({ message: "" });
    } else {
      console.log("MESSAGE IS EMPTY");
    }
  };
  render() {
    return (
      <footer>
        <form className={s.form} onSubmit={this.sendMessage}>
          <input
            id="message"
            placeholder="Type your message"
            onChange={this.handleChange}
            value={this.state.message}
          />
          <button
            disabled={this.props.isLoadingMessage}
            onClick={this.sendMessage}
          >
            {this.props.isLoadingMessage ? "Loading" : "Send"}
          </button>
        </form>
      </footer>
    );
  }
}
export default SendForm;
