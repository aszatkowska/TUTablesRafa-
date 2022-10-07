import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './components/customers/customers.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductsComponent } from './components/products/products.component';
import { ShippersComponent } from './components/shippers/shippers.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SidenavbarComponent } from './components/sidenavbar/sidenavbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    SidenavbarComponent,
    CustomersComponent,
    OrdersComponent,
    ProductsComponent,
    ShippersComponent,
    SuppliersComponent,
    SidenavbarComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,

    //Material modules
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class DashboardModule { }
