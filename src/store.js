import { createStore } from "redux";
import { categoryReducer } from "./reducers";

const store = createStore(categoryReducer);

export default store;
