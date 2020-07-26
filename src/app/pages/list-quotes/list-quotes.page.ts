import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { Request } from '../../shared/request.interface';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-list-quotes',
  templateUrl: './list-quotes.page.html',
  styleUrls: ['./list-quotes.page.scss'],
})
export class ListQuotesPage implements OnInit {

  cargas = false;
  solicitudes: Request;
  list: any;

  constructor(private companySvc: CompanyService,
              private alertCtrl: AlertController,
              private ctrlNav: NavController) { }

  ngOnInit() {
    this.companySvc.loadRequestSentUser(this.solicitudes, this.companySvc.userId)
                   .subscribe(res => {
                      this.list = res;
                      console.log(this.list);
                      if (this.list.length > 0) {
                        this.cargas = true;
                      }
                   });
  }
  async alertRequestDelete(idS: string) {
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
            this.companySvc.updateRequestState(idS);
          }
        }
      ]
    });

    await alert.present();
  }

  editRequest(idS: string){
    this.ctrlNav.navigateForward(`/edit-request/${idS}`);
  }
  openQuoteById(idS: string){
    this.companySvc.requestId = idS;
    this.ctrlNav.navigateForward('/quotes-received');
  }

}
