import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.css']
})
export class SidenavbarComponent implements OnInit {

  isExpanded: boolean = true
  // dataSource: Array<> = [

  // ]

  constructor() { }

  ngOnInit(): void {
  }

}
