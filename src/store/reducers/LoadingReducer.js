import { SET_LOADING, SET_LOADING_AVATAR } from "./../constants";

const initialState = {
  isLoading: false,
  isLoadingAvatar: false
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
        isLoadingAvatar: action.payload
      }
    }
    default: {
      return state;
    }
  }
};

export default LoadingReducer;
