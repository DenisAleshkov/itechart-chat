import { SET_LOADING } from "./../actions/loadingActions";

const initialState = {
  isLoading: false,
};

const LoadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default LoadingReducer;
