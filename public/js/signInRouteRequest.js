$(document).ready(function() {
  const username = $("#username");
  const password = $("#signInPassword");
  const logIn = $("#login-submit");
  $(login).on("click", (event) => {
    console.log('You clicked me!');
    event.preventDefault();
    if (!username.val().trim() && !password.val().trim(){
      return;
    }
    const signIn = {
      email: username.val().trim(),
      password: password.val().trim(),
    };
    console.log(signIn)
    $.ajax({
      method: "post",
      url: "/login",
      data: signIn,
    })
    .done((res) => {
      console.log("test.js DONE");
      console.log(res);
    });
  });
});
