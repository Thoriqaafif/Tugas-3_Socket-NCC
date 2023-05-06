// Setup basic express server
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
//const session = require('express-session');
const port = 5000;
const dbconnection = require('./configdb/database');

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(path.join(__dirname, 'login_page')));
app.use('/chat', express.static(path.join(__dirname, 'chat-page')));
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/chat/newroom', express.static(path.join(__dirname, 'new_room')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "html")
app.set("views", "login_page")

//acces login page
app.get('/', (req, res) => {
  res.sendFile(login_page + '/index.html');
});
/*
app.get('/chat', (req, res) => {
  res.sendFile((chat - page + '/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.redirect('/chat');
    }
  });
});*/

app.get('/chat/newroom', (req, res) => {  
  res.sendFile((new_room + '/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.redirect('/chat/newroom');
    }
  });
});


//register
app.post("/add", (req, res) => {
  const { username, password } = req.body;
  const findusn = `SELECT username from users where username = "${username}";`
  dbconnection.query(findusn, (err, rows, field) => {
    if (err) {
      return res.status(500).json({ message: 'There is an error', error: err });
    }

    if (!rows.length) {
      const insertSql = `INSERT INTO users (username, password) VALUES ('${username}', '${password}');`
      dbconnection.query(insertSql, (err, result) => {
        res.status(200).json({ message: 'Data inputed' });
      })
    }
    else{
      return res.status(404).json({ message: 'Username has been used' });
    }
  })
})

app.post("/chat/newroom", (req, res) => {
  const insertSql = `INSERT INTO users (username, password) VALUES ('${req.body.username}', '${req.body.password}');`
  dbconnection.query(insertSql, (err, result) => {
    res.status(200).json({message: 'Data inputed'});
  })
})

//login
app.post("/chat", (req, res) => {
  // buat query sql
  const querySql = `SELECT * FROM users WHERE username = ('${req.body.username}') AND password = ('${req.body.password}')`;
  console.log(req.body.username)
  // jalankan query
  dbconnection.query(querySql, (err, rows, field) => {
    // error handling
    if (err) {
      return res.status(500).json({ message: 'There is an error', error: err });
    }

    // jika request berhasil
    if (rows.length) {
      res.status(200).json({ message: 'valid' })
    } else {
      return res.status(404).json({ message: 'Username or Password is Incorrect' });
    }
  });
  return 0;
});

//TESTING
let numUsers;

io.on('connection', (socket) => {
  let addedUser = false;
  console.log(socket.id);

  // when the client emits 'new message', this listens and executes
  socket.on('new message', (data) => {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', (username) => {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
    console.log(io.engine.clientsCount);
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', () => {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', () => {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', () => {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});