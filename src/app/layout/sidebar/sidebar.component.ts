import { Component, OnInit } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { SidebarMenuItem } from 'src/app/dto';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  links$: Observable<SidebarMenuItem[]>;

  constructor(private service: SidebarService) {
    this.links$ = this.service.getItems();
  }

  ngOnInit(): void {}
}
