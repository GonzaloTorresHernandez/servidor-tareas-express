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

/**
 *  @swagger
 *  /tareas:
 *    get:
 *      summary: Obtiene todas las tareas
 *      responses: 
 *        200:
 *          description: Lista de todas las tareas
 *          content: 
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Tareas'      
 */
router.get("/", tareasController.getTareas);

/**
 *  @swagger
 *  /tareas/{id}:
 *    get:
 *      summary: Obtiene una tarea por ID
 *      parameters:
 *        - in:  path
 *          name: id
 *          required: true
 *          schema: 
 *            type: integer
 *          description: ID de la tarea
 *      responses: 
 *        200:
 *          description: detalle de una tarea
 *          content: 
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Tareas'
 *        404:
 *          description: la tarea no fue encontrada      
 */
router.get("/:id", validarParam, tareasController.getTareasPorId);

/**
 *  @swagger
 *  /tareas/crear:
 *    post:
 *      summary: Crear una nueva tarea
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Tareas'
 *      responses: 
 *        200:
 *          description: detalle de una tarea
 *          content: 
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Tareas'
 *        400:
 *          description: error de validacion    
 */
router.post("/crear", validarBody, tareasController.crearTarea);

/**
 *  @swagger
 *  /tareas/editar:
 *    put:
 *      summary: Editar una tarea
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema: 
 *            type: integer
 *          description: ID de la tarea
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Tareas'
 *      responses: 
 *        200:
 *          description: detalle de la tarea editada
 *          content: 
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Tareas'
 *        400:
 *          description: error de validacion    
 *        404:
 *          description: no encuentra la tarea   
 */
router.put("/editar/:id", validarParam.concat(validarBody), tareasController.editarTarea);

/**
 *  @swagger
 *  /tareas/eliminar/{id}:
 *    delete:
 *      summary: Elimina una tarea por ID
 *      parameters:
 *        - in:  path
 *          name: id
 *          required: true
 *          schema: 
 *            type: integer
 *          description: ID de la tarea
 *      responses: 
 *        200:
 *          description: detalle tarea eliminada
 *          content: 
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Tareas'
 *        404:
 *          description: la tarea no fue encontrada      
 */
router.delete("/eliminar/:id", validarParam, tareasController.eliminarTarea);

module.exports = router;