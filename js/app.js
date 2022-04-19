// variables 
const btnEnviar = document.querySelector("#enviar");
const btnReset = document.querySelector("#resetBtn");
const formulario = document.querySelector("#enviar-mail");

const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");

const er = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

eventListeners();
function eventListeners() {
    // cuando la app arranca
    document.addEventListener("DOMContentLoadedd", iniciarApp);

    // campos del formulario
    email.addEventListener("blur", validarFormulario);
    asunto.addEventListener("blur", validarFormulario);
    mensaje.addEventListener("blur", validarFormulario);

    // reinicia el formulario 
    btnReset.addEventListener("click", resetearFormulario);

    // enviar email
    formulario.addEventListener("submit", enviarEmail);

}


// funciones
function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add("cursor-not-allowed", "opacity-50")
}

// validar el formulario 
function validarFormulario(e) {

    if(e.target.value.length > 0) {

        // eliminar los errores
        const error = document.querySelector("p.error");
        if(error) {
            error.remove();
        }
        
        e.target.classList.remove("border", "border-red-500");
        e.target.classList.add("border", "border-green-500");
    } else {
        e.target.classList.remove("border", "border-green-500");
        e.target.classList.add("border", "border-red-500");

        mortarError("Todos los campos son obligatorios");
    }

    if(e.target.type === "email") {
        
        if( er.test( e.target.value )) {
            const error = document.querySelector("p.error");
            if(error) {
                error.remove();
            }

            e.target.classList.remove("border", "border-red-500");
            e.target.classList.add("border", "border-green-500")
        } else {
            e.target.classList.remove("border", "border-green-500");
            e.target.classList.add("border", "border-red-500");

            mortarError("Email no valido");
        }
    }

    if( er.test( email.value ) !== "" && asunto.value !== "" && mensaje.value !== "" ) {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove("cursor-not-allowed", "opacity-50")
    } 
}

function mortarError(mensaje) {
    const mensajeError = document.createElement("p");
    mensajeError.textContent = mensaje;
    mensajeError.classList.add("border", "border-red-500", "background-color-100", "text-red-500", "p-3", "mt-5", "text-center", "error");

    const errores = document.querySelectorAll(".error");
    if(errores.length === 0) {
        formulario.appendChild(mensajeError);
    }
}

// envia el email
function enviarEmail(e) {
    e.preventDefault();
    
    //mostrar el spinner
    const spinner = document.querySelector("#spinner");
    spinner.style.display = "flex";

    // despues de 3 segundos ocultar} el spinner y mostrar el mensaje
    setTimeout(() => {
        spinner.style.display = "none";

        // mensaje: se envio correctamente
        const parrafo = document.createElement("p");
        parrafo.textContent = "Se envio correctamente"
        parrafo.classList.add("text-center", "my-10", "p-2", "bg-green-500", "text-white", "font-bold", "uppercase" );

        // imsertar el parrafo antes del spinner 
        formulario.insertBefore(parrafo, spinner);

        setTimeout(() => {
            parrafo.remove(); // eliminar el mensaje

            resetearFormulario();
        }, 5000);

    }, 3000 );
}

// funcion que resetea el formulario
function resetearFormulario(e) {
    e.preventDefault();
    formulario.reset();

    iniciarApp();
}