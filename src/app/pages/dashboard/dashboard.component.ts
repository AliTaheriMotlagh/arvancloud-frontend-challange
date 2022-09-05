import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';

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
  currentUrl = '';

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.currentUrl = this.router.url.replace('/dashboard/', '');
  }
}
