import React from "react";
import s from "./MessagesLoading.module.css"
export default function MessageLoading() {
  return (
    <div className={s.spinner}>
      <div className={`${s.cpSpinner} ${s.cpBubble}`}></div>
    </div>
  );
}
