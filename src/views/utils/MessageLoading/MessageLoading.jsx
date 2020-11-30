import React from "react";
import style from "./MessagesLoading.module.css";
const MessageLoading = () => (
  <div className={style.spinner}>
    <div className={`${style.cpSpinner} ${style.cpBubble}`}></div>
  </div>
);

export default MessageLoading;
