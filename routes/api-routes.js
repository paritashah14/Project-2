// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");
//API.AI
    var apiai = require('apiai');
     
    var aiapp = apiai("aa7a66c8d2734135b817745ffa71115c");

// Routes
// =============================================================
module.exports = function(app) {

  // PUT route for conversing with Codi
  app.put("/api/codi", function(req, res) {
    // Add code here to update a post using the values in req.body, where the id is equal to

    console.log("api/codi route!")

     
    var request;

    request = aiapp.textRequest(req.body.message, {
        sessionId: 'CODI-001'
    });
     
    request.on('response', function(response) {
        // console.log(response.result.fulfillment.speech);
        // console.log(response.result.parameters);
        console.log(response);
        res.json(response);
    });
     
    request.on('error', function(error) {
        console.log(error);
    });
    request.end();

   
    // req.body.id and return the result to the user using res.json
  });

  // GET route for getting all of the posts
  app.get("/api/tasks", function(req, res) {
    // use sequelize code to find all tasks, and return them to the user with res.json
        db.Task.findAll({}).then(function(dbTask) {
        res.json(dbTask);
    });
  });

  // // Get route for returning a single Task
  app.get("/api/tasks/:id", function(req, res) {
    //  sequelize code to find all tasks where the id is equal to req.params.id,
     if (req.params.id) {
      db.Task.findAll({
        where: {
          id: req.params.id
        }
      }).then(function(dbTask) {
        res.json(dbTask);
      });
    }
  });

  // Get route for retrieving complete or incomplete tasks
  app.get("/api/tasks/status/:status", function(req, res) {
    //  sequelize code to find tasks status  equal to req.params.status,
      if (req.params.status === "false" || req.params.status === "true") {
        var comp;
        if (req.params.status === "false") comp = 0;
        else comp = 1;

          db.Task.findAll({

            where: {
              complete: comp
            }
          }).then(function(dbTask) {
            res.json(dbTask);
          });
    }
  });

  // Task route for saving a new Task
  app.post("/api/tasks", function(req, res) {
    //sequelize code for creating a Task using req.body,
    console.log("Task Data:");
    console.log(req.body);
    db.Task.create({
      text: req.body.text,
      complete: req.body.complete,
      dueDay: req.body.dueDay
    }).then(function(dbTask) {
        res.json(dbTask);
      });
    // then return the result using res.json
  });

  // DELETE route for deleting Tasks
  app.delete("/api/tasks/:id", function(req, res) {
    //  sequelize code to delete a Task where the id is equal to req.params.id, 

    db.Task.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbTask) {
        res.json(dbTask);
      });
  });

  // PUT route for updating Tasks
  app.put("/api/tasks", function(req, res) {
    // sequelize code to update a Task using the values in req.body, where the id is given
      db.Task.update({
      text: req.body.text,
      complete: req.body.complete,
      dueDay: req.body.dueDay
    }, {
      where: {
        id: req.body.id
      }
    })
    .then(function(dbTodo) {
      res.json(dbTodo);
    });
  });
};
