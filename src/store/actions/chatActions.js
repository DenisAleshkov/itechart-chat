import axios from "axios";
import firebase from "firebase";
import { USERS } from "./../api";
import {
  SET_USERS,
  SET_PHOTO,
  GET_USER_BY_ID,
  SET_DIALOG_ID
} from "./../constants";
import {
  setLoading,
  setLoadingAvatar,
  setDialogLoading,
} from "./loadingActions";

export const setUsers = (payload) => ({ type: SET_USERS, payload });
export const setPhoto = (payload) => ({ type: SET_PHOTO, payload });
export const setDialogId = (payload) => ({ type: SET_DIALOG_ID, payload });
export const getUserByIdAction = (payload) => ({
  type: GET_USER_BY_ID,
  payload,
});
export const getUserById = (id) => {
  return (dispatch) => {
    dispatch(setDialogLoading(true));
    axios
      .post(USERS.GET_USER_BY_ID(), { id: id })
      .then((res) => {
        dispatch(getUserByIdAction(res.data[0]));
        dispatch(setDialogLoading(false));
      })
      .catch((error) => {
        console.log("ERROR:", error.response);
        dispatch(setDialogLoading(false));
      });
  };
};

export const getUsers = (id) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setLoadingAvatar(true));
    axios
      .post(USERS.GET_USERS_FOR_MESSAGE(), { id: id })
      .then((res) => {
        dispatch(setUsers(res.data));
        dispatch(setLoading(false));
        dispatch(setLoadingAvatar(false));
      })
      .catch((err) => {
        console.log("ERROR:", err.response);
        dispatch(setLoading(false));
        dispatch(setLoadingAvatar(false));
      });
  };
};

export const uploadPhoto = (data) => {
  return (dispatch) => {
    dispatch(setLoadingAvatar(true));
    const { file, id } = data;
    const imagesStorage = firebase.storage().ref("images").child(id);
    const db = firebase.firestore().collection("users").doc(id);
    imagesStorage
      .put(file)
      .then(() => {
        console.log("SUCCESS UPLOAD");
      })
      .catch((err) => {
        console.log("ERROR UPLOAD:", err.response);
        dispatch(setLoadingAvatar(false));
      });
    imagesStorage
      .getDownloadURL()
      .then((url) => {
        db.update({ photoUrl: url });
        dispatch(setPhoto(url));
        dispatch(setLoadingAvatar(false));
      })
      .catch((error) => {
        console.log("ERROR", error.response);
        dispatch(setLoadingAvatar(false));
      });
  };
};
