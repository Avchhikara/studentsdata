const teacherLogin = teacherData => {
  return {
    type: "ON_TEACHER_LOGIN",
    payload: {
      loggedIn: true,
      teacher: true,
      userData: teacherData.userData
    }
  };
};

export default teacherLogin;
