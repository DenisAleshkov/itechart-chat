import AuthReducer from "./reducers/AuthReducer";
import LoadingReducer from "./reducers/LoadingReducer";
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk"
const reducers = combineReducers({
  AuthReducer,
  LoadingReducer
});

const store = createStore(
  reducers,
  applyMiddleware(thunk)
);

export default store;
