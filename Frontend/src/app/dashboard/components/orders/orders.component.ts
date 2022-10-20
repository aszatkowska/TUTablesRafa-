import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/models/order.model';
import { PagedResult } from 'src/models/pagedresult.model';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  sort: Sort = new MatSort();
  title = 'Lista zamówień';
  dataSource: Order[];
  displayedColumns =['customerName', 'shipperCompanyName'];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.sort.direction = 'desc';
    this.sort.active = 'customerName';
    this.loadData();
  }

  setSortChange(sortChange: Sort) {
    this.sort = sortChange;
    this.loadData();
  }

  loadData(){
    this.http.get<PagedResult<Order>>('https://localhost:7000/api/Order?SortProperty=' + this.sort.active + this.getDirection(this.sort.direction))
    .subscribe(
      (response: PagedResult<Order>) => {
        console.log(response);
        this.dataSource = response.data;
      },
    error => {
      console.log(error)
    });
  }

  getDirection(dir: String) {
    if (dir === 'asc') {
      return '&Desc=' + false;
    } else if (dir  === 'desc') {
      return '&Desc=' + true;
    } else {
      return '';
    }
  }
}
