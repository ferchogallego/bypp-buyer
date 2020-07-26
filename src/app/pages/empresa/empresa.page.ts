import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { CompanyService } from '../../services/company.service';
import { ActivatedRoute } from '@angular/router';
import { Request } from '../../shared/request.interface';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.page.html',
  styleUrls: ['./empresa.page.scss'],
})
export class EmpresaPage implements OnInit {

  cargas = false;
  dataCompany: any;
  name: string;
  solicitudes: Request;
  list: any;
  cant: any;
  idS: string;
  rqest: any;

  constructor(private menuCtrl: MenuController,
              private companySvc: CompanyService,
              private activateRoute: ActivatedRoute,
              private actionSheetCtrl: ActionSheetController,
              private alertCtrl: AlertController,
              private ctrlNav: NavController) { }

  ngOnInit() {
    const id = this.activateRoute.snapshot.paramMap.get('uid');
    this.companySvc.userId = id;
    this.companySvc.companyData(id).subscribe(result => {
      this.dataCompany = result;
      this.name = this.dataCompany.name;
      this.companySvc.rollUser = this.dataCompany.roll;
    });
    this.companySvc.loadRequestSentUser(this.solicitudes, id)
                   .subscribe(res => {
                      this.list = res;
                      if (this.list.length > 0) {
                        this.cargas = true;
                        console.log(this.cargas);
                      }
                   });
  }

  toogleMenu(){
    this.menuCtrl.toggle();
  }

  async onClick(idSolicitud: string, condicion: string){
    this.idS = idSolicitud;
    const actionSheet = await this.actionSheetCtrl.create({
        header: 'Solicitudes',
        cssClass: 'my-custom-class',
        buttons: [{
          text: 'Cotizaciones Recibidas',
          icon: 'list',
          handler: () => {
            this.companySvc.requestId = idSolicitud;
            this.ctrlNav.navigateForward('/quotes-received');
          }
        }, {
          text: 'Modificar Solicitud',
          icon: 'share',
          handler: () => {
            this.ctrlNav.navigateForward(`/edit-request/${idSolicitud}`);
          }
        }, {
          text: 'Eliminar Solicitud',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.alertRequestDelete();
          }
        }, {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
      });
    await actionSheet.present();
    }

  async alertMsInteresting(idRequest: string){
    this.companySvc.countInterestinRequest(idRequest)
                   .subscribe(resp => {
                     this.cant = resp.length;
                     console.log(this.cant);
                     this.presentAlert(this.cant);
                   });

  }

  async presentAlert(interesados: any) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Interesados en enviar cotización:',
      subHeader: interesados,
      buttons: ['Cerrar']
    });

    await alert.present();
  }

  async alertRequestDelete() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Eliminar Solicitud',
      message: 'Enviará esta solicitud a la papelera!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            alert.dismiss();
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.companySvc.updateRequestState(this.idS);
          }
        }
      ]
    });

    await alert.present();
  }

  requestView(idRequest: string){
    this.ctrlNav.navigateForward(`/detail-request/${idRequest}`);
  }
}

