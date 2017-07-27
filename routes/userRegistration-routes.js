const db = require(`../models`);
module.exports = (app) => {
  app.post("/registration", (req, res) => {
    console.log("Post Data:");
    console.log(req.body);
   db.Registration.create({
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword
    }).then((dbTodo) => {
      // We have access to the new todo as an argument inside of the callback function
      res.json(dbTodo);
    });
  });
  }
