import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuotesReceivedPage } from './quotes-received.page';

const routes: Routes = [
  {
    path: '',
    component: QuotesReceivedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuotesReceivedPageRoutingModule {}
