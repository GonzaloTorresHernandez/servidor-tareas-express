const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de gestion de tareas",
            version: "1.0.0",
            description: "API para gestionar tareas en una aplicación Express."
        },
        servers: [
            {
                url: "https://servidor-tareas-express-w7z8.onrender.com/tareas"
            }
        ],
        components: {
            schemas: {
                Tareas:{
                    type: 'object',
                    required: ['titulo_tarea'],
                    properties: {
                        id_tarea: {
                            type: "integer",
                            example: 1,
                        },
                        titulo_tarea: {
                            type: "string",
                            example: "mi tarea",
                        },
                        descrip_tarea: {
                            type: "string",
                            example: "descripcion de mi tarea",
                        }
                    }
                }
            }
        }
    },
    apis: ["./src/routes/*.js"] //todos los archivos con .js
};

const swaggerSpec = swaggerJSDoc(options);  //cargamos la doc de cada ruta
const setupSwaggerDocs = (app) => {
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
    console.log("Swagger docs en la ruta: https://servidor-tareas-express-w7z8.onrender.com/api-docs");
};

module.exports = setupSwaggerDocs;