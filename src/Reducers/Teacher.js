const Teacher = (
  state = {
    teacher: false
  },
  action
) => {
  const { payload } = action;
  switch (action.type) {
    case "ON_TEACHER_LOGIN":
      return { teacher: true };
    default:
      return { ...state };
  }
};

export default Teacher;
