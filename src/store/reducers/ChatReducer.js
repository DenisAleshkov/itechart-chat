import { SET_USERS, GET_USER_BY_ID, SET_DIALOG_ID, UPDATE_USERS_STATUS } from "./../constants";

const initialState = {
  users: [],
  changedUser: null,
  dialogId: null,
  usersStatus: [],
};

const ChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS: {
      return {
        ...state,
        users: action.payload,
        usersStatus: [
          action.payload.map((user) => ({
            id: user.id,
            status: user.status,
          })),
        ][0],
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
    case UPDATE_USERS_STATUS: {
      return {
        ...state,
        usersStatus: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

export default ChatReducer;
