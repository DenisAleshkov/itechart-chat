import React, { Component } from "react";
import MyMessages from "./../MyMessages/MyMessages";
import YourMessages from "./../YourMessages/YourMessages";
import Loading from "./../../../utils/Loading/Loading";
import firebase from "firebase";
import s from "./../../Chat.module.css";

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
    };
  }

  componentDidMount() {
    firebase
      .firestore()
      .collection("messages")
      .doc("from")
      .collection(this.props.dialogId)
      .doc(this.props.myId)
      .collection("message")
      .onSnapshot((snapshot) => {
        console.log("snapshot", snapshot);
        const sortSnapshot = snapshot.docs.sort(
          (a, b) => a.data().date.seconds - b.data().date.seconds
        );
        if (!sortSnapshot.length) {
          return false;
        }
        const from = {
          ...sortSnapshot[sortSnapshot.length - 1].data(),
          type: "from",
          date: sortSnapshot[sortSnapshot.length - 1].data().date.seconds,
          id: sortSnapshot[sortSnapshot.length - 1].id,
        };
        this.props.updateFromMessage(from);
      });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  sendMessage = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      const message = {
        text: this.state.message,
        date: firebase.firestore.Timestamp.fromDate(new Date()),
        sendDate: new Date(),
      };
      this.props.sendMessage(this.props.myId, this.props.user.id, message);
      this.setState({ message: "" });
    }
  };

  showMessage = () => {
    const messages = [
      ...this.props.toMessages,
      ...this.props.fromMessages,
    ].sort((a, b) => a.date - b.date);
    return messages.map((element) => {
      if (element.type === "from") {
        return (
          <YourMessages
            key={element.id}
            login={this.props.user.login}
            text={element.text}
            date={element.sendDate}
          />
        );
      } else {
        return (
          <MyMessages
            key={element.id}
            text={element.text}
            date={element.sendDate}
          />
        );
      }
    });
  };


  render() {
    if (!this.props.user) {
      return <Loading />;
    }
    const { photoUrl, login } = this.props.user;

    return (
      <div>
        <header className={s.messageUser}>
          <img src={photoUrl} alt="avatar" />
          <div>
            <h2>Chat with {login}</h2>
          </div>
        </header>
        <ul className={s.chat}>{this.showMessage()}</ul>
        <footer>
          <textarea
            id="message"
            placeholder="Type your message"
            onKeyPress={this.sendMessage}
            onChange={this.handleChange}
            value={this.state.message}
          ></textarea>
          <button
            disabled={this.props.isLoadingMessage}
            onClick={this.sendMessage}
          >
            {this.props.isLoadingMessage ? "Loading" : "Send"}
          </button>
        </footer>
      </div>
    );
  }
}

export default Messages;
