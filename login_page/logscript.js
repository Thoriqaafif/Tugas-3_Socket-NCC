const toForm2 = document.getElementById("toForm2");
const Form2 = document.getElementById("form2");
const Form1 = document.getElementById("form1");

toForm2.addEventListener("click", (e) => {
    Form1.style.display = "none";
	Form2.style.display = "block";
})