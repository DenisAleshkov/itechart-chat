import {
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
} from "./../constants";

const initialState = {
  userId: null,
  isAuth: false,
  login: "",
  email: "",
  error: null,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_ERROR: {
      console.log("SIGNIN_ERROR");
      console.log(action.payload.err.message)
      return {
        ...state,
        isAuth: action.payload.isAuth,
        error: action.payload.err.message,
      };
    }
    case SIGNIN_SUCCESS: {
      console.log("SIGNIN_SUCCESS");
      return {
        ...state,
        isAuth: action.payload.isAuth,
        error: null,
        userId: action.payload.userId,
        email: action.payload.email,
        login: action.payload.login
      };
    }
    case SIGNUP_SUCCESS: {
      console.log("SIGNUP_SUCCESS");
      return {
        ...state,
        error: null
      };
    }
    case SIGNUP_ERROR: {
      console.log("SIGNUP_ERROR");
      console.log("ERROR:",action.payload.err.message)
      return {
        ...state,
        error: action.payload.err.message,
      };
    }
    default: {
      return state;
    }
  }
};

export default AuthReducer;
