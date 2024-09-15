const $btnSignIn= document.querySelector('.sign-in-btn'),
      $btnSignUp = document.querySelector('.sign-up-btn'),  
      $signUp = document.querySelector('.sign-up'),
      $signIn  = document.querySelector('.sign-in');

document.addEventListener('click', e => {
    if (e.target === $btnSignIn || e.target === $btnSignUp) {
        $signIn.classList.toggle('active');
        $signUp.classList.toggle('active')
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-recuperacion');
    const emailInput = document.getElementById('email-recuperacion');
    const submitBtn = document.getElementById('btn-recuperacion');
    const errorMessage = document.getElementById('mensaje-error');

    submitBtn.addEventListener('click', () => {
        const email = emailInput.value.trim();


        errorMessage.textContent = '';


        if (!email) {
            errorMessage.textContent = "Por favor, ingresa tu correo electrónico.";
            return;
        }

    
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            errorMessage.textContent = "Por favor, ingresa un correo electrónico válido.";
            return;
        }

        console.log(`Enviando solicitud para el correo: ${email}`);
        alert("Si el correo está registrado, se enviará un enlace de recuperación.");

    });
});
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-editar-perfil');
    const nombreInput = document.getElementById('nombre');
    const correoInput = document.getElementById('correo');
    const contrasenaInput = document.getElementById('contrasena');
    const telefonoInput = document.getElementById('telefono');
    const fechaNacimientoInput = document.getElementById('fecha_nacimiento');

    const errorNombre = document.getElementById('error-nombre');
    const errorCorreo = document.getElementById('error-correo');
    const errorContrasena = document.getElementById('error-contrasena');
    const errorTelefono = document.getElementById('error-telefono');
    const errorFechaNacimiento = document.getElementById('error-fecha_nacimiento');

    form.addEventListener('submit', (event) => {
        let valid = true;

        // Limpiar mensajes de error
        errorNombre.textContent = '';
        errorCorreo.textContent = '';
        errorContrasena.textContent = '';
        errorTelefono.textContent = '';
        errorFechaNacimiento.textContent = '';

        // Validar nombre
        if (nombreInput.value.trim() === '') {
            errorNombre.textContent = 'El nombre es obligatorio.';
            valid = false;
        }

        // Validar correo electrónico
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(correoInput.value.trim())) {
            errorCorreo.textContent = 'Por favor, ingresa un correo electrónico válido.';
            valid = false;
        }

        // Validar contraseña (mínimo 8 caracteres, al menos una letra y un número)
        const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordPattern.test(contrasenaInput.value.trim())) {
            errorContrasena.textContent = 'La contraseña debe tener al menos 8 caracteres, incluyendo letras y números.';
            valid = false;
        }

        // Validar teléfono (opcional, formato de número)
        if (telefonoInput.value.trim() && !/^\+?[1-9]\d{1,14}$/.test(telefonoInput.value.trim())) {
            errorTelefono.textContent = 'El teléfono no es válido.';
            valid = false;
        }

        // Validar fecha de nacimiento (opcional, debe ser una fecha pasada)
        if (fechaNacimientoInput.value.trim() && new Date(fechaNacimientoInput.value) >= new Date()) {
            errorFechaNacimiento.textContent = 'La fecha de nacimiento debe ser en el pasado.';
            valid = false;
        }

        if (!valid) {
            event.preventDefault(); // Prevenir el envío del formulario si hay errores
        }
    });
});
