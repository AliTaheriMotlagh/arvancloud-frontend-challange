import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { SidebarMenuItem } from '../dto';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  links$ = new ReplaySubject<SidebarMenuItem[]>(1);
  constructor() {}

  setItems(items: SidebarMenuItem[]) {
    this.links$.next(items);
  }
  getItems(): ReplaySubject<SidebarMenuItem[]> {
    return this.links$;
  }
}
