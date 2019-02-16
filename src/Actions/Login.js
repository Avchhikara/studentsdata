const onLogginIn = userData => {
  return {
    type: "LOGGING_IN",
    payload: {
      loggedIn: true,
      userData,
      generalData: {
        name: "",
        rno: "",
        mname: "",
        fname: "",
        gender: "",
        address: ""
      },
      tandpData: {
        year: "",
        during: "",
        iname: "",
        iaddress: "",
        ilinks: ""
      },
      resultData: {
        rsemester: "",
        rattempt: "",
        rsgpa: ""
      },
      extraData: {
        eachievement: "",
        einstitution: "",
        ename: "",
        esemester: ""
      }
    }
  };
};

export default onLogginIn;
