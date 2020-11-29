import React from "react";
import style from "./Loading.module.css";
const Loading = () => {
  return (
    <div className={style.loader}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default Loading;
