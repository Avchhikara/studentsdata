import { createStore, combineReducers } from "redux";

import User from "./../Reducers/User.js";
import Student from "./../Reducers/Student.js";
import Teacher from "./../Reducers/Teacher";

export default () => {
  const store = createStore(
    combineReducers({ user: User, student: Student, teacher: Teacher }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  store.subscribe(() => {
    console.log(store.getState());
  });
  return store;
};
