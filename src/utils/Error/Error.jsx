import React from "react";
import './Error.css'
const Error = () => {
  return (
    <div class="alert">
      <span class="closebtn" onclick="this.parentElement.style.display='none';">
        &times;
      </span>
      This is an alert box.
    </div>
  );
};


export default Error