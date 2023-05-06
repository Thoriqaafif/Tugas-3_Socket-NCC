

    const toForm2 = document.getElementById("toForm2");
    const Form2 = document.getElementById("form2");
    const Form1 = document.getElementById("form1");
    const loginButton = document.getElementById("login-button");
    const regisButton = document.getElementById("register-button");
    var username;

    toForm2.addEventListener("click", (e) => {
        Form1.style.display = "none";
        Form2.style.display = "block";
    });

    regisButton.addEventListener("click", (e) => {
        e.preventDefault();
        fetch("./add", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({username : $('#username').val(), password : $('#password').val()})
          })
          .then(response => {
            if(response.status == 200){
                window.alert("Success create an acount");
                response.json();
            }
            else{
                window.alert("Cann't create account. Username has been used");
            }
          })
          .then(message => {
            console.log(message);
          })
          .catch(error => {
            console.error(error);
          });
    })

    loginButton.addEventListener("click", (e) => {
        e.preventDefault();
        username=$('#logusername').val();
        fetch("./chat", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({username : $('#logusername').val(), password : $('#logpassword').val()})
        })
        .then(response => {
            if(response.status === 200) {
                return response.json();
            } else {
                window.alert("Wrong username and password. Please try again");
                throw new Error('Invalid username or password');
            }
        })
        .then(message => {

            if(message = 'valid'){
                fetch("./chat", {
                    method : 'GET'
                })
                .then(response => {
                    if (response.redirected) {
                        window.location.href = response.url;
                    }
                })
                .catch(error => {
                    console.error(error);
                });
            }
        
        })
        .catch(error => {
            console.error(error);
        });
    });

/*$(function () {
    let $loginusername;
    let $loginpassword;

    const socket=io();

    //get to login form
    const to_Login = () =>{
        Form1.style.display = "block";
        Form2.style.display = "none";
    }

    const chat = ()=> {
        window.alert('/chat');
    }

    //when client submit register form, emit usn and pass to server
    $('#signup').on('submit', (e) => {
        let usn=$('#username').val();
        let pass=$('#password').val();
        socket.emit('signup',usn,pass);
        Form1.style.display = "none";
        Form2.style.display = "block";
        //window.alert("Account has been created");
    })

    //when client submit login form, emit usn and pass to the server
    $('#login').on('submit',(e) => {
        $loginusername=$('.Username').val();
        $loginpassword=$('.Password').val();
        socket.emit('login', $loginusername, $loginpassword);
        //window.alert("Account has been created");
    })


    //login success
    socket.on('login success', () => {
        chat();
    })

    socket.on('signup success', () => {
        window.alert("");
    })

    socket.on('hello', (data) => {
        window.alert("daftaro");
    })
    /*
    //Login
    socket.on('login', (username, password) => {
        socket.emit
    })

    //Register
    socket.on('register', (username, password) => {

    })
})*/