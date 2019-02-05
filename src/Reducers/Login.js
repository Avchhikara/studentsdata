const Login = (
  state = {
    loggedIn: false,
    generalData: {
      name: "",
      rno: "",
      mname: "",
      fname: "",
      gender: "",
      address: ""
    }
  },
  action
) => {
  const { payload } = action;
  switch (action.type) {
    case "LOGGING_IN":
      return { ...state, ...payload };
    case "LOGGING_OUT":
      return { ...payload };
    case "ON_FETCH_GENERAL_DATA":
      return { ...state, generalData: payload };
    case "SET_TIMEOUT_ID":
      return { ...state, tid: payload.tid };
    default:
      return state;
  }
};

export default Login;
