const onLoggingForm = ({ email, pass }) => {
  return {
    type: "ON_FILLING_LOGIN_FORM",
    payload: {
      email,
      pass
    }
  };
};

export default onLoggingForm;
