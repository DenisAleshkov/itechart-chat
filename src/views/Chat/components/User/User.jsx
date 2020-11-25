import React from "react";
import firebase from "firebase";
import s from "./../../Chat.module.css";

class User extends React.Component {
  componentDidMount() {
    firebase
      .firestore()
      .collection("users")
      .onSnapshot((snapshot) => {
        const users = [];
        const status = [];
        snapshot.docs.forEach((doc) => {
          if (doc.id !== localStorage.getItem("token")) {
            status.push({
              id: doc.id,
              status: doc.data().status,
              login: doc.data().email,
            });
            users.push({
              ...doc.data(),
              id: doc.id,
            });
          }
        });
        this.props.setUsers(users);
        this.props.updateUsersStatus(status);
      });
  }

  render() {
    const { login, photo, id, changeUser, status } = this.props;
    return (
      <li className={s.user} onClick={changeUser} id={id}>
        <img
          className={s.userImage}
          src={photo}
          alt="avatar"
          onClick={changeUser}
          id={id}
        />
        <div className={s.userBody} id={id}>
          <h2 className={s.userTitle} id={id}>
            {login}
          </h2>
          <h3 className={s.userStatus} id={id}>
            <span
              className={`${s.status} ${status ? s.green : s.orange}`}
              id={id}
            ></span>
            {status ? "online" : "offline"}
          </h3>
        </div>
      </li>
    );
  }
}

export default User;
