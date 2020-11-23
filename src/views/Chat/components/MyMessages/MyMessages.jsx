import React from "react";
import s from "./../../Chat.module.css";

function MyMessages({text, login}) {
  return (
    <li className={s.me}>
      <div className={s.entete}>
        <h3>10:12AM, Today</h3>
        <h2>{login}</h2>
        <span className={`${s.status} ${s.blue}`}></span>
      </div>
      <div className={s.message}>{text}</div>
    </li>
  );
}

export default MyMessages;
