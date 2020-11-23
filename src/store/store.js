import AuthReducer from "./reducers/AuthReducer";
import LoadingReducer from "./reducers/LoadingReducer";
import ChatReducer from "./reducers/ChatReducer";
import MessageReducer from "./reducers/MessageReducer";
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
const reducers = combineReducers({
  AuthReducer,
  LoadingReducer,
  ChatReducer,
  MessageReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
