document.addEventListener("DOMContentLoaded", function () {
    var introText = document.getElementById("intro-text");

    // Mostrar el texto al cargar la página
    introText.style.display = "block";

    // Esperar 5 segundos antes de ocultar el texto
    setTimeout(function () {
        fadeOut(introText, function () {
            window.location.href = "index.html";
        });
    }, 5000);

    // Función para ocultar el elemento lentamente
    function fadeOut(element, callback) {
        var opacity = 1;
        var interval = setInterval(function () {
            if (opacity <= 0) {
                clearInterval(interval);
                element.style.display = "none";
                if (typeof callback === 'function') {
                    callback();
                }
            } else {
                element.style.opacity = opacity;
                opacity -= 0.05;
            }
        }, 100);
    }
});
