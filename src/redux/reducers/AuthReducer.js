const initialState = {
  id: null,
  isAuth: false,
  login: "",
  password: "",
  email: "",
  error: null
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNIN_ERROR": {
      console.log("auth error");
      return {
        ...state,
        isAuth: action.payload.isAuth,
        error: action.err.message,
      };
    }
    case "SIGNIN_SUCCESS": {
      console.log("auth success");
      return {
        ...state,
        isAuth: action.payload.isAuth,
        error: null,
      };
    }
    case "SIGNUP_SUCCESS": {
      return {
        ...state,
        error: null,
      };
    }
    case "SIGNUP_ERROR": {
      console.log("SIGNUP_ERROR");
      return {
        ...state,
        error: action.err.message,
      };
    }
    default: {
      return state;
    }
  }
};

export default AuthReducer;
