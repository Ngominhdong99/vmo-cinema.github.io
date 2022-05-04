import movieReducer from "./reducer/movieReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  form: movieReducer,
});

export default rootReducer;
