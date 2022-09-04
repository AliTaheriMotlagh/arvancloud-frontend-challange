import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  links = [
    { title: 'All Articles', link: 'articles' },
    { title: 'New Article', link: 'articles/create' },
  ];

  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
