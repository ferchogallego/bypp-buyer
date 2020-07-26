import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuoteDetailPageRoutingModule } from './quote-detail-routing.module';

import { QuoteDetailPage } from './quote-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuoteDetailPageRoutingModule
  ],
  declarations: [QuoteDetailPage]
})
export class QuoteDetailPageModule {}
