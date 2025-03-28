document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");

    form.addEventListener("submit", function(event) {
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;

        if (username.length < 3) {
            alert("El nombre debe tener al menos 3 caracteres.");
            event.preventDefault();
            return;
        }

        if (password.length < 8) {
            alert("La contraseña debe tener al menos 8 caracteres.");
            event.preventDefault();
            return;
        }
    });
});
