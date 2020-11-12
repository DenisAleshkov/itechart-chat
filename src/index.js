import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import firebase from "firebase";
import store from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

firebase.initializeApp({
  apiKey: "AIzaSyB_X2wMf3gz67CgaE6kvrVw7vW7mpWn7m0",
  authDomain: "chat-837d4.firebaseapp.com",
  databaseURL: "https://chat-837d4.firebaseio.com",
  projectId: "chat-837d4",
  storageBucket: "chat-837d4.appspot.com",
  messagingSenderId: "750761678069",
  appId: "1:750761678069:web:f288f3f3f678f04fb361bc",
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
