import { combineReducers } from "redux";
import dashboard from "./dashboard";
import search from "./search";

export default combineReducers({
  dashboard,
  search
});
