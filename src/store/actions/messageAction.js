import axios from "axios";
import {
  SET_TO_MESSAGE,
  SET_FROM_MESSAGE,
  UPDATE_TO_MESSAGE,
  UPDATE_FROM_MESSAGE,
} from "./../constants";
import { MESSAGE } from "./../api";
import { setLoading, setDialogLoading } from "./loadingActions";

export const updateToMessage = (payload) => ({
  type: UPDATE_TO_MESSAGE,
  payload,
});
export const updateFromMessage = (payload) => ({
  type: UPDATE_FROM_MESSAGE,
  payload,
});
export const setToMessage = (payload) => ({ type: SET_TO_MESSAGE, payload });
export const setFromMessage = (payload) => ({
  type: SET_FROM_MESSAGE,
  payload,
});

export const sendMessage = (myId, userId, message) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    axios
      .post(MESSAGE.SEND_MESSAGE(), {
        myId: myId,
        userId: userId,
        message: message,
      })
      .then((res) => {
        dispatch(
          updateToMessage({
            type: "to",
            text: message.text,
            date: message.date.seconds,
            id: res.data.id,
          })
        );
        dispatch(setLoading(false));
      })
      .catch((err) => {
        console.log("ERROR", err.response);
        dispatch(setLoading(false));
      });
  };
};

export const getMessages = (myId, userId, type) => {
  return (dispatch) => {
    dispatch(setDialogLoading(true));
    axios
      .post(MESSAGE.GET_MESSAGE(), {
        myId: myId,
        userId: userId,
        type: type,
      })
      .then((res) => {
        if (type === "from") {
          dispatch(setFromMessage(res.data.messages));
          dispatch(setDialogLoading(false));
        } else if (type === "to") {
          dispatch(setToMessage(res.data.messages));
          dispatch(setDialogLoading(false));
        }
      })
      .catch((error) => {
        console.log("ERROR", error.response);
        dispatch(setDialogLoading(false));
      });
  };
};
