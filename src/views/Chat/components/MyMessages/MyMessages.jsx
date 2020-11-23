import React from "react";
import { MONTHS, WEEK } from "./../../../../store/constants";
import s from "./../../Chat.module.css";

function MyMessages({ text, login, date }) {
  const myDate = new Date(date);
  let minutes = myDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${myDate.getMinutes()}`;
  }
  return (
    <li className={s.me}>
      <div className={s.entete}>
        <h3>
          {myDate.getHours()}:{minutes},{myDate.getDate()}{" "}
          {MONTHS[myDate.getMonth()]}, {WEEK[myDate.getDay()]}
        </h3>
        <h2>{login}</h2>
        <span className={`${s.status} ${s.blue}`}></span>
      </div>
      <div className={s.message}>{text}</div>
    </li>
  );
}

export default MyMessages;
