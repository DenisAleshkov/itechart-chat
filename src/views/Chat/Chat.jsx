import React, { Component } from "react";
import firebase from "firebase";
import User from "./components/User/User";
import Profile from "./components/Profile/Profile";
import Messages from "./components/Messages/Messages";
import StartTemplate from "./components/StartTemplate/StartTemplate";
import Loading from "../utils/Loading/Loading";
import {
  getUserById,
  getUsers,
  setDialogId,
  uploadPhoto,
  setUsers,
} from "./../../store/actions/chatActions";
import {
  getMessages,
  getSortMessage,
  sendMessage,
  updateFromMessage,
} from "../../store/actions/messageAction";
import { signIn, signOut, loadUser } from "./../../store/actions/authActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setLoadingMessage } from "../../store/actions/loadingActions";
import { User as UserChat } from "./../utils/Classes/classes";
import style from "./Chat.module.css";

class Chat extends Component {
  componentDidMount() {
    const db = firebase.firestore().collection("users");
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        db.doc(user.uid)
          .get()
          .then((doc) => {
            this.props.loadUser({ ...doc.data(), isAuth: true, id: doc.id });
            this.props.getUsers(doc.id);
          });
      }
    });

    db.onSnapshot((snapshot) => {
      const users = [];
      snapshot.docs.forEach((doc) => {
        const { email, login, photoUrl, status } = doc.data();
        if (doc.id !== this.props.id) {
          users.push(new UserChat(doc.id, email, login, photoUrl, status));
        }
      });
      this.props.setUsers(users);
    });
  }

  fileChanged = (e) => {
    if (e.target.files.length) {
      this.props.uploadPhoto({ file: e.target.files[0], id: this.props.id });
    }
  };

  getUsersList = () =>
    this.props.users.map((user) => (
      <User
        changeUser={this.changeUser}
        key={user.id}
        id={user.id}
        login={user.login}
        photo={user.photoUrl}
        status={user.status}
        setUsers={this.props.setUsers}
      />
    ));

  signOut = () => {
    this.props.signOut(this.props.history);
  };

  changeUser = (e) => {
    this.props.getUserById(e.target.id);
    this.props.setDialogId(e.target.id);
    this.props.getMessages(this.props.id, e.target.id, "to");
    this.props.getMessages(this.props.id, e.target.id, "from");
    this.props.getSortMessage();
  };

  render() {
    if (this.props.isLoading || !this.props.isAuth) {
      return <Loading />;
    }

    return (
      <div className={style.container}>
        <aside className={style.aside}>
          <Profile
            photo={this.props.photoUrl}
            fileChanged={this.fileChanged}
            isLoadingAvatar={this.props.isLoadingAvatar}
            signOut={this.signOut}
            login={this.props.login}
          />
          <h3 className={style.usersLength}>
            Users: {this.props.users.length}
          </h3>
          <ul className={style.usersList}>{this.getUsersList()}</ul>
        </aside>
        <main className={style.main}>
          {this.props.dialogId ? (
            <Messages
              myLogin={this.props.login}
              user={this.props.changedUser}
              myId={this.props.id}
              toMessages={this.props.toMessages}
              fromMessages={this.props.fromMessages}
              changeUser={this.changeUser}
              sendMessage={this.props.sendMessage}
              dialogId={this.props.dialogId}
              updateFromMessage={this.props.updateFromMessage}
              isLoadingMessage={this.props.isLoadingMessage}
              isLoadingDialog={this.props.isLoadingDialog}
              setLoadingMessage={this.props.setLoadingMessage}
              sortMessages={this.props.sortMessages}
              getSortMessage={this.props.getSortMessage}
            />
          ) : (
            <StartTemplate />
          )}
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.AuthReducer.isAuth,
  id: state.AuthReducer.userId,
  login: state.AuthReducer.login,
  photoUrl: state.AuthReducer.photoUrl,
  isLoading: state.LoadingReducer.isLoading,
  isLoadingAvatar: state.LoadingReducer.isLoadingAvatar,
  isLoadingDialog: state.LoadingReducer.isLoadingDialog,
  isLoadingMessage: state.LoadingReducer.isLoadingMessage,
  toMessages: state.MessageReducer.toMessages,
  fromMessages: state.MessageReducer.fromMessages,
  sortMessages: state.MessageReducer.sortMessages,
  dialogId: state.ChatReducer.dialogId,
  users: state.ChatReducer.users,
  changedUser: state.ChatReducer.changedUser,
});

const mapDispatchToProps = (dispatch) => ({
  signIn: (credentials) => dispatch(signIn(credentials)),
  signOut: (history) => dispatch(signOut(history)),
  getUsers: (uid) => dispatch(getUsers(uid)),
  getUserById: (data) => dispatch(getUserById(data)),
  getMessages: (myId, userId, type) =>
    dispatch(getMessages(myId, userId, type)),
  getSortMessage: () => dispatch(getSortMessage()),
  setDialogId: (payload) => dispatch(setDialogId(payload)),
  setLoadingMessage: (payload) => dispatch(setLoadingMessage(payload)),
  setUsers: (payload) => dispatch(setUsers(payload)),
  updateFromMessage: (payload) => dispatch(updateFromMessage(payload)),
  uploadPhoto: (data) => dispatch(uploadPhoto(data)),
  loadUser: (data) => dispatch(loadUser(data)),
  sendMessage: (data) => dispatch(sendMessage(data)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Chat));
