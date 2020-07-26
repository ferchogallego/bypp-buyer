import { Component, OnInit, Input } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { Request } from '../../shared/request.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  info: any;
  load = false;
  imgPerfil: string;
  solicitudes: Request;
  cant: number;
  rquest: number;
  @Input() vendedor: boolean;
  @Input() titulo: string;

  constructor(private companySvc: CompanyService) { }

  ngOnInit() {
    this.companySvc.companyData(this.companySvc.userId)
                   .subscribe(res => {
                     this.info = res;
                     this.imgPerfil = this.info.imgProfile;
                     if (this.imgPerfil) {
                       this.load = true;
                       console.log(this.load);
                     } else {
                      this.load = false;
                      console.log(this.load);
                     }
                   });
    this.companySvc.loadRequestSentUser(this.solicitudes, this.companySvc.userId)
    .subscribe(res => {
      this.cant = res.length;
    });
    this.companySvc.loadAllQuotationByBuyer()
                   .subscribe(resp => this.rquest = resp.length);
  }

}
