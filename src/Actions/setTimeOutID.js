const settimeoutId = tid => {
  return {
    type: "SET_TIMEOUT_ID",
    payload: { ...tid }
  };
};

export default settimeoutId;
