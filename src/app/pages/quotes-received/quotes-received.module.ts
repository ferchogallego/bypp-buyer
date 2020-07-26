import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuotesReceivedPageRoutingModule } from './quotes-received-routing.module';

import { QuotesReceivedPage } from './quotes-received.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuotesReceivedPageRoutingModule
  ],
  declarations: [QuotesReceivedPage]
})
export class QuotesReceivedPageModule {}
