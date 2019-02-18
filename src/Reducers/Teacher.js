const Teacher = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case "LOGGING_IN":
      return { ...state, teacher: payload.teacher };
    case "SET_TEACHER_DATA":
      return { ...state, teacherData: payload };
    default:
      return { ...state };
  }
};

export default Teacher;
