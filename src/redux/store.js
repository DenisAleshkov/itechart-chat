import AuthReducer from "./reducers/AuthReducer";
import LoadingReducer from "./reducers/LoadingReducer"
import { combineReducers, createStore, applyMiddleware } from "redux"
import { authMiddleware } from "./middleware/index";
const reducers = combineReducers({
  AuthReducer,
  LoadingReducer
});

const store = createStore(reducers, applyMiddleware(authMiddleware));

export default store;
