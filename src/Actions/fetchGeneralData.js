const fetchGeneralData = generalForm => {
  return {
    type: "ON_FETCH_GENERAL_DATA",
    payload: {
      ...generalForm
    }
  };
};

export default fetchGeneralData;
