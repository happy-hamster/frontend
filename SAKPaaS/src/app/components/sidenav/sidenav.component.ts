import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  open$ = new BehaviorSubject(false);

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.open$.next(false);
  }

  open() {
    this.open$.next(true);
  }
}
