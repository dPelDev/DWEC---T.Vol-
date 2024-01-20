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

//Objeto Cita
class Cita {
  constructor(
    nombre,
    apellidos,
    telefono,
    dni,
    fechaCita,
    obs,
    id,
    fechaNacimiento

   
  ) {
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.telefono = telefono;
    this.dni = dni;
    this.fechaCita = fechaCita;
    this.obs = obs;
    this.id = id;
    this.fechaNacimiento = fechaNacimiento;
    ;
   
    
  }

  toJSON() {
    return {
      nombre: this.nombre,
      apellidos: this.apellidos,
      telefono: this.telefono,
      dni: this.dni,
      fechaCita: this.fechaCita,
      obs: this.obs,
      id: this.id,
      fechaNacimiento: this.fechaNacimiento,



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
        fechaCita,
        obs,
        (id = generarId()),
        fechaNacimiento



      );
      citas.push(nuevaCita);
      resetFormulario();
      guardarCitasEnCookies();
      cargarCitasDesdeCookies();
      actualizarTabla();

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Cita Creada con Exito",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      console.log("DNI INCORRECTO");
      Swal.fire({
        position: "center",
        icon: "error",
        title: "El campo DNI NO es correcto",
        text: "Introduce otro válido",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "El campo teléfono NO es correcto",
      text: "Introduce otro válido",
      showConfirmButton: false,
      timer: 1500,
    });
    console.log("TELF INCORRECTO");
  }
}

function verCitas() {
  document.getElementById("verCitas").removeAttribute("hidden");  
}

function ocultarCitas() {
  document.getElementById("verCitas").setAttribute("hidden","");
  
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


function cargarCitasDesdeCookies() {
  try {
    const citasGuardadas = JSON.parse(localStorage.getItem("citas")) || [];

    // Convertir los objetos JSON a instancias de citas
    citas = citasGuardadas.map(
      (cita) =>
        new Cita(
          cita.nombre,
          cita.apellidos,
          cita.telefono,
          cita.dni,          
          cita.fechaCita,
          cita.obs,
          cita.id,
          cita.fechaNacimiento

        )
    );
  } catch (error) {
    console.error("Error al cargar las citas desde las cookies:", error);
    // Puedes manejar el error de alguna manera (por ejemplo, reiniciar las citas)
    citas = [];
  }
}

function eliminarCita(index) {
   citas.splice(index, 1);
   actualizarTabla();
   guardarCitasEnCookies();
}

function verId(index) {
  const cita = citas[index];
  Swal.fire("El ID de este CLIENTE es: ", cita.id);

  
}

 function cargarCitaParaModificar(index) {

   const cita = citas[index];
   document.getElementById("validationDefault01").value = cita.nombre;
   document.getElementById("validationDefault02").value = cita.apellidos;
   document.getElementById("validationDefault03").value = cita.telefono;
   document.getElementById("validationDefault04").value = cita.dni;
   document.getElementById("validationDefault06").value = cita.fechaCita;
   document.getElementById("validationDefault07").value = cita.obs;
   document.getElementById("validationDefault05").value = cita.fechaNacimiento;

   eliminarCita(index);
 }


 function modificarCita() {
  const citaIndex = citas.findIndex((cita) => cita.id === id);

  if (citaIndex !== -1) {
    citas[citaIndex].nombre = document.getElementById("validationDefault01").value;
    citas[citaIndex].apellidos = document.getElementById("validationDefault02").value;
    citas[citaIndex].telefono = document.getElementById("validationDefault03").value;
    citas[citaIndex].dni = document.getElementById("validationDefault04").value;
    citas[citaIndex].fechaCita = document.getElementById("validationDefault06").value;
    citas[citaIndex].obs = document.getElementById("validationDefault07").value;
    citas[citaIndex].fechaNacimiento = document.getElementById("validationDefault05").value;


    actualizarTabla();
    limpiarFormulario();
    guardarCitasEnCookies();
  } else {
    alert("No se encontró la cita para modificar.");
  }
}


function actualizarTabla() {
  const citasTableBody = document.getElementById("citasTableBody");

  // Limpiar el contenido de las citas para mostrar
  citasTableBody.innerHTML = "";

  // Verificar si hay citas para mostrar
  if (citas.length > 0) {
    // Mostrar las citas en la tabla
    for (let i = 0; i < citas.length; i++) {
      const cita = citas[i];
      const row = citasTableBody.insertRow(i);

      // Orden
      const orderCell = row.insertCell(0);
      orderCell.textContent = i + 1;

      // Nombre
      const nombreCell = row.insertCell(1);
      nombreCell.textContent = cita.nombre;

      // Apellidos
      const apellidosCell = row.insertCell(2);
      apellidosCell.textContent = cita.apellidos;

      // Teléfono
      const telefonoCell = row.insertCell(3);
      telefonoCell.textContent = cita.telefono;

      // DNI
      const dniCell = row.insertCell(4);
      dniCell.textContent = cita.dni;

      //FechaCita
      const fechaCitamCell = row.insertCell(5);
      fechaCitamCell.textContent = cita.fechaCita;

      // obs
      const obsCell = row.insertCell(6);
      obsCell.textContent = cita.obs;

      // Acciones
      const actionsCell = row.insertCell(7);
      actionsCell.innerHTML = `<button onclick="eliminarCita(${i})">Eliminar</button> 
                                  <button onclick="cargarCitaParaModificar(${i})">Modificar</button>
                                  <button onclick="verId(${i})">Ver ID</button>`;
    }
  } else {
    // Mostrar mensaje de datos vacío si no hay citas
    const emptyRow = citasTableBody.insertRow(0);
    const emptyCell = emptyRow.insertCell(0);
    emptyCell.textContent = "No hay ninguna cita que mostrar";
    emptyCell.colSpan = 10; // Ajusta esto según el número de columnas
  }
}



cargarCitasDesdeCookies();
actualizarTabla();
