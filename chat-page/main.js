$(function () {
    // Initialize variables
    const $window = $(window);
    const $usernameInput = $('.usernameInput'); // Input for username
    const $messages = $('.messages');           // Messages area
    const $inputMessage = $('.inputMessage');   // Input message input box

    const $loginPage = $('.login.page');        // The login page
    const $chatPage = $('.chat.page');          // The chatroom page

    const socket = io();

    // Prompt for setting a username
    let username;
    let connected = false;
    let typing = false;
    let lastTypingTime;
    let $currentInput = $usernameInput.focus();
    let numrooms;

    //load prev-chat

    //load rooms

    //load anggota

})



//TESTING
document.getElementById("room-name").innerHTML = "Private Room";
/*
var sheetToBeRemoved = document.getElementById('room-name');
var sheetParent = sheetToBeRemoved.parentNode;
sheetParent.removeChild(sheetToBeRemoved);*/

var chat = document.getElementsByClassName('chat');
//chat.style.float = "right";

const newroom = document.getElementById("new");
newroom.addEventListener("click", (e) => {
    console.log("Tambah Room");
    e.preventDefault();
    fetch("./newroom", {
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
})