import React, { Component } from "react";
import Loading from "./../../../utils/Loading/Loading";
import MessagesList from "./../MessagesList/MessagesList";
import HeaderMessages from "./../HeaderMessages/HeaderMessages";
import SendForm from "../SendForm/SendForm";
import MessageLoading from "../../../utils/MessageLoading/MessageLoading";
import s from "./../../Chat.module.css";


class Messages extends Component {
  render() {
    if (!this.props.user || this.props.isLoadingDialog) {
      return <Loading />;
    }
    return (
      <>
        <HeaderMessages
          status={this.props.user.status}
          login={this.props.user.login}
          photoUrl={this.props.user.photoUrl}
          messagesLength={
            this.props.toMessages.length + this.props.fromMessages.length
          }
        />
        <ul className={s.chat}>
          <MessagesList
            showMessage={this.showMessage}
            toMessages={this.props.toMessages}
            fromMessages={this.props.fromMessages}
            dialogId={this.props.dialogId}
            myId={this.props.myId}
            updateFromMessage={this.props.updateFromMessage}
            login={this.props.user.login}
            myLogin={this.props.myLogin}
            sortMessages={this.props.sortMessages}
            getSortMessage={this.props.getSortMessage}
          />
        </ul>
        <div className={s.messageLoading}>
            {this.props.isLoadingMessage && <MessageLoading />}
        </div>
        <SendForm
          isLoadingMessage={this.props.isLoadingMessage}
          myId={this.props.myId}
          userId={this.props.user.id}
          sendMessage={this.props.sendMessage}
        />
      </>
    );
  }
}

export default Messages;
