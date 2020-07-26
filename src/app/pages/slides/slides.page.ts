import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
})
export class SlidesPage implements OnInit {

  slides: { img: string, titulo: string, desc: string }[] = [
    {
      img: '/assets/slides/membership.png',
      titulo: 'Regístrate',
      desc: 'Crea una cuenta con un email válido y confirma tu suscripción'
    },
    {
      img: '/assets/slides/oil.png',
      titulo: 'Genera tu primera solicitud de compra',
      desc: 'Selecciona el sector económico donde se ubica el producto o servicio que requieres'
    },
    {
      img: '/assets/slides/dashboard.png',
      titulo: 'Selecciona la categoría y subcategoría...',
      desc: 'Asesores atentos a tus necesidades.'
    },
    {
      img: '/assets/slides/ip.png',
      titulo: 'Ingresa los datos de tu producto o servicio',
      desc: 'Donde debe llegar tu producto o realizar el servicio'
    },
    {
      img: '/assets/slides/prospect.png',
      titulo: 'Te avisaremos cuando te envíen cotizaciones',
      desc: 'Selecciona las cotizaciones que mas se adapten a tus necesidades'
    },
    {
      img: '/assets/slides/qualify.png',
      titulo: 'Cómo estuvo tu compra?',
      desc: 'Califica tu experiencia en BuyApp'
    }
  ];

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  onClick(){
    this.navCtrl.navigateBack('/inicio');
  }

}
