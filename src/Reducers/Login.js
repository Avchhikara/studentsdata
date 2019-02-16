const Login = (
  state = {
    loggedIn: false,
    generalData: {
      name: "",
      rno: "",
      mname: "",
      fname: "",
      gender: "",
      address: "",
      university: ""
    },
    tandpData: {
      year: "",
      during: "",
      iname: "",
      iaddress: "",
      ilinks: ""
    },
    extraData: {
      esemester: "",
      ename: "",
      einstitution: "",
      eachievement: ""
    },
    resultData: {
      rsemester: "",
      rattempt: "",
      rsgpa: ""
    }
  },
  action
) => {
  const { payload } = action;
  switch (action.type) {
    case "LOGGING_IN":
      return {
        ...state,
        userData: payload.userData,
        loggedIn: payload.loggedIn,
        generalData: payload.generalData,
        tandpData: payload.tandpData
      };
    case "LOGGING_OUT":
      return { ...payload };
    case "ON_FETCH_GENERAL_DATA":
      return { ...state, generalData: payload };
    case "SET_TIMEOUT_ID":
      return { ...state, tid: payload.tid };
    case "SET_TANDP_DATA":
      return { ...state, tandpData: payload };
    case "SET_EXTRA_DATA":
      return { ...state, extraData: payload };
    case "SET_RESULT_DATA":
      return { ...state, resultData: payload };
    default:
      return state;
  }
};

export default Login;
