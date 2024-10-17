const express = require("express");
const bodyParser = require("body-parser");
const tareasRoutes = require("./routes/tareasRoutes");
const errorHandler = require("./middleware/errorHandler");
const helmet = require("helmet");
const swagger = require("./docs/swagger");

const dotenv = require("dotenv");   
dotenv.config();//manejo de variables de entorno

const app = express();  //  cremamos el main
const PORT = process.env.PORT;

app.use(helmet());  // usamos helmet para seguridad de ataques
app.use(bodyParser.json()); //  Manejo de parametros
app.use("/tareas", tareasRoutes);   //  Rutas
app.use(errorHandler);  // manejo de errores centralizado
swagger(app);   //  config swagger

app.listen(PORT, () =>{
    console.log("El servidor esta en el puerto: " + PORT);
});