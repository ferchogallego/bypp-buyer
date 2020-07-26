import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  viewPass = false;

  loginForm = new FormGroup ({
    email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  usuario: any;
  tipo: any;
  textR: any;
  private loading;

  constructor(private ctrlNav: NavController,
              private modalCtrl: ModalController,
              private authSvc: AuthService,
              private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  async onClick(){
     const modal = await this.modalCtrl.create({
       component: ModalPage
     });
     await modal.present();
  }

  onLogin(){
    const {email, password } = this.loginForm.value;
    const user = this.authSvc.login(email, password);
    if (user) {
      this.loadingCtrl.create({
        message: 'Autenticando'
      }).then((overlay) => {
        this.loading = overlay;
        this.loading.present();
      });
      user.then(result => {
            this.usuario = result.user.uid;
            this.authSvc.userData(this.usuario)
                        .subscribe(resp => {
                          this.tipo = resp;
                          if (this.tipo) {
                            if (this.tipo.roll === 'buyerCompany') {
                              this.ctrlNav.navigateForward(`/empresa/${this.tipo.uid}`);
                              this.loading.dismiss();
                              if (this.tipo.roll === 'buyerPerson') {
                                this.ctrlNav.navigateForward('/principal');
                                this.loading.dismiss();
                              }
                            }
                          } else {
                            this.loading.dismiss();
                            Swal.fire({
                              title: 'Error...',
                              text: 'Usuario no registrado en Buyapp comprador',
                              icon: 'error',
                              allowOutsideClick: false,
                              showCloseButton: true
                            });
                          }
                        });
          }).catch(err => {
            this.loading.dismiss();
            Swal.fire({
              title: 'Error...',
              text: 'Email o contraseña inválidos',
              icon: 'error',
              allowOutsideClick: false,
              showCloseButton: true
            });
          });
        }
  }

  togglePasswordModeTrue(){
    this.viewPass = true;
  }
  togglePasswordModeFalse(){
    this.viewPass = false;
  }

  get emailNoValido() {
    return this.loginForm.get('email').invalid && this.loginForm.get('email').touched;
  }
  get passwordNoValido() {
    return this.loginForm.get('password').invalid && this.loginForm.get('password').touched;
  }
}
