import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PagedResult } from 'src/models/pagedresult.model';
import { Supplier } from 'src/models/supplier.model';
import { MatSort, Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {

  sort: Sort = new MatSort();
  pageEvent: PageEvent = new PageEvent();
  title='Lista dostawców';
  dataSource: Supplier[];
  displayedColumns =['name', 'lastName', 'phone', 'email'];

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
    console.log('pageSize: ' + this.pageEvent.pageSize)
    this.http.get<PagedResult<Supplier>>(
      'https://localhost:7000/api/supplier?', {
        params: {
          PageNumber: this.pageEvent.pageIndex + 1,
          PageSize: this.pageEvent.pageSize,
          SortProperty: this.sort.active,
          Desc: this.getDirection(this.sort.direction)
      }
    })
    .subscribe(
      (response: PagedResult<Supplier>) => {
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