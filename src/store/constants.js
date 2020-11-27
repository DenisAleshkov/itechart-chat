export const SET_LOADING = "SET_LOADING";
export const SET_LOADING_AVATAR = "SET_LOADING_AVATAR";
export const SET_DIALOG_LOADING = "SET_DIALOG_LOADING";
export const SET_LOADING_MESSAGE = "SET_LOADING_MESSAGE";

export const SIGN_IN = "SIGN_IN";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_ERROR = "SIGNIN_ERROR";
export const SIGN_UP = "SIGN_UP";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_ERROR = "SIGNUP_ERROR";
export const SIGN_OUT = "SIGN_OUT";

export const SET_USERS = "SET_USERS";

export const DEFAULT_PHOTO =
  "data:image/jpeg;base64,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";
export const SET_PHOTO = "SET_PHOTO";

export const LOAD_USER = "LOAD_USER";

export const GET_USER_BY_ID = "GET_USER_BY_ID";
export const SET_DIALOG_ID = "SET_DIALOG_ID";

export const SET_TO_MESSAGE = "SET_TO_MESSAGE";
export const SET_FROM_MESSAGE = "SET_FROM_MESSAGE";
export const UPDATE_TO_MESSAGE = "UPDATE_TO_MESSAGE";
export const UPDATE_FROM_MESSAGE = "UPDATE_FROM_MESSAGE";
export const SET_SORT_MESSAGE = "SET_SORT_MESSAGE";
export const GET_SORT_MESSAGE = "GET_SORT_MESSAGE";

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
