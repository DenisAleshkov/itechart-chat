export const SIGN_IN = "SIGN_IN";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_ERROR = "SIGNIN_ERROR";
export const SIGNOUT_SUCCESS = "SIGNOUT_SUCCESS";
export const SIGN_UP = "SIGN_UP";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_ERROR = "SIGNUP_ERROR";

export const signUpSucces = (payload) => ({ type: SIGNUP_SUCCESS, payload });
export const signUpError = (payload) => ({ type: SIGNUP_ERROR, payload });
export const signOutSucces = () => ({ type: SIGNOUT_SUCCESS });
export const signInError = (payload) => ({type: SIGNIN_ERROR, payload})
export const signInSuccess = (payload) => ({type: SIGNIN_SUCCESS, payload})
