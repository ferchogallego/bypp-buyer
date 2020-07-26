import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryRequestPageRoutingModule } from './history-request-routing.module';

import { HistoryRequestPage } from './history-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryRequestPageRoutingModule
  ],
  declarations: [HistoryRequestPage]
})
export class HistoryRequestPageModule {}
