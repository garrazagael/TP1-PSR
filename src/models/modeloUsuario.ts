import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: { collection: "usuarios" },
})
class Usuario {

  @prop()
  public nombre_usuario!: string;

  @prop()
  public contrasenha!: string;

  @prop()
  public temp_key!: string;
}

export let modeloUsuario = getModelForClass(Usuario);
