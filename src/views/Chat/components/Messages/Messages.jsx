import React, { Component } from "react";
import MyMessages from "./../MyMessages/MyMessages";
import YourMessages from "./../YourMessages/YourMessages";
import Loading from "./../../../utils/Loading/Loading";
import MessagesList from "./../MessagesList/MessagesList";
import firebase from "firebase";
import s from "./../../Chat.module.css";

class Messages extends Component {
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

  listenerMessage = () => {
    this.unsubscribe = firebase
      .firestore()
      .collection("messages")
      .doc("from")
      .collection(this.props.dialogId)
      .doc(this.props.myId)
      .collection("message")
      .onSnapshot((snapshot) => {
        console.log("snapshot", snapshot.docs);
        if (snapshot.docs.length) {
          const sortSnapshot = snapshot.docs.sort(
            (a, b) => a.data().date.seconds - b.data().date.seconds
          );
          const from = {
            ...sortSnapshot[sortSnapshot.length - 1].data(),
            type: "from",
            date: sortSnapshot[sortSnapshot.length - 1].data().date.seconds,
            id: sortSnapshot[sortSnapshot.length - 1].id,
          };
          this.props.updateFromMessage(from);
        }
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



  render() {
    if (!this.props.user || this.props.isLoadingDialog) {
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
        <ul className={s.chat}>
          
          <MessagesList
            showMessage={this.showMessage}
            unsubscribe={this.props.unsubscribe}
            listenerMessage={this.props.listenerMessage}
            toMessages={this.props.toMessages}
            fromMessages={this.props.fromMessages}
            dialogId={this.props.dialogId}
            myId={this.props.myId}
            updateFromMessage={this.props.updateFromMessage}
            login={this.props.user.login}
          />
        </ul>
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
