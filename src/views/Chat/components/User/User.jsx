import React from "react";
import s from "./../../Chat.module.css"

const User = ({ login, photo, id, changeUser }) => {
  return (
    <li className={s.user} id={id} onClick={changeUser}>
      <img
        className={s.userImage}
        src={photo}
        alt="avatar"
        onClick={changeUser}
        id={id}
      />
      <div className={s.userBody}>
        <h2 className={s.userTitle}>{login}</h2>
        <h3 className={s.userStatus}>
          <span className={`${s.status} ${s.orange}`}></span>
          offline
        </h3>
      </div>
    </li>
  );
};

export default User;
