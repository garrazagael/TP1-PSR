import express, { Application } from "express";
import mongoose from "mongoose";
import yaml from "yaml";
import fs from "fs";
import swagger_ui from "swagger-ui-express";
import { routerProducto } from "./routes/routerProducto";
import { routerHistorico } from "./routes/routerHistorico";
import { routerUsuario } from "./routes/routerUsuario";
import bodyParser from "body-parser";

const PORT = 4200;
const documentou = fs.readFileSync("./swagger.yaml", "utf-8");

mongoose.set("strictQuery", false).connect("mongodb://localhost:27017/TP-1");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const app: Application = express();

app.use(bodyParser.json());
app.get("/", (_req, _res) =>
  _res.send("Anda la API, ya estamos cerca de la liberación.")
);
app.use(
  "/api-docs",
  swagger_ui.serve,
  swagger_ui.setup(yaml.parse(documentou))
);

app.use("/productos", routerProducto);

app.use("/registros", routerHistorico);

app.use("/usuarios", routerUsuario);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
