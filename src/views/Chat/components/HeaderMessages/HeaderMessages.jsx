import React from "react";
import style from "./../../Chat.module.css";

function HeaderMessages({ status, photoUrl, login, messagesLength }) {
  return (
      <header className={style.messageHeader}> 
        <img
          src={photoUrl}
          alt="avatar"
          className={`${status ? `${style.onlineAvatar}` : `${style.offlineAvatar}`}`}
        />
        <div>
          <h2>Chat with {login}</h2>
          <h3>already {messagesLength} messages</h3>
        </div>
      </header>
  );
}

export default HeaderMessages;
