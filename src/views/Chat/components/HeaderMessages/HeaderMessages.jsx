import React from "react";
import s from "./../../Chat.module.css";

function HeaderMessages({ status, photoUrl, login, messagesLength }) {
  return (
      <header className={s.messageHeader}> 
        <img
          src={photoUrl}
          alt="avatar"
          className={`${status ? `${s.onlineAvatar}` : `${s.offlineAvatar}`}`}
        />
        <div>
          <h2>Chat with {login}</h2>
          <h3>already {messagesLength} messages</h3>
        </div>
      </header>
  );
}

export default HeaderMessages;
