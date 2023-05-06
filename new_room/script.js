const check = document.getElementById("check")
const pw = document.getElementById("roompassword")
const createButton = document.getElementById("create-button")

check.addEventListener("change", (e) => {
    if (check.checked) {
        pw.style.display = 'block';
    } else {
        pw.style.display = 'none';
    }
})

createButton.addEventListener("click", (e) => {
    e.preventDefault();
    fetch("./", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username : $('#roomname').val(), password : $('#roompassword').val()})
      })
      .then(response => response.json())
      .then(message => {
        console.log(message);
      })
      .catch(error => {
        console.error(error);
      });
})