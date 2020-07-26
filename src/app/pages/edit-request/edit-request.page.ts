import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Request } from '../../shared/request.interface';
import { CompanyService } from '../../services/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-request',
  templateUrl: './edit-request.page.html',
  styleUrls: ['./edit-request.page.scss'],
})
export class EditRequestPage implements OnInit {

  request: Request;
  idRequest: string;

  editRequestForm = new FormGroup({
    descripcion: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    referencia: new FormControl('', Validators.required),
    marca: new FormControl('', Validators.required),
    cantidad: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    ciudad: new FormControl(new Date().getTime()),
    pais: new FormControl(new Date().getTime()),
    fecha: new FormControl(new Date().getTime()),
    usuario: new FormControl(''),
    sector: new FormControl(''),
    categoria: new FormControl(''),
    subcategoria: new FormControl(''),
    imagen: new FormControl(''),
    fileRef: new FormControl('')
  });


  private initValuesForm(){
    this.editRequestForm.patchValue({
      descripcion: this.request.descripcion,
      nombre: this.request.producto,
      referencia: this.request.referencia,
      marca: this.request.marca,
      cantidad: this.request.cantidad,
      direccion: this.request.direccion,
      ciudad: this.request.ciudad,
      pais: this.request.pais,
      fecha: this.request.fecha,
      usuario: this.request.usuario,
      sector: this.request.sector,
      categoria: this.request.categoria,
      subcategoria: this.request.subcategoria,
      imagen: this.request.imagen,
      fileRef: this.request.fileRef
    });
  }

  constructor(private companySvc: CompanyService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.idRequest = id;
    this.companySvc.loadRequesDataById(id)
                   .subscribe((resp: Request) => {
                      this.request = resp;
                      this.initValuesForm();
                    });
  }

  editRequest(request: Request){
    Swal.fire({
      title: 'Modificación de solicitud',
      text: `Actualizando datos de la solicitud`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, actualizar'
    }).then(result => {
      if (result.value) {
        this.companySvc.updateRequestById(this.idRequest, request).then(() => {
          Swal.fire('Actualizado!', 'La solicitud se editó correctamente.', 'success');
        }).catch((error) => {
          Swal.fire('Error!', 'Error al editar la solicitud', 'error');
        });
      }
    });
    this.router.navigate([`/empresa/${this.companySvc.userId}`]);
  }
}
