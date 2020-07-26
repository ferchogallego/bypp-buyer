import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { NavController, AlertController } from '@ionic/angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quotes-received',
  templateUrl: './quotes-received.page.html',
  styleUrls: ['./quotes-received.page.scss'],
})
export class QuotesReceivedPage implements OnInit {
  reqt: any;
  requestCondition = true;
  loadMarkers = true;
  listQuote: any;
  comprador: string;
  constructor(private companySvc: CompanyService,
              private alertCtrl: AlertController,
              private ctrlNav: NavController) { }

  ngOnInit() {
    this.companySvc.loadQuotationsById(this.companySvc.requestId)
                   .subscribe(resp => {
                     this.listQuote = resp;
                   });
    this.companySvc.loadConditionRequest(this.companySvc.requestId)
                   .subscribe(res => {
                     this.reqt = res;
                     this.comprador = this.reqt.usuario;
                     this.companySvc.requestState = this.reqt.condicion;
                     console.log(this.companySvc.requestState);
                     if (this.reqt.condicion === 'Cerrada') {
                       this.requestCondition = false;
                       this.companySvc.requestState = 'Cerrada';
                       console.log(this.requestCondition);
                     }
                   });
    this.companySvc.countMarkersGeneral(this.companySvc.requestId, this.companySvc.userId)
                   .subscribe(result => {
                    this.companySvc.markerState = result.length;
                    if (this.companySvc.markerState >= 3) {
                      this.loadMarkers = false;
                      Swal.fire({
                        title: 'Preselección completa',
                        text: 'Se han preseleccionado 3 cotizaciones, cierra la solicitud para acceder a los datos del vendedor',
                        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/buyappcompradores.appspot.com/o/assets%2Ffull-battery.png?alt=media&token=d72c5afc-8500-4dda-9c78-65dbe391a737',
                        imageWidth: 130,
                        imageAlt: '',
                      });
                    }else {
                      const pend = 3 - result.length;
                      Swal.fire({
                        title: 'Preselección disponible',
                        text: result.length + ' ' + 'cotizaciones preseleccionadas, pendientes por preseleccionar: ' + ' ' + pend,
                        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/buyappcompradores.appspot.com/o/assets%2Fbattery.png?alt=media&token=16e87920-9732-4893-9ed4-54ee0f4db4fb',
                        imageWidth: 130,
                        imageAlt: '',
                      });
                     }
                   });
  }

  openQuoteDetail(idQuote: string){
    this.companySvc.quoteId = idQuote;
    this.ctrlNav.navigateForward('quote-detail');
  }

  async alertRequestClose(comprador: string) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Cerrar Solicitud',
      message: 'Cerrar para verificar y adjudicar!!!',
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
            this.companySvc.requestState = 'Cerrada';
            this.companySvc.updateRequestCondition(this.companySvc.requestId, 'Cerrada');
            this.ctrlNav.navigateBack(`/empresa/${comprador}`);
          }
        }
      ]
    });
    await alert.present();
  }

  async alertOpenRequest(comprador: string) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Abrir Solicitud',
      message: 'Abrir para permitir mas cotizaciones!!!',
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
            this.companySvc.requestState = 'Abierta';
            this.companySvc.updateRequestCondition(this.companySvc.requestId, 'Abierta');
            this.ctrlNav.navigateForward(`/empresa/${comprador}`);
          }
        }
      ]
    });
    await alert.present();
  }
}
