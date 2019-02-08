const setTandPdata = tandpData => {
  return {
    type: "SET_TANDP_DATA",
    payload: {
      ...tandpData
    }
  };
};

export default setTandPdata;
