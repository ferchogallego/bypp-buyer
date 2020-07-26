import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListQuotesPage } from './list-quotes.page';

const routes: Routes = [
  {
    path: '',
    component: ListQuotesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListQuotesPageRoutingModule {}
