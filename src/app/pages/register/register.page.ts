import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserI } from '../../shared/user.interface';
import { CompanyI } from '../../shared/company.interface';
import Swal from 'sweetalert2';
import { EstadoI } from '../../shared/location.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  person = false;
  private image: any;
  fileName: string;
  imgSource = false;
  imageSrc: any;
  countries: any;
  dptos: any;
  depart: EstadoI[] = [];


  registerPerson = new FormGroup ({
    email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    name: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.minLength(8)]),
    address: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    document: new FormControl('', Validators.required),
    numDocument: new FormControl('', [Validators.required, Validators.minLength(8)]),
    imgDocument: new FormControl('', Validators.required)
  });
  registerCompany = new FormGroup ({
    email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    name: new FormControl('', Validators.required),
    representative: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.minLength(8)]),
    address: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    numNit: new FormControl('', [Validators.required, Validators.minLength(8)]),
    imgNit: new FormControl('', Validators.required)
  });

  constructor(private activateRoute: ActivatedRoute,
              private authSvc: AuthService,
              private router: Router) { }

  ngOnInit() {
    const id = this.activateRoute.snapshot.paramMap.get('id');
    if (id === 'person') {
      this.person = true;
      console.log(this.person);
    }
    this.authSvc.paises().subscribe(resp => {
      this.countries = resp;
      console.log(this.countries);
   });
  }

  onRegisterPerson(person: UserI){
    if (this.registerPerson.invalid){
      Swal.fire({
        title: 'Error...',
        text: 'Debe ingresar la información requerida',
        icon: 'error',
        allowOutsideClick: false,
        showCloseButton: true
      });
      return Object.values( this.registerPerson.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          // tslint:disable-next-line: no-shadowed-variable
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }
    const {email, password } = this.registerPerson.value;
    try {
      const user = this.authSvc.register(email, password);
      if (user) {
          console.log(user.then(userData => {
            const id = userData.user.uid;
            const tipo = 'buyerPerson';
            person.uid = id;
            this.authSvc.filterUser(id, person, tipo, this.image);
            Swal.fire({
              title: 'Comprador: ' + person.name,
              text: 'Registrado satisfactoriamente',
              icon: 'success',
              showCloseButton: true,
            });
            this.router.navigate(['/inicio']);
          }));
      }
    } catch (error) {
      console.log(error);
    }
  }

  onRegisterCompany(datos: CompanyI){
    if (this.registerCompany.invalid){
      Swal.fire({
        title: 'Error...',
        text: 'Debe ingresar la información requerida',
        icon: 'error',
        allowOutsideClick: false,
        showCloseButton: true
      });
      return Object.values( this.registerCompany.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          // tslint:disable-next-line: no-shadowed-variable
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }
    const {email, password } = this.registerCompany.value;
    try {
      const user = this.authSvc.register(email, password);
      if (user) {
           user.then(userData => {
            const id = userData.user.uid;
            const tipo = 'buyerCompany';
            datos.uid = id;
            this.authSvc.filterUser(id, datos, tipo, this.image);
            Swal.fire({
              title: 'Empresa: ' + datos.name,
              text: 'Registrada satisfactoriamente',
              icon: 'success',
              showCloseButton: true,
            });
            this.router.navigate(['/inicio']);
          });
      }
    } catch (error) {
      console.log(error);
    }
  }

  handleImage(event: any){
    this.image = event.target.files[0];
    this.fileName = this.image.name;
    const tipeImg = this.image.type.split('/');
    if (tipeImg[0] !== 'image') {
      this.imgSource = true;
      console.log('estado: ', this.imgSource);
    } else {
      this.imgSource = false;
    }
    const reader = new FileReader();
    reader.onload = e => {
      this.imageSrc = reader.result;
    };
    reader.readAsDataURL(this.image);
  }

  handleCountry(event: string){
    // tslint:disable-next-line: radix
    const pais = parseInt(event);
    this.depart = [];
    this.authSvc.departmentos()
                .subscribe(resp => {
                  this.dptos = resp;
                  // tslint:disable-next-line: prefer-for-of
                  for (let i = 0; i < this.dptos.length; i++) {
                    const estado = this.dptos[i];
                    const idEstado = estado.id_country;
                    if (idEstado === pais) {
                      this.depart.push(estado);
                    }
                   }
                });
  }

  // ---------------------------------------------------------------------------------------
  // empresas:

  get emailNoValido() {
    return this.registerCompany.get('email').invalid && this.registerCompany.get('email').touched;
  }
  get nameNoValido() {
    return this.registerCompany.get('name').invalid && this.registerCompany.get('name').touched;
  }
  get representativeNoValido() {
    return this.registerCompany.get('representative').invalid && this.registerCompany.get('representative').touched;
  }
  get phoneNoValido() {
    return this.registerCompany.get('phone').invalid && this.registerCompany.get('phone').touched;
  }
  get addressNoValido() {
    return this.registerCompany.get('address').invalid && this.registerCompany.get('address').touched;
  }
  get cityNoValido() {
    return this.registerCompany.get('city').invalid && this.registerCompany.get('city').touched;
  }
  get countryNoValido() {
    return this.registerCompany.get('country').invalid && this.registerCompany.get('country').touched;
  }
  get numNitNoValido() {
    return this.registerCompany.get('numNit').invalid && this.registerCompany.get('numNit').touched;
  }
  get imgNitNoValido() {
    return this.registerCompany.get('imgNit').invalid && this.registerCompany.get('imgNit').touched;
  }
  get passwordNoValido() {
    return this.registerCompany.get('password').invalid && this.registerCompany.get('password').touched;
  }
// ---------------------------------------------------------------------------------------
// personas:

  get emailPerNoValido() {
    return this.registerPerson.get('email').invalid && this.registerPerson.get('email').touched;
  }
  get namePerNoValido() {
    return this.registerPerson.get('name').invalid && this.registerPerson.get('name').touched;
  }
  get documentPerNoValido() {
    return this.registerPerson.get('document').invalid && this.registerPerson.get('document').touched;
  }
  get numDocumentPerNoValido() {
    return this.registerPerson.get('numDocument').invalid && this.registerPerson.get('numDocument').touched;
  }
  get imgDocumentPerNoValido() {
    return this.registerPerson.get('imgDocument').invalid && this.registerPerson.get('imgDocument').touched;
  }
  get phonePerNoValido() {
    return this.registerPerson.get('phone').invalid && this.registerPerson.get('phone').touched;
  }
  get addressPerNoValido() {
    return this.registerPerson.get('address').invalid && this.registerPerson.get('address').touched;
  }
  get cityPerNoValido() {
    return this.registerPerson.get('city').invalid && this.registerPerson.get('city').touched;
  }
  get countryPerNoValido() {
    return this.registerPerson.get('country').invalid && this.registerPerson.get('country').touched;
  }
  get passwordPerNoValido() {
    return this.registerPerson.get('password').invalid && this.registerPerson.get('password').touched;
  }

}
