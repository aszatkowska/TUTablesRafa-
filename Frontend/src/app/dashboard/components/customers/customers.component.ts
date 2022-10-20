import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/models/customer.model';
import { PagedResult } from 'src/models/pagedresult.model';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  sort: Sort = new MatSort();
  title = 'Lista użytkowników'
  dataSource: Customer[];
  displayedColumns=['name','lastName','phone','email']

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
    this.http.get<PagedResult<Customer>>('https://localhost:7000/api/customer?SortProperty=' + this.sort.active + this.getDirection(this.sort.direction))
    .subscribe(
      (response: PagedResult<Customer>) => {
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
