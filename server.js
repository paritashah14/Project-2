(async () => {
  const express =  require('express');
  const PORT = 8080 || process.env.PORT;
  const app = express();
  const exphbs = require(`express-handlebars`);
  const db =  require("./models");
  const sequelize =  require('sequelize');
  const bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.text());
  app.use(bodyParser.json({ type: "application/vnd.api+json" }));
  app.use(express.static("./public"));
  app.engine('handlebars', exphbs({defaultLayout: 'main'}));
  app.set('view engine', 'handlebars');
  require("./routes/html-routes.js")(app);
  require("./routes/api-routes.js")(app);
  await db.sequelize.sync({ force: true });
  app.get(`/`, (req, res) => {
    res.send(`hello`)
  });
  app.listen(PORT, () => {
      console.log("App listening on PORT " + PORT);
  });
 }
)();
