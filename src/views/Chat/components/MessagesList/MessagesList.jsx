import React, { Component } from "react";
import firebase from "firebase";
import MyMessages from "./../MyMessages/MyMessages";
import YourMessages from "./../YourMessages/YourMessages";
class MessagesList extends Component {
  componentDidMount() {
    this.listenerMesssage();
  }

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
      }
    });
  };

  render() {
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
                />
              );
            }
          })}
      </div>
    );
  }
}

export default MessagesList;
