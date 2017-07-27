$(document).ready(function() {
  const username = $("#username");
  const email = $("#email");
  const password = $("#password");
  const confirmPassword = $("#confirm-password");
  const registerSubmit = $("#register-submit");
  $(registerSubmit).on("click", function handleFormSubmit(event) {
    console.log('You clicked me!');
    event.preventDefault();
    if (!email.val().trim() && !password.val().trim() && !confirmPassword.val().trim()){
      return;
    }
    const newUser = {
      username: username.val().trim(),
      email: email.val().trim(),
      password: password.val().trim(),
      confirmPassword: confirmPassword.val().trim()
    };
    console.log(newUser)
    $.ajax({
      method: "POST",
      url: "/registration",
      data: newUser,
    })
    .done((res) => {
      console.log("test.js DONE");
      console.log(res);
    });
  });
});
