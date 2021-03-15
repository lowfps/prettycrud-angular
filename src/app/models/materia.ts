export class Materia {
  cod_materia: number;
  nombre_materia: string;
  nombre_docente: string;
  foto_docente: string;
  fotobase64: string;

  constructor(cod: number, nom: string, nomdoc: string, fotodoc: string, fotobase: string){
    this.cod_materia = cod;
    this.nombre_materia = nom;
    this.nombre_docente = nomdoc;
    this.foto_docente = fotodoc;
    this.fotobase64 = fotobase;

  }
}
