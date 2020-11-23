import { SET_USERS, GET_USER_BY_ID, SET_DIALOG_ID } from "./../constants";

const initialState = {
  users: [],
  changedUser: null,
  dialogId: null,
};

const ChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS: {
      return {
        ...state,
        users: action.payload,
      };
    }
    case GET_USER_BY_ID: {
      return {
        ...state,
        changedUser: action.payload,
      };
    }
    case SET_DIALOG_ID: {
      return {
        ...state,
        dialogId: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default ChatReducer;
