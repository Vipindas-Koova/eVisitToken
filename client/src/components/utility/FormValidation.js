function validateForm(event, state) {
  if (
    state.hasOwnProperty("password") &&
    state.hasOwnProperty("confirmpassword") &&
    state.password !== state.confirmpassword
  ) {
    return { passwordmatch: true };
  }
  if (
    state.hasOwnProperty("newpassword") &&
    state.hasOwnProperty("confirmpassword") &&
    state.newpassword !== state.confirmpassword
  ) {
    return { passwordmatch: true };
  }
  return;
}

export default validateForm;