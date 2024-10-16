const express = require("express");
const router = express.Router();
const tareasController = require("../controllers/tareasController");

const {body, param} = require("express-validator");

const validarBody = [
    body("titulo_tarea")
    .isLength({min:1}).withMessage("Titulo es requerido")
    .isString().withMessage("titulo debe ser String")
    .trim()
    .escape(),

    body("descrip_tarea")
    .optional()
    .isString().withMessage("titulo debe ser String")
    .trim()
    .escape()
];

const validarParam = [
    param("id")
    .isInt({gt: 0}).withMessage("el id debe ser mayor a 0")
    .toInt()
];

router.get("/", tareasController.getTareas);
router.get("/:id", validarParam, tareasController.getTareasPorId);
router.post("/crear", validarBody, tareasController.crearTarea);
router.put("/editar/:id", validarParam.concat(validarBody), tareasController.editarTarea);
router.delete("/eliminar/:id", validarParam, tareasController.eliminarTarea);

module.exports = router;