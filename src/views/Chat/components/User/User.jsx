import React from "react";
import style from "./../../Chat.module.css";

const User = ({ login, photo, id, changeUser, status }) => (
  <li className={style.user} onClick={changeUser} id={id}>
    <img
      className={style.userImage}
      src={photo}
      alt="avatar"
      onClick={changeUser}
      id={id}
    />
    <div className={style.userBody} id={id}>
      <h2 className={style.userTitle} id={id}>
        {login}
      </h2>
      <h3 className={style.userStatus} id={id}>
        <span
          className={`${style.status} ${status ? style.green : style.orange}`}
          id={id}
        ></span>
        {status ? "online" : "offline"}
      </h3>
    </div>
  </li>
);

export default User;
