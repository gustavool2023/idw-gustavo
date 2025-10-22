export const modalNuevoTurno = `
<!-- Modal Nuevo Turno -->
<div class="modal fade" id="modalNuevoTurno" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Nuevo Turno</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
      </div>
      <div class="modal-body">
        <form id="formNuevoTurno">
          <div class="row mb-2">
            <div class="col-12 col-md-4">
              <label for="nuevoFecha" class="form-label fw-bold">Fecha</label>
              <input type="date" class="form-control" id="nuevoFecha" required />
            </div>
            <div class="col-12 col-md-4">
              <label for="nuevoHora" class="form-label fw-bold">Hora</label>
              <input type="time" class="form-control" id="nuevoHora" required />
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-12 col-md-6">
              <label for="nuevoMedico" class="form-label fw-bold">Médico</label>
              <select class="form-select" id="nuevoMedico" required></select>
            </div>
            <div class="col-12 col-md-6">
              <label for="nuevoEspecialidad" class="form-label fw-bold">Especialidad</label>
              <select class="form-select" id="nuevoEspecialidad" required></select>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-12 col-md-6">
              <label for="nuevoObraSocial" class="form-label fw-bold">Obra Social</label>
              <select class="form-select" id="nuevoObraSocial" required></select>
            </div>
          </div>
          <hr />
          <div class="row mb-2">
            <div class="col-12 col-md-8">
              <label for="nuevoPacienteNombre" class="form-label fw-bold">Nombre y Apellido</label>
              <input type="text" class="form-control" id="nuevoPacienteNombre" required />
            </div>
            <div class="col-12 col-md-4">
              <label for="nuevoPacienteDni" class="form-label fw-bold">DNI</label>
              <input type="text" class="form-control" id="nuevoPacienteDni" required />
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-success" id="btnGuardarNuevoTurno">Guardar</button>
      </div>
    </div>
  </div>
</div>
`;

export const modalEditarTurno = `
<!-- Modal Editar Turno -->
<div class="modal fade" id="modalEditarTurno" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <div class="row align-items-center w-100">
          <label for="selectEditarTurno" class="d-none d-sm-block col-auto col-form-label fw-bold">Seleccionar turno a editar</label>
          <div class="col">
            <select class="form-select" id="selectEditarTurno" required></select>
          </div>
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
      </div>
      <div class="modal-body">
        <form id="formEditarTurno">
          <div class="row mb-2">
            <div class="col-12 col-md-4">
              <label for="editarFecha" class="form-label fw-bold">Fecha</label>
              <input type="date" class="form-control" id="editarFecha" required />
            </div>
            <div class="col-12 col-md-4">
              <label for="editarHora" class="form-label fw-bold">Hora</label>
              <input type="time" class="form-control" id="editarHora" required />
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-12 col-md-6">
              <label for="editarMedico" class="form-label fw-bold">Médico</label>
              <select class="form-select" id="editarMedico" required></select>
            </div>
            <div class="col-12 col-md-6">
              <label for="editarEspecialidad" class="form-label fw-bold">Especialidad</label>
              <select class="form-select" id="editarEspecialidad" required></select>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-12 col-md-6">
              <label for="editarObraSocial" class="form-label fw-bold">Obra Social</label>
              <select class="form-select" id="editarObraSocial" required></select>
            </div>
          </div>
          <hr />
          <div class="row mb-2">
            <div class="col-12 col-md-8">
              <label for="editarPacienteNombre" class="form-label fw-bold">Nombre y Apellido</label>
              <input type="text" class="form-control" id="editarPacienteNombre" required />
            </div>
            <div class="col-12 col-md-4">
              <label for="editarPacienteDni" class="form-label fw-bold">DNI</label>
              <input type="text" class="form-control" id="editarPacienteDni" required />
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" id="btnGuardarEditarTurno">Guardar Cambios</button>
      </div>
    </div>
  </div>
</div>
`;

export const modalEliminarTurno = `
<!-- Modal Eliminar Turno -->
<div class="modal fade" id="modalEliminarTurno" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Eliminar Turno</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
      </div>
      <div class="modal-body">
        <label>Seleccionar Turno</label>
        <select class="form-select" id="selectEliminarTurno"></select>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-danger" id="btnEliminarTurno">Eliminar</button>
      </div>
    </div>
  </div>
</div>
`;
