import { HttpClient } from '@angular/common/http';
import { Component, OnInit, } from '@angular/core';
import { PagedResult } from 'src/models/pagedresult.model';
import { Product } from 'src/models/product.model';
import { MatSort, Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  
  sort: Sort = new MatSort();
  pageEvent: PageEvent = new PageEvent();
  title='Lista produktów'
  dataSource: Product[];
  pageSizeOptions: number[];
  displayedColumns =['name', 'price', 'supplierName']

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.pageEvent.pageIndex = 0;
    this.pageEvent.pageSize = 5;
    this.pageSizeOptions = [5, 10, 20];
    this.sort.direction = 'asc';
    this.sort.active = 'name';
    this.loadData();
  }

  setSortChange(sortChange: Sort) {
    this.sort = sortChange;
    this.loadData();
  }

  loadData(){
    this.http.get<PagedResult<Product>>(
      'https://localhost:7000/api/product?', {
        params: {
          PageNumber: this.pageEvent.pageIndex + 1,
          PageSize: this.pageEvent.pageSize,
          SortProperty: this.sort.active,
          Desc: this.getDirection(this.sort.direction)
      }
    })
    .subscribe(
      (response: PagedResult<Product>) => {
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

