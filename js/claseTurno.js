// js/claseTurno.js

export class Turno {
  constructor({
    id = null,
    fecha,
    hora,
    medicoId,
    especialidadId,
    obraSocialId,
    pacienteNombre,
    pacienteDni,
  }) {
    this.id = id;
    this.fecha = fecha; // YYYY-MM-DD
    this.hora = hora; // HH:mm
    this.medicoId = medicoId; // number
    this.especialidadId = especialidadId; // number
    this.obraSocialId = obraSocialId; // number
    this.pacienteNombre = pacienteNombre;
    this.pacienteDni = pacienteDni;
  }

  guardarTurno() {
    const turnos = JSON.parse(localStorage.getItem("turnos")) || [];
    const index = turnos.findIndex((t) => t.id === this.id);

    if (index !== -1) {
      turnos[index] = this;
    } else {
      const nextId = turnos.reduce((max, t) => (t.id > max ? t.id : max), 0) + 1;
      this.id = nextId;
      turnos.push(this);
    }

    localStorage.setItem("turnos", JSON.stringify(turnos));
  }

  static eliminarTurno(id) {
    const turnos = JSON.parse(localStorage.getItem("turnos")) || [];
    const index = turnos.findIndex((t) => t.id === id);

    if (index !== -1) {
      turnos.splice(index, 1);
      localStorage.setItem("turnos", JSON.stringify(turnos));
      return true;
    }
    return false;
  }

  static obtenerTurnos() {
    const turnos = JSON.parse(localStorage.getItem("turnos")) || [];
    return turnos.map((t) => new Turno(t));
  }

  static async cargarDatosIniciales() {
    try {
      let turnosLS = JSON.parse(localStorage.getItem("turnos")) || [];
      if (!turnosLS.length) {
        const resp = await fetch("./data/turnos.json");
        if (resp.ok) {
          const data = await resp.json();
          localStorage.setItem("turnos", JSON.stringify(data));
          turnosLS = data;
        }
      }
      return turnosLS.map((t) => new Turno(t));
    } catch (error) {
      console.error("Error cargando turnos iniciales:", error);
      localStorage.setItem("turnos", JSON.stringify([]));
      return [];
    }
  }
}
