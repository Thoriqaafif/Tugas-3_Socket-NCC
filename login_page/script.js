$(function () {
    const toForm2 = document.getElementById("toForm2");
    const Form2 = document.getElementById("form2");
    const Form1 = document.getElementById("form1");

    toForm2.addEventListener("click", (e) => {
        Form1.style.display = "none";
        Form2.style.display = "block";
    });

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

    })*/
})