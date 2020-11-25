import React from "react";
import { ChatDate } from "../../../utils/Classes/classes";
import s from "./../../Chat.module.css";

function YourMessages({ login, text, date, id}) {
  const myDate = new ChatDate(date);
  return (
    <li className={s.you} key={id}>
      <div className={s.entete}>
        <span className={`${s.status} ${s.green}`}></span>
        <h2>{login}</h2>
        <h3>{myDate.getDateWithTime()}</h3>
      </div>
      <div className={s.message}>{text}</div>
    </li>
  );
}

export default YourMessages;
