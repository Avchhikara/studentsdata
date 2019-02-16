const setResultData = resultData => {
  return {
    type: "SET_RESULT_DATA",
    payload: { ...resultData }
  };
};

export default setResultData;
