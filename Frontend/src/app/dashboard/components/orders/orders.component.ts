import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/models/order.model';
import { PagedResult } from 'src/models/pagedresult.model';
import { MatSort, Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  sort: Sort = new MatSort();
  pageEvent: PageEvent = new PageEvent();
  title = 'Lista zamówień';
  dataSource: Order[];
  displayedColumns =['customerName', 'shipperCompanyName'];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.pageEvent.pageIndex = 0;
    this.pageEvent.pageSize = 5;
    this.sort.direction = 'desc';
    this.sort.active = 'customerName';
    this.loadData();
  }

  setSortChange(sortChange: Sort) {
    this.sort = sortChange;
    this.loadData();
  }

  loadData(){
    this.http.get<PagedResult<Order>>(
      'https://localhost:7000/api/order?', {
        params: {
          PageNumber: this.pageEvent.pageIndex + 1,
          PageSize: this.pageEvent.pageSize,
          SortProperty: this.sort.active,
          Desc: this.getDirection(this.sort.direction)
      }
    })
    .subscribe(
      (response: PagedResult<Order>) => {
        console.log(response);
        this.pageEvent.length = response.totalRecords;
        this.dataSource = response.data;
      },
    error => {
      console.log(error)
    });
  }

  public handlePage(e: any) {
    this.pageEvent.pageIndex = e.pageIndex;
    this.pageEvent.pageSize = e.pageSize;
    this.loadData();
  }

  getDirection(dir: String) {
    if (dir === 'desc') {
      return 'true';
    } else{
      return 'false';
    }
  }
}
