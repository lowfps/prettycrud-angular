import { Component, OnInit } from '@angular/core';
import { Materia } from './../../models/materia';
import { ARREGLO_MATERIAS } from './../../mocks/materia-mocks';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit {
  public materiaSeleccionado: Materia;
  public materiaArreglo: Materia[];
  public tmpBase64: any;

  constructor(
    public modalService: BsModalService,
    private toastr: ToastrService
  ) {
    this.materiaSeleccionado = new Materia(0, '', '', '', '');
    this.materiaArreglo = ARREGLO_MATERIAS;
  }

  ngOnInit(): void {}

  public cancelar(): void {
    this.materiaSeleccionado = new Materia(0, '', '', '', '');
  }

  public seleccionar(tmpMateria: Materia): void {
    this.materiaSeleccionado = tmpMateria;
  }

  public procesarMateria(): void {
    if (this.materiaSeleccionado.cod_materia === 0) {
      this.grabarMateria();
    }
    this.materiaSeleccionado = new Materia(0, '', '', '', '');
  }

  public grabarMateria(): boolean {
    if (
      this.materiaSeleccionado.nombre_materia == '' ||
      this.materiaSeleccionado.nombre_docente == ''
    ) {
      const parametros = {
        closeButton: true,
        enableHtml: true,
        progressBar: true,
        positionClass: 'toast-top-right',
        timeOut: 8000,
      };
      this.toastr.error(
        'No se pueden crear registros <br/> con campos vacios',
        'Te lo estoy advirtiendo',
        parametros
      );
      return false;
    } else {
      this.materiaSeleccionado.cod_materia = this.materiaArreglo.length + 1;
      this.materiaArreglo.push(this.materiaSeleccionado);
      return true;
    }
  }

  public eliminar(objMat: Materia): void {
    if (confirm('Deseas eliminar este registro?')) {
      this.materiaArreglo = this.materiaArreglo.filter(
        (element) => element != objMat
      );
      this.materiaSeleccionado = new Materia(0, '', '', '', '');
    }
  }

  public seleccionarFoto(input: any): any {
    if (!input.target.files[0] || input.target.files[0].length === 0) {
      return;
    }
    const mimeType = input.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      const parametros = {
        closeButton: true,
        enableHtml: true,
        progressBar: true,
        positionClass: 'toast-top-right',
        timeOut: 8000,
      };
      this.toastr.error(
        'Solo se permiten imagenes <br/> jpeg y png',
        'Advertencia',
        parametros
      );
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(input.target.files[0]);
    reader.onload = () => {
      this.tmpBase64 = reader.result;
      this.materiaSeleccionado.fotobase64 = this.tmpBase64;
      this.materiaSeleccionado.foto_docente = input.target.files[0].name;
    };
  }
}
