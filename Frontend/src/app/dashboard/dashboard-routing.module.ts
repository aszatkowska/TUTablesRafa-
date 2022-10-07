import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './components/customers/customers.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductsComponent } from './components/products/products.component';
import { ShippersComponent } from './components/shippers/shippers.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { SidenavbarComponent } from './components/sidenavbar/sidenavbar.component';

const routes: Routes = [
  // Sidenavwrapper Component acts like a shell & the active child Component gets rendered into the <router-outlet>
  {
    path: '',
    component: SidenavbarComponent,
    children: [
      {
        path: 'customers',
        component: CustomersComponent
      },
      {
        path: 'suppliers',
        component: SuppliersComponent
      },
      {
        path: 'shippers',
        component: ShippersComponent
      },
      {
        path: 'products',
        component: ProductsComponent
      },
      {
        path: 'orders',
        component: OrdersComponent
      },
    ]
  },
  {
    path: '**',
    redirectTo: '/customers',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
