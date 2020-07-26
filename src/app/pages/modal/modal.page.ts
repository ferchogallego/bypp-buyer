import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  constructor(private ctrlNav: NavController,
              private modalCtrl: ModalController ) { }

  ngOnInit() {
  }

  openEnt(){
    this.modalCtrl.dismiss();
    this.ctrlNav.navigateForward('/register/empresa');
  }

  openPer(){
    this.modalCtrl.dismiss();
    this.ctrlNav.navigateForward('/register/person');
  }

}
