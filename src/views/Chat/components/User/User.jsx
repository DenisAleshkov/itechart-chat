import React from "react";
import firebase from "firebase";
import { User as UserChat } from "./../../../utils/Classes/classes";
import s from "./../../Chat.module.css";

class User extends React.Component {
  componentDidMount() {
    firebase
      .firestore()
      .collection("users")
      .onSnapshot((snapshot) => {
        const users = [];
        snapshot.docs.forEach((doc) => {
          if (doc.id !== localStorage.getItem("token")) {
            const { email, login, photoUrl, status } = doc.data();
            users.push(new UserChat(doc.id, email, login, photoUrl, status));
          }
        });
        console.log(users);
        this.props.setUsers(users);
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
