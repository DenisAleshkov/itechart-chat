import firebase from "firebase";
import {
  SIGN_IN,
  SIGNOUT_SUCCESS,
  SIGN_UP,
  signOutSucces,
  signUpSucces,
  signUpError,
  signInError,
  signInSuccess,
} from "./../actions/authActions";

import { setLoading } from "./../actions/loadingActions";

export const authMiddleware = (store) => (next) => (action) => {
  if (action.type === SIGN_IN) {
    store.dispatch(setLoading(true));
    firebase
      .auth()
      .signInWithEmailAndPassword(action.data.emailIN, action.data.passwordIN)
      .then((res) => {
        console.log('res', res.data)
        store.dispatch(
          signInSuccess({
            isAuth: true,
            userId: res.user.uid,
            email: res.user.email,
          })
        );
        store.dispatch(setLoading(false));
      })
      .catch((err) => {
        store.dispatch(signInError({ isAuth: false, err }));
        store.dispatch(setLoading(false));
      });
  }
  if (action.type === SIGNOUT_SUCCESS) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        store.dispatch(signOutSucces());
      });
  }
  if (action.type === SIGN_UP) {
    store.dispatch(setLoading(true));
    firebase
      .auth()
      .createUserWithEmailAndPassword(action.data.emailUP, action.data.passwordUP)
      .then((res) => {
        firebase
          .firestore()
          .collection("users")
          .doc(res.user.uid)
          .set({ login: action.data.login, email: action.data.emailUP})
          .then(() => {
            store.dispatch(signUpSucces());
            store.dispatch(setLoading(false));
          })
          .catch((err) => {
            store.dispatch(signUpError({ err }));
            store.dispatch(setLoading(false));
          });
      })
      .catch((err) => {
        store.dispatch(signUpError({ err }));
        store.dispatch(setLoading(false));
      });
  }
  return next(action);
};
