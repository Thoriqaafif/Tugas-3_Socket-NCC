// Setup basic express server
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = 5000;
const dbconnection = require('./configdb/database');

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(path.join(__dirname, 'login_page')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "html")
app.set("views", "login_page")

app.get('/', (req, res) => {
  res.sendFile(login_page + '/index.html');
});

app.post("/add", (req, res) => {
  const insertSql = `INSERT INTO users (username, password) VALUES ('${req.body.username}', '${req.body.password}');`
  dbconnection.query(insertSql, (err, result) => {
    res.redirect("/");
  })
})