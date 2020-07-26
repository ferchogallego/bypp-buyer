import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataSellerPage } from './data-seller.page';

const routes: Routes = [
  {
    path: '',
    component: DataSellerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataSellerPageRoutingModule {}
