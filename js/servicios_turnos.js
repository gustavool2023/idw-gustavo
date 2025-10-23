// js/servicios_turnos.js
import { Turno } from "./claseTurno.js";
import { Medico } from "./claseMedico.js";
import { Especialidad } from "./claseEspecialidad.js";
import { confirmarAccion } from "./alertas.js";
import {
  modalNuevoTurno,
  modalEditarTurno,
  modalEliminarTurno,
} from "./modalesTurnos.js";

// Insertar modales al final del body
document.body.insertAdjacentHTML("beforeend", modalNuevoTurno);
document.body.insertAdjacentHTML("beforeend", modalEditarTurno);
document.body.insertAdjacentHTML("beforeend", modalEliminarTurno);

let turnos = [];
let medicos = [];
let especialidades = [];
let obrasSociales = [];

function limpiarNodo(nodo) {
  while (nodo.firstChild) nodo.removeChild(nodo.firstChild);
}

function renderSelect(select, items, placeholder) {
  limpiarNodo(select);
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  defaultOption.textContent = placeholder;
  select.appendChild(defaultOption);

  items.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = item.nombre;
    select.appendChild(option);
  });
}

function renderSelectTurnos(select) {
  limpiarNodo(select);
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  defaultOption.textContent = "Seleccione un turno";
  select.appendChild(defaultOption);

  turnos.forEach((t) => {
    const medico = medicos.find((m) => m.id === parseInt(t.medicoId));
    const esp = especialidades.find((e) => e.id === parseInt(t.especialidadId));
    const label = `${t.fecha} ${t.hora} - ${medico ? medico.nombreCompleto() : "Medico"} (${esp ? esp.nombre : "Esp"})`;
    const option = document.createElement("option");
    option.value = t.id;
    option.textContent = label;
    select.appendChild(option);
  });
}

function renderTablaTurnos(lista = turnos) {
  const tbody = document.getElementById("turnosTableBody");
  limpiarNodo(tbody);

  lista.forEach((t) => {
    const tr = document.createElement("tr");

    const tdFecha = document.createElement("td");
    tdFecha.classList.add("d-none", "d-sm-table-cell");
    tdFecha.textContent = t.fecha;

    const tdMedico = document.createElement("td");
    const medico = medicos.find((m) => m.id === parseInt(t.medicoId));
    tdMedico.textContent = medico ? medico.nombreCompleto() : "-";

    const tdEspecialidad = document.createElement("td");
    const esp = especialidades.find((e) => e.id === parseInt(t.especialidadId));
    tdEspecialidad.textContent = esp ? esp.nombre : "-";

    const tdHora = document.createElement("td");
    tdHora.textContent = t.hora;

    const tdObra = document.createElement("td");
    const obra = obrasSociales.find((o) => o.id === parseInt(t.obraSocialId));
    tdObra.textContent = obra ? obra.nombre : "-";

    const tdPaciente = document.createElement("td");
    tdPaciente.textContent = t.pacienteNombre;

    const tdDni = document.createElement("td");
    tdDni.textContent = t.pacienteDni;

    tr.append(tdFecha, tdMedico, tdEspecialidad, tdHora, tdObra, tdPaciente, tdDni);
    const tbodyEl = document.getElementById("turnosTableBody");
    tbodyEl.appendChild(tr);
  });
}

function cargarSelectsBase() {
  // nuevo
  renderSelect(document.getElementById("nuevoMedico"), medicos, "Seleccione un médico");
  renderSelect(
    document.getElementById("nuevoEspecialidad"),
    especialidades,
    "Seleccione especialidad"
  );
  renderSelect(
    document.getElementById("nuevoObraSocial"),
    obrasSociales,
    "Seleccione obra social"
  );

  // editar
  renderSelect(document.getElementById("editarMedico"), medicos, "Seleccione un médico");
  renderSelect(
    document.getElementById("editarEspecialidad"),
    especialidades,
    "Seleccione especialidad"
  );
  renderSelect(
    document.getElementById("editarObraSocial"),
    obrasSociales,
    "Seleccione obra social"
  );

  // selects de turnos
  renderSelectTurnos(document.getElementById("selectEditarTurno"));
  renderSelectTurnos(document.getElementById("selectEliminarTurno"));
}

function guardarTurno({
  id = null,
  fecha,
  hora,
  medicoId,
  especialidadId,
  obraSocialId,
  pacienteNombre,
  pacienteDni,
}) {
  let turno;
  if (id !== null) {
    turno = turnos.find((t) => t.id === id);
    if (!turno) return;
    turno.fecha = fecha;
    turno.hora = hora;
    turno.medicoId = medicoId;
    turno.especialidadId = especialidadId;
    turno.obraSocialId = obraSocialId;
    turno.pacienteNombre = pacienteNombre;
    turno.pacienteDni = pacienteDni;
  } else {
    turno = new Turno({
      id: null,
      fecha,
      hora,
      medicoId,
      especialidadId,
      obraSocialId,
      pacienteNombre,
      pacienteDni,
    });
    turnos.push(turno);
  }

  turno.guardarTurno();
  renderTablaTurnos();
  cargarSelectsBase();
}

