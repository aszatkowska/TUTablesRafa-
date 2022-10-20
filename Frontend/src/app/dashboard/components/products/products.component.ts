import { HttpClient } from '@angular/common/http';
import { Component, OnInit, } from '@angular/core';
import { PagedResult } from 'src/models/pagedresult.model';
import { Product } from 'src/models/product.model';
import {MatSort, Sort} from '@angular/material/sort';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  
  sort: Sort = new MatSort();
  title='Lista produktów'
  dataSource: Product[];
  displayedColumns =['name', 'price', 'supplierName']

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
    this.http.get<PagedResult<Product>>('https://localhost:7000/api/product?SortProperty=' + this.sort.active + this.getDirection(this.sort.direction))
    .subscribe(
      (response: PagedResult<Product>) => {
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

