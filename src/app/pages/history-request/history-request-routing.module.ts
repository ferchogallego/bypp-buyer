import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoryRequestPage } from './history-request.page';

const routes: Routes = [
  {
    path: '',
    component: HistoryRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoryRequestPageRoutingModule {}
