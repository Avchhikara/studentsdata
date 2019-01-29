const onLogginIn = userData => {
  return {
    type: "LOGGING_IN",
    payload: {
      loggedIn: true,
      userData
    }
  };
};

export default onLogginIn;
