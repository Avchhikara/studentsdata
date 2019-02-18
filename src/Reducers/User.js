const User = (
  state = {
    loggedIn: false,
    teacher: false,
    userData: {
      s_id: "",
      teacher: "",
      email: "",
      password: "",
      id: ""
    }
  },
  action
) => {
  const { payload } = action;

  switch (action.type) {
    case "LOGGING_IN":
      return {
        ...state,
        ...payload
      };
    default:
      return { ...state };
  }
};

export default User;
