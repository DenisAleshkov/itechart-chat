import React from "react";
import style from "././../../Chat.module.css";

const StartTemplate = () => {
  return (
    <div className={style.init}>
      <i className="fa fa-inbox" aria-hidden="true"></i>
      <h4>Choose a conversation from the left</h4>
    </div>
  );
};

export default StartTemplate;
