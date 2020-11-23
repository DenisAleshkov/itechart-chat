import firebase from "firebase";
import {
  SIGNIN_ERROR,
  SIGNUP_SUCCESS,
  SIGNIN_SUCCESS,
  SIGNUP_ERROR,
  DEFAULT_PHOTO,
  SIGN_OUT,
  LOAD_USER,
} from "./../constants";
import { setLoading } from "./loadingActions";

export const signUpSucces = (payload) => ({ type: SIGNUP_SUCCESS, payload });
export const signUpError = (payload) => ({ type: SIGNUP_ERROR, payload });

export const signInError = (payload) => ({ type: SIGNIN_ERROR, payload });
export const signInSuccess = (payload) => ({ type: SIGNIN_SUCCESS, payload });

export const signOutSuccess = () => ({ type: SIGN_OUT });

export const loadUser = (payload) => ({ type: LOAD_USER, payload });

export const signIn = (credentials) => {
  const db = firebase.firestore().collection("users");
  return (dispatch) => {
    dispatch(setLoading(true));
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.emailIN, credentials.passwordIN)
      .then(async (res) => {
        const userData = await db.get(res.user.uid);
        db.doc(res.user.uid)
          .update({ status: true })
          .then(() => console.log("UPDATE STATUS"))
          .catch((error) => console.log("ERROR UPDATING USER", error.response));
        const user = userData.docs.map((doc) => doc.data())[0];
        dispatch(
          signInSuccess({
            isAuth: true,
            userId: res.user.uid,
            email: user.email,
            login: user.login,
            status: true,
          })
        );
        localStorage.setItem("token", res.user.uid);
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(signInError({ isAuth: false, status: false, error }));
        dispatch(setLoading(false));
      });
  };
};

export const signUp = (credentials) => {
  const db = firebase.firestore().collection("users");
  const storage = firebase.storage().ref("images");
  return (dispatch) => {
    dispatch(setLoading(true));
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        credentials.emailUP,
        credentials.passwordUP
      )
      .then((res) => {
        db.doc(res.user.uid)
          .set({
            login: credentials.login,
            email: credentials.emailUP,
            status: false,
            photoUrl: DEFAULT_PHOTO,
          })
          .then(() => {
            storage
              .child(res.user.uid)
              .put(DEFAULT_PHOTO)
              .then(() => {
                console.log("UPLOAD_SUCCESS");
              });
            dispatch(signUpSucces());
            dispatch(setLoading(false));
          })
          .catch((err) => {
            dispatch(signUpError({ err }));
            dispatch(setLoading(false));
          });
      })
      .catch((err) => {
        dispatch(signUpError({ err }));
        dispatch(setLoading(false));
      });
  };
};

export const signOut = (history) => {
  const db = firebase.firestore().collection("users");
  return (dispatch) => {
    dispatch(setLoading(true));
    firebase
      .auth()
      .signOut()
      .then(() => {
        db.doc(localStorage.getItem("token"))
          .update({ status: false })
          .then(() => console.log("UPDATE STATUS"))
          .catch((error) => console.log("ERROR UPDATING USER", error.response));
        dispatch(signOutSuccess());
        localStorage.removeItem("token");
        console.log("SIGN OUT")
        dispatch(setLoading(false));
      })
      .catch((err) => {
        console.log("SIGN ERROR", err.response);
        dispatch(setLoading(false));
      });
  };
};
