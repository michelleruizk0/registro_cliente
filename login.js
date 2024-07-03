const formcontainer = document.getElementById('tintoreriaForm');
const inputs = document.querySelectorAll('#tintoreriaForm input');

const expresiones = {
    nombre: /^[a-zA-Z\s]{1,40}$/,
    apellido: /^[a-zA-Z\s]{1,40}$/,
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{10}$/,
    calle: /^[a-zA-Z\s]{1,40}$/,
    numeroext: /^\d+$/,
    numeroint: /^\d+$/,
    cp: /^\d{5}$/
};

const campos = {
    nombre: false,
    apellido: false,
    correo: false,
    telefono: false,
    calle: false,
    numeroext: false,
    numeroint: true,
    cp: false,
    delegacion: false
};

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
            break;
        case "apellido":
            validarCampo(expresiones.apellido, e.target, 'apellido');
            break;
        case "correo":
            validarCampo(expresiones.correo, e.target, 'correo');
            break;
        case "telefono":
            validarCampo(expresiones.telefono, e.target, 'telefono');
            break;
        case "calle":
            validarCampo(expresiones.calle, e.target, 'calle');
            break;
        case "numeroext":
            validarCampo(expresiones.numeroext, e.target, 'numeroext');
            break;
        case "numeroint":
            validarCampo(expresiones.numeroint, e.target, 'numeroint');
            break;
        case "cp":
            validarCampo(expresiones.cp, e.target, 'cp');
            break;
        case "delegacion":
            validarCampo(expresiones.delegacion, e.target, 'delegacion');
            break;
    }
};

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
};

const llenarDelegacion = (cp) => {
    const delegaciones = {
        '08000': 'Ramos Millan',
        '08400': 'Granjas Mexico',
        '08510': 'El Rodeo'
    };
    const delegacionInput = document.getElementById('delegacion');
    delegacionInput.value = delegaciones[cp] || '';
};

document.getElementById('cp').addEventListener('input', function() {
    llenarDelegacion(this.value);
});

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

formcontainer.addEventListener('submit', (e) => {
    e.preventDefault();

    const validForm = Object.values(campos).every(value => value);

    if (validForm) {
        const formData = new FormData(formcontainer);

        fetch('registro.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                // Limpiar los campos del formulario
                formcontainer.reset();

                // Reiniciar validación de campos
                Object.keys(campos).forEach(campo => {
                    document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
                    campos[campo] = false;
                });

                // Mostrar mensaje de éxito
                document.getElementById('formulario_completado').classList.add('formulario__mensaje-exito-activo');
                setTimeout(() => {
                    document.getElementById('formulario_completado').classList.remove('formulario__mensaje-exito-activo');
                    
                    // Redirigir a index.html
                    window.location.href = 'index.html';
                }, 3000);
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
           // alert('Error en el envío del formulario. Por favor intenta nuevamente.');
        });
    } else {
        //alert('Por favor completa todos los campos correctamente.');
    }
});
