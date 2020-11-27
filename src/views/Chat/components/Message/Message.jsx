import React from "react";
import { ChatDate } from "../../../utils/Classes/classes";
import s from "./../../Chat.module.css";

function Message({ text, login, date, id, type }) {
  const myDate = new ChatDate(date);

  return (
    <li className={type === "to" ? s.me : s.you} key={id}>
      <div className={s.entete}>
        {type === "to" ? (
          <>
            <h3>{myDate.getDateWithTime()}</h3>
            <h2>{login}</h2>
            <span
              className={`${s.status} ${type === "to" ? s.blue : s.green}`}
            ></span>
          </>
        ) : (
          <>
            <span
              className={`${s.status} ${type === "to" ? s.blue : s.green}`}
            ></span>
            <h2>{login}</h2>
            <h3>{myDate.getDateWithTime()}</h3>
          </>
        )}
      </div>
      <div className={s.message}>{text}</div>
    </li>
  );
}

export default Message;
