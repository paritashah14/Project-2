const express = require('express');
const db = require('./models');
const sequelize = require('sequelize');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 8081;
const api = require('./api');
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('api', async (request) => {
    const response = {
      id: request.id
    };
    await api[request.name](socket, request.body, response);
    socket.emit('api', response);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}));
// Static directory
app.use(express.static('./public'));
// Routes ========================================================
db.sequelize.sync({
}).then(() => {
  http.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });
});
