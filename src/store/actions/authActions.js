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
  return (dispatch) => {
    dispatch(setLoading(true));
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.emailIN, credentials.passwordIN)
      .then(async (res) => {
        const userData = await firebase
          .firestore()
          .collection("users")
          .get(res.user.uid);
        const user = userData.docs.map((doc) => doc.data())[0];
        dispatch(
          signInSuccess({
            isAuth: true,
            userId: res.user.uid,
            email: user.email,
            login: user.login,
          })
        );
        localStorage.setItem("token", res.user.uid);
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(signInError({ isAuth: false, error }));
        dispatch(setLoading(false));
      });
  };
};

export const signUp = (credentials) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        credentials.emailUP,
        credentials.passwordUP
      )
      .then((res) => {
        firebase
          .firestore()
          .collection("users")
          .doc(res.user.uid)
          .set({
            login: credentials.login,
            email: credentials.emailUP,
            photoUrl: DEFAULT_PHOTO,
          })
          .then(() => {
            firebase
              .storage()
              .ref("images")
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

export const signOut = () => {
  return (dispatch) => {
    dispatch(setLoading(true));
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch(signOutSuccess());
        localStorage.removeItem("token");
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
        console.log("SIGN ERROR", err.response);
      });
  };
};
