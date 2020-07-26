import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListQuotesPageRoutingModule } from './list-quotes-routing.module';

import { ListQuotesPage } from './list-quotes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListQuotesPageRoutingModule
  ],
  declarations: [ListQuotesPage]
})
export class ListQuotesPageModule {}
