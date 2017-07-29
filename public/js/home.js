// alert("connected");

$(document).ready(function() {

  // Getting jQuery references to the post body, title, form, and category select
  // var bodyInput = $("#body");
  var messageInput = $("#message");
  var messageForm = $("#message_form");
  var chatDiv = $("#chat");

  // Adding an event listener for when the form is submitted
  $(messageForm).on("submit", function handleFormSubmit(event) {
    console.log("submit event listener")
    event.preventDefault();
    // Wont submit the post if we are missing a body or a title
    if (!messageInput.val().trim()) {
      return;
    }
    // Constructing a newPost object to hand to the database
    var newMessage = {
      message: messageInput.val().trim(),
    };
    $("#final_span").text("");
    messageInput.val("");

    console.log(newMessage);
    chatDiv.append('<p>'+newMessage.message+'</p>');

    $.ajax({
      method: "PUT",
      url: "/api/codi",
      data: newMessage
    })
    .done(function(res) {
      console.log("home.js .done()");
     // console.log(res);

      chatDiv.append('<p><strong> @Codi: '+res.result.fulfillment.speech+'</strong></p>');

      if(res.result.action==="createTask") {
        console.log("add create task post");
        console.log(res.result.parameters);

        var newTask = {
          text: res.result.parameters.any,
          complete: 0,
          dueDay: res.result.parameters.date
        }
        console.log(newTask)

          $.ajax({
            method: "POST",
            url: "/api/tasks",
            data: newTask
          })
          .done(function(res) {
            console.log("test.js DONE");
            console.log(res);
             messageInput.val("");
            chatDiv.append('<p><strong>'+res+'</strong></p>');
          });

      }
    });



  });


});
