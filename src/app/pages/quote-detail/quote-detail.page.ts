import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import Swal from 'sweetalert2';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-quote-detail',
  templateUrl: './quote-detail.page.html',
  styleUrls: ['./quote-detail.page.scss'],
})
export class QuoteDetailPage implements OnInit {
  marcador = false;
  solicitud: any;
  cotizacion: any;

  idSolicitud: string;
  idCotizacion: string;
  imagen: string;
  producto: string;
  descripcion: string;
  marca: string;
  referencia: string;
  cantidad: string;
  fecha: string;
  flete: string;
  precioUn: string;
  total: string;
  direccion: string;
  ciudad: string;
  pais: string;
  comprador: string;
  vendedor: string;

  constructor(private companySvc: CompanyService,
              private ctrlNav: NavController) { }

  ngOnInit() {
    console.log(this.companySvc.quoteId);
    this.companySvc.openQuoteDetailById(this.companySvc.quoteId)
                   .subscribe(res => {
                    this.cotizacion = res;
                    this.idCotizacion = this.companySvc.quoteId;
                    this.imagen = this.cotizacion.imagen;
                    this.producto =  this.cotizacion.producto;
                    this.descripcion = this.cotizacion.descripcion;
                    this.marca = this.cotizacion.marca;
                    this.referencia = this.cotizacion.referencia;
                    this.cantidad = this.cotizacion.cantidad;
                    this.fecha = this.cotizacion.fecha;
                    this.flete = this.cotizacion.flete;
                    this.precioUn = this.cotizacion.precio;
                    this.total = this.cotizacion.total;
                    this.comprador = this.cotizacion.destinatario;
                    this.vendedor = this.cotizacion.vendedor;
                    this.idSolicitud = this.cotizacion.solicitud;
                    this.companySvc.countMarkers(this.idSolicitud, this.comprador, this.companySvc.quoteId)
                                   .subscribe(resp => {
                                     if (resp.length > 0) {
                                       this.marcador = true;
                                     }
                                   });
                    this.companySvc.loadRequesDataById(this.cotizacion.solicitud)
                   .subscribe(resp => {
                    this.solicitud = resp;
                    this.direccion = this.solicitud.direccion;
                    this.ciudad = this.solicitud.ciudad;
                    this.pais = this.solicitud.pais;
                   });
                   });
  }

  quoteSelected(idCotizacion: string, idSolicitud: string, vendedor: string){
    if (this.companySvc.requestState === 'Cerrada') {
      Swal.fire({
        title: 'Está seguro?',
        text: 'Va a aceptar esta cotización',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#070e41',
        cancelButtonColor: '#ed1c24',
        confirmButtonText: 'Si, acepto!'
      }).then((result) => {
        this.companySvc.markAcceptedRequest(idSolicitud, vendedor, idCotizacion)
        .then(resp => {
         console.log(resp);
       });
        this.companySvc.quoteSelectedTrue(idCotizacion)
       .then(res => console.log(res));
        if (result.value) {
          Swal.fire(
            'Enviado!',
            'Se ha notificado al vendedor.',
            'success'
          );
        }
      });
    } else {
      Swal.fire({
        title: 'Solicitud abierta',
        text: 'Debe cerrar la solicitud para adjudicar',
        icon: 'error',
        showCloseButton: true,
      });
    }
  }

  viewDataQuote(idCotizacion: string, idSolicitud: string, comprador: string){
    if (this.marcador === true) {
      Swal.fire({
        title: 'Solicitud denegada',
        text: 'La cotización ya esta seleccionada',
        icon: 'error',
        showCloseButton: true,
      });
    } else {
      if (this.companySvc.markerState <= 2) {
        this.companySvc.markQuoteConsult(idCotizacion, idSolicitud, comprador);
        this.companySvc.checkMarker(idCotizacion);
       } else{
        Swal.fire({
          title: 'Superado el límite de preselección',
          text: 'Cotizaciones preseleccionadas: ' + this.companySvc.markerState,
          icon: 'error',
          showCloseButton: true,
        });
       }
    }
  }

  sellerDataView(vendedor: string){
    if (this.companySvc.requestState === 'Cerrada') {
      this.ctrlNav.navigateForward(`data-seller/${vendedor}`);
    }
    if (this.companySvc.requestState === 'Abierta') {
      Swal.fire({
        title: 'Solicitud Abierta',
        text: 'Debe cerrar la solicitud para acceder a la información del vendedor',
        icon: 'error',
        showCloseButton: true,
      });
    }
  }
}
