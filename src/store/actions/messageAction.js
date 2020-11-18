import axios from "axios";
import {
  SET_TO_MESSAGE,
  SET_FROM_MESSAGE,
  UPDATE_TO_MESSAGE,
} from "./../constants";
import { MESSAGE } from "./../api";
import {setLoading} from "./loadingActions"

export const updateToMessage = (payload) => ({
  type: UPDATE_TO_MESSAGE,
  payload,
});
export const setToMessage = (payload) => ({ type: SET_TO_MESSAGE, payload });
export const setFromMessage = (payload) => ({
  type: SET_FROM_MESSAGE,
  payload,
});

export const sendMessage = (myId, userId, message) => {
  return (dispatch) => {
    dispatch(setLoading(true))
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
        dispatch(setLoading(false))
      })
      .catch((err) => {
        console.log(err);
        dispatch(setLoading(false))
      });
  };
};
