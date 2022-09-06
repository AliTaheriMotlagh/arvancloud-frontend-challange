import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  //TODO : active route  bootstrap problem
  links = [
    { title: 'All Articles', link: 'articles' },
    { title: 'New Article', link: 'articles/create' },
  ];

  constructor() {}

  ngOnInit(): void {
  }
}
