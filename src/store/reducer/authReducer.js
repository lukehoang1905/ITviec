let initialState = {
  user: {
    email: "",
    password: "",
    isAuthenticated: false,
  },
  error: "",
};
function reducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
      state.user.email = action.payload.email;
      state.user.password = action.payload.password;
      state.user.isAuthenticated = true;
      state.error = "";
      break;
    case "LOGINFAIL": {
      state.error = action.payload;
      alert("login fail, please try again");
      break;
    }
    case "LOGOUT": {
      state.user.email = "";
      state.user.password = "";
      state.user.isAuthenticated = false;
      state.error = "";
      alert("Sign-out successfully");

      break;
    }
    default:
      console.log("this is default");
      break;
  }
  console.log(state);
  return { ...state };
}

export default reducer;
