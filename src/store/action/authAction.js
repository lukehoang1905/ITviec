function login(user) {
  return { type: "LOGIN", payload: user };
}
function loginFail(mess) {
  return { type: "LOGINFAIL", payload: mess };
}

function loginMiddleware(user) {
  return (dispatch) => {
    try {
      if (!user.email || !user.password) {
        dispatch(loginFail("fail"));
        return;
      } else {
        dispatch(login(user));
      }
    } catch (error) {
      console.log(error);
    }
  };
}
export default loginMiddleware;
