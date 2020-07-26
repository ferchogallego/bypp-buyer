import { Component, OnInit, Output } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { trigger, transition, style, animate} from '@angular/animations';
import { LoadingController, PopoverController } from '@ionic/angular';
import { PopinfoComponent } from 'src/app/components/popinfo/popinfo.component';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
  animations: [
    trigger('slideinleft', [
      transition('void => *', [
        style({opacity: 0}),
        animate('1000ms', style({opacity: 1}))
      ])
    ]),
  ]
})
export class RequestPage implements OnInit {
  sectors: any;
  constructor(private companySvc: CompanyService,
              private loadingController: LoadingController,
              private popoverController: PopoverController) { }

  ngOnInit() {
    this.companySvc.loadEconomySectors()
                   .subscribe(result => {
                    this.sectors = result;
                    console.log(this.sectors);
                   });
  }

  sectorSelected(event, sector){
    console.log(sector);
    this.presentLoading(event);
    this.companySvc.sctor = sector;
  }

  async presentLoading(event) {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Espere...',
      duration: 1000
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
    this.loadPopSubs(event);
  }

  async loadPopSubs(evento){
    const subs = await this.popoverController.create({
      component: PopinfoComponent,
      event: evento,
      mode: 'ios',
      // backdropDismiss: false
    });
    await subs.present();
  }

}
