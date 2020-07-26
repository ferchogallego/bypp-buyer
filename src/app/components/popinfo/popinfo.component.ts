import { Component, OnInit, Input } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { PopoverController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-popinfo',
  templateUrl: './popinfo.component.html',
  styleUrls: ['./popinfo.component.scss'],
})
export class PopinfoComponent implements OnInit {

  categories: any;
  cat: any;

  constructor(public companySvc: CompanyService,
              private popoverController: PopoverController,
              private ctrlNav: NavController) { }

  ngOnInit() {
    this.companySvc.loadCategories(this.companySvc.sctor)
    .subscribe(res => {
     this.categories = res;
     console.log(this.categories);
     this.cat = this.categories.nombre;
    });
  }

  onClick(categoria){
    this.companySvc.category = categoria;
    this.ctrlNav.navigateForward('/subcategory');
    this.popoverController.dismiss();
  }

}
