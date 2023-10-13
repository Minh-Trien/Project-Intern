import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { AllProductComponent } from './mycomponents/all-product/all-product.component';
import { UserComponent } from './mycomponents/user/user.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'manager/product',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      
      {
        path: 'manager/product',
        component : AllProductComponent
      },
      {
        path: 'manager/user',
        component : UserComponent
      }
    ]
  }
  
  ,
  {path: '**', redirectTo: 'manager/product'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
