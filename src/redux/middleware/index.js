import firebase from "firebase";

export const authMiddleware = (store) => (next) => (action) => {
  if (action.type === "SIGN_IN") {
    store.dispatch({ type: "SET_LOADING", payload: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(action.data.emailIN, action.data.passwordIN)
      .then(() => {
        store.dispatch({ type: "SIGNIN_SUCCESS", payload: { isAuth: true } });
        store.dispatch({ type: "SET_LOADING", payload: false });
      })
      .catch((err) => {
        store.dispatch({
          type: "SIGNIN_ERROR",
          payload: { isAuth: false },
          err,
        });
        store.dispatch({ type: "SET_LOADING", payload: false });
      });
  }
  if (action.type === "SIGNIN_OUT/SUCCESS") {
    firebase
      .auth()
      .signOut()
      .then(() => {
        store.dispatch({ type: "SIGN_OUT/SUCCESS" });
      });
  }
  if (action.type === "SIGN_UP") {
    store.dispatch({ type: "SET_LOADING", payload: true });
    firebase
      .auth()
      .createUserWithEmailAndPassword(action.email, action.password)
      .then((res) => {
        firebase
          .firestore()
          .collection("users")
          .doc(res.user.uid)
          .set({ login: action.login, email: action.email })
          .then(() => {
            console.log("POPAL")
            store.dispatch({ type: "SIGNUP_SUCCESS", swap: true });
            store.dispatch({ type: "SET_LOADING", payload: false });
          })
          .catch((err) => {
            store.dispatch({ type: "SIGNUP_ERROR", err });
            store.dispatch({ type: "SET_LOADING", payload: false });
          });
      })
      .catch((err) => {
        store.dispatch({ type: "SIGNUP_ERROR", err })
        store.dispatch({ type: "SET_LOADING", payload: false });
      });
  }
  return next(action);
};
