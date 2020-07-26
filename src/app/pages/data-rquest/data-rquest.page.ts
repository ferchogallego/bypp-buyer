import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Request } from '../../shared/request.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-rquest',
  templateUrl: './data-rquest.page.html',
  styleUrls: ['./data-rquest.page.scss'],
})
export class DataRquestPage implements OnInit {

    private image: any;
    tipo: string = this.companySvc.tipo;
    sendProduct = new FormGroup ({
    descripcion: new FormControl('', Validators.required),
    producto: new FormControl('', Validators.required),
    referencia: new FormControl(''),
    marca: new FormControl(''),
    cantidad: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    ciudad: new FormControl('', Validators.required),
    pais: new FormControl('', Validators.required),
    fecha: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
    usuario: new FormControl(this.companySvc.userId),
    sector: new FormControl(this.companySvc.sctor),
    categoria: new FormControl(this.companySvc.category),
    subcategoria: new FormControl(this.companySvc.subcategory),
  });

  sendService = new FormGroup ({
    email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    name: new FormControl('', Validators.required),
    representative: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.minLength(8)]),
    address: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    numNit: new FormControl('', [Validators.required, Validators.minLength(8)]),
    imgNit: new FormControl('', Validators.required)
  });

  constructor(private companySvc: CompanyService,
              private router: Router) { }

  ngOnInit() {
    console.log(this.companySvc.rollUser);
  }

  sendRequestProduct(solicitud: Request){
    if (this.sendProduct.invalid){
      Swal.fire({
        title: 'Error...',
        text: 'Debe ingresar la información requerida',
        icon: 'error',
        allowOutsideClick: false,
        showCloseButton: true
      });
      return Object.values( this.sendProduct.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          // tslint:disable-next-line: no-shadowed-variable
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }
    try {
      this.companySvc.filterRequest(this.image, solicitud);
      Swal.fire({
        title: 'Solicitud enviada',
        text: 'Su solicitud se cargó exitosamente',
        icon: 'success',
        showCloseButton: true,
      });
      this.router.navigate([`/empresa/${this.companySvc.userId}`]);
    } catch (error) {
      console.log(error);
    }
  }

  handleImage(event: any){
    this.image = event.target.files[0];
    console.log('imagen: ', this.image );
  }

}
