
function regi() {
    var nmbre = document.getElementById("nmbre").value;

    // Almacena el nombre en localStorage
    localStorage.setItem("nombre", nmbre);

    alert("Registro realizado con éxito " + " " + nmbre);
}




// emm ps esto lo que hace es que espera a que la página esté completamente cargada
document.addEventListener("DOMContentLoaded", function () {
    // y ahora esto lo q hace es q recupera el nombre almacenado en localStorage
    var storedName = localStorage.getItem("nombre");

    // y x ultimo esto comprueba si el nombre existe y lo muestra en la etiqueta p con id "usu"
    if (storedName) {
        localStorage.removeItem("nombre"); //esto sirve para q cda vez que se refresque la pagina se borre el nombre 
        document.getElementById("usu").textContent = storedName;
    }
});


 //me toco verme un video pa poder entender como funcionaba




