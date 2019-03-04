const User = (
  state = {
    loggedIn: false,
    teacher: false,
    userData: {
      t_id: "",
      name: "",
      email: "",
      token: "",
      university: "",
      department: ""
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
    case "LOGGING_OUT":
      return { ...payload };

    case "ON_TEACHER_LOGIN":
      return {
        ...state,
        ...payload
      };

    default:
      return { ...state };
  }
};

export default User;
