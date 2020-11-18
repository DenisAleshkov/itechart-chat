import React from "react";
import s from "./../../Chat.module.css";

function YourMessages({login, text}) {
  return (
    <li className={s.you}>
      <div className={s.entete}>
        <span className={`${s.status} ${s.green}`}></span>
        <h2>{login}</h2>
        <h3>10:12AM, Today</h3>
      </div>
      <div className={s.message}>{text}</div>
    </li>
  );
}

export default YourMessages;
