import { Router } from "express";
import usuario from "../controllers/controllerUsuario";
import controllerUsuario from "../controllers/controllerUsuario";

export const routerUsuario = Router();

routerUsuario.get("/", usuario.get_todos_usuarios);
routerUsuario.post("/signin", (_req, _res) => {
  usuario.sign_in(Object(_req.body)).then((user) => {
    _res.status(200).send(user);
  });
});
routerUsuario.post("/login", (_req,_res) =>{
  controllerUsuario.log_in(_req.body).then((claveSesion)=>{
     _res.status(200).send(claveSesion)
  })
});