const Login = (
  state = {
    loggedIn: false,
    loginForm: {
      email: "",
      pass: ""
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
    case "ON_FILLING_LOGIN_FORM":
      return { ...state, loginForm: { ...payload } };

    default:
      return state;
  }
};

export default Login;
