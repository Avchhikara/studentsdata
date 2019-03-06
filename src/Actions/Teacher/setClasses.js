const setClasses = classes => {
  // console.log(classes);
  return {
    type: "SET_CLASSES",
    payload: classes
  };
};

export default setClasses;
