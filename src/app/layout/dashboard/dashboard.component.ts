import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(private sidebarService:SidebarService) {
    this.sidebarService.setItems([
      { title: 'All Articles', link: 'articles' },
      { title: 'New Article', link: 'articles/create' },
    ])
  }

  ngOnInit(): void {

  }
}
