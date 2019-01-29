import { createStore } from "redux";

import Login from "./../Reducers/Login.js";

export default () => {
  const store = createStore(
    Login,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  store.subscribe(() => {
    console.log(store.getState());
  });
  return store;
};
