import express, { json } from "express";
import * as bcrypt from "bcrypt";
import { modeloUsuario } from "../models/modeloUsuario";
import { Usuario } from "../usuario";
import { TOKEN_SECRET } from "../../jwt";
const jwt = require("jsonwebtoken");

export default {
  //Usuarios
  get_todos_usuarios: async (_req: express.Request, _res: express.Response) => {
    const output = await modeloUsuario.find();
    //return output
    _res.status(200).send(output);
  },
  //Encriptacion
  sign_in: (usuario: Usuario) => {
    return new Promise<any>(async (resolve, reject) => {
      let hashedPassword = await bcrypt.hash(String(usuario.contrasenha), 2);
      let aux = usuario.contrasenha;
      usuario.contrasenha = hashedPassword;
      modeloUsuario.create(usuario).then((user) => {
        resolve(user);
      });
    });
  },
  //Loggeo
  log_in: (usuario:Usuario) => {
    return new Promise<any>((resolve,reject) =>{
        modeloUsuario.find({"nombre_usuario": usuario.nombre_usuario}).then(
          (user:Usuario[])=>{
            bcrypt.compare(usuario.contrasenha,user[0].contrasenha).then((v) => {
              if (v){
                let documentoInfo = {
                  "nombre_usuario" : usuario.nombre_usuario,
                  "contrasenha" : usuario.contrasenha
                }
                let claveSesion = jwt.sign(documentoInfo, TOKEN_SECRET)
                resolve(claveSesion)
              }
              else{
                reject("Password don't match")
              }
            });
        })
    });
  }
};
