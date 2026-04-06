// Galería dinámica
function mostrarGaleria() {
    const galeria = document.getElementById("galeria");
    galeria.innerHTML = `
    <div class="cards">
        <div class="card">Proyecto 1</div>
        <div class="card">Proyecto 2</div>
        <div class="card">Proyecto 3</div>
    </div>
    `;
};
const form = document.getElementById('contact-form');
const statusMessage = document.getElementById('status-message');

// Configuración de validaciones adicionales
document.getElementById('nombre').minLength = 3;
document.getElementById('mensaje').minLength = 10;

// Función para validar campos individuales
const validarCampo = (input) => {
    const errorSpan = document.getElementById(`error-${input.id}`);
    if (!input.checkValidity()) {
        errorSpan.textContent = input.validationMessage;
    } else {
        errorSpan.textContent = '';
    }
};

// Agregar validación en tiempo real (evento input)
form.querySelectorAll('input, textarea').forEach(campo => {
    campo.addEventListener('input', () => validarCampo(campo));
    campo.addEventListener('blur', () => validarCampo(campo));
});

// Simulación de envío al servidor con una Promesa
const enviarFormulario = (datos) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const exito = Math.random() < 0.8; // 80% de probabilidad de éxito
            if (exito) {
                resolve('¡Formulario enviado con éxito!');
            } else {
                reject('Error del servidor. Inténtalo de nuevo más tarde.');
            }
        }, 2000);
    });
};

// Manejo del evento submit
form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Validar todos los campos antes de enviar
    let esValido = true;
    form.querySelectorAll('input, textarea').forEach(campo => {
        validarCampo(campo);
        if (!campo.checkValidity()) {
            esValido = false;
        }
    });

    if (!esValido) return;

    // Preparar mensaje de estado "Enviando..."
    statusMessage.textContent = 'Enviando...';
    statusMessage.className = ''; // Limpiar clases anteriores
    const boton = form.querySelector('button');
    boton.disabled = true; // Deshabilitar botón durante el envío

    // Ejecutar la simulación
    enviarFormulario()
        .then(mensaje => {
            statusMessage.textContent = mensaje;
            statusMessage.className = 'status-success';
            form.reset(); // Limpiar campos si hay éxito
        })
        .catch(error => {
            statusMessage.textContent = error;
            statusMessage.className = 'status-error';
        })
        .finally(() => {
            boton.disabled = false; // Re-habilitar botón
        });
});