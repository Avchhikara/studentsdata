const setRequests = req => {
  return {
    type: "SET_REQUESTS",
    payload: req
  };
};

export default setRequests;
