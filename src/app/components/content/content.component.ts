import { Component, OnInit, TemplateRef } from '@angular/core';
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

  public modalRef: BsModalRef;
  public modalTitulo: string;
  public modalTexto: string;
  public modalContenido: string;

  constructor(
    public modalService: BsModalService,
    private toastr: ToastrService
  ) {
    this.materiaSeleccionado = new Materia(0, '', '', '', '');
    this.materiaArreglo = ARREGLO_MATERIAS;
    this.modalRef = modalService.show('');
    this.modalTitulo = '';
    this.modalTexto = '';
    this.modalContenido = '';
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

  public eliminarMateria(objMat: Materia): void {
    this.materiaArreglo = this.materiaArreglo.filter(
      (element) => element != objMat
    );
    this.materiaSeleccionado = new Materia(0, '', '', '', '');
  }

  public eliminar(): void {
    this.eliminarMateria(this.materiaSeleccionado);
    this.modalRef.hide();
  }

  public cancelarEliminar(): void {
    this.modalRef.hide();
  }

  public abrirModal(template: TemplateRef<any>, materiaTmp: Materia): void {
    this.materiaSeleccionado = materiaTmp;
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
    this.modalTitulo = 'Advertencia';
    this.modalTexto = '¿Está seguro de eliminar materia?';
    this.modalContenido = this.materiaSeleccionado.nombre_materia;
  }

  public guardarFoto(input: any): any {
    if (!input.target.files[0] || input.target.files[0].length === 0) {
      return;
    }
    //mimeType hace referencia al tipo de dato permitido
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
