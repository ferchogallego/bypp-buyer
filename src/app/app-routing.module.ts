import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'slides',
    loadChildren: () => import('./pages/slides/slides.module').then( m => m.SlidesPageModule)
  },
  {
    path: 'register/:id',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'principal',
    loadChildren: () => import('./pages/principal/principal.module').then( m => m.PrincipalPageModule)
  },
  {
    path: 'empresa/:uid',
    loadChildren: () => import('./pages/empresa/empresa.module').then( m => m.EmpresaPageModule)
  },
  {
    path: 'request',
    loadChildren: () => import('./pages/request/request.module').then( m => m.RequestPageModule)
  },
  {
    path: 'subcategory',
    loadChildren: () => import('./pages/subcategory/subcategory.module').then( m => m.SubcategoryPageModule)
  },
  {
    path: 'data-rquest',
    loadChildren: () => import('./pages/data-rquest/data-rquest.module').then( m => m.DataRquestPageModule)
  },
  {
    path: 'edit-request/:id',
    loadChildren: () => import('./pages/edit-request/edit-request.module').then( m => m.EditRequestPageModule)
  },
  {
    path: 'list-quotes',
    loadChildren: () => import('./pages/list-quotes/list-quotes.module').then( m => m.ListQuotesPageModule)
  },
  {
    path: 'quotes-received',
    loadChildren: () => import('./pages/quotes-received/quotes-received.module').then( m => m.QuotesReceivedPageModule)
  },
  {
    path: 'quote-detail',
    loadChildren: () => import('./pages/quote-detail/quote-detail.module').then( m => m.QuoteDetailPageModule)
  },
  {
    path: 'data-seller/:id',
    loadChildren: () => import('./pages/data-seller/data-seller.module').then( m => m.DataSellerPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'detail-request/:id',
    loadChildren: () => import('./pages/detail-request/detail-request.module').then( m => m.DetailRequestPageModule)
  },
  {
    path: 'history-request',
    loadChildren: () => import('./pages/history-request/history-request.module').then( m => m.HistoryRequestPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
