import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-data-seller',
  templateUrl: './data-seller.page.html',
  styleUrls: ['./data-seller.page.scss'],
})
export class DataSellerPage implements OnInit {
  seller: any;
  tipo: string;
  telefono: string;
  email: string;
  nombre: string;
  direccion: string;
  ciudad: string;
  pais: string;
  constructor(private activateRoute: ActivatedRoute,
              private companySvc: CompanyService) { }

  ngOnInit() {
    const id = this.activateRoute.snapshot.paramMap.get('id');
    this.companySvc.loadDataSeller(id)
                   .subscribe(res => {
                     console.log(res);
                     this.seller = res;
                     if (this.seller.roll === 'sellerCompany') {
                      this.tipo = 'Empresa';
                     } else {
                      this.tipo = 'Persona';
                     }
                     this.telefono = this.seller.phone;
                     this.email = this.seller.email;
                     this.nombre = this.seller.name;
                     this.direccion = this.seller.address;
                     this.ciudad = this.seller.city;
                     this.pais = this.seller.country;
                   });
  }

}
