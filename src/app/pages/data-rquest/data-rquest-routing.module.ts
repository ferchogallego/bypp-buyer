import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataRquestPage } from './data-rquest.page';

const routes: Routes = [
  {
    path: '',
    component: DataRquestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataRquestPageRoutingModule {}
