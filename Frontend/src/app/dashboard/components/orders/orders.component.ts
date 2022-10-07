import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/models/order.model';
import { PagedResult } from 'src/models/pagedresult.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  title='Lista zamówień'
  dataSource: Order[];
  displayedColumns = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.http.get<PagedResult<Order>>('https://localhost:7000/api/order')
    .subscribe(
      (response: PagedResult<Order>) => {
      this.dataSource = response.data;
    },
    error => {
      console.log(error)
    });
  }

}
