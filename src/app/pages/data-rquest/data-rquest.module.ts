import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DataRquestPageRoutingModule } from './data-rquest-routing.module';

import { DataRquestPage } from './data-rquest.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DataRquestPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DataRquestPage]
})
export class DataRquestPageModule {}
