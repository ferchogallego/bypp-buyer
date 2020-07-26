import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-history-request',
  templateUrl: './history-request.page.html',
  styleUrls: ['./history-request.page.scss'],
})
export class HistoryRequestPage implements OnInit {

  cargas = false;
  list: any;
  constructor(private companySvc: CompanyService,
              private navCtrl: NavController) { }

  ngOnInit() {
    this.companySvc.loadAllRequestSentUser(this.companySvc.userId)
                   .subscribe(res => {
                      this.list = res;
                      console.log(this.list);
                      if (this.list.length > 0) {
                        this.cargas = true;
                      }
                   });
  }

  openDetail(idRequest: string){
    this.navCtrl.navigateForward(`/detail-request/${idRequest}`);
  }

}
