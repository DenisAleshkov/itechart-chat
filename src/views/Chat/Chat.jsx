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
  setUserStatus,
  updateUsersStatus,
  uploadPhoto,
  setUsers,
} from "./../../store/actions/chatActions";
import { signIn, signOut, loadUser } from "./../../store/actions/authActions";
import { connect } from "react-redux";
import {
  getMessages,
  sendMessage,
  updateFromMessage,
} from "../../store/actions/messageAction";
import { withRouter } from "react-router-dom";
import s from "./Chat.module.css";
import { setLoadingMessage } from "../../store/actions/loadingActions";
class Chat extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            this.props.loadUser({ ...doc.data(), isAuth: true, id: doc.id });
            this.props.getUsers(this.props.id);
          });
      }
    });
  }

  fileChanged = (e) => {
    if (e.target.files.length) {
      this.props.uploadPhoto({ file: e.target.files[0], id: this.props.id });
    }
  };

  getUsersList = () => {
    return this.props.users.map((user, index) => {
      return (
        <User
          changeUser={this.changeUser}
          key={user.id}
          id={user.id}
          login={user.login}
          photo={user.photoUrl}
          status={this.props.usersStatus[index].status}
          updateUsersStatus={this.props.updateUsersStatus}
          setUsers={this.props.setUsers}
        />
      );
    });
  };

  signOut = () => {
    this.props.signOut(this.props.history);
  };

  changeUser = async (e) => {
    this.props.getUserById(e.target.id);
    this.props.setDialogId(e.target.id);
    this.props.getMessages(this.props.id, e.target.id, "to");
    this.props.getMessages(this.props.id, e.target.id, "from");
  };

  render() {
    if (this.props.isLoading || !this.props.isAuth) {
      return <Loading />;
    }
    return (
      <div className={s.container}>
        <aside className={s.aside}>
          <Profile
            photo={this.props.photoUrl}
            fileChanged={this.fileChanged}
            isLoadingAvatar={this.props.isLoadingAvatar}
            signOut={this.signOut}
            login={this.props.login}
          />
          <h3 className={s.usersLength}>Users:{this.props.users.length}</h3>
          <ul className={s.usersList}>{this.getUsersList()}</ul>
        </aside>
        <main className={s.main}>
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
  dialogId: state.ChatReducer.dialogId,
  usersStatus: state.ChatReducer.usersStatus,
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
  setDialogId: (payload) => dispatch(setDialogId(payload)),
  setUserStatus: (payload) => dispatch(setUserStatus(payload)),
  setLoadingMessage: (payload) => dispatch(setLoadingMessage(payload)),
  setUsers: (payload) => dispatch(setUsers(payload)),
  updateFromMessage: (payload) => dispatch(updateFromMessage(payload)),
  updateUsersStatus: (payload) => dispatch(updateUsersStatus(payload)),
  uploadPhoto: (data) => dispatch(uploadPhoto(data)),
  loadUser: (data) => dispatch(loadUser(data)),
  sendMessage: (myId, userId, message) =>
    dispatch(sendMessage(myId, userId, message)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Chat));
