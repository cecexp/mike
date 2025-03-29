document.addEventListener("DOMContentLoaded", function() {
    const loginContainer = document.querySelector(".login-container");
    const registerContainer = document.querySelector(".register-container");
    const showRegisterBtn = document.getElementById("showRegister");
    const showLoginBtn = document.getElementById("showLogin");

    showRegisterBtn.addEventListener("click", function(event) {
        event.preventDefault();
        loginContainer.classList.add("hidden");
        registerContainer.classList.remove("hidden");
    });

    showLoginBtn.addEventListener("click", function(event) {
        event.preventDefault();
        registerContainer.classList.add("hidden");
        loginContainer.classList.remove("hidden");
    });

    document.getElementById("loginForm").addEventListener("submit", function(event) {
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;

        if (username.length < 3) {
            alert("El nombre debe tener al menos 3 caracteres.");
            event.preventDefault();
        }

        if (password.length < 8) {
            alert("La contraseña debe tener al menos 8 caracteres.");
            event.preventDefault();
        }
    });

    document.getElementById("registerForm").addEventListener("submit", function(event) {
        const newUsername = document.getElementById("new-username").value.trim();
        const email = document.getElementById("email").value.trim();
        const newPassword = document.getElementById("new-password").value;

        if (newUsername.length < 3) {
            alert("El nombre debe tener al menos 3 caracteres.");
            event.preventDefault();
        }

        if (!email.includes("@")) {
            alert("Ingrese un correo electrónico válido.");
            event.preventDefault();
        }

        if (newPassword.length < 8) {
            alert("La contraseña debe tener al menos 8 caracteres.");
            event.preventDefault();
        }
    });
});
