const Teacher = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case "LOGGING_IN":
      return { ...state, teacher: payload.teacher === "1" ? true : false };
    default:
      return { ...state };
  }
};

export default Teacher;