function eliminarTurno(id) {
  const idx = turnos.findIndex((t) => t.id === id);
  if (idx === -1) return;
  Turno.eliminarTurno(id);
  turnos.splice(idx, 1);
  renderTablaTurnos();
  cargarSelectsBase();
}

// ================== CARGA INICIAL ==================
document.addEventListener("DOMContentLoaded", async () => {
  // Cargar catálogo base de médicos, especialidades y obras sociales
  medicos = await Medico.cargarDatosIniciales();
  especialidades = await Especialidad.cargarDatosInicialesEsp();
  obrasSociales = JSON.parse(localStorage.getItem("obrasSociales")) || [];
  if (!obrasSociales.length) {
    const resp = await fetch("./data/obrasSociales.json");
    obrasSociales = await resp.json();
    localStorage.setItem("obrasSociales", JSON.stringify(obrasSociales));
  }

  // Cargar turnos
  turnos = await Turno.cargarDatosIniciales();

  // Render inicial
  renderTablaTurnos();
  cargarSelectsBase();

  // Eventos
  // Nuevo turno
  document
    .getElementById("btnGuardarNuevoTurno")
    .addEventListener("click", async () => {
      const form = document.getElementById("formNuevoTurno");
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const confirmado = await confirmarAccion({
        titulo: "¿Deseas guardar este turno?",
        texto: "Verifica los datos antes de continuar.",
        icono: "question",
        textoConfirmar: "Sí, guardar",
      });
      if (!confirmado) return;

      guardarTurno({
        fecha: document.getElementById("nuevoFecha").value,
        hora: document.getElementById("nuevoHora").value,
        medicoId: parseInt(document.getElementById("nuevoMedico").value),
        especialidadId: parseInt(
          document.getElementById("nuevoEspecialidad").value
        ),
        obraSocialId: parseInt(document.getElementById("nuevoObraSocial").value),
        pacienteNombre: document.getElementById("nuevoPacienteNombre").value,
        pacienteDni: document.getElementById("nuevoPacienteDni").value,
      });

      bootstrap.Modal.getInstance(
        document.getElementById("modalNuevoTurno")
      ).hide();
      form.reset();
    });

  // Editar - cargar datos al seleccionar turno
  document
    .getElementById("selectEditarTurno")
    .addEventListener("change", (e) => {
      const id = parseInt(e.target.value);
      const turno = turnos.find((t) => t.id === id);
      if (!turno) return;

      document.getElementById("editarFecha").value = turno.fecha;
      document.getElementById("editarHora").value = turno.hora;
      document.getElementById("editarMedico").value = parseInt(turno.medicoId);
      document.getElementById("editarEspecialidad").value = parseInt(
        turno.especialidadId
      );
      document.getElementById("editarObraSocial").value = parseInt(
        turno.obraSocialId
      );
      document.getElementById("editarPacienteNombre").value =
        turno.pacienteNombre;
      document.getElementById("editarPacienteDni").value = turno.pacienteDni;
    });

  // Editar - guardar
  document
    .getElementById("btnGuardarEditarTurno")
    .addEventListener("click", async () => {
      const id = parseInt(
        document.getElementById("selectEditarTurno").value
      );
      if (isNaN(id)) return;

      const confirmado = await confirmarAccion({
        titulo: "¿Deseas actualizar este turno?",
        texto: "Los cambios se guardarán permanentemente.",
        icono: "info",
        textoConfirmar: "Sí, actualizar",
      });
      if (!confirmado) return;

      guardarTurno({
        id,
        fecha: document.getElementById("editarFecha").value,
        hora: document.getElementById("editarHora").value,
        medicoId: parseInt(document.getElementById("editarMedico").value),
        especialidadId: parseInt(
          document.getElementById("editarEspecialidad").value
        ),
        obraSocialId: parseInt(
          document.getElementById("editarObraSocial").value
        ),
        pacienteNombre: document.getElementById("editarPacienteNombre").value,
        pacienteDni: document.getElementById("editarPacienteDni").value,
      });

      bootstrap.Modal.getInstance(
        document.getElementById("modalEditarTurno")
      ).hide();
    });

  // Eliminar turno
  document
    .getElementById("btnEliminarTurno")
    .addEventListener("click", async () => {
      const id = parseInt(
        document.getElementById("selectEliminarTurno").value
      );
      if (isNaN(id)) return;

      const turno = turnos.find((t) => t.id === id);
      if (!turno) return;

      const confirmado = await confirmarAccion({
        titulo: "¿Eliminar turno?",
        texto: `¿Deseas eliminar el turno de ${turno.pacienteNombre} (${turno.fecha} ${turno.hora})?`,
        icono: "warning",
        textoConfirmar: "Sí, eliminar",
      });
      if (!confirmado) return;

      eliminarTurno(id);

      bootstrap.Modal.getInstance(
        document.getElementById("modalEliminarTurno")
      ).hide();
    });

  // Limpiar formularios al cerrar
  const modalNuevo = document.getElementById("modalNuevoTurno");
  const modalEditar = document.getElementById("modalEditarTurno");

  modalNuevo.addEventListener("hidden.bs.modal", () => {
    document.getElementById("formNuevoTurno").reset();
  });

  modalEditar.addEventListener("hidden.bs.modal", () => {
    document.getElementById("formEditarTurno").reset();
    document.getElementById("selectEditarTurno").selectedIndex = 0;
  });
});
