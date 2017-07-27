// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************x

// Dependencies
// =============================================================

// Requiring our Todo model
// var db = require("../models");
//API.AI
    var apiai = require('apiai');

    var aiapp = apiai("aa7a66c8d2734135b817745ffa71115c");

// Routes
// =============================================================
module.exports = function(app) {

  // PUT route for conversing with Codi
  app.put("/api/codi", function(req, res) {
    // Add code here to update a post using the values in req.body, where the id is equal to

    console.log("api/codi route !")


    var request;

    request = aiapp.textRequest(req.body.message, {
        sessionId: 'CODI-TEST-001'
    });

    request.on('response', function(response) {
        console.log(response.result.fulfillment.speech);
        console.log(response.result.parameters);
        res.json(response.result.fulfillment.speech);
    });

    request.on('error', function(error) {
        console.log(error);
    });
    request.end();


    // req.body.id and return the result to the user using res.json
  });

  // // GET route for getting all of the posts
  // app.get("/api/posts", function(req, res) {
  //   // Add sequelize code to find all posts, and return them to the user with res.json
  //       db.Post.findAll({}).then(function(dbPost) {
  //     // We have access to the todos as an argument inside of the callback function
  //     res.json(dbPost);
  //   });
  // });

  // // Get route for returning posts of a specific category
  // app.get("/api/posts/category/:category", function(req, res) {
  //   // Add sequelize code to find all posts where the category is equal to req.params.category,
  //    if (req.params.category) {
  //     db.Post.findAll({
  //       where: {
  //         category: req.params.category
  //       }
  //     }).then(function(dbPost) {
  //       res.json(dbPost);
  //     });
  //   }
  //   // return the result to the user with res.json
  // });

  // // Get route for retrieving a single post
  // app.get("/api/posts/:id", function(req, res) {
  //   // Add sequelize code to find a single post where the id is equal to req.params.id,
  //        if (req.params.id) {
  //     db.Post.findAll({
  //       where: {
  //         id: req.params.id
  //       }
  //     }).then(function(dbPost) {
  //       res.json(dbPost);
  //     });
  //   }
  //   // return the result to the user with res.json
  // });

  // // POST route for saving a new post
  // app.post("/api/posts", function(req, res) {
  //   // Add sequelize code for creating a post using req.body,
  //   console.log("Post Data:");
  //   console.log(req.body);
  //   db.Post.create({
  //     title: req.body.title,
  //     body: req.body.body,
  //     category: req.body.category,
  //   }).then(function(dbPost) {
  //       res.json(dbPost);
  //     });
  //   // then return the result using res.json
  // });

  // // DELETE route for deleting posts
  // app.delete("/api/posts/:id", function(req, res) {
  //   // Add sequelize code to delete a post where the id is equal to req.params.id,
  //   console.log("Post Data:");
  // //  console.log(req.body);
  //   db.Post.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(dbPost) {
  //       res.json(dbPost);
  //     });
  //   // then return the result to the user using res.json
  // });

  // // PUT route for updating posts
  // app.put("/api/posts", function(req, res) {
  //   // Add code here to update a post using the values in req.body, where the id is equal to
  //     db.Post.update({
  //     title: req.body.title,
  //     body: req.body.body,
  //     category: req.body.category
  //   }, {
  //     where: {
  //       id: req.body.id
  //     }
  //   })
  //   .then(function(dbTodo) {
  //     res.json(dbTodo);
  //   });
  //   // req.body.id and return the result to the user using res.json
  // });
};
