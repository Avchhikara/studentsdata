const onLogOut = () => {
  return {
    type: "LOGGING_OUT",
    payload: {
      loggedIn: false
    }
  };
};

export default onLogOut;
