import {
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
} from "./../actions/authActions";

const initialState = {
  userId: null,
  isAuth: false,
  login: "",
  password: "",
  email: "",
  error: null,
  auth: null,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_ERROR: {
      console.log("auth error");
      return {
        ...state,
        isAuth: action.payload.isAuth,
        error: action.payload.err.message,
      };
    }
    case SIGNIN_SUCCESS: {
      console.log("auth success");
      return {
        ...state,
        isAuth: action.payload.isAuth,
        error: null,
        userId: action.payload.userId,
        email: action.payload.email,
      };
    }
    case SIGNUP_SUCCESS: {
      console.log("SIGNUP_SUCCESS");
      return {
        ...state,
        error: null,
        userId: action.payload.userId,
      };
    }
    case SIGNUP_ERROR: {
      console.log("SIGNUP_ERROR");
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
