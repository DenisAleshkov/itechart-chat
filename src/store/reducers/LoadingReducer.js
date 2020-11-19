import {
  SET_LOADING,
  SET_LOADING_AVATAR,
  SET_DIALOG_LOADING,
} from "./../constants";

const initialState = {
  isLoading: false,
  isLoadingAvatar: false,
  isLoadingDialog: false,
};

const LoadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case SET_LOADING_AVATAR: {
      return {
        ...state,
        isLoadingAvatar: action.payload,
      };
    }
    case SET_DIALOG_LOADING: {
      return {
        ...state,
        isLoadingDialog: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default LoadingReducer;
