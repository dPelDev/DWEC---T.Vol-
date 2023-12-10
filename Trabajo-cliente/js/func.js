const form_dar = document.querySelector("#dar_citas");
document.getElementById("dar").addEventListener('click', () => { form_dar.showModal(); });
document.getElementById("cerrar").addEventListener('click', () => { form_dar.close(); });


const tabla_ver = document.querySelector("#ver_citas");
document.getElementById("ver").addEventListener('click', () => { tabla_ver.showModal(); });
document.getElementById("cerrartabla").addEventListener('click', () => { tabla_ver.close(); });











// Capturando datos

function guardarDatos() {



    //Validando Teléfono

    var telef = new RegExp("^(\\+34|0034|34)?[6789]\\d{8}$");
    var valortelef = document.getElementById("validationDefault03").value;
    if (telef.test(valortelef)) {
        console.log("telefono correcto");
        // Si el teléfono es correcto, entonces valido el DNI


        let dni = document.getElementById("validationDefault04").value;

        //Se separan los números de la letra
        var letraDNI = dni.substring(8, 9).toUpperCase();
        var numDNI = parseInt(dni.substring(0, 8));

        //Se calcula la letra correspondiente al número
        var letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];
        var letraCorrecta = letras[numDNI % 23];

        if (letraDNI == letraCorrecta) {
            console.log("Bien ");
        //Si el DNI tambien es correcto, entonces creo el usuario
        let usuario = {
            nombre: document.getElementById("validationDefault01").value,
            apellidos: document.getElementById("validationDefault02").value,
            telefono: document.getElementById("validationDefault03").value,
            dni: document.getElementById("validationDefault04").value,
            fecha_nacimiento: document.getElementById("validationDefault05").value,
            observaciones: document.getElementById("validationDefault07").value,
            fecha_cita: document.getElementById("validationDefault06").value
    
        }
    
        console.log(usuario);

        } else {
            document.getElementById('error_dni').innerText = "Introduce otro DNI";
        }


    } else {
        document.getElementById('error_tel').innerText = "Introduce otro teléfono";
    }

    

}

