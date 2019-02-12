const setExtraData = ({
  esemester = "",
  ename = "",
  einstitution = "",
  eachievement = ""
}) => {
  return {
    type: "SET_EXTRA_DATA",
    payload: {
      esemester,
      ename,
      einstitution,
      eachievement
    }
  };
};

export default setExtraData;
