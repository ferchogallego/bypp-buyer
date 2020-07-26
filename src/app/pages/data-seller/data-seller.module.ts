import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DataSellerPageRoutingModule } from './data-seller-routing.module';

import { DataSellerPage } from './data-seller.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DataSellerPageRoutingModule
  ],
  declarations: [DataSellerPage]
})
export class DataSellerPageModule {}
