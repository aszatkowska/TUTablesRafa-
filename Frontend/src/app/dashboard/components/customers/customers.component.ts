import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/models/customer.model';
import { PagedResult } from 'src/models/pagedresult.model';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  title = 'Lista użytkowników'
  dataSource: Customer[];

  displayedColumns=['name','lastName','phone','email']

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.http.get<PagedResult<Customer>>('https://localhost:7000/api/customer')
    .subscribe(
      (response: PagedResult<Customer>) => {
      this.dataSource = response.data;
    },
    error => {
      console.log(error)
    });
  }
  
}
