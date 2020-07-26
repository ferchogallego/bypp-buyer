import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditRequestPageRoutingModule } from './edit-request-routing.module';

import { EditRequestPage } from './edit-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditRequestPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditRequestPage]
})
export class EditRequestPageModule {}
