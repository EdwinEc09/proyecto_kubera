document.addEventListener("DOMContentLoaded", function () {
    var openModalButton = document.getElementById("openModalButton");
    var closeModalButton = document.getElementById("closeModalButton");
    var modal = document.getElementById("myModal");
    var submitModalButton = document.getElementById("submitModalButton");

    openModalButton.addEventListener("click", function () {
        modal.style.display = "block";
    });


    submitModalButton.addEventListener("click", function () {
        var selectedOption = document.querySelector('input[name="respuesta"]:checked');
        var rescorrect = "opcion3";

        if (!selectedOption) {
            alert("Por favor, selecciona una opción.");
        } else if (selectedOption.value === rescorrect) {
            alert("Respuesta correcta, ¡Haz ganado!");
            var opcionesSeleccionadas = document.querySelectorAll('input[name="respuesta"]');
            opcionesSeleccionadas.forEach(function (opcion) {
                opcion.checked = false;
            });
            modal.style.display = "none";
        }
        else {
            alert("Respuesta incorrecta.¡Haz perdido!.");
            var opcionesSeleccionadas = document.querySelectorAll('input[name="respuesta"]');
            opcionesSeleccionadas.forEach(function (opcion) {
                opcion.checked = false;
            });
            modal.style.display = "none";
        }

    });
});
