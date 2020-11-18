import axios from "axios";
import firebase from "firebase";
import { USERS } from "./../api";
import { SET_USERS, SET_PHOTO, GET_USER_BY_ID } from "./../constants";
import { setLoading } from "./loadingActions";

export const setUsers = (payload) => ({ type: SET_USERS, payload });
export const setPhoto = (payload) => ({ type: SET_PHOTO, payload });

export const getUserByIdAction = (payload) => ({
  type: GET_USER_BY_ID,
  payload,
});

export const getUserById = (id) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    axios
      .post(USERS.GET_USER_BY_ID(), { id: id })
      .then((res) => {
        dispatch(getUserByIdAction(res.data[0]));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        console.log("ERROR:", error.response);
        dispatch(setLoading(false));
      });
  };
};

export const getUsers = (id) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    axios
      .post(USERS.GET_USERS_FOR_MESSAGE(), {
        id: id,
      })
      .then((res) => {
        dispatch(setUsers(res.data));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        console.log("ERROR:", err.response);
        dispatch(setLoading(false));
      });
  };
};

export const uploadPhoto = (data) => {
  return (dispatch) => {
    dispatch(setLoading(true));
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
        dispatch(setLoading(false));
      });
    imagesStorage
      .getDownloadURL()
      .then((url) => {
        db.update({ photoUrl: url });
        dispatch(setPhoto(url));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        console.log("ERROR", error.response);
        dispatch(setLoading(false));
      });
  };
};
