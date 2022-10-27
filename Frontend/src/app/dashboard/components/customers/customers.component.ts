import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/models/customer.model';
import { PagedResult } from 'src/models/pagedresult.model';
import { MatSort, Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  sort: Sort = new MatSort();
  pageEvent: PageEvent = new PageEvent();
  title = 'Lista użytkowników'
  dataSource: Customer[];
  displayedColumns=['name','lastName','phone','email']

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.pageEvent.pageIndex = 0;
    this.pageEvent.pageSize = 5;
    this.sort.direction = 'asc';
    this.sort.active = 'name';
    this.loadData();
  }

  setSortChange(sortChange: Sort) {
    this.sort = sortChange;
    this.loadData();
  }
  
  loadData(){
    this.http.get<PagedResult<Customer>>(
      'https://localhost:7000/api/customer?', {
        params: {
          PageNumber: this.pageEvent.pageIndex + 1,
          PageSize: this.pageEvent.pageSize,
          SortProperty: this.sort.active,
          Desc: this.getDirection(this.sort.direction)
      }
    })
    .subscribe(
      (response: PagedResult<Customer>) => {
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
