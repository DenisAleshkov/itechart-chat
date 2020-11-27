import axios from "axios";
import {
  SET_TO_MESSAGE,
  SET_FROM_MESSAGE,
  UPDATE_TO_MESSAGE,
  UPDATE_FROM_MESSAGE,
  GET_SORT_MESSAGE,
} from "./../constants";
import { MESSAGE } from "./../api";
import { setDialogLoading, setLoadingMessage } from "./loadingActions";
import { ToMessage } from "./../../views/utils/Classes/classes";

export const setToMessage = (payload) => ({ type: SET_TO_MESSAGE, payload });

export const updateToMessage = (payload) => ({
  type: UPDATE_TO_MESSAGE,
  payload,
});

export const updateFromMessage = (payload) => ({
  type: UPDATE_FROM_MESSAGE,
  payload,
});

export const setFromMessage = (payload) => ({
  type: SET_FROM_MESSAGE,
  payload,
});

export const getSortMessage = () => ({
  type: GET_SORT_MESSAGE,
});

export const sendMessage = (data) => {
  return (dispatch) => {
    dispatch(setLoadingMessage(true));
    axios
      .post(MESSAGE.SEND_MESSAGE(), {
        myId: data.id,
        userId: data.userId,
        message: {
          text: data.text,
          date: data.date,
          sendDate: data.sendDate,
        },
      })
      .then((res) => {
        dispatch(
          updateToMessage(
            new ToMessage(
              res.data.id,
              data.userId,
              "to",
              data.date.seconds,
              data.sendDate,
              data.text
            )
          )
        );
        dispatch(getSortMessage());
        dispatch(setLoadingMessage(false));
      })
      .catch((err) => {
        console.log("ERROR", err.response);
        dispatch(setLoadingMessage(false));
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
