import {
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  SET_PHOTO,
  SIGN_OUT,
  LOAD_USER,
} from "./../constants";

const initialState = {
  userId: null,
  isAuth: false,
  login: "",
  email: "",
  error: null,
  photoUrl: "",
  status: false,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_ERROR: {
      console.log("SIGNIN_ERROR");
      console.log(action.payload.error.message);
      return {
        ...state,
        isAuth: action.payload.isAuth,
        status: action.payload.status,
        error: action.payload.error.message,
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
        login: action.payload.login,
        photoUrl: action.payload.photoUrl,
        status: action.payload.status,
      };
    }
    case SIGNUP_SUCCESS: {
      console.log("SIGNUP_SUCCESS");
      return {
        ...state,
        error: null,
      };
    }
    case SIGNUP_ERROR: {
      console.log("SIGNUP_ERROR");
      console.log("ERROR:", action.payload.err.message);
      return {
        ...state,
        error: action.payload.err.message,
      };
    }
    case SIGN_OUT: {
      console.log("SIGN_OUT SUCCES");
      return {
        ...state,
        userId: null,
        isAuth: false,
        login: "",
        email: "",
        error: null,
        photoUrl: "",
        status: false,
      };
    }
    case LOAD_USER: {
      return {
        ...state,
        isAuth: action.payload.isAuth,
        userId: action.payload.id,
        email: action.payload.email,
        login: action.payload.login,
        photoUrl: action.payload.photoUrl,
      };
    }
    case SET_PHOTO: {
      return {
        ...state,
        photoUrl: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default AuthReducer;
