import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public lists:any = [
    {'title': 'lista 1'},
    {'title': 'lista 2'},
    {'title': 'lista 3'},
    {'title': 'lista 4'},
    {'title': 'lista 5'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
