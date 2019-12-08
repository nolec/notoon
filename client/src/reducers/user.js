export default (state = {}, action) => {
  console.log(action);
  switch (action.type) {
    case "LOGIN_USER":
      let loginState = Object.assign({}, state, {
        loginSuccess: action.payload
      });
      console.log("user Reducer", state, action, loginState);
      return loginState;
    case "REGISTER_USER":
      let registerState = Object.assign({}, state, {
        success: action.payload
      });
      return registerState;
    default:
      return state;
  }
};
