$(document).ready(function() {

  // Getting jQuery references to the post body, title, form, and category select
  // var bodyInput = $("#body");
  var messageInput = $("#message");
  var cmsForm = $("#cms");
  var chatDiv = $("#chat");
 
  // Adding an event listener for when the form is submitted
  $(cmsForm).on("submit", function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body or a title
    if (!messageInput.val().trim()) {
      return;
    }
    // Constructing a newPost object to hand to the database
    // var newMessage = {
    //   message: 
    // };

    var newTask = {
      text: messageInput.val().trim(),
      complete: 0,
      dueDay: "2017-01-01"
    }
    console.log(newTask)
    // chatDiv.append('<p>'+newMessage.message+'</p>');

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

    // $.ajax({
    //   method: "DELETE",
    //   url: "/api/tasks/3"
    // })

    messageInput.val("");

  

  });


});
