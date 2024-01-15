const form_dar = document.querySelector("#dar_citas");

document.getElementById("dar").addEventListener("click", () => {
  form_dar.showModal();
});
document.getElementById("cerrar").addEventListener("click", () => {
  form_dar.close();
});

const tabla_ver = document.querySelector("#ver_citas");
document.getElementById("ver").addEventListener("click", () => {
  tabla_ver.showModal();
});
document.getElementById("cerrartabla").addEventListener("click", () => {
  tabla_ver.close();
});

function validarTel() {
  var telef = new RegExp("^(\\+34|0034|34)?[6789]\\d{8}$");
  var telefono = document.getElementById("validationDefault03").value;
  if (telef.test(telefono)) {
    return "TELEFONO CORRECTO";
  }
}

function validarDNI() {
  var dni = document.getElementById("validationDefault04").value;
  //Se separan los números de la letra
  var letraDNI = dni.substring(8, 9).toUpperCase();
  var numDNI = parseInt(dni.substring(0, 8));

  //Se calcula la letra correspondiente al número
  var letras = [
    "T",
    "R",
    "W",
    "A",
    "G",
    "M",
    "Y",
    "F",
    "P",
    "D",
    "X",
    "B",
    "N",
    "J",
    "Z",
    "S",
    "Q",
    "V",
    "H",
    "L",
    "C",
    "K",
    "E",
    "T",
  ];
  var letraCorrecta = letras[numDNI % 23];

  if (letraDNI == letraCorrecta) {
    return "DNI CORRECTO ";
  }
}
//ArrayCitas
const citas = [];

//Objeto Cita
class Cita {
  constructor(
    nombre,
    apellidos,
    telefono,
    dni,
    fechaNacimiento,
    observaciones,
    fechaCita,
    id
  ) {
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.telefono = telefono;
    this.dni = dni;
    this.fechaNacimiento = fechaNacimiento;
    this.observaciones = observaciones;
    this.fechaCita = fechaCita;
    this.id = id;
  }

  toJSON() {
    return {
      nombre: this.nombre,
      apellidos: this.apellidos,
      telefono: this.telefono,
      dni: this.dni,
      fechaNacimiento: this.fechaNacimiento,
      observaciones: this.observaciones,
      fechaCita: this.fechaCita,
      id: this.id
    };
  }
}

function generarId() {
  var d = new Date().getTime();
  const id = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return id;
}

function guardarDatos() {
  // Recopilando Datos
  const nombre = document.getElementById("validationDefault01").value;
  const apellidos = document.getElementById("validationDefault02").value;
  const telefono = document.getElementById("validationDefault03").value;
  const dni = document.getElementById("validationDefault04").value;
  const fechaNacimiento = document.getElementById("validationDefault05").value;
  const obs = document.getElementById("validationDefault07").value;
  const fechaCita = document.getElementById("validationDefault06").value;

  if (validarTel()) {
    if (validarDNI()) {
      const nuevaCita = new Cita(
        nombre,
        apellidos,
        telefono,
        dni,
        fechaNacimiento,
        obs,
        fechaCita,
        id = generarId()
      );
      console.log(generarId());
      citas.push(nuevaCita);
      console.log(citas);
      resetFormulario();
      guardarCitasEnCookies();

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Cita Creada con Exito",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      console.log("DNI INCORRECTO");
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "El DNI no es correcto",
        text: "Introduce otro válido",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } else {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "El TElÉFONO no es correcto",
      text: "Introduce otro válido",
      showConfirmButton: false,
      timer: 1500,
    });
    console.log("TELF INCORRECTO");
  }
}

function resetFormulario() {
  document.getElementById("validationDefault01").value = "";
  document.getElementById("validationDefault02").value = "";
  document.getElementById("validationDefault03").value = "";
  document.getElementById("validationDefault04").value = "";
  document.getElementById("validationDefault05").value = "";
  document.getElementById("validationDefault06").value = "";
  document.getElementById("validationDefault07").value = "";
}

function guardarCitasEnCookies() {
  localStorage.setItem(
    "citas",
    JSON.stringify(citas.map((cita) => cita.toJSON()))
  );
}

function guardarNuevaCita() {
  if (id) {
    modificarCita();
  } else {
    guardarDatos();
    guardarCitasEnCookies();
    limpiarFormulario();
  }
}
