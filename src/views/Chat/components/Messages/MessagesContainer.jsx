import React, { Component } from "react";
import firebase from "firebase";
import s from "./../../Chat.module.css";

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
    };
    this.messageRef = React.createRef();
  }
  componentDidMount() {
    firebase
      .firestore()
      .collection("messages")
      .doc("from")
      .collection(this.props.dialogId)
      .onSnapshot((snapshot) => {
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
    const message = {
      text: this.state.message,
      date: firebase.firestore.Timestamp.fromDate(new Date()),
    };
    this.props.sendMessage(this.props.myId, this.props.user.id, message);
  };

  showMessage = () => {
    const messagesArray = [
      ...this.props.toMessages,
      ...this.props.fromMessages,
    ];

    const messages = messagesArray.sort((a, b) => a.date - b.date);
    console.log("messages", messages);
    return messages.map((element) => {
      if (element.type === "from") {
        return (
          <li className={s.you} key={element.id} ref={this.messageRef}>
            <div className={s.entete}>
              <span className={`${s.status} ${s.green}`}></span>
              <h2>{this.props.user.login}</h2>
              <h3>10:12AM, Today</h3>
            </div>
            <div className={s.message}>{element.text}</div>
          </li>
        );
      } else {
        return (
          <li className={s.me} key={element.id} ref={this.messageRef}>
            <div className={s.entete}>
              <h3>10:12AM, Today</h3>
              <h2>{this.props.login}</h2>
              <span className={`${s.status} ${s.blue}`}></span>
            </div>
            <div className={s.message}>{element.text}</div>
          </li>
        );
      }
    });
  };

  render() {
    if (!this.props.user) {
      return false;
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
        <ul className={s.chat} ref={this.messageRef}>
          {this.showMessage()}
        </ul>
        <footer>
          <textarea
            id="message"
            placeholder="Type your message"
            onChange={this.handleChange}
          ></textarea>
          <button onClick={this.sendMessage}>Send</button>
        </footer>
      </div>
    );
  }
}

export default Messages;
