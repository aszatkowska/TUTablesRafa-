import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PagedResult } from 'src/models/pagedresult.model';
import { Shipper } from 'src/models/shipper.model';
import {MatSort, Sort} from '@angular/material/sort';

@Component({
  selector: 'app-shippers',
  templateUrl: './shippers.component.html',
  styleUrls: ['./shippers.component.css']
})
export class ShippersComponent implements OnInit {

  sort: Sort = new MatSort();
  title = 'Lista przewoźników'
  dataSource: Shipper[];
  displayedColumns =['companyName', 'phone'];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.sort.direction = 'asc';
    this.sort.active = 'companyName';
    this.loadData();
  }

  setSortChange(sortChange: Sort) {
    this.sort = sortChange;
    this.loadData();
  }

  loadData(){
    this.http.get<PagedResult<Shipper>>('https://localhost:7000/api/shipper?SortProperty=' + this.sort.active + this.getDirection(this.sort.direction))
    .subscribe(
      (response: PagedResult<Shipper>) => {
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
