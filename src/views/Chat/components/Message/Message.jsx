import React from "react";
import { ChatDate } from "../../../utils/Classes/classes";
import style from "./../../Chat.module.css";

const Message = ({ text, login, date, id, type }) => (
  <li className={type === "to" ? style.me : style.you} key={id}>
    <div className={style.entete}>
      {type === "to" ? (
        <>
          <h3>{new ChatDate(date).getDateWithTime()}</h3>
          <h2>{login}</h2>
          <span
            className={`${style.status} ${
              type === "to" ? style.blue : style.green
            }`}
          ></span>
        </>
      ) : (
        <>
          <span
            className={`${style.status} ${
              type === "to" ? style.blue : style.green
            }`}
          ></span>
          <h2>{login}</h2>
          <h3>{new ChatDate(date).getDateWithTime()}</h3>
        </>
      )}
    </div>
    <div className={style.message}>{text}</div>
  </li>
);

export default Message;
