import React, { Component } from "react";
import firebase from "firebase";
import MyMessages from "./../MyMessages/MyMessages";
import YourMessages from "./../YourMessages/YourMessages";
class MessagesList extends Component {
  componentDidMount() {
    console.log("componentDidMount");
    this.listenerMesssage();
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
    const unsubscribe = this.listenerMesssage();
    unsubscribe();
  }

  listenerMesssage = () => {
    const unsubscribe = firebase
      .firestore()
      .collection("messages")
      .doc("from")
      .collection(this.props.dialogId)
      .doc(this.props.myId)
      .collection("message")
      .onSnapshot((snapshot) => {
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
    return unsubscribe;
  };

  shouldComponentUpdate(prevProp) {
    let count = 0;
    if (
      prevProp.fromMessages.length === this.props.fromMessages.length &&
      prevProp.toMessages.length === this.props.toMessages.length &&
      count <= 1
    ) {
      console.log("AAAAAAAAAAAAAAAAAAAAAAAA")
      count++;
      return false;
    }
    
    return true;
  }

  render() {
    console.log("RENDER");
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
