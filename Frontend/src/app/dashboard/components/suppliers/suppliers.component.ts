import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PagedResult } from 'src/models/pagedresult.model';
import { Supplier } from 'src/models/supplier.model';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {

  title='Lista dostawców'
  dataSource: Supplier[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.http.get<PagedResult<Supplier>>('https://localhost:7000/api/supplier')
    .subscribe(
      (response: PagedResult<Supplier>) => {
      this.dataSource = response.data;
    },
    error => {
      console.log(error)
    });
  }

}
