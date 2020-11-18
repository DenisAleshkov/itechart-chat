import React from "react";
import s from "././../../Chat.module.css";

function StartTemplate() {
  return (
    <div className={s.init}>
      <i className="fa fa-inbox" aria-hidden="true"></i>
      <h4>Choose a conversation from the left</h4>
    </div>
  );
}

export default StartTemplate;
