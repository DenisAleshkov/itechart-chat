import React from "react";
import { MONTHS, WEEK } from "./../../../../store/constants";
import s from "./../../Chat.module.css";

function YourMessages({ login, text, date }) {
  const myDate = new Date(date);
  let minutes = myDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${myDate.getMinutes()}`;
  }
  return (
    <li className={s.you}>
      <div className={s.entete}>
        <span className={`${s.status} ${s.green}`}></span>
        <h2>{login}</h2>
        <h3>
          {myDate.getHours()}:{minutes},{myDate.getDate()}{" "}
          {MONTHS[myDate.getMonth()]}, {WEEK[myDate.getDay()]}
        </h3>
      </div>
      <div className={s.message}>{text}</div>
    </li>
  );
}

export default YourMessages;
