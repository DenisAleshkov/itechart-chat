import React, { Component } from "react";
import firebase from "firebase";
import { ToMessage } from "./../../../utils/Classes/classes";
import style from "./../../Chat.module.css";

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
    e.preventDefault();
    if (this.state.message.length > 0) {
      this.props.sendMessage(
        new ToMessage(
          this.props.myId,
          this.props.userId,
          "from",
          firebase.firestore.Timestamp.fromDate(new Date()),
          new Date(),
          this.state.message
        )
      );
      this.setState({ message: "" });
    } else {
      console.log("MESSAGE IS EMPTY");
    }
  };
  render() {
    return (
      <footer>
        <form className={style.form} onSubmit={this.sendMessage}>
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
