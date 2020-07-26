import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-send',
  templateUrl: './send.page.html',
  styleUrls: ['./send.page.scss'],
})
export class SendPage implements OnInit {

  constructor(private companySvc: CompanyService,
              private modalCtrl: ModalController,
              private ctrlNav: NavController) { }

  ngOnInit() {}

 async selectFormRequest(tipo: string){
    console.log(tipo);
    this.companySvc.tipo = tipo;
    this.modalCtrl.dismiss();
    this.ctrlNav.navigateForward('/data-rquest');
  }
}
