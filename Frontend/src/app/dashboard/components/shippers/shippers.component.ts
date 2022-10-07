import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PagedResult } from 'src/models/pagedresult.model';
import { Shipper } from 'src/models/shipper.model';

@Component({
  selector: 'app-shippers',
  templateUrl: './shippers.component.html',
  styleUrls: ['./shippers.component.css']
})
export class ShippersComponent implements OnInit {

  title = 'Lista przewoźników'
  dataSource: Shipper[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.http.get<PagedResult<Shipper>>('https://localhost:7000/api/shipper')
    .subscribe(
      (response: PagedResult<Shipper>) => {
      this.dataSource = response.data;
    },
    error => {
      console.log(error)
    });
  }

}
