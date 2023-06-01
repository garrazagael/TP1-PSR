export class Usuario {
  nombre_usuario: string
  contrasenha: string
  temp_key: string

  constructor( nombre_usuario: string, contrasenha: string) {
    this.nombre_usuario = nombre_usuario
    this.contrasenha = contrasenha
    this.temp_key = ""
  }
}