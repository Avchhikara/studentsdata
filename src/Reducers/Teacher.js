const defaultState = {
  teacher: false,
  classes: [],
  requests: []
};

const Teacher = (state = defaultState, action) => {
  const { payload } = action;
  // console.log(payload, state, state.classes.concat(payload));
  switch (action.type) {
    case "ON_TEACHER_LOGIN":
      return { ...defaultState, teacher: true };
    case "SET_CLASSES":
      return { ...state, classes: payload };
    case "SET_REQUESTS":
      return { ...state, requests: payload };
    case "LOGGING_OUT":
      return { ...defaultState };
    default:
      return { ...state };
  }
};

export default Teacher;
