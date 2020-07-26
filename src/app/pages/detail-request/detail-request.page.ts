import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { ActivatedRoute } from '@angular/router';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-detail-request',
  templateUrl: './detail-request.page.html',
  styleUrls: ['./detail-request.page.scss'],
})
export class DetailRequestPage implements OnInit {
  idRequest: string;
  solicitud: any;
  imagen: string;
  producto: string;
  descripcion: string;
  marca: string;
  referencia: string;
  cantidad: string;
  fecha: string;
  direccion: string;
  ciudad: string;
  pais: string;
  sector: string;
  categoria: string;
  subcategoria: string;
  usuario: string;
  constructor(private companySvc: CompanyService,
              private activateRoute: ActivatedRoute,
              private viewer: PhotoViewer,
              private platform: Platform) { }
  ngOnInit() {
    this.idRequest = this.activateRoute.snapshot.paramMap.get('id');
    this.companySvc.loadRequesDataById(this.idRequest)
      .subscribe(res => {
        this.solicitud = res;
        this.imagen = this.solicitud.imagen;
        this.producto = this.solicitud.producto;
        this.descripcion = this.solicitud.descripcion;
        this.marca = this.solicitud.marca;
        this.referencia = this.solicitud.referencia;
        this.cantidad = this.solicitud.cantidad;
        this.fecha = this.solicitud.fecha;
        this.direccion = this.solicitud.direccion;
        this.ciudad = this.solicitud.ciudad;
        this.pais = this.solicitud.pais;
        this.sector = this.solicitud.sector;
        this.categoria = this.solicitud.categoria;
        this.subcategoria = this.solicitud.subcategoria;
        this.usuario = this.solicitud.usuario;
        this.companySvc.tipo = this.solicitud.tipo;
      });
  }
  fullScreenImage(imagen: string) {
    this.platform.ready().then(() => {
      const photoUrl = imagen;
      const title = 'Imagen de soliucitud';
      const options = {
        share: true
      };
      this.viewer.show(photoUrl, title, options);
    });
  }
}
