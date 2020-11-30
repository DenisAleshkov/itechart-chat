import React, { Component } from "react";
import firebase from "firebase";
import Message from "./../Message/Message";
import { FromMessage } from "./../../../utils/Classes/classes";

class MessagesList extends Component {
  constructor() {
    super();
    this.messagesEnd = React.createRef();
  }

  componentDidMount() {
    this.listenerMesssage();
    this.scrollToBottom({ behavior: "auto" });
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe();
  }

  componentDidUpdate() {
    this.scrollToBottom({ behavior: "smooth" });
  }

  listenerMesssage = () => {
    const db = firebase.firestore();
    const messagesRef = db.collection("messages").doc("from");
    const messagesSnapshot = messagesRef
      .collection(this.props.dialogId)
      .doc(this.props.myId)
      .collection("message");
    this.unsubscribe = messagesSnapshot.onSnapshot((snapshot) => {
      if (
        this.props.fromMessages.length !== snapshot.docs.length &&
        snapshot.docs.length
      ) {
        const sortSnapshot = snapshot.docs.sort(
          (a, b) => a.data().date.seconds - b.data().date.seconds
        );
        this.props.updateFromMessage(
          new FromMessage(
            sortSnapshot[sortSnapshot.length - 1].id,
            "from",
            sortSnapshot[sortSnapshot.length - 1].data().date.seconds,
            sortSnapshot[sortSnapshot.length - 1].data().sendDate,
            sortSnapshot[sortSnapshot.length - 1].data().text
          )
        );
        this.props.getSortMessage();
        this.scrollToBottom({ behavior: "smooth" });
      }
    });
  };

  scrollToBottom = (params) => {
    this.messagesEnd.scrollIntoView &&
      this.messagesEnd.scrollIntoView({
        block: "end",
        behavior: params.behavior,
      });
  };

  getMessages = () =>
    this.props.sortMessages.map((element) =>
      element.type === "from" ? (
        <Message
          key={element.id}
          login={this.props.login}
          text={element.text}
          date={element.sendDate}
        />
      ) : (
        <Message
          key={element.id}
          text={element.text}
          date={element.sendDate}
          login={this.props.myLogin}
          type={element.type}
        />
      )
    );

  render() {
    return (
      <>
        {this.getMessages()}
        <div
          ref={(el) => {
            this.messagesEnd = el;
          }}
        ></div>
      </>
    );
  }
}

export default MessagesList;
