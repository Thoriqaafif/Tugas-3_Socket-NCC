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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "html")
app.set("views", "login_page")

//acces login page
app.get('/', (req, res) => {  
  res.sendFile(login_page + '/index.html');
});

app.get('/chat', (req, res) => {  
  res.sendFile((chat-page + '/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.redirect('/chat');
    }
  });
});


//register
app.post("/add", (req, res) => {
  const insertSql = `INSERT INTO users (username, password) VALUES ('${req.body.username}', '${req.body.password}');`
  dbconnection.query(insertSql, (err, result) => {
    res.status(200).json({message: 'Data inputed'});
  })
})

//login
app.post("/chat", (req, res) => {
  // buat query sql
  const querySql = `SELECT * FROM users WHERE username = ('${req.body.username}') AND password = ('${req.body.password}')`;
  // jalankan query
  dbconnection.query(querySql, (err, rows, field) => {
          // error handling
          if (err) {
              return res.status(500).json({ message: 'There is an error', error: err });
          }

          // jika request berhasil
          if(rows.length){
            res.status(200).json({message: 'valid'})
          } else {
              return res.status(404).json({ message: 'Username or Password is Incorrect'});
          }
      });    
  return 0;
});

//TESTING
let socketId;
let akun = [];
let joinedRooms=[];

io.on("connection", (socket) => {
  socketId=socket.id;
  console.log(socketId);

  //when client register, server store usn and pass to database
  socket.on('signup', (usn,pass) =>{
    //
    if(usn && pass){
      //check if username has been used

      //username hasn't used
      akun.push({username:usn,password:pass});
      console.log("tes");
      //server gives callback to client
    }
    else if(!usn && !pass){

    }
    else if (usn && !pass){
    }
  })

  //when the client login, server validate the usn and pass
  socket.on('login',(usn,pass)=>{
    if(usn && pass){
      let find=false;

      console.log("Username:"+usn);
      console.log("Password:"+pass);
      //search usn and pass in database
      for(i=0;i<akun.length;i++){
        if(usn == akun[i].username && pass==akun[i].password){
          find=true;
          //console.log(akun[i].username);
        }
      }

      if(find){
        console.log("Ada bang akunnya");
        socket.emit('login-succes', (true));
      }
      else{
        console.log("salah kali passwordnyaa");
      }

      //callback the client's room
    }
    else{
      console.log('tidak masuk bos');
    }
  })
})