import { HttpClient } from '@angular/common/http';
import { Component, OnInit, } from '@angular/core';
import { PagedResult } from 'src/models/pagedresult.model';
import { Product } from 'src/models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  
  title='Lista produktów'
  
  dataSource: Product[];
  displayedColumns =['name', 'price', 'supplierName']

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.http.get<PagedResult<Product>>('https://localhost:7000/api/product')
    .subscribe((response: PagedResult<Product>) => {
      console.log(response);
      this.dataSource = response.data;
    },
    error => {
      console.log(error)
    });
  }
}

