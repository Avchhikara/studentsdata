const defaultState = {
  teacher: false,
  classes: []
};

const Teacher = (state = defaultState, action) => {
  const { payload } = action;
  // console.log(payload, state, state.classes.concat(payload));
  switch (action.type) {
    case "ON_TEACHER_LOGIN":
      return { ...defaultState, teacher: true };
    case "SET_CLASSES":
      return { ...state, classes: payload };
    case "LOGGING_OUT":
      return { ...defaultState };
    default:
      return { ...state };
  }
};

export default Teacher;
