import { SET_TO_MESSAGE, SET_FROM_MESSAGE, UPDATE_TO_MESSAGE, UPDATE_FROM_MESSAGE } from "./../constants";

const initialState = {
  toMessages: [],
  fromMessages: [],
};

const MessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TO_MESSAGE: {
      return {
        ...state,
        toMessages: [...state.toMessages, action.payload]
      };
    }
    case UPDATE_FROM_MESSAGE: {
      return {
        ...state,
        fromMessages: [...state.fromMessages, action.payload]
      }
    }
    case SET_TO_MESSAGE: {
      return {
        ...state,
        toMessages: action.payload,
      };
    }
    case SET_FROM_MESSAGE: {
      return {
        ...state,
        fromMessages: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default MessageReducer;
