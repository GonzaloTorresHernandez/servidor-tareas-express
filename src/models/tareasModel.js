const pg = require("../config/conexion");

const getTareas = async () => {
  try {
    const res = await pg.query("SELECT * FROM tareas");
    return res.rows;
  } catch (error) {
    throw error;
  }
};

const getTareaPorId = async (id) => {
  try {
    const res = await pg.query("SELECT * FROM tareas WHERE id_tarea = $1", [
      id,
    ]);
    return res.rows[0];
  } catch (error) {
    throw error;
  }
};

const crearTarea = async (tarea) => {
  const { titulo_tarea, descrip_tarea } = tarea;
  try {
    const res = await pg.query(
      "INSERT INTO tareas (titulo_tarea, descrip_tarea) VALUES($1, $2) RETURNING *",
      [titulo_tarea, descrip_tarea]
    );
    return res.rows[0];
  } catch (error) {
    throw error;
  }
};

const editarTarea = async (id, tarea) => {
  const { titulo_tarea, descrip_tarea } = tarea;
  try {
    const res = await pg.query(
      "UPDATE tareas SET titulo_tarea = $1, descrip_tarea = $2 WHERE id_tarea = $3 RETURNING *",
      [titulo_tarea, descrip_tarea, id]
    );
    return res.rows[0];
  } catch (error) {
    throw error;
  }
};

const eliminarTarea = async (id) => {
  const { titulo_tarea, descrip_tarea } = tarea;
  try {
    const res = await pg.query(
      "DELETE FROM tareas WHERE id_tarea = $1 RETURNING *",
      [id]
    );
    return res.rows[0];
  } catch (error) {
    throw error;
  }
};


module.exports = {
    getTareas,
    getTareaPorId,
    crearTarea,
    editarTarea,
    eliminarTarea
};