import React, { Component } from "react";
import firebase from "firebase";
import MyMessages from "./../MyMessages/MyMessages";
import YourMessages from "./../YourMessages/YourMessages";
import MessagesLoading from "./../../../utils/MessageLoading/MessageLoading";
class MessagesList extends Component {
  constructor() {
    super();
    this.messagesEnd = React.createRef();
  }

  componentDidMount() {
    this.listenerMesssage();
    this.scrollToBottom({ behavior: "auto" });
  }

  scrollToBottom = (params) => {
    this.messagesEnd.scrollIntoView &&
      this.messagesEnd.scrollIntoView({
        block: "end",
        behavior: params.behavior,
      });
  };

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe();
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
        const from = {
          ...sortSnapshot[sortSnapshot.length - 1].data(),
          type: "from",
          date: sortSnapshot[sortSnapshot.length - 1].data().date.seconds,
          id: sortSnapshot[sortSnapshot.length - 1].id,
        };
        this.props.updateFromMessage(from);
        this.scrollToBottom({ behavior: "smooth" });
      }
    });
  };

  render() {
    this.scrollToBottom({behavior: "smooth"})
    return (
      <div>
        {[...this.props.toMessages, ...this.props.fromMessages]
          .sort((a, b) => a.date - b.date)
          .map((element) => {
            if (element.type === "from") {
              return (
                <YourMessages
                  key={element.id}
                  id={element.id}
                  login={this.props.login}
                  text={element.text}
                  date={element.sendDate}
                />
              );
            } else {
              return (
                <MyMessages
                  key={element.id}
                  id={element.id}
                  text={element.text}
                  date={element.sendDate}
                  login={this.props.myLogin}
                />
              );
            }
          })}

        <div
          style={{ height: "40px" }}
          ref={(el) => {
            this.messagesEnd = el;
          }}
        >
          {this.props.isLoadingMessage && <MessagesLoading />}
        </div>
      </div>
    );
  }
}

export default MessagesList;
