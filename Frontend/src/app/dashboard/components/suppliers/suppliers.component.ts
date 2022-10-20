import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PagedResult } from 'src/models/pagedresult.model';
import { Supplier } from 'src/models/supplier.model';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {

  sort: Sort = new MatSort();
  title='Lista dostawców';
  dataSource: Supplier[];
  displayedColumns =['name', 'lastName', 'phone', 'email'];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.sort.direction = 'asc';
    this.sort.active = 'name';
    this.loadData();
  }

  setSortChange(sortChange: Sort) {
    this.sort = sortChange;
    this.loadData();
  }

  loadData(){
    this.http.get<PagedResult<Supplier>>('https://localhost:7000/api/supplier?SortProperty=' + this.sort.active + this.getDirection(this.sort.direction))
    .subscribe(
      (response: PagedResult<Supplier>) => {
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