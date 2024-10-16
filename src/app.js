const express = require("express");
const bodyParser = require("body-parser");
const tareasRoutes = require("./routes/tareasRoutes");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use("/tareas", tareasRoutes);

app.listen(port, () =>{
    console.log("El servidor esta en el puerto: " + port);
});