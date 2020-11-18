import React, { Component } from "react";
import firebase from "firebase";
import User from "./components/User/User";
import Profile from "./components/Profile/Profile";
import Messages from "./components/Messages/MessagesContainer";
import SignContainer from "../SignContainer/SignContainer";
import Loading from "../utils/Loading/Loading";
import {
  getUserById,
  getUsers,
  uploadPhoto,
} from "./../../store/actions/chatActions";
import { signIn, signOut, loadUser } from "./../../store/actions/authActions";
import { connect } from "react-redux";
import s from "./Chat.module.css";
import { sendMessage } from "../../store/actions/messageAction";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toMessage: [],
      fromMessage: [],
    };
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            this.props.loadUser({ ...doc.data(), id: doc.id });
            this.props.getUsers(this.props.id);
          });
      }
    });
  }

  fileChanged = (e) => {
    const file = e.target.files[0];
    this.props.uploadPhoto({ file, id: this.props.id });
  };

  getUsersList = () => {
    return this.props.users.map((user) => {
      return (
        <User
          changeUser={this.changeUser}
          key={user.id}
          id={user.id}
          login={user.login}
          photo={user.photoUrl}
        />
      );
    });
  };

  signOut = () => {
    this.props.signOut();
    return <SignContainer />;
  };

  changeUser = async (e) => {
    const db = firebase.firestore();
    this.props.getUserById(e.target.id);
    this.props.setDialogId(e.target.id);
    const to = [];
    const from = [];

    db.collection("messages")
      .doc("to")
      .collection(e.target.id)
      .get()
      .then((result) => {
        result.forEach((element) => {
          to.push({
            ...element.data(),
            date: element.data().date.seconds,
            id: element.id,
            type: "to",
          });
        });
      });
    this.props.setToMessage(to);

    db.collection("messages")
      .doc("from")
      .collection(e.target.id)
      .get()
      .then((result) => {
        result.forEach((element) => {
          from.push({
            ...element.data(),
            date: element.data().date.seconds,
            type: "from",
            id: element.id,
          });
        });
      });
    this.props.setFromMessage(from);
  };

  render() {
    if (!this.props.id) {
      return <Loading />;
    }
    return (
      <div className={s.container}>
        <aside className={s.aside}>
          <Profile
            photo={this.props.photoUrl}
            fileChanged={this.fileChanged}
            isLoading={this.props.isLoading}
            signOut={this.signOut}
          />
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
              updateFromMessage = {this.props.updateFromMessage}
              isLoading={this.props.isLoading}
            />
          ) : (
            0
          )}
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  id: state.AuthReducer.userId,
  users: state.ChatReducer.users,
  login: state.AuthReducer.login,
  photoUrl: state.AuthReducer.photoUrl,
  isLoading: state.LoadingReducer.isLoading,
  changedUser: state.ChatReducer.changedUser,
  toMessages: state.MessageReducer.toMessages,
  fromMessages: state.MessageReducer.fromMessages,
  dialogId: state.ChatReducer.dialogId,
});

const mapDispatchToProps = (dispatch) => ({
  signIn: (credentials) => dispatch(signIn(credentials)),
  getUsers: (uid) => dispatch(getUsers(uid)),
  uploadPhoto: (data) => dispatch(uploadPhoto(data)),
  signOut: () => dispatch(signOut()),
  loadUser: (data) => dispatch(loadUser(data)),
  getUserById: (data) => dispatch(getUserById(data)),
  setToMessage: (message) => dispatch({ type: "SET_TO_MESSAGE", message }),
  setFromMessage: (message) => dispatch({ type: "SET_FROM_MESSAGE", message }),
  sendMessage: (myId, userId, message) =>
    dispatch(sendMessage(myId, userId, message)),
  updateFromMessage: (payload)=>dispatch({type: "UPDATE_FROM_MESSAGE", payload}),
  setDialogId: (payload) => dispatch({ type: "SET_DIALOG_ID", payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
