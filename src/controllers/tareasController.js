const tareaModel = require("../models/tareasModel");
const {validationResult} = require("express-validator");

const getTareas = async (req, res, next) => {
  try {
    const tareas = await tareaModel.getTareas();
    res.json(tareas);
  } catch (error) {
    // res.status(500), json({ error: error.message });
    next(error);  // se lo pasamos a un middleware
  }
};

const getTareasPorId = async (req, res, next) => {
  const errores = validationResult(req);
  if(!errores.isEmpty()){
    return res.status(400).json({ errores: errores.array()});
  }

  try {
    const tarea = await tareaModel.getTareaPorId(req.params.id);
    if (!tarea) {
      return res.status(404), json({ error: "Tarea no encontrada" });
    }
    res.json(tarea);
  } catch (error) {
    // res.status(500), json({ error: error.message });
    next(error);
  }
};

const crearTarea = async (req, res, next) => {
  const errores = validationResult(req);
  if(!errores.isEmpty()){
    return res.status(400).json({ errores: errores.array()});
  }

  try {
    const tarea = await tareaModel.crearTarea(req.body);
    res.status(201), json(tarea);
    // if (!tarea) {
    //     return res.status(404),json({ error: "Tarea no encontrada"});
    // }
  } catch (error) {
    // res.status(500), json({ error: error.message });
    next(error);
  }
};

const editarTarea = async (req, res, next) => {
  const errores = validationResult(req);
  if(!errores.isEmpty()){
    return res.status(400).json({ errores: errores.array()});
  }

  try {
    const tarea = await tareaModel.editarTarea(req.params.id, req.body);
    if (!tarea) {
      return res.status(404), json({ error: "Tarea no encontrada" });
    }
    res.json(tarea);
  } catch (error) {
    // res.status(500), json({ error: error.message });
    next(error);
  }
};

const eliminarTarea = async (req, res, next) => {
  const errores = validationResult(req);
  if(!errores.isEmpty()){
    return res.status(400).json({ errores: errores.array()});
  }

  try {
    const tarea = await tareaModel.eliminarTarea(req.params.id);
    if (!tarea) {
      return res.status(404), json({ error: "Tarea no encontrada" });
    }
    res.json(tarea);
  } catch (error) {
    // res.status(500), json({ error: error.message });
    next(error);
  }
};


module.exports = {
  getTareas,
  getTareasPorId,
  crearTarea,
  editarTarea,
  eliminarTarea
}