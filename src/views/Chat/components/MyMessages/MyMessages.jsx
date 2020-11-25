import React from "react";
import { ChatDate } from "../../../utils/Classes/classes";
import s from "./../../Chat.module.css";

function MyMessages({ text, login, date, id }) {
  const myDate = new ChatDate(date);
  return (
    <li className={s.me} key={id}>
      <div className={s.entete}>
        <h3>{myDate.getDateWithTime()}</h3>
        <h2>{login}</h2>
        <span className={`${s.status} ${s.blue}`}></span>
      </div>
      <div className={s.message}>{text}</div>
    </li>
  );
}

export default MyMessages;
